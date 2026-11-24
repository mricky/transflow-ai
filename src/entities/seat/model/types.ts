export type SeatStatus = "available" | "held" | "booked" | "selected";

export type WheelRelation = "BEBAS_BAN" | "DI_ATAS_BAN" | "DEKAT_BAN_DEPAN";

export interface CabinSeat {
  id: string;
  name: string;
  row: string;
  position: "window" | "aisle" | "middle" | "front";
  status: SeatStatus;
  price: number;
  pitch: string;
  wheelRelation: WheelRelation;
  wheelNote: string;
  features: string[];
}
