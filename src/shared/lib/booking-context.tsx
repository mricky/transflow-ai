"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CabinSeat } from "@/entities/seat/model/types";
import { ScheduleItem } from "@/entities/trip/model/types";
import { searchRagPolicies } from "@/entities/policy/model/policies";
import { generateBoardingPassPdf, BoardingPassData } from "@/lib/pdf-ticket";
import { TrafficStatus, CorridorTelemetryData } from "@/entities/traffic/model/types";

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  time: string;
  mcpToolCall?: {
    tool: string;
    args: Record<string, any>;
    status: "COMPLETED" | "RUNNING" | "ROLLED_BACK";
  };
  ragCitation?: {
    docId: string;
    title: string;
    snippet: string;
  };
}

export const INITIAL_SCHEDULES: ScheduleItem[] = [
  {
    id: "TRIP-0600",
    time: "06:00",
    arrivalTime: "08:45",
    origin: "Baltos Tamansari",
    destination: "Blora Sudirman",
    fare: 130000,
    availableSeats: 2,
    plateNumber: "D 7102 TRAN"
  },
  {
    id: "TRIP-0800",
    time: "08:00",
    arrivalTime: "10:45",
    origin: "Baltos Tamansari",
    destination: "Blora Sudirman",
    fare: 135000,
    availableSeats: 4,
    plateNumber: "D 7120 TRAN",
    isPopular: true
  },
  {
    id: "TRIP-1130",
    time: "11:30",
    arrivalTime: "14:15",
    origin: "Baltos Tamansari",
    destination: "Blora Sudirman",
    fare: 130000,
    availableSeats: 6,
    plateNumber: "D 7155 TRAN"
  },
  {
    id: "TRIP-1500",
    time: "15:00",
    arrivalTime: "18:00",
    origin: "Baltos Tamansari",
    destination: "Blora Sudirman",
    fare: 140000,
    availableSeats: 1,
    plateNumber: "D 7188 TRAN"
  }
];

export const INITIAL_SEATS: CabinSeat[] = [
  { 
    id: "F1", 
    name: "F1 Depan", 
    row: "Front", 
    position: "front", 
    status: "available", 
    price: 130000, 
    pitch: "100 cm", 
    wheelRelation: "DEKAT_BAN_DEPAN",
    wheelNote: "Dekat Rumah Ban Depan Kiri (Pijakan agak tinggi)",
    features: ["Samping Sopir", "Pandangan Depan Luas", "Akses Pintu Depan"] 
  },
  { 
    id: "1A", 
    name: "1A Captain", 
    row: "Row 1", 
    position: "window", 
    status: "selected", 
    price: 135000, 
    pitch: "110 cm", 
    wheelRelation: "BEBAS_BAN",
    wheelNote: "100% Lantai Rata (Bebas Gundukan Ban)",
    features: ["Captain Recliner", "Jendela Kiri", "Legroom 110cm", "USB-C Fast Charge"] 
  },
  { 
    id: "1B", 
    name: "1B Captain", 
    row: "Row 1", 
    position: "window", 
    status: "available", 
    price: 135000, 
    pitch: "110 cm", 
    wheelRelation: "BEBAS_BAN",
    wheelNote: "100% Lantai Rata (Bebas Gundukan Ban)",
    features: ["Captain Recliner", "Dekat Pintu Geser", "Akses Cepat Keluar"] 
  },
  { 
    id: "2A", 
    name: "2A Captain", 
    row: "Row 2", 
    position: "window", 
    status: "available", 
    price: 135000, 
    pitch: "108 cm", 
    wheelRelation: "BEBAS_BAN",
    wheelNote: "100% Lantai Rata (Di Depan Ban Belakang)",
    features: ["Captain Recliner", "Jendela Kiri", "Paling Senyap"] 
  },
  { 
    id: "2B", 
    name: "2B Captain", 
    row: "Row 2", 
    position: "window", 
    status: "booked", 
    price: 135000, 
    pitch: "108 cm", 
    wheelRelation: "BEBAS_BAN",
    wheelNote: "100% Lantai Rata (Di Depan Ban Belakang)",
    features: ["Captain Recliner", "Jendela Kanan"] 
  },
  { 
    id: "3A", 
    name: "3A Bench", 
    row: "Row 3", 
    position: "window", 
    status: "available", 
    price: 125000, 
    pitch: "95 cm", 
    wheelRelation: "DI_ATAS_BAN",
    wheelNote: "Tepat di Atas Spakbor Ban Belakang Kiri",
    features: ["Executive Bench", "Sudut Kiri", "Dekat Bagasi"] 
  },
  { 
    id: "3B", 
    name: "3B Bench", 
    row: "Row 3", 
    position: "middle", 
    status: "available", 
    price: 120000, 
    pitch: "95 cm", 
    wheelRelation: "BEBAS_BAN",
    wheelNote: "Lantai Tengah Rata (Di Antara Kedua Ban)",
    features: ["Executive Bench", "Posisi Tengah Rata"] 
  },
  { 
    id: "3C", 
    name: "3C Bench", 
    row: "Row 3", 
    position: "window", 
    status: "held", 
    price: 125000, 
    pitch: "95 cm", 
    wheelRelation: "DI_ATAS_BAN",
    wheelNote: "Tepat di Atas Spakbor Ban Belakang Kanan",
    features: ["Executive Bench", "Sudut Kanan", "Terkunci Pengguna Lain"] 
  },
];

