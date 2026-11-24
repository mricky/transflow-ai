export type TrafficStatus = "NORMAL" | "CONGESTED_KM92" | "RAIN_CONTRAFLOW";

export interface RestAreaFacility {
  km: string;
  name: string;
  facilities: string[];
  recommendedBreakMinutes: number;
}

export interface CorridorTelemetryData {
  routeId: string;
  routeName: string;
  status: TrafficStatus;
  statusLabel: string;
  delayMinutes: number;
  averageSpeedKmh: number;
  weather: {
    condition: "Cerah / Kering" | "Hujan Ringan" | "Hujan Lebat & Kabut";
    temperatureC: number;
    visibilityKm: number;
  };
  bottlenecks: Array<{
    segment: string;
    description: string;
    actionProtocol: string;
  }>;
  restAreaStops: RestAreaFacility[];
  mbzClearanceNote: string;
  lastUpdated: string;
}
