export type SeatStatus = "AVAILABLE" | "HELD" | "BOOKED";

export type SeatCategory = 
  | "FRONT_CABIN" 
  | "CAPTAIN_SEAT_WINDOW" 
  | "CAPTAIN_SEAT_AISLE" 
  | "EXECUTIVE_BENCH";

export interface Seat {
  seatNo: string;
  category: SeatCategory;
  label: string;
  status: SeatStatus;
  heldBy?: string;
  heldUntil?: number; // timestamp
  priceIdr: number;
  features: string[];
}

export interface TripSchedule {
  id: string;
  originPool: string;
  originCity: string;
  destinationPool: string;
  destinationCity: string;
  departureTime: string;
  arrivalTime: string;
  fleetType: "Toyota HiAce Premio Executive VIP (8-Seat)";
  plateNumber: string;
  baseFareIdr: number;
  availableSeatsCount: number;
  seats: Seat[];
}

export interface BookingHold {
  holdToken: string;
  tripId: string;
  seatNo: string;
  passengerName: string;
  passengerPhone: string;
  heldAt: string;
  expiresAt: string; // 10 minutes TTL
  totalAmountIdr: number;
  status: "HELD" | "CONFIRMED" | "EXPIRED";
}

export interface PolicyDocument {
  id: string;
  title: string;
  category: "baggage" | "pool_location" | "refund_reschedule" | "pet_policy";
  content: string;
  citations: string;
}

export interface ConcurrencyMetric {
  activeHolds: number;
  raceConditionAttemptsBlocked: number;
  avgLockLatencyMs: number;
  throughputQps: number;
}
