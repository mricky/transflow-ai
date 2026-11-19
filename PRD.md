# Product Requirements Document (PRD) — TransFlow AI

## 1. Executive Summary
**TransFlow AI** is an enterprise-grade autonomous intercity shuttle & executive travel booking platform. It combines conversational AI concierges, **interactive seat visualization** (Toyota HiAce Premio VIP 8-Seat layout), **Model Context Protocol (MCP)** tool chaining, and **Retrieval-Augmented Generation (RAG)** grounded in real shuttle transport policies.

The core engineering highlight is a **High-Concurrency Anti-Race-Condition Architecture**, designed to withstand extreme peak traffic (such as Indonesian *Mudik Lebaran* flash sales with 10M+ concurrent queries) without double-booking seats.

---

## 2. Problem Statement & Business Opportunity
* **Peak Season Double-Booking:** During high-demand flash sales (e.g. Bandung–Jakarta Friday rush or holiday seasons), legacy travel booking systems suffer race conditions where multiple passengers purchase the exact same seat concurrently.
* **Customer Support Overload:** 70% of passenger support inquiries revolve around repetitive policy questions: *"Can I bring a 25kg suitcase?", "Where is the exact drop-off in Blora Sudirman?", "How do I reschedule if my meeting finishes late?"*.
* **Fragmented Booking Experience:** Passengers typically have to switch between chat apps, complex web forms, and static seating charts.

---

## 3. Core Architecture Pillars

```
+-----------------------------------------------------------------------------------+
|                        TransFlow AI Client (Next.js 15)                           |
|  [Conversational AI Drawer] <---- Sync ----> [Interactive HiAce Seat Layout]       |
+----------------------------------------+------------------------------------------+
                                         |
                                  Next.js API Routes
                                         |
         +-------------------------------+-------------------------------+
         |                                                               |
+--------v-------------------------------+             +-----------------v----------+
|      Agentic MCP Orchestrator          |             |    Hybrid RAG Vector Engine|
| (search_trips, hold_seat, issue_pass)  |             | (Policy, Luggage, Pools)   |
+--------+-------------------------------+             +----------------------------+
         |
+--------v--------------------------------------------------------------------------+
|             Anti-Race-Condition Concurrency Engine (Redis + PostgreSQL)           |
|  1. Atomic Distributed Seat Hold (`SETNX` with 10-Min TTL)                        |
|  2. Row-Level Pessimistic Lock (`SELECT ... FOR UPDATE NOWAIT`)                   |
|  3. Idempotent Payment & Booking Transition (`HELD` -> `CONFIRMED`)               |
+-----------------------------------------------------------------------------------+
```

---

## 4. Anti-Race Condition & Concurrency Blueprint

### 4.1 The 3-Tier Seat Locking Lifecycle
1. **Tier 1: Atomic In-Memory / Distributed Hold (Instant Gratification)**
   - When AI or user selects a seat (e.g. `Seat 2A - Captain Seat Window`), an atomic lock is claimed:
     ```
     KEY: seat_lock:{trip_id}:{seat_no}
     VALUE: { passenger_id, session_token, expires_at }
     TTL: 600 seconds (10 Minutes)
     ```
   - If another user attempts to hold the same seat 1 millisecond later, the atomic operation fails immediately with an HTTP 409 Conflict / *"Kursi sedang dipilih pengguna lain"*.

2. **Tier 2: Relational Row-Level Lock on Checkout**
   - When the user transitions from hold to payment confirmation:
     ```sql
     BEGIN;
     SELECT status FROM trip_seats 
     WHERE trip_id = $1 AND seat_no = $2 
     FOR UPDATE NOWAIT;
     
     UPDATE trip_seats 
     SET status = 'BOOKED', passenger_id = $3, booked_at = NOW() 
     WHERE trip_id = $1 AND seat_no = $2;
     COMMIT;
     ```

3. **Tier 3: Idempotency Key Reconciliation**
   - Every booking execution passes an `Idempotency-Key: req_xxx` header to prevent duplicate charges or ticket issuances on network retry.

---

## 5. Model Context Protocol (MCP) Tool Definitions

