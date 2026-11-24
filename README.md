# TransFlow AI 🚐⚡

> **Executive Intercity Shuttle Reservation Platform for the Bandung – Jakarta Corridor.**  
> Powered by **Next.js 15 App Router**, **Feature-Sliced Design (FSD)**, **Model Context Protocol (MCP)**, **Grounded Vector RAG**, and an **Optimistic UI Anti-Race-Condition Concurrency Engine**.

---

## 🌟 Key Highlights & Engineering Showcase

### 1. 🏗️ Feature-Sliced Design (FSD) Architecture
Structured strictly according to uni-directional FSD specifications for enterprise maintainability:
- `src/app/`: Root layout, global CSS, and page composition.
- `src/widgets/`: Independent composable blocks (`Header`, `ReservationFormWidget`, `SchedulePickerWidget`, `CabinVisualizerWidget`, `ConciergePanelWidget`, `TelemetryInspectorWidget`).
- `src/features/`: High-value user workflows (`checkout-booking` with QRIS simulation & PDF generation).
- `src/entities/`: Domain data schemas (`seat`, `trip`, `policy`, `traffic`, `booking`).
- `src/shared/`: Reusable primitives, MCP tool interfaces, and central reactive store (`booking-context.tsx`).

### 2. ⚡ Optimistic UI with Automatic Rollback (Anti-Race-Condition)
- **Zero-Latency Client Handshake:** Clicking any available seat immediately locks the selection visually with 0ms lag.
- **Distributed Lock Protocol (TTL 600s):** Background atomic lock verification (`SETNX` with 10-minute expiry).
- **Automatic Rollback on HTTP 409 Conflict:** If a simulated collision occurs (e.g., competing sessions reserving within 1ms), state reverts seamlessly to previous snapshot, marks the contested seat as held by another user, and displays a rollback diagnostic banner.
- **50-Thread Concurrent Stress Test Simulator:** Built-in telemetry engine to simulate 50 simultaneous bot threads competing for high-demand seats during flash sales.

### 3. 🚐 Authentic Toyota HiAce Premio VIP Cabin Visualizer (8-Seat Top-Down Blueprint)
- **Realistic Automotive Ergonomics:**
  - Standard Indonesian Right-Hand Drive (RHD): Driver cockpit situated on the RIGHT; front passenger seat **F1** on the LEFT.
  - Curbside Electric Sliding Door on the LEFT (trotoar).
  - Commercial Van Tyres (**235/65 R16C**) mounted outside the chassis with accurate axle positioning.
- **True Sasis & Floor Profile:**
  - **Rows 1 & 2 (1A, 1B, 2A, 2B):** 100% Flat Floor (*Bebas Ban*) with 110cm legroom pitch.
  - **Row 3 (3A, 3B, 3C):** Poros Roda Belakang; seats **3A** and **3C** feature visible 3D wheel arch protrusions (*spakbor*), while **3B** retains flat center legroom.
- **Executive Detailing & Compact Spec HUD:**
  - Winged headrest cushions with 135° recline indicators.
  - Dual integrated foldable armrests and folded ottoman footrests.
  - Illuminated curbside side-step with *"TransFlow VIP"* sill plate.
  - Real-time 4-column seat inspector HUD displaying ergonomics, Nappa leather upholstery, floor clearance, and USB-C 65W PD fast-charging.

### 4. 🛰️ Live Corridor Telemetry & Tol Cipularang Dynamic ETA (MCP + RAG)
- **Model Context Protocol (MCP Tools):**
  - `get_corridor_telemetry`: Real-time telematics querying congestion levels, average speeds, and weather across the Pasteur – Cipularang – Japek – Cawang corridor.
  - `calculate_dynamic_eta`: Dynamic arrival time computation incorporating live traffic bottlenecks, weather slowdowns, and mandatory 15-minute rest area breaks.
- **Grounded Statutory Policies & Automotive SOPs:**
  - **`TF-SOP-TOLL-01` (Toll Routing & MBZ Clearance):** Toyota HiAce Premio body height (2.28m) exceeds the 2.10m MBZ elevated gantry limit; shuttle is strictly routed via the lower Jakarta–Cikampek expressway.
  - **`TF-SOP-REST-02` (Rest Area SOP):** Scheduled 15-minute comfort stops at Rest Area KM 72A (Jakarta-bound) or KM 97/88B (Bandung-bound).
  - **`TF-SOP-WEATHER-03` (Extreme Weather Safety):** Strict 60 km/h speed limit enforcement during heavy rain and fog on sharp descents between KM 90–100 Cipularang.
- **Interactive Traffic Simulator:** Instant switching between *Normal (Lancar)*, *Macet KM 92 (+35m)*, and *Hujan & Contraflow (+50m)* with real-time ETA updates on the schedule picker.

### 5. 💬 Executive Floating AI Concierge
- Modern bottom-right floating drawer (`fixed bottom-6 right-6`).
- Quick-action contextual chips (🛞 *Bebas Ban*, 🧳 *Aturan Bagasi 24"*, 🔄 *Reschedule 2 Jam*, 🚦 *Cek Macet Tol*, 🌉 *Portal MBZ*).
- Anti-AI-slop design: Clean, professional passenger experience with grounded policy citations and zero intrusive debug dumps.

### 6. 🎛️ Slide-Over Telemetry Inspector Drawer
- Elegant slide-over overlay from the right edge with clear close buttons (`✕`).
- Preserves passenger page layout without pushing content downwards.

---

## 🛠️ Tech Stack
- **Framework:** [Next.js 15 App Router](https://nextjs.org/) (React 19)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS ESM
- **Architecture:** Feature-Sliced Design (FSD)
- **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF) (dynamic client-side chunk loading)
- **Icons:** [Lucide React](https://lucide.dev/)
- **AI Tooling:** Model Context Protocol (MCP) + Grounded RAG Policies

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/transflow-ai.git
cd transflow-ai

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Production Build & Typecheck

```bash
# Verify TypeScript types
npx tsc --noEmit

# Build production bundle
npm run build

# Start production server
npm start
```

---

## 📄 License
MIT License. Crafted as an enterprise-grade AI Engineering & Concurrency Showcase.