export const CORRIDOR_TELEMETRY_PRESETS: Record<TrafficStatus, CorridorTelemetryData> = {
  NORMAL: {
    routeId: "CORR-BDG-JKT-01",
    routeName: "Koridor Pasteur - Tol Cipularang - Tol Bawah Japek - Cawang",
    status: "NORMAL",
    statusLabel: "Lancar Hijau (Waktu Tempuh Standar)",
    delayMinutes: 0,
    averageSpeedKmh: 82,
    weather: {
      condition: "Cerah / Kering",
      temperatureC: 28,
      visibilityKm: 10
    },
    bottlenecks: [
      {
        segment: "Tol Cipularang KM 90 - 100",
        description: "Arus lalu lintas lancar terkendali tanpa perlambatan berarti",
        actionProtocol: "Cruising speed optimal 80 - 100 km/jam"
      }
    ],
    restAreaStops: [
      {
        km: "KM 72A",
        name: "Rest Area KM 72A Cipularang",
        facilities: ["Toilet VIP", "Musala AC", "Minimarket", "EV Charging 60kW"],
        recommendedBreakMinutes: 15
      }
    ],
    mbzClearanceNote: "Armada HiAce Premio (Tinggi 2.28m) melintas via Jalur Tol Bawah, aman dari portal batas MBZ 2.10m",
    lastUpdated: "Sensor Telematika Live (Real-Time)"
  },
  CONGESTED_KM92: {
    routeId: "CORR-BDG-JKT-01",
    routeName: "Koridor Pasteur - Tol Cipularang - Tol Bawah Japek - Cawang",
    status: "CONGESTED_KM92",
    statusLabel: "Padat Merayap KM 92 (+35 Menit)",
    delayMinutes: 35,
    averageSpeedKmh: 36,
    weather: {
      condition: "Hujan Ringan",
      temperatureC: 24,
      visibilityKm: 6
    },
    bottlenecks: [
      {
        segment: "Tol Cipularang KM 92.400",
        description: "Penyempitan lajur akibat perbaikan perkerasan & antrean truk muatan berat",
        actionProtocol: "Armada melambat ke 30-40 km/jam, sistem rem pendingin aktif"
      },
      {
        segment: "Gerbang Tol Cikarang Utama",
        description: "Antrean gerbang tol sepanjang 800 meter",
        actionProtocol: "Tap otomatis RFID Flo / e-Toll prioritas"
      }
    ],
    restAreaStops: [
      {
        km: "KM 97",
        name: "Rest Area KM 97 Padalarang",
        facilities: ["Toilet VIP", "Musala AC", "Food Court 24 Jam"],
        recommendedBreakMinutes: 15
      }
    ],
    mbzClearanceNote: "Jalur Tol Bawah padat merayap; sistem menghitung penyesuaian ETA +35 menit secara otomatis",
    lastUpdated: "Sensor Telematika Live (Jasa Marga Traffic API)"
  },
  RAIN_CONTRAFLOW: {
    routeId: "CORR-BDG-JKT-01",
    routeName: "Koridor Pasteur - Tol Cipularang - Tol Bawah Japek - Cawang",
    status: "RAIN_CONTRAFLOW",
    statusLabel: "Hujan Lebat & Rekayasa Contraflow (+50 Menit)",
    delayMinutes: 50,
    averageSpeedKmh: 28,
    weather: {
      condition: "Hujan Lebat & Kabut",
      temperatureC: 21,
      visibilityKm: 2
    },
    bottlenecks: [
      {
        segment: "Cipularang KM 90 - 100",
        description: "Hujan lebat & kabut tebal di turunan tajam; risiko aquaplaning",
        actionProtocol: "Batas kecepatan ketat 60 km/jam sesuai SOP TF-SOP-WEATHER-03"
      },
      {
        segment: "Japek KM 47 - 65",
        description: "Rekayasa 1 lajur Contraflow dibuka Korlantas Polri untuk mengurai kemacetan",
        actionProtocol: "Armada melintas di lajur reguler Tol Bawah dengan lampu hazard keselamatan"
      }
    ],
    restAreaStops: [
      {
        km: "KM 72A",
        name: "Rest Area KM 72A Cipularang",
        facilities: ["Shelter Hujan", "Toilet VIP", "Musala AC"],
        recommendedBreakMinutes: 20
      }
    ],
    mbzClearanceNote: "Tol Layang MBZ ditutup darurat cuaca angin kencang; seluruh kendaraan terkonsentrasi di Tol Bawah",
    lastUpdated: "Emergency Fleet Telematics Warning"
  }
};

