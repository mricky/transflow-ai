"use client";

import React from "react";
import { ShieldCheck, Play, ToggleLeft, ToggleRight, RotateCcw, X, Terminal, Cpu } from "lucide-react";
import { useBooking } from "@/shared/lib/booking-context";

export function TelemetryInspectorWidget() {
  const {
    showTelemetry,
    setShowTelemetry,
    selectedTripId,
    selectedSeatId,
    holdSecondsLeft,
    formatTimer,
    simulateConflictMode,
    setSimulateConflictMode,
    isSimulatingStress,
    stressLogs,
    stressResults,
    runFlashSaleStressTest,
    conflictError,
    clearConflictError,
    trafficCondition,
    setTrafficCondition,
    corridorTelemetry
  } = useBooking();

  if (!showTelemetry) return null;

  return (
    <>
      {/* Semi-transparent Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 animate-in fade-in duration-200"
        onClick={() => setShowTelemetry(false)}
      />

      {/* Slide-Over Drawer Container (From Right) */}
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] bg-slate-950 border-l border-slate-800 text-slate-200 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col text-xs font-mono animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white tracking-tight">Concurrency & Telemetry Engine</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Atomic Distributed Lock (TTL 600s) • Feature-Sliced Design
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowTelemetry(false)}
            title="Tutup Drawer"
            className="h-8 w-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer border border-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Action Simulator Controls */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Simulasi Anti-Race Condition</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {/* Toggle Simulate Conflict Mode */}
              <button
                onClick={() => setSimulateConflictMode(!simulateConflictMode)}
                className={`flex-1 px-3 py-2 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                  simulateConflictMode
                    ? "bg-amber-500/20 text-amber-300 border-amber-500 shadow-sm"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {simulateConflictMode ? (
                  <ToggleRight className="h-4 w-4 text-amber-400" />
                ) : (
                  <ToggleLeft className="h-4 w-4 text-slate-500" />
                )}
                <span>Uji Konflik (409): {simulateConflictMode ? "ON" : "OFF"}</span>
              </button>

              {/* Stress Test Action Button */}
              <button
                disabled={isSimulatingStress}
                onClick={runFlashSaleStressTest}
                className="flex-1 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <Play className="h-3 w-3 fill-white" />
                <span>{isSimulatingStress ? "50 Request Berjalan..." : "Flash Sale Test (50 Req)"}</span>
              </button>
            </div>
          </div>

          {/* Optimistic Conflict Banner if active */}
          {conflictError && (
            <div className="p-3.5 rounded-xl bg-amber-950/80 border border-amber-600/80 text-amber-200 flex items-start justify-between gap-3 animate-in shake">
              <div className="flex items-start space-x-2">
                <RotateCcw className="h-4 w-4 text-amber-400 shrink-0 mt-0.5 animate-spin" />
                <div>
                  <p className="font-bold text-amber-300">Rollback Status Berhasil Dieksekusi</p>
                  <p className="text-[11px] text-amber-200/90 mt-0.5">{conflictError}</p>
                </div>
              </div>
              <button
                onClick={clearConflictError}
                className="px-2 py-0.5 rounded bg-amber-900/80 hover:bg-amber-800 text-amber-200 text-[10px] shrink-0 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          )}

          {/* Live Key Status & Metrics */}
          <div className="grid grid-cols-2 gap-2.5 text-[11px]">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-slate-400 text-[10px] uppercase">Active Lock Key</p>
              <p className="font-bold text-white truncate mt-0.5">seat_lock:{selectedTripId}:{selectedSeatId}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-slate-400 text-[10px] uppercase">Lock Expiry (TTL)</p>
              <p className="font-bold text-amber-400 mt-0.5">{formatTimer(holdSecondsLeft)} tersisa</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-slate-400 text-[10px] uppercase">Optimistic State</p>
              <p className="font-bold text-cyan-400 mt-0.5">Zero-Latency Sync</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-slate-400 text-[10px] uppercase">Architecture</p>
              <p className="font-bold text-emerald-400 mt-0.5">FSD Uni-Directional</p>
            </div>
          </div>

          {/* Live Corridor Telemetry & Simulator Control */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider">
                  Kondisi Lalu Lintas Tol & ETA
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setTrafficCondition("NORMAL")}
                className={`flex-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition cursor-pointer text-center ${
                  trafficCondition === "NORMAL"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                🟢 Normal (Lancar)
              </button>
              <button
                onClick={() => setTrafficCondition("CONGESTED_KM92")}
                className={`flex-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition cursor-pointer text-center ${
                  trafficCondition === "CONGESTED_KM92"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                🟡 Macet (+35m)
              </button>
              <button
                onClick={() => setTrafficCondition("RAIN_CONTRAFLOW")}
                className={`flex-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition cursor-pointer text-center ${
                  trafficCondition === "RAIN_CONTRAFLOW"
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                🔴 Hujan (+50m)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] pt-1">
              <div className="p-2 rounded-lg bg-black/40 border border-slate-800">
                <span className="text-slate-400">Sensor Cuaca:</span>
                <p className="font-bold text-white mt-0.5">{corridorTelemetry.weather.condition}</p>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-slate-800">
                <span className="text-slate-400">Rute Layang MBZ:</span>
                <p className="font-bold text-amber-300 mt-0.5">HiAce 2.28m ➔ Tol Bawah</p>
              </div>
            </div>
          </div>

          {/* Simulator Output Terminal */}
          {stressLogs.length > 0 && (
            <div className="p-3.5 rounded-xl bg-black border border-slate-800 text-[11px] space-y-1.5 max-h-56 overflow-y-auto">
              <div className="text-slate-400 font-bold pb-1 border-b border-slate-900 flex items-center justify-between text-[10px]">
                <span>TERMINAL LOG: CONCURRENCY RACE CONDITION ENGINE</span>
                {stressResults && (
                  <span className="text-emerald-400">
                    OK: {stressResults.success} | 409: {stressResults.conflicts}
                  </span>
                )}
              </div>
              {stressLogs.map((log, i) => (
                <p key={i} className={log.includes("200 OK") ? "text-emerald-400 font-bold" : log.includes("409 CONFLICT") ? "text-red-400" : "text-slate-400"}>
                  {log}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>TransFlow Anti-Race Engine v1.0</span>
          <button
            onClick={() => setShowTelemetry(false)}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold cursor-pointer transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </>
  );
}
