"use client";

import React from "react";
import { useBooking } from "@/shared/lib/booking-context";

export function SchedulePickerWidget() {
  const {
    hasSearched,
    departureDate,
    originPool,
    destinationPool,
    schedules,
    selectedTripId,
    setSelectedTripId,
    getDynamicEta,
    corridorTelemetry
  } = useBooking();

  if (!hasSearched) return null;

  return (
    <section className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono">
            Jadwal Tersedia ({departureDate})
          </h2>
          <p className="text-xs text-slate-500">
            {originPool.split(" - ")[1]} ➔ {destinationPool.split(" - ")[1]} • Toyota HiAce Premio Executive VIP
          </p>
        </div>

        {/* Live Corridor Status Pill */}
        <div className="flex items-center space-x-2">
          <div className={`text-xs font-mono font-medium px-3 py-1 rounded-full border flex items-center space-x-1.5 shadow-2xs ${
            corridorTelemetry.status === "NORMAL"
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
              : corridorTelemetry.status === "CONGESTED_KM92"
              ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
              : "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
          }`}>
            <span className={`h-2 w-2 rounded-full ${
              corridorTelemetry.status === "NORMAL" ? "bg-emerald-500" : "bg-amber-500 animate-ping"
            }`}></span>
            <span>Tol Cipularang: {corridorTelemetry.statusLabel}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {schedules.map((item) => {
          const isSelected = item.id === selectedTripId;
          const dynamicEta = getDynamicEta(item);

          return (
            <div
              key={item.id}
              onClick={() => setSelectedTripId(item.id)}
              className={`p-4 rounded-xl border text-left transition cursor-pointer relative ${
                isSelected
                  ? "bg-slate-900 dark:bg-slate-800 text-white border-slate-900 dark:border-slate-700 shadow-md"
                  : "bg-white dark:bg-[#101625] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200"
              }`}
            >
              {item.isPopular && (
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  isSelected 
                    ? "bg-amber-400 text-slate-950" 
                    : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                }`}>
                  Favorit
                </span>
              )}

              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold tracking-tight font-mono">{item.time}</span>
                <span className={`text-xs ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                  s/d {dynamicEta.arrivalTime} WIB
                </span>
              </div>

              {/* Dynamic ETA Delay Pill */}
              <div className="mt-1 flex items-center space-x-1.5">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center space-x-1 ${
                  dynamicEta.isDelayed
                    ? isSelected 
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" 
                      : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                    : isSelected 
                      ? "bg-emerald-500/20 text-emerald-300" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}>
                  <span>{dynamicEta.isDelayed ? "⚠️ " + dynamicEta.delayText : "⚡ Tol Lancar (2j 45m)"}</span>
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-200/20 dark:border-slate-700/50">
                <div>
                  <p className={`text-[10px] uppercase font-mono ${isSelected ? "text-slate-400" : "text-slate-400"}`}>
                    Tarif Tiket
                  </p>
                  <p className="font-bold font-mono">
                    Rp{item.fare.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                    item.availableSeats <= 2
                      ? isSelected ? "bg-red-500/30 text-red-200" : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                      : isSelected ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  }`}>
                    Sisa {item.availableSeats} Kursi
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
