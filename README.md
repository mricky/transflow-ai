# TransFlow AI 🚐⚡

> **Autonomous Intercity Shuttle & Smart Seat Concierge powered by Gemini AI, Model Context Protocol (MCP), and Anti-Race-Condition Concurrency Engine.**

---

## 🌟 Overview
**TransFlow AI** is an enterprise-grade intercity shuttle booking copilot designed for high-density transit corridors (such as Bandung – Jakarta / Jabodetabek). It features:
* **Interactive HiAce Premio VIP 8-Seat Visualization:** Real-time seat statuses (`Available`, `Held`, `Booked`).
* **Anti-Race Condition Concurrency Engine:** Distributed atomic seat holds with 10-minute TTL and row-level database locking to prevent double-booking during peak rush periods.
* **Model Context Protocol (MCP):** Autonomous tool orchestration for route checking, atomic seat locking, fare calculation, and boarding pass generation.
* **Hybrid Vector RAG:** Instant policy lookup for baggage limits, pool station landmarks, and reschedule/refund SOP.
* **Digital Boarding Pass Generator:** Executive A4 PDF e-ticket with cryptographically verifiable QR Code.

---

## 🏗️ Architecture
```
[ User / Chat Concierge ]
           │
           ▼
[ TransFlow Next.js 15 Edge ]
     ├── Model Context Protocol (MCP Tools)
     ├── Hybrid RAG (Policy & Landmark Embeddings)
     └── Distributed Concurrency Layer (Atomic Seat Hold with 10-Min TTL)
           │
           ▼
[ HiAce Premio VIP Interactive Seat Map ]
```

---

## 🚀 Getting Started
```bash
# Clone the repository
cd /Users/hacaca/Projects/personal/public-repo/transflow-ai

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📄 License
MIT License. Created for high-concurrency transport innovation showcase.
