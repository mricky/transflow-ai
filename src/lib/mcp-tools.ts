export interface McpToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, { type: string; description: string; enum?: string[] }>;
    required: string[];
  };
}

export const MCP_TOOL_DEFINITIONS: McpToolDefinition[] = [
  {
    name: "search_routes_and_trips",
    description: "Query available executive shuttle schedules between transit pools with live seat counters.",
    parameters: {
      type: "object",
      properties: {
        originPool: {
          type: "string",
          description: "Departure terminal pool",
          enum: ["BANDUNG_BALTOS", "BANDUNG_PASTEUR", "BANDUNG_BUAHBATU"]
        },
        destinationPool: {
          type: "string",
          description: "Arrival terminal pool",
          enum: ["JAKARTA_BLORA", "JAKARTA_BEKASI", "BANDARA_SOETTA"]
        },
        departureDate: {
          type: "string",
          description: "Travel date format YYYY-MM-DD"
        }
      },
      required: ["originPool", "destinationPool", "departureDate"]
    }
  },
  {
    name: "inspect_seat_map",
    description: "Inspect real-time cabin layout of Toyota HiAce Premio VIP fleet and seat availability.",
    parameters: {
      type: "object",
      properties: {
        tripId: {
          type: "string",
          description: "Unique trip identifier, e.g. TRIP-0800"
        }
      },
      required: ["tripId"]
    }
  },
  {
    name: "hold_seat_atomic",
    description: "Atomically lock a seat with 10-minute TTL using distributed lock (anti-race condition).",
    parameters: {
      type: "object",
      properties: {
        tripId: { type: "string", description: "Trip ID" },
        seatNo: { type: "string", description: "Seat number (e.g. 1A, 1B, 2A, 2B, 3A, 3B, 3C, F1)" },
        passengerSession: { type: "string", description: "Unique session ID of the passenger" }
      },
      required: ["tripId", "seatNo"]
    }
  },
  {
    name: "calculate_fare",
    description: "Compute total fare including seat tier, taxes, and potential flash sale promotions.",
    parameters: {
      type: "object",
      properties: {
        baseFare: { type: "number", description: "Base trip fare" },
        seatTier: { type: "string", description: "CAPTAIN | BENCH | FRONT" },
        passengerCount: { type: "number", description: "Number of passengers" }
      },
      required: ["baseFare", "seatTier", "passengerCount"]
    }
  },
  {
    name: "issue_boarding_pass",
    description: "Execute row-level pessimistic lock, transition status to CONFIRMED, and emit digital boarding pass.",
    parameters: {
      type: "object",
      properties: {
        holdToken: { type: "string", description: "Active hold token from hold_seat_atomic" },
        passengerName: { type: "string", description: "Full legal passenger name" },
        passengerPhone: { type: "string", description: "WhatsApp phone number" }
      },
      required: ["holdToken", "passengerName", "passengerPhone"]
    }
  },
  {
    name: "get_corridor_telemetry",
    description: "Query real-time sensor telematics for Bandung-Jakarta tollway corridor (Cipularang KM 92, Japek, Rest Area stops, and MBZ gantry clearance).",
    parameters: {
      type: "object",
      properties: {
        corridor: {
          type: "string",
          description: "Corridor identifier, e.g. CIPULARANG_JAPEK"
        },
        direction: {
          type: "string",
          description: "BANDUNG_TO_JAKARTA | JAKARTA_TO_BANDUNG"
        }
      },
      required: ["corridor"]
    }
  },
  {
    name: "calculate_dynamic_eta",
    description: "Compute dynamic estimated time of arrival (ETA) incorporating live traffic bottlenecks, weather precipitation slowdowns, and mandatory 15-minute rest area breaks.",
    parameters: {
      type: "object",
      properties: {
        departureTime: { type: "string", description: "Scheduled departure time, e.g. 08:00 WIB" },
        trafficDelayMinutes: { type: "number", description: "Current delay in minutes from telemetry feed" },
        includeRestAreaStop: { type: "boolean", description: "Whether to include 15-minute rest area break" }
      },
      required: ["departureTime", "trafficDelayMinutes"]
    }
  }
];

export interface McpExecutionLog {
  timestamp: string;
  tool: string;
  args: Record<string, any>;
  result: Record<string, any>;
  durationMs: number;
  status: "SUCCESS" | "CONFLICT_409" | "ERROR";
}
