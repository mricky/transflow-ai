"use client";

import React, { useState } from "react";
import { 
  Bus, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Armchair, 
  CheckCircle2, 
  Lock, 
  HelpCircle,
  FileText
} from "lucide-react";

export default function Home() {
  const [selectedSeat, setSelectedSeat] = useState<string>("1A");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  TransFlow<span className="text-blue-600 dark:text-cyan-400">.ai</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800">
                  HiAce VIP 8-Seat
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Autonomous Intercity Shuttle & Anti-Race-Condition Booking Engine
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>CONCURRENCY ENGINE: ACTIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col space-y-6">
        {/* Hero Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[11px] font-mono text-cyan-300">
              <Zap className="h-3.5 w-3.5" />
              <span>Zero-Double-Booking Guarantee • 10-Min Atomic Hold</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Executive Shuttle Booking & AI Seat Concierge
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Koridor Eksekutif Bandung Baltos ➔ Jakarta Blora Sudirman. Didukung Model Context Protocol (MCP) dan mesin concurrency berkecepatan tinggi pencegah *race condition*.
            </p>
          </div>
        </div>

        {/* 2-Column Workbench: Seat Map & AI Chat Concierge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Visual Seat Map (Toyota HiAce Premio VIP) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Armchair className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      Denah Kursi Toyota HiAce Premio VIP (8-Seat)
                    </h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      Jadwal: 08:00 WIB • Baltos ➔ Blora Sudirman • Rp130.000
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                  Plat: D 7120 TRAN
                </span>
              </div>

              {/* Status Legend */}
              <div className="flex items-center space-x-4 text-xs font-mono py-3">
                <div className="flex items-center space-x-1.5">
                  <span className="h-3 w-3 rounded bg-emerald-500"></span>
                  <span className="text-slate-600 dark:text-slate-400">Tersedia</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-3 w-3 rounded bg-amber-500"></span>
                  <span className="text-slate-600 dark:text-slate-400">Terkunci (TTL 10m)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-3 w-3 rounded bg-slate-400 dark:bg-slate-700"></span>
                  <span className="text-slate-600 dark:text-slate-400">Terisi</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-3 w-3 rounded bg-blue-600"></span>
                  <span className="text-slate-900 dark:text-white font-bold">Pilihan Anda</span>
                </div>
              </div>

              {/* Simulated HiAce Cabin Graphic */}
              <div className="my-4 max-w-sm mx-auto p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 space-y-3">
                {/* Driver Row */}
                <div className="flex items-center justify-between pb-2 border-b border-dashed border-slate-300 dark:border-slate-800 text-[11px] font-mono text-slate-400">
                  <div className="p-3 bg-slate-200 dark:bg-slate-900 rounded-lg font-bold text-center w-24">
                    SOPIR
                  </div>
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-400 text-emerald-800 dark:text-emerald-300 rounded-lg text-center font-bold w-24 cursor-pointer hover:scale-105 transition">
                    F1 (Depan)
                  </div>
                </div>

                {/* Row 1 Captain Seats */}
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedSeat("1A")}
                    className={`p-3.5 rounded-xl border text-center w-28 transition cursor-pointer ${
                      selectedSeat === "1A" 
                        ? "bg-blue-600 text-white border-blue-700 shadow-md scale-105" 
                        : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-slate-900 dark:text-white hover:bg-emerald-100"
                    }`}
                  >
                    <p className="font-bold text-xs">1A (Captain)</p>
                    <p className="text-[10px] opacity-80">Jendela Kiri</p>
                  </button>
                  <button 
                    onClick={() => setSelectedSeat("1B")}
                    className={`p-3.5 rounded-xl border text-center w-28 transition cursor-pointer ${
                      selectedSeat === "1B" 
                        ? "bg-blue-600 text-white border-blue-700 shadow-md scale-105" 
                        : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-slate-900 dark:text-white hover:bg-emerald-100"
                    }`}
                  >
                    <p className="font-bold text-xs">1B (Captain)</p>
                    <p className="text-[10px] opacity-80">Jendela Kanan</p>
                  </button>
                </div>

                {/* Row 2 Captain Seats */}
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedSeat("2A")}
                    className={`p-3.5 rounded-xl border text-center w-28 transition cursor-pointer ${
                      selectedSeat === "2A" 
                        ? "bg-blue-600 text-white border-blue-700 shadow-md scale-105" 
                        : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-slate-900 dark:text-white hover:bg-emerald-100"
                    }`}
                  >
                    <p className="font-bold text-xs">2A (Captain)</p>
                    <p className="text-[10px] opacity-80">Jendela Kiri</p>
                  </button>
                  <div className="p-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700 text-center w-28 opacity-60">
                    <p className="font-bold text-xs">2B (Terisi)</p>
                    <p className="text-[10px]">Telah Dipesan</p>
                  </div>
                </div>

                {/* Row 3 Bench Seats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-300 dark:border-slate-800">
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-center text-xs font-semibold cursor-pointer">
                    3A
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-center text-xs font-semibold cursor-pointer">
                    3B
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-400 text-amber-800 dark:text-amber-300 text-center text-xs font-semibold">
                    3C (Lock)
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500">Kursi Dipilih: </span>
                <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">{selectedSeat} (Captain Seat)</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-md shadow-blue-500/20">
                Kunci Kursi Ini (10 Menit)
              </button>
            </div>
          </div>

          {/* Right Column: AI Booking Concierge & RAG Policy Drawer */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* AI Assistant Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <Sparkles className="h-4 w-4 text-indigo-600 dark:text-cyan-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                    AI Travel Concierge (MCP + RAG)
                  </h3>
                </div>

                <div className="my-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <p className="text-slate-700 dark:text-slate-300">
                    👋 <strong>Halo!</strong> Saya asisten cerdas TransFlow. Silakan ketik kueri Anda, misalnya:
                  </p>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px] font-mono list-disc list-inside">
                    <li>"Pesan shuttle ke Blora besok jam 8, pilih captain seat."</li>
                    <li>"Boleh bawa koper 25kg dan hewan peliharaan ga?"</li>
                    <li>"Gimana cara reschedule tiket kalau telat?"</li>
                  </ul>
                </div>
              </div>

              {/* Chat Input Placeholder */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
                <input 
                  type="text"
                  placeholder="Ketik pesanan atau pertanyaan Anda di sini..."
                  className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                />
                <button className="px-3.5 py-2 bg-slate-900 dark:bg-cyan-600 text-white rounded-xl text-xs font-medium shrink-0">
                  Kirim
                </button>
              </div>
            </div>

            {/* Anti-Race Condition Concurrency Status Card */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-md space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-cyan-400 text-[11px]">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>CONCURRENCY METRICS</span>
                </span>
                <span>Active 10M-Req Ready</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Lock Type</p>
                  <p className="font-bold text-white">Distributed TTL (10m)</p>
                </div>
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Race Conflicts Blocked</p>
                  <p className="font-bold text-emerald-400">1,492 Requests (100%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
