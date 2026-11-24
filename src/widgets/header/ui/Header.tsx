"use client";

import React from "react";
import { Bus, Terminal, AlertCircle } from "lucide-react";
import { useBooking } from "@/shared/lib/booking-context";

export function Header() {
  const { showTelemetry, setShowTelemetry, simulateConflictMode, isOptimisticPending } = useBooking();

  return (
    <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0D121F] sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 flex items-center justify-center font-bold shadow-xs">
            <Bus className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                TransFlow
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                HiAce VIP Fleet
              </span>
              {simulateConflictMode && (
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 animate-pulse">
                  Rollback Test Active
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Autonomous Intercity Shuttle • FSD & Optimistic UI Architecture
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {isOptimisticPending && (
            <span className="hidden md:inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
              <span>Syncing Atomic Lock...</span>
            </span>
          )}

          <button
            onClick={() => setShowTelemetry(!showTelemetry)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition cursor-pointer ${
              showTelemetry 
                ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-transparent shadow-xs" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-emerald-500" />
            <span>Concurrency & Rollback Engine</span>
          </button>
        </div>
      </div>
    </header>
  );
}
