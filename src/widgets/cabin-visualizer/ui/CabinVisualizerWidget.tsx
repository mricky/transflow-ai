"use client";

import React from "react";
import { Armchair, Timer, Lock, Luggage, RotateCcw, Sparkles, Zap } from "lucide-react";
import { useBooking } from "@/shared/lib/booking-context";

export function CabinVisualizerWidget() {
  const {
    selectedTripObj,
    isHeld,
    holdSecondsLeft,
    formatTimer,
    seats,
    selectedSeatObj,
    selectSeatOptimistic,
    isOptimisticPending,
    conflictError,
    clearConflictError,
    setIsCheckoutOpen,
    setIsChatOpen
  } = useBooking();

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-[#101625] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none space-y-6">
      
      {/* Header Info & Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 flex items-center justify-center shadow-xs">
            <Armchair className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Denah Kabin Toyota HiAce Premio VIP
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/20">
                8-Seat Executive
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Posisi Roda Luar R16C, Spakbor Sasis Baris 3, & Pintu Geser Elektrik • Plat {selectedTripObj.plateNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* AI Consultation Prompt Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-400 text-xs font-semibold transition cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400" />
            <span>Tanya AI Soal Kursi</span>
          </button>

          {/* Live Hold Status Indicator */}
          {isHeld && (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-mono">
              <Timer className="h-3.5 w-3.5 animate-spin" />
              <span className="font-semibold">{formatTimer(holdSecondsLeft)}</span>
              <span className="text-[10px] hidden sm:inline">Terkunci</span>
            </div>
          )}
        </div>
      </div>

      {/* Optimistic Conflict Banner */}
      {conflictError && (
        <div className="p-3.5 rounded-2xl bg-amber-100 dark:bg-amber-950/70 border border-amber-400 dark:border-amber-700 text-amber-900 dark:text-amber-200 flex items-start justify-between gap-3 text-xs font-mono animate-in slide-in-from-top-2">
          <div className="flex items-start space-x-2.5">
            <RotateCcw className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 animate-spin" />
            <div>
              <p className="font-bold">Optimistic UI Rollback: Terjadi Perebutan Kursi!</p>
              <p className="text-[11px] mt-0.5 opacity-90">{conflictError}</p>
            </div>
          </div>
          <button
            onClick={clearConflictError}
            className="px-2.5 py-1 rounded-lg bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 text-[10px] font-bold cursor-pointer hover:bg-amber-300"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Wheel & Floor Legend Indicator Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-xs"></span>
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">Lantai 100% Rata (Bebas Ban)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-xs"></span>
            <span className="font-semibold text-amber-800 dark:text-amber-400">Spakbor Ban Belakang (Terangkat)</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <div className="h-3 w-5 rounded bg-slate-900 dark:bg-slate-800 border border-slate-600"></div>
          <span>Ban Komersial 235/65 R16C</span>
        </div>
      </div>

      {/* REALISTIC PRECISION TOP-DOWN TOYOTA HIACE PREMIO VIP BLUEPRINT */}
      <div className="relative max-w-lg mx-auto my-6 py-4 px-10 sm:px-14 select-none">
        
        {/* VEHICLE EXTERIOR SILHOUETTE & CHASSIS */}
        <div className="relative rounded-[56px] bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900/90 dark:via-[#0c121e] dark:to-slate-900/90 border-2 border-slate-300 dark:border-slate-700 shadow-2xl p-4 sm:p-6 overflow-visible">
          
          {/* AMBIENT AISLE LIGHTING STRIP (Down the Middle) */}
          <div className="absolute top-36 bottom-24 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent pointer-events-none -z-0"></div>

          {/* EXTERIOR COMMERCIAL VAN TYRES (Mounted to Chassis Outline, Zero Seat Overlap) */}
          
          {/* Ban Depan Kiri (235/65 R16C) */}
          <div className="absolute -left-6 sm:-left-7 top-24 z-20 flex items-center" title="Ban Depan Kiri (235/65 R16C)">
            <div className="w-9 sm:w-10 h-28 rounded-2xl bg-slate-950 border-2 border-slate-700 shadow-xl flex flex-col justify-between py-2 px-1 relative overflow-hidden">
              <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-8 rounded bg-slate-800 border border-slate-600 flex items-center justify-center">
                <span className="text-[7px] font-mono text-cyan-400 rotate-90 font-bold">R16C</span>
              </div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
            </div>
          </div>

          {/* Ban Depan Kanan (235/65 R16C) */}
          <div className="absolute -right-6 sm:-right-7 top-24 z-20 flex items-center" title="Ban Depan Kanan (235/65 R16C)">
            <div className="w-9 sm:w-10 h-28 rounded-2xl bg-slate-950 border-2 border-slate-700 shadow-xl flex flex-col justify-between py-2 px-1 relative overflow-hidden">
              <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-8 rounded bg-slate-800 border border-slate-600 flex items-center justify-center">
                <span className="text-[7px] font-mono text-cyan-400 rotate-90 font-bold">R16C</span>
              </div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
            </div>
          </div>

          {/* Ban Belakang Kiri (235/65 R16C - Poros Sasis Belakang) */}
          <div className="absolute -left-6 sm:-left-7 bottom-28 sm:bottom-30 z-20 flex items-center" title="Ban Belakang Kiri (235/65 R16C - Poros Sasis Belakang)">
            <div className="w-9 sm:w-10 h-32 rounded-2xl bg-slate-950 border-2 border-amber-500 shadow-xl flex flex-col justify-between py-2.5 px-1 relative overflow-hidden">
              <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-9 rounded bg-amber-950/90 border border-amber-500 flex items-center justify-center">
                <span className="text-[7px] font-mono text-amber-300 rotate-90 font-bold tracking-wider">POROS</span>
              </div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
            </div>
          </div>

          {/* Ban Belakang Kanan (235/65 R16C - Poros Sasis Belakang) */}
          <div className="absolute -right-6 sm:-right-7 bottom-28 sm:bottom-30 z-20 flex items-center" title="Ban Belakang Kanan (235/65 R16C - Poros Sasis Belakang)">
            <div className="w-9 sm:w-10 h-32 rounded-2xl bg-slate-950 border-2 border-amber-500 shadow-xl flex flex-col justify-between py-2.5 px-1 relative overflow-hidden">
              <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-9 rounded bg-amber-950/90 border border-amber-500 flex items-center justify-center">
                <span className="text-[7px] font-mono text-amber-300 rotate-90 font-bold tracking-wider">POROS</span>
              </div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
              <div className="w-full h-0.5 bg-slate-800"></div>
            </div>
          </div>

          {/* FRONT HOOD & AERODYNAMIC LED HEADLIGHTS */}
          <div className="relative mb-3">
            {/* LED DRL Headlights */}
            <div className="absolute -top-1 left-7 w-9 h-3.5 rounded-t-full bg-cyan-400/40 border border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.6)]"></div>
            <div className="absolute -top-1 right-7 w-9 h-3.5 rounded-t-full bg-cyan-400/40 border border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.6)]"></div>

            {/* Front Grill Badge */}
            <div className="w-52 h-7 mx-auto bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-b-2xl border-x-2 border-b-2 border-slate-300 dark:border-slate-600 flex items-center justify-center space-x-2 shadow-xs">
              <div className="w-4 h-2.5 rounded-full border border-slate-400 dark:border-slate-400 flex items-center justify-center">
                <div className="w-2 h-1 rounded-full border border-slate-400 dark:border-slate-400"></div>
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-800 dark:text-slate-200">
                HIACE PREMIO VIP
              </span>
            </div>

            {/* Aerodynamic Side Mirrors */}
            <div className="absolute top-2 -left-5 w-5 h-3 rounded-l-xl bg-slate-800 border border-slate-600 shadow-md flex items-center justify-start pl-0.5">
              <span className="h-1 w-1 rounded-full bg-amber-400"></span>
            </div>
            <div className="absolute top-2 -right-5 w-5 h-3 rounded-r-xl bg-slate-800 border border-slate-600 shadow-md flex items-center justify-end pr-0.5">
              <span className="h-1 w-1 rounded-full bg-amber-400"></span>
            </div>
          </div>

          {/* CURVED PANORAMIC WINDSHIELD (RAYBAN PRIVACY TINT) */}
          <div className="relative w-full h-9 mx-auto rounded-t-[36px] bg-gradient-to-b from-sky-500/15 via-slate-300/40 dark:via-slate-800/80 to-transparent border-t-2 border-x-2 border-slate-300 dark:border-slate-700 mb-3 flex items-center justify-center shadow-inner">
            <div className="w-14 h-0.5 bg-slate-400 dark:bg-slate-500 rounded rotate-12 absolute left-14 opacity-60"></div>
            <div className="w-14 h-0.5 bg-slate-400 dark:bg-slate-500 rounded -rotate-12 absolute right-14 opacity-60"></div>
            <span className="text-[8px] font-mono text-slate-500 dark:text-slate-400 tracking-widest font-bold uppercase">
              Windshield Kaca Depan (Acoustic Tint)
            </span>
          </div>

          {/* CABIN ZONE: COCKPIT */}
          <div className="relative pb-4 mb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between gap-4 px-2">
              
              {/* Front Passenger Seat F1 */}
              <div className="flex-1 max-w-[155px]">
                <button
                  onClick={() => selectSeatOptimistic(seats[0])}
                  className={`w-full p-2.5 rounded-2xl border text-center transition cursor-pointer relative ${
                    seats[0].status === "selected"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.2)] scale-105"
                      : "bg-white dark:bg-[#131b2e] border-slate-300 dark:border-slate-700 hover:border-slate-400 shadow-xs"
                  }`}
                >
                  <div className="w-11 h-2 mx-auto rounded-full bg-slate-300 dark:bg-slate-700 mb-1 opacity-80 flex items-center justify-between px-1">
                    <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                    <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                  </div>
                  <p className="font-bold text-xs">F1 Depan</p>
                  <p className="text-[10px] opacity-75">Samping Sopir</p>
                </button>
                <span className="block text-[8px] font-mono text-slate-400 text-center mt-1">
                  Dekat Roda Depan Kiri
                </span>
              </div>

              {/* Driver Cockpit */}
              <div className="flex-1 max-w-[155px]">
                <div className="w-full p-2.5 rounded-2xl bg-slate-200/90 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-center">
                  <div className="w-7 h-7 mx-auto rounded-full border-2 border-slate-700 dark:border-slate-400 flex items-center justify-center mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 dark:bg-slate-400"></div>
                  </div>
                  <p className="font-bold text-[11px] font-mono text-slate-800 dark:text-slate-200">KEMUDI SOPIR</p>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">Setir Kanan (RHD)</p>
                </div>
                <span className="block text-[8px] font-mono text-slate-400 text-center mt-1">
                  Dekat Roda Depan Kanan
                </span>
              </div>
            </div>
          </div>

          {/* ILLUMINATED CURBSIDE SIDE-STEP (Pintu Geser Elektrik Sisi Trotoar) */}
          <div className="py-2.5 px-3 flex items-center justify-between my-2 rounded-xl bg-gradient-to-r from-blue-500/10 via-slate-100 to-transparent dark:from-blue-900/30 dark:via-slate-800/40 dark:to-transparent border-l-4 border-l-blue-500 border-y border-r border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-[10px] font-mono">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
              <span className="font-bold text-blue-700 dark:text-cyan-300 tracking-wider">
                ← PINTU GESER ELEKTRIK (SILL PLATE TRANSFLOW VIP)
              </span>
            </div>
            <span className="text-slate-400 text-[9px] font-mono">Sisi Kaca Kanan →</span>
          </div>

          {/* ROW 1: EXECUTIVE CAPTAIN SEATS (100% FLAT FLOOR) */}
          <div className="py-3 px-1 flex items-center justify-between gap-3 relative">
            
            {/* Seat 1A */}
            <div className="flex-1 max-w-[165px]">
              <div className="relative">
                <div className="w-12 h-1.5 mx-auto rounded-t-md bg-slate-300 dark:bg-slate-700 mb-1 opacity-70" title="Ottoman Legrest Folded"></div>
                
                <button
                  onClick={() => selectSeatOptimistic(seats[1])}
                  className={`w-full p-3 rounded-2xl border text-center transition cursor-pointer relative overflow-hidden ${
                    seats[1].status === "selected"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-amber-400 shadow-[0_6px_25px_rgba(245,158,11,0.22)] scale-105"
                      : "bg-white dark:bg-[#131b2e] border-slate-300 dark:border-slate-700 hover:border-slate-400 shadow-xs"
                  }`}
                >
                  <div className="w-14 h-3 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 mb-1.5 flex items-center justify-between px-1.5 border border-slate-300/60 dark:border-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80"></span>
                    <span className="text-[7px] font-mono font-bold opacity-60">135°</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80"></span>
                  </div>

                  <div className="flex items-center justify-between px-0.5">
                    <div className="w-1 h-5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="flex-1 px-1">
                      <p className="font-bold text-xs tracking-tight">1A • Captain</p>
                      <p className="text-[10px] opacity-75">Jendela Kiri</p>
                    </div>
                    <div className="w-1 h-5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  </div>

                  <div className="mt-1.5 flex items-center justify-center space-x-1">
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                      110cm Pitch • Nappa
                    </span>
                  </div>
                </button>
              </div>

              <span className="block text-[8px] font-mono text-emerald-600 dark:text-emerald-400 text-center mt-1 font-bold">
                ✓ Bebas Ban (Lantai Rata)
              </span>
            </div>

            {/* Aisle Spacer */}
            <div className="flex flex-col items-center justify-center text-[9px] font-mono text-slate-400 dark:text-slate-600 select-none">
              <span className="rotate-90 py-1 tracking-widest text-[8px]">LORONG</span>
            </div>

            {/* Seat 1B */}
            <div className="flex-1 max-w-[165px]">
              <div className="relative">
                <div className="w-12 h-1.5 mx-auto rounded-t-md bg-slate-300 dark:bg-slate-700 mb-1 opacity-70" title="Ottoman Legrest Folded"></div>
                
                <button
                  onClick={() => selectSeatOptimistic(seats[2])}
                  className={`w-full p-3 rounded-2xl border text-center transition cursor-pointer relative overflow-hidden ${
                    seats[2].status === "selected"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-amber-400 shadow-[0_6px_25px_rgba(245,158,11,0.22)] scale-105"
                      : "bg-white dark:bg-[#131b2e] border-slate-300 dark:border-slate-700 hover:border-slate-400 shadow-xs"
                  }`}
                >
                  <div className="w-14 h-3 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 mb-1.5 flex items-center justify-between px-1.5 border border-slate-300/60 dark:border-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80"></span>
                    <span className="text-[7px] font-mono font-bold opacity-60">135°</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80"></span>
                  </div>

                  <div className="flex items-center justify-between px-0.5">
                    <div className="w-1 h-5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="flex-1 px-1">
                      <p className="font-bold text-xs tracking-tight">1B • Captain</p>
                      <p className="text-[10px] opacity-75">Dekat Pintu Geser</p>
                    </div>
                    <div className="w-1 h-5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  </div>

                  <div className="mt-1.5 flex items-center justify-center space-x-1">
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                      Akses Cepat • USB-C
                    </span>
                  </div>
                </button>
              </div>

              <span className="block text-[8px] font-mono text-emerald-600 dark:text-emerald-400 text-center mt-1 font-bold">
                ✓ Bebas Ban (Lantai Rata)
              </span>
            </div>
          </div>

          {/* ROW 2: EXECUTIVE CAPTAIN SEATS */}
          <div className="py-3 px-1 flex items-center justify-between gap-3 relative">
            
            {/* Seat 2A */}
            <div className="flex-1 max-w-[165px]">
              <div className="relative">
                <div className="w-12 h-1.5 mx-auto rounded-t-md bg-slate-300 dark:bg-slate-700 mb-1 opacity-70"></div>
                
                <button
                  onClick={() => selectSeatOptimistic(seats[3])}
                  className={`w-full p-3 rounded-2xl border text-center transition cursor-pointer relative overflow-hidden ${
                    seats[3].status === "selected"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-amber-400 shadow-[0_6px_25px_rgba(245,158,11,0.22)] scale-105"
                      : "bg-white dark:bg-[#131b2e] border-slate-300 dark:border-slate-700 hover:border-slate-400 shadow-xs"
                  }`}
                >
                  <div className="w-14 h-3 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 mb-1.5 flex items-center justify-between px-1.5 border border-slate-300/60 dark:border-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80"></span>
                    <span className="text-[7px] font-mono font-bold opacity-60">135°</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80"></span>
                  </div>

                  <div className="flex items-center justify-between px-0.5">
                    <div className="w-1 h-5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="flex-1 px-1">
                      <p className="font-bold text-xs tracking-tight">2A • Captain</p>
                      <p className="text-[10px] opacity-75">Jendela Kiri</p>
                    </div>
                    <div className="w-1 h-5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  </div>

                  <div className="mt-1.5 flex items-center justify-center space-x-1">
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                      108cm Pitch • Senyap
                    </span>
                  </div>
                </button>
              </div>

              <span className="block text-[8px] font-mono text-emerald-600 dark:text-emerald-400 text-center mt-1 font-bold">
                ✓ Bebas Ban (Lantai Rata)
              </span>
            </div>

            {/* Aisle */}
            <div className="flex flex-col items-center justify-center text-[9px] font-mono text-slate-400 dark:text-slate-600 select-none">
              <span className="rotate-90 py-1 tracking-widest text-[8px]">LORONG</span>
            </div>

            {/* Seat 2B (Booked) */}
            <div className="flex-1 max-w-[165px]">
              <div className="relative">
                <div className="w-12 h-1.5 mx-auto rounded-t-md bg-slate-300/40 dark:bg-slate-800 mb-1 opacity-40"></div>
                
                <div className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/40 text-slate-400 text-center select-none">
                  <div className="w-14 h-3 mx-auto rounded-full bg-slate-200 dark:bg-slate-800 mb-1.5"></div>
                  
                  <div className="flex items-center justify-between px-0.5">
                    <div className="w-1 h-5 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                    <div className="flex-1 px-1">
                      <p className="font-bold text-xs text-slate-400">2B (Terisi)</p>
                      <p className="text-[10px]">Telah Dipesan</p>
                    </div>
                    <div className="w-1 h-5 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                  </div>

                  <span className="inline-block mt-1.5 text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500">
                    Sudah Terkunci
                  </span>
                </div>
              </div>

              <span className="block text-[8px] font-mono text-slate-400 text-center mt-1">
                ✓ Bebas Ban (Lantai Rata)
              </span>
            </div>
          </div>

          {/* ROW 3: EXECUTIVE BENCH WITH 3D WHEEL WELL ARCHES */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 relative">
            
            {/* Row 3 Label */}
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 text-center mb-2.5 font-bold tracking-wider uppercase">
              BARIS 3 • EXECUTIVE BENCH (LEWAT POROS RODA BELAKANG)
            </p>

            <div className="grid grid-cols-3 gap-2 px-1">
              
              {/* Seat 3A with 3D Wheel Arch Contour */}
              <div className="relative">
                {/* 3D Wheel Well Protrusion Shadow */}
                <div className="absolute -inset-1 rounded-2xl bg-amber-500/15 dark:bg-amber-500/10 border border-amber-500/30 -z-0"></div>

                <button
                  onClick={() => selectSeatOptimistic(seats[5])}
                  className={`w-full p-2.5 rounded-2xl border text-center transition cursor-pointer relative z-10 ${
                    seats[5].status === "selected"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-amber-400 shadow-lg scale-105"
                      : "bg-amber-50/90 dark:bg-amber-950/40 border-amber-400 dark:border-amber-700/80 text-slate-900 dark:text-white hover:border-amber-500 shadow-xs"
                  }`}
                >
                  <div className="w-10 h-1.5 mx-auto rounded-full bg-amber-400 dark:bg-amber-700 mb-1"></div>
                  <p className="font-bold text-xs">3A</p>
                  <p className="text-[9px] opacity-75">Sudut Kiri</p>
                </button>
                <span className="block text-[8px] font-mono text-amber-700 dark:text-amber-400 text-center mt-1 font-bold">
                  ▲ Di Atas Spakbor
                </span>
              </div>

              {/* Seat 3B (Flat Middle Bench) */}
              <div className="relative">
                <button
                  onClick={() => selectSeatOptimistic(seats[6])}
                  className={`w-full p-2.5 rounded-2xl border text-center transition cursor-pointer relative z-10 ${
                    seats[6].status === "selected"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-amber-400 shadow-lg scale-105"
                      : "bg-white dark:bg-[#131b2e] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:border-slate-400 shadow-xs"
                  }`}
                >
                  <div className="w-10 h-1.5 mx-auto rounded-full bg-slate-300 dark:bg-slate-700 mb-1"></div>
                  <p className="font-bold text-xs">3B</p>
                  <p className="text-[9px] opacity-75">Tengah Rata</p>
                </button>
                <span className="block text-[8px] font-mono text-emerald-600 dark:text-emerald-400 text-center mt-1 font-semibold">
                  ✓ Rata Tengah
                </span>
              </div>

              {/* Seat 3C with 3D Wheel Arch Contour */}
              <div className="relative">
                {/* 3D Wheel Well Protrusion Shadow */}
                <div className="absolute -inset-1 rounded-2xl bg-amber-500/15 dark:bg-amber-500/10 border border-amber-500/30 -z-0"></div>

                <div className="w-full p-2.5 rounded-2xl border border-amber-400 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-center select-none relative z-10 shadow-xs">
                  <div className="w-10 h-1.5 mx-auto rounded-full bg-amber-400 dark:bg-amber-700 mb-1"></div>
                  <p className="font-bold text-xs flex items-center justify-center space-x-1">
                    <Lock className="h-3 w-3 inline" />
                    <span>3C</span>
                  </p>
                  <p className="text-[9px]">Terkunci (TTL)</p>
                </div>
                <span className="block text-[8px] font-mono text-amber-700 dark:text-amber-400 text-center mt-1 font-bold">
                  ▲ Di Atas Spakbor
                </span>
              </div>
            </div>
          </div>

          {/* TRUNK COMPARTMENT WITH TAILGATE HATCH */}
          <div className="mt-5 p-3 rounded-2xl bg-slate-200/60 dark:bg-slate-900/80 border border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center space-x-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <Luggage className="h-4 w-4 text-slate-500 shrink-0" />
            <span>KOMPARTEMEN BAGASI BELAKANG (KAPASITAS KOPER 24" & RANSEL)</span>
          </div>

          {/* Aerodynamic Rear Bumper & Exhaust Sill */}
          <div className="w-52 h-2.5 mx-auto bg-slate-300 dark:bg-slate-800 rounded-b-full mt-3 flex items-center justify-center">
            <div className="w-16 h-1 rounded-full bg-slate-400 dark:bg-slate-700"></div>
          </div>
        </div>
      </div>

      {/* COMPACT VIP SEAT SPEC HUD (EXECUTIVE AUTOMOTIVE INSPECTOR) */}
      {selectedSeatObj && (
        <div className="pt-2 space-y-4">
          
          {/* 4-Column Luxury Seat Spec Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Ergonomi Sandaran</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1 flex items-center space-x-1.5">
                <span>135° Zero-Gravity</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Winged Headrest Cushion</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Bahan & Jahitan</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1">Perforated Nappa</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Dual Integrated Armrest</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Legroom & Lantai</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1">{selectedSeatObj.pitch} Pitch</p>
              <p className={`text-[10px] font-semibold mt-0.5 ${
                selectedSeatObj.wheelRelation === "BEBAS_BAN" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
              }`}>
                {selectedSeatObj.wheelRelation === "BEBAS_BAN" ? "✓ 100% Bebas Spakbor" : "▲ Sasis Spakbor Ban"}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Daya & Konektivitas</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1 flex items-center space-x-1">
                <Zap className="h-3.5 w-3.5 text-cyan-500" />
                <span>USB-C 65W PD</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Fast-Charge + Cup Holder</p>
            </div>
          </div>

          {/* Confirmation & Checkout Action Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 dark:bg-[#0D121F] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-slate-800">
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="text-base font-bold font-mono tracking-tight text-white">
                  Kursi {selectedSeatObj.name}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                  selectedSeatObj.wheelRelation === "BEBAS_BAN"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}>
                  {selectedSeatObj.wheelNote}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                {selectedSeatObj.features.join(" • ")}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-mono uppercase">Total Pembayaran</p>
                <p className="text-lg font-bold font-mono text-cyan-300">
                  Rp{selectedSeatObj.price.toLocaleString("id-ID")}
                </p>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(true)}
                disabled={isOptimisticPending}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold shadow-md transition cursor-pointer disabled:opacity-50"
              >
                {isOptimisticPending ? "Memverifikasi Kunci..." : "Lanjut Pembayaran"}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