export function computeDynamicArrivalTime(
  departureTime: string,
  baseArrivalTime: string,
  delayMinutes: number
): { arrivalTime: string; isDelayed: boolean; delayText: string } {
  if (delayMinutes <= 0) {
    return { arrivalTime: baseArrivalTime, isDelayed: false, delayText: "Lancar (Tepat Waktu)" };
  }
  const [depH, depM] = departureTime.split(":").map(Number);
  const [baseH, baseM] = baseArrivalTime.split(":").map(Number);
  let totalBaseMinutes = (baseH * 60 + baseM) - (depH * 60 + depM);
  if (totalBaseMinutes < 0) totalBaseMinutes += 24 * 60;

  const newTotalMinutes = totalBaseMinutes + delayMinutes;
  const newArrivalTotal = (depH * 60 + depM + newTotalMinutes) % (24 * 60);
  const arrH = Math.floor(newArrivalTotal / 60);
  const arrM = newArrivalTotal % 60;

  const formattedArr = `${arrH.toString().padStart(2, "0")}:${arrM.toString().padStart(2, "0")}`;
  return {
    arrivalTime: formattedArr,
    isDelayed: true,
    delayText: `+${delayMinutes}m Kemacetan`
  };
}

interface BookingContextType {
  // Reservation search state
  originPool: string;
  setOriginPool: (v: string) => void;
  destinationPool: string;
  setDestinationPool: (v: string) => void;
  departureDate: string;
  setDepartureDate: (v: string) => void;
  passengerCount: string;
  setPassengerCount: (v: string) => void;
  handleSwapRoute: () => void;
  hasSearched: boolean;
  setHasSearched: (v: boolean) => void;

  // Schedules
  schedules: ScheduleItem[];
  selectedTripId: string;
  setSelectedTripId: (v: string) => void;
  selectedTripObj: ScheduleItem;

  // Cabin Seats & Optimistic UI
  seats: CabinSeat[];
  selectedSeatId: string;
  selectedSeatObj: CabinSeat;
  isHeld: boolean;
  holdSecondsLeft: number;
  formatTimer: (secs: number) => string;
  selectSeatOptimistic: (seat: CabinSeat, triggeredByAi?: boolean) => void;
  isOptimisticPending: boolean;
  conflictError: string | null;
  clearConflictError: () => void;
  simulateConflictMode: boolean;
  setSimulateConflictMode: (v: boolean) => void;

