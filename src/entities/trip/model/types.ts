export interface ScheduleItem {
  id: string;
  time: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  fare: number;
  availableSeats: number;
  plateNumber: string;
  isPopular?: boolean;
}
