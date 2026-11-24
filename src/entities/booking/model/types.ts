export interface BookingHold {
  holdToken: string;
  tripId: string;
  seatId: string;
  passengerName: string;
  passengerPhone: string;
  heldAt: string;
  expiresAt: string;
  totalAmountIdr: number;
  status: "HELD" | "CONFIRMED" | "EXPIRED";
  idempotencyKey: string;
}

export interface BoardingPassData {
  ticketNumber: string;
  bookingRef: string;
  tripId: string;
  origin: string;
  destination: string;
  departureTime: string;
  departureDate: string;
  seatNumber: string;
  seatCategory: string;
  passengerName: string;
  passengerPhone: string;
  totalFareIdr: number;
  plateNumber: string;
  qrPayload: string;
  lockTimestamp: string;
}