### Tool 1: `search_routes_and_trips`
* **Purpose:** Query available departures between transit pools.
* **Input Schema:**
  ```json
  {
    "originPool": "BANDUNG_BALTOS | BANDUNG_PASTEUR | BANDUNG_BUAHBATU",
    "destinationPool": "JAKARTA_BLORA | JAKARTA_BEKASI | BANDARA_SOETTA",
    "departureDate": "YYYY-MM-DD",
    "preferredTimeWindow": "morning | afternoon | evening"
  }
  ```

### Tool 2: `inspect_seat_map`
* **Purpose:** Inspect real-time availability of the 8-seat HiAce Premio VIP fleet.
* **Input Schema:** `{ "tripId": "TRIP-2026-BDG-JKT-0800" }`
* **Output:** Array of seat objects:
  * `seatNo`: `1A`, `1B`, `2A`, `2B`, `3A`, `3B`, `3C`, `Front_1`
  * `category`: `CAPTAIN_SEAT_WINDOW`, `CAPTAIN_SEAT_AISLE`, `EXECUTIVE_BENCH`
  * `status`: `AVAILABLE`, `HELD`, `BOOKED`

### Tool 3: `hold_seat_atomic`
* **Purpose:** Atomically acquire a 10-minute hold lock on a seat.
* **Input Schema:**
  ```json
  {
    "tripId": "string",
    "seatNo": "string",
    "passengerName": "string",
    "passengerPhone": "string"
  }
  ```

### Tool 4: `calculate_fare`
* **Purpose:** Compute net fare with dynamic peak pricing & multi-ticket discount.

### Tool 5: `generate_digital_boarding_pass`
* **Purpose:** Generate an official A4 / Mobile PDF E-Ticket with verifiable QR Code.

---

## 6. Hybrid RAG Knowledge Base Architecture
Statutory shuttle service policies indexed via Vector Cosine Similarity (1536d / 3072d) + Lexical Keyword Search:

1. **Luggage & Baggage Allowance:**
   - Free baggage limit: 1 standard suitcase (max 20 kg, 24-inch).
   - Foldable bicycles allowed only if boxed and booked in advance.
   - Prohibited items: Pets/animals, foul-smelling items (durian, raw fish), hazardous flammables.
2. **Pool Station Coordinates & Landmark Directions:**
   - *Bandung Baltos:* Balubur Town Square, Lower Ground Lobby.
   - *Bandung Pasteur:* Jl. Dr. Djunjunan No. 77.
   - *Jakarta Blora:* Sudirman Dukuh Atas (50m from MRT Dukuh Atas & KRL Sudirman).
   - *Bekasi Mega Mall:* Ground Floor Pintu Selatan.
3. **Reschedule & Cancellation SOP:**
   - Cancellation > 6 hours before departure: 80% refund.
   - Cancellation 2–6 hours before departure: 50% refund or free 1x reschedule.
   - Cancellation < 2 hours: Non-refundable, seat forfeited.

---

## 7. Interactive Seat Map Specification (Toyota HiAce Premio VIP)

```
[ FRONT / DRIVER CABIN ]
+---------------+---------------+
| [ DRIVER ]    | [ SEAT F1 ]   |  <-- Front Cabin (Co-Driver)
+---------------+---------------+
|           G A N G             |
+---------------+---------------+
| [ SEAT 1A ]*  | [ SEAT 1B ]*  |  <-- Row 1: Executive Captain Seats
+---------------+---------------+
| [ SEAT 2A ]*  | [ SEAT 2B ]*  |  <-- Row 2: Executive Captain Seats
+---------------+---------------+
| [ 3A ]  |   [ 3B ]   | [ 3C ] |  <-- Row 3: Rear Executive Bench
+---------+------------+--------+
[ LUGGAGE COMPARTMENT (200L)   ]

* Captain Seats with independent armrest, leg-rest, and 45-degree recline.
```

---

## 8. Tech Stack
* **Framework:** Next.js 15 (App Router, Turbopack, Server Actions)
* **Language:** TypeScript 5.7
* **Styling:** Tailwind CSS 3.4 + Lucide Icons
* **AI & Intelligence:** Google Gemini 1.5 Flash + Hybrid Vector Embeddings
* **PDF Engine:** jsPDF with customized A4 Executive Boarding Pass template
* **Deployment:** Vercel Edge Serverless + GitHub Actions CI/CD