  // Telemetry & Stress Test
  showTelemetry: boolean;
  setShowTelemetry: (v: boolean) => void;
  isSimulatingStress: boolean;
  stressLogs: string[];
  stressResults: { success: number; conflicts: number } | null;
  runFlashSaleStressTest: () => void;

  // Live Corridor Telemetry & Traffic Simulator
  trafficCondition: TrafficStatus;
  setTrafficCondition: (v: TrafficStatus) => void;
  corridorTelemetry: CorridorTelemetryData;
  getDynamicEta: (schedule: ScheduleItem) => { arrivalTime: string; isDelayed: boolean; delayText: string };

  // AI Concierge
  chatInput: string;
  setChatInput: (v: string) => void;
  chatMessages: ChatMessage[];
  handleSendMessage: (textToSend?: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (v: boolean) => void;

  // Checkout & PDF
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (v: boolean) => void;
  passengerName: string;
  setPassengerName: (v: string) => void;
  passengerPhone: string;
  setPassengerPhone: (v: string) => void;
  isPaymentConfirmed: boolean;
  setIsPaymentConfirmed: (v: boolean) => void;
  handleDownloadTicket: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  // Form State
  const [originPool, setOriginPool] = useState("Bandung - Baltos (Tamansari)");
  const [destinationPool, setDestinationPool] = useState("Jakarta - Blora Sudirman");
  const [departureDate, setDepartureDate] = useState("2026-11-24");
  const [passengerCount, setPassengerCount] = useState("1");
  const [hasSearched, setHasSearched] = useState(true);

  // Trips
  const [schedules] = useState<ScheduleItem[]>(INITIAL_SCHEDULES);
  const [selectedTripId, setSelectedTripId] = useState("TRIP-0800");

  // Seats & Hold
  const [seats, setSeats] = useState<CabinSeat[]>(INITIAL_SEATS);
  const [selectedSeatId, setSelectedSeatId] = useState<string>("1A");
  const [isHeld, setIsHeld] = useState(true);
  const [holdSecondsLeft, setHoldSecondsLeft] = useState(590);

  // Optimistic UI Rollback state
  const [isOptimisticPending, setIsOptimisticPending] = useState(false);
  const [conflictError, setConflictError] = useState<string | null>(null);
  const [simulateConflictMode, setSimulateConflictMode] = useState(false);

  // Telemetry
  const [showTelemetry, setShowTelemetry] = useState(false);
  const [isSimulatingStress, setIsSimulatingStress] = useState(false);
  const [stressLogs, setStressLogs] = useState<string[]>([]);
  const [stressResults, setStressResults] = useState<{ success: number; conflicts: number } | null>(null);

  // Traffic Telemetry & Simulator
  const [trafficCondition, setTrafficCondition] = useState<TrafficStatus>("NORMAL");
  const corridorTelemetry = CORRIDOR_TELEMETRY_PRESETS[trafficCondition];

  const getDynamicEta = (schedule: ScheduleItem) => {
    return computeDynamicArrivalTime(schedule.time, schedule.arrivalTime, corridorTelemetry.delayMinutes);
  };

  // Checkout
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [passengerName, setPassengerName] = useState("Ahmad Fauzi");
  const [passengerPhone, setPassengerPhone] = useState("081298765432");
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  // Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Halo! Saya TransFlow AI Concierge. Sistem siap dengan arsitektur Feature-Sliced Design (FSD), Model Context Protocol (MCP), dan Optimistic UI Rollback berkecepatan tinggi.",
      time: "08:30",
      mcpToolCall: {
        tool: "inspect_seat_map",
        args: { tripId: "TRIP-0800", architecture: "FSD_OPTIMISTIC_LOCK" },
        status: "COMPLETED"
      }
    }
  ]);

  // Hold Timer countdown
  useEffect(() => {
    if (!isHeld || holdSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setHoldSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isHeld, holdSecondsLeft]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSwapRoute = () => {
    const temp = originPool;
    setOriginPool(destinationPool);
    setDestinationPool(temp);
  };

  const clearConflictError = () => {
    setConflictError(null);
  };

  /**
   * OPTIMISTIC UI WITH AUTOMATIC ROLLBACK HANDLER
   * 1. Instantly update UI (0ms latency)
   * 2. Send lock acquisition request to anti-race engine
   * 3. If rejected (e.g. simulated conflict or race collision): Rollback to previous state immediately!
   */
  const selectSeatOptimistic = (targetSeat: CabinSeat, triggeredByAi = false) => {
    if (targetSeat.status === "booked" || targetSeat.status === "held") return;

    // Snapshot previous state for rollback
    const previousSeats = [...seats];
    const previousSelectedId = selectedSeatId;
    const previousHoldTimer = holdSecondsLeft;

    // Step 1: Optimistic Update (Immediate user feedback)
    setSelectedSeatId(targetSeat.id);
    setSeats(prev => prev.map(s => {
      if (s.id === targetSeat.id) return { ...s, status: "selected" };
      if (s.status === "selected") return { ...s, status: "available" };
      return s;
    }));
    setIsHeld(true);
    setHoldSecondsLeft(600);
    setIsOptimisticPending(true);
    clearConflictError();

    // Step 2: Atomic Handshake with Anti-Race-Condition Engine
    setTimeout(() => {
      if (simulateConflictMode) {
        // SIMULATED RACE CONDITION COLLISION (HTTP 409 CONFLICT)
        // Step 3: Execute Rollback!
        setSelectedSeatId(previousSelectedId);
        setSeats(previousSeats.map(s => {
          // The contested seat was claimed by another user!
          if (s.id === targetSeat.id) return { ...s, status: "held" as const };
          return s;
        }));
        setHoldSecondsLeft(previousHoldTimer);
        setIsOptimisticPending(false);

        const errorMsg = `[OPTIMISTIC ROLLBACK TRIGGERED] HTTP 409 Conflict: Kursi ${targetSeat.name} baru saja dikunci oleh session lain 1ms lebih awal! Sistem otomatis melakukan rollback status kursi Anda.`;
        setConflictError(errorMsg);

        setChatMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: `⚠️ Peringatan Race Condition Terdeteksi! Kursi ${targetSeat.name} gagal dikunci karena pengguna lain mengklaimnya bersamaan. Status kursi berhasil di-rollback ke kondisi aman. Silakan pilih kursi lain yang berstatus tersedia.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            mcpToolCall: {
              tool: "hold_seat_atomic",
              args: { seatId: targetSeat.id, error: "HTTP_409_CONFLICT" },
              status: "ROLLED_BACK"
            }
          }
        ]);
        return;
      }

      // Lock successfully acquired (Normal Flow)
      setIsOptimisticPending(false);

      if (!triggeredByAi) {
        let wheelComment = "";
        if (targetSeat.wheelRelation === "BEBAS_BAN") {
          wheelComment = "✅ Kursi ini berada di area lantai rata tanpa gundukan spakbor ban (sangat nyaman untuk meregangkan kaki).";
        } else if (targetSeat.wheelRelation === "DI_ATAS_BAN") {
          wheelComment = "⚠️ Catatan: Posisi kursi ini berada tepat di atas spakbor ban belakang, sehingga lantai sedikit terangkat.";
        } else {
          wheelComment = "ℹ️ Kursi depan berada dekat sumbu roda depan dengan pandangan langsung ke kaca depan.";
        }

        setChatMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: `Anda memilih Kursi ${targetSeat.name}. ${wheelComment} Legroom: ${targetSeat.pitch}. Fasilitas: ${targetSeat.features.join(", ")}. Atomic Lock berhasil diverifikasi (TTL 10 Menit).`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            mcpToolCall: {
              tool: "hold_seat_atomic",
              args: { tripId: selectedTripId, seatNo: targetSeat.id, wheelPosition: targetSeat.wheelRelation, ttlSeconds: 600 },
              status: "COMPLETED"
            }
          }
        ]);
      }
    }, 350);
  };

  // Chat Concierge Handler
  const handleSendMessage = (textToSend?: string) => {
    const message = textToSend || chatInput;
    if (!message.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [
      ...prev,
      { sender: "user", text: message, time: userTime }
    ]);
    if (!textToSend) setChatInput("");

    const ragResult = searchRagPolicies(message);

    setTimeout(() => {
      let botResponse = "";
      let mcpTool: { tool: string; args: Record<string, any>; status: "COMPLETED" | "RUNNING" } | undefined = undefined;
      let targetSeatId = "";

      const lower = message.toLowerCase();

      if (lower.includes("ban") || lower.includes("roda") || lower.includes("gundukan") || lower.includes("spakbor") || lower.includes("rata")) {
        botResponse = `Analisis Posisi Roda Kabin Toyota HiAce Premio:\n• Kursi BEBAS BAN (Lantai 100% Rata): Kursi 1A, 1B, 2A, dan 2B (Semua Captain Seat). Posisi ini paling nyaman karena tidak ada tonjolan spakbor roda sama sekali.\n• Kursi DI ATAS BAN BELAKANG: Kursi 3A (kiri) dan 3C (kanan). Lantainya sedikit terangkat mengikuti lekukan rumah roda belakang.\n• Kursi F1: Berada di samping sopir dekat sumbu ban depan.\n\nSaya rekomendasikan Kursi 1A atau 1B untuk kenyamanan pijakan kaki terbaik.`;
        targetSeatId = "1A";
        mcpTool = {
          tool: "inspect_seat_map",
          args: { filter: "BEBAS_BAN", recommendedSeat: "1A" },
          status: "COMPLETED"
        };
      } else if (lower.includes("koper") || lower.includes("bagasi") || lower.includes("berat")) {
        botResponse = `Berdasarkan kebijakan resmi bagasi TransFlow: Setiap penumpang berhak atas 1 koper gratis (maksimum 24 inci / 20 kg) ditambah 1 tas ransel jinjing ke dalam kabin. Kelebihan muatan dikenakan tarif Rp25.000/kg atau disarankan memesan 1 kursi ekstra.`;
      } else if (lower.includes("jendela") || lower.includes("lega") || lower.includes("kerja") || lower.includes("captain") || lower.includes("nyaman")) {
        botResponse = `Untuk kenyamanan maksimal dan privasi bekerja di laptop, Kursi 1A (Captain Recliner Jendela Kiri) adalah posisi paling direkomendasikan dengan legroom 110 cm, bebas gundukan ban, dan ada soket fast-charge. Saya bantu kunci kursi 1A via MCP.`;
        targetSeatId = "1A";
        mcpTool = {
          tool: "hold_seat_atomic",
          args: { tripId: selectedTripId, seatNo: "1A", passengerSession: "sess_user_live" },
          status: "COMPLETED"
        };
      } else if (lower.includes("pintu") || lower.includes("mabuk") || lower.includes("depan")) {
        botResponse = `Bagi penumpang yang mengutamakan akses cepat keluar atau mudah mabuk perjalanan, Kursi 1B (dekat pintu geser elektrik sisi kiri) atau Kursi F1 (samping sopir) adalah pilihan ideal. Saya arahkan ke Kursi 1B.`;
        targetSeatId = "1B";
        mcpTool = {
          tool: "hold_seat_atomic",
          args: { tripId: selectedTripId, seatNo: "1B", passengerSession: "sess_user_live" },
          status: "COMPLETED"
        };
      } else if (lower.includes("macet") || lower.includes("traffic") || lower.includes("jalan") || lower.includes("lancar") || lower.includes("kondisi") || lower.includes("telemetri")) {
        const telemetry = CORRIDOR_TELEMETRY_PRESETS[trafficCondition];
        botResponse = `📡 Laporan Live Telemetri Koridor Tol Cipularang & Japek:\n• Status Koridor: ${telemetry.statusLabel}\n• Kecepatan Rata-Rata: ${telemetry.averageSpeedKmh} km/jam\n• Estimasi Keterlambatan: +${telemetry.delayMinutes} menit\n• Kondisi Cuaca: ${telemetry.weather.condition} (${telemetry.weather.temperatureC}°C, Jarak Pandang ${telemetry.weather.visibilityKm} km)\n• Titik Perlambatan: ${telemetry.bottlenecks.map(b => b.segment + " - " + b.description).join("; ")}\n\n💡 Catatan Rute: ${telemetry.mbzClearanceNote}`;
        mcpTool = {
          tool: "get_corridor_telemetry",
          args: { corridor: "CIPULARANG_JAPEK", status: trafficCondition, delayMinutes: telemetry.delayMinutes },
          status: "COMPLETED"
        };
      } else if (lower.includes("mbz") || lower.includes("layang") || lower.includes("bawah") || lower.includes("tinggi") || lower.includes("portal") || lower.includes("2.28") || lower.includes("2.1")) {
        botResponse = `Regulasi Rute Tol MBZ vs Tol Bawah (TF-SOP-TOLL-01):\nArmada Toyota HiAce Premio VIP memiliki tinggi bodi 2,28 meter, sedangkan portal pembatas Jalan Layang MBZ dibatasi 2,10 meter khusus kendaraan ceper. Seluruh shuttle TransFlow WAJIB melintas via Jalur Tol Bawah Jakarta-Cikampek demi keselamatan dan keutuhan atap kabin.`;
        mcpTool = {
          tool: "get_corridor_telemetry",
          args: { query: "MBZ_CLEARANCE", vehicleHeight: "2.28m", portalLimit: "2.10m", routing: "JALUR_BAWAH" },
          status: "COMPLETED"
        };
      } else if (lower.includes("rest area") || lower.includes("istirahat") || lower.includes("toilet") || lower.includes("km 72") || lower.includes("km 97") || lower.includes("km 88") || lower.includes("sholat") || lower.includes("musala")) {
        botResponse = `SOP Singgah Rest Area (TF-SOP-REST-02):\nArmada dijadwalkan singgah tepat 15 menit di Rest Area KM 72A (arah Jakarta) atau KM 97/88B (arah Bandung). Tersedia toilet VIP higienis, musala ber-AC, gerai F&B, dan stasiun pengisian daya EV/gadget. Jeda 15 menit sudah diperhitungkan dalam jadwal.`;
        mcpTool = {
          tool: "calculate_dynamic_eta",
          args: { departureTime: selectedTripObj.time, includeRestArea: true, restAreaMinutes: 15 },
          status: "COMPLETED"
        };
      } else if (lower.includes("hujan") || lower.includes("cuaca") || lower.includes("kabut") || lower.includes("turunan") || lower.includes("kecepatan") || lower.includes("km 90")) {
        botResponse = `Protokol Keselamatan Cuaca Ekstrem (TF-SOP-WEATHER-03):\nDi segmen turunan tajam Cipularang KM 90 - 100 saat hujan atau kabut, armada otomatis membatasi laju maksimal 60 km/jam untuk mencegah aquaplaning pada ban komersial 235/65 R16C. Suspensi dan traksi dijaga oleh sistem ABS & VSC aktif.`;
        mcpTool = {
          tool: "get_corridor_telemetry",
          args: { segment: "CIPULARANG_KM90_100", speedLimitMax: "60_KMH", tractionSafety: "ABS_VSC_ENFORCED" },
          status: "COMPLETED"
        };
      } else if (lower.includes("reschedule") || lower.includes("batal") || lower.includes("refund")) {
        botResponse = `Kebijakan perubahan jadwal TransFlow: Reschedule tiket bebas biaya 1x dapat dilakukan minimal 2 jam sebelum keberangkatan. Jika pembatalan dilakukan >6 jam sebelum berangkat, dana dikembalikan 80%. Pembatalan di bawah 2 jam tiket dianggap hangus.`;
      } else if (lower.includes("lokasi") || lower.includes("mrt") || lower.includes("blora") || lower.includes("baltos") || lower.includes("alamat")) {
        botResponse = `Drop point Jakarta Blora Sudirman berada di kawasan Dukuh Atas Sudirman, tepat 50 meter berjalan kaki dari Stasiun MRT Dukuh Atas BNI dan KRL Sudirman. Untuk keberangkatan Bandung Baltos berada di Lobby Lower Ground Balubur Town Square Tamansari.`;
      } else {
        botResponse = `Pertanyaan Anda telah dicocokkan dengan dokumen operasional TransFlow (${ragResult.document.code}). Anda dapat memilih kursi langsung pada denah kabin HiAce Premio VIP di sebelah kiri atau menanyakan hal spesifik lainnya.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          mcpToolCall: mcpTool,
          ragCitation: {
            docId: ragResult.document.code,
            title: ragResult.document.title,
            snippet: ragResult.highlightSnippet
          }
        }
      ]);

      if (targetSeatId) {
        const s = seats.find(item => item.id === targetSeatId);
        if (s && s.status !== "booked" && s.status !== "held") {
          selectSeatOptimistic(s, true);
        }
      }
    }, 500);
  };

  // Flash sale stress test simulator
  const runFlashSaleStressTest = () => {
    setIsSimulatingStress(true);
    setStressLogs(["[INIT] Menyiapkan 50 bot thread konkuren berebut Kursi 1A..."]);
    setStressResults(null);

    setTimeout(() => {
      const logs: string[] = [];
      let successCount = 0;
      let conflictCount = 0;

      logs.push(`[0.002ms] Thread-07 (User_Dimas) -> SETNX seat_lock:TRIP-0800:1A -> ACQUIRED (200 OK)`);
      successCount++;

      for (let i = 1; i <= 15; i++) {
        const threadId = (i < 10 ? "0" : "") + i;
        logs.push(`[0.00${3 + i}ms] Thread-${threadId} (User_Bot_${i}) -> SETNX failed -> HTTP 409 CONFLICT (Lock held by Thread-07)`);
        conflictCount++;
      }
      logs.push(`... [34 thread lainnya otomatis terblokir seketika tanpa double-booking]`);
      conflictCount += 34;
      logs.push(`[SUMMARY] Concurrency test selesai: 1 Berhasil (100%), 49 Terblokir (0% Race Condition Risk).`);

      setStressLogs(logs);
      setStressResults({ success: successCount, conflicts: conflictCount });
      setIsSimulatingStress(false);
    }, 1200);
  };

  // PDF Ticket download
  const handleDownloadTicket = async () => {
    const s = seats.find(seat => seat.id === selectedSeatId) || seats[1];
    const trip = schedules.find(t => t.id === selectedTripId) || schedules[1];

    const ticketData: BoardingPassData = {
      ticketNumber: `TF-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      bookingRef: `TF${trip.id.replace("TRIP-", "")}-${s.id}`,
      tripId: trip.id,
      origin: originPool,
      destination: destinationPool,
      departureTime: trip.time,
      departureDate: departureDate,
      seatNumber: `${s.id} (${s.name})`,
      seatCategory: s.pitch + " Legroom • " + s.wheelNote,
      passengerName: passengerName,
      passengerPhone: passengerPhone,
      totalFareIdr: s.price,
      plateNumber: trip.plateNumber,
      qrPayload: `https://transflow.ai/verify?ref=TF${trip.id}-${s.id}`,
      lockTimestamp: new Date().toISOString()
    };

    await generateBoardingPassPdf(ticketData);
  };

  const selectedSeatObj = seats.find(s => s.id === selectedSeatId) || seats[1];
  const selectedTripObj = schedules.find(s => s.id === selectedTripId) || schedules[1];

  return (
    <BookingContext.Provider
      value={{
        originPool,
        setOriginPool,
        destinationPool,
        setDestinationPool,
        departureDate,
        setDepartureDate,
        passengerCount,
        setPassengerCount,
        handleSwapRoute,
        hasSearched,
        setHasSearched,
        schedules,
        selectedTripId,
        setSelectedTripId,
        selectedTripObj,
        seats,
        selectedSeatId,
        selectedSeatObj,
        isHeld,
        holdSecondsLeft,
        formatTimer,
        selectSeatOptimistic,
        isOptimisticPending,
        conflictError,
        clearConflictError,
        simulateConflictMode,
        setSimulateConflictMode,
        showTelemetry,
        setShowTelemetry,
        isSimulatingStress,
        stressLogs,
        stressResults,
        runFlashSaleStressTest,
        trafficCondition,
        setTrafficCondition,
        corridorTelemetry,
        getDynamicEta,
        chatInput,
        setChatInput,
        chatMessages,
        handleSendMessage,
        isChatOpen,
        setIsChatOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        passengerName,
        setPassengerName,
        passengerPhone,
        setPassengerPhone,
        isPaymentConfirmed,
        setIsPaymentConfirmed,
        handleDownloadTicket
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
