"use client";

import React from "react";
import { MapPin, Calendar as CalendarIcon, Users, ArrowRightLeft, Search, ChevronDown } from "lucide-react";
import { useBooking } from "@/shared/lib/booking-context";

export function ReservationFormWidget() {
  const {
    originPool,
    setOriginPool,
    destinationPool,
    setDestinationPool,
    departureDate,
    setDepartureDate,
    passengerCount,
    setPassengerCount,
    handleSwapRoute,
    setHasSearched
  } = useBooking();

  return (
    <section className="bg-white dark:bg-[#101625] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Form Reservasi Shuttle
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih rute keberangkatan, tanggal perjalanan, dan temukan armada eksekutif Toyota HiAce Premio VIP.
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-xs font-medium text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Pemesanan Terproteksi Anti-Race-Condition</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        {/* Keberangkatan */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-[11px] font-semibold tracking-wide text-slate-600 dark:text-slate-300 uppercase flex items-center space-x-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>Outlet Keberangkatan</span>
          </label>
          <div className="relative">
            <select
              value={originPool}
              onChange={(e) => setOriginPool(e.target.value)}
              className="w-full h-11 pl-3.5 pr-8 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 appearance-none transition"
            >
              <option value="Bandung - Baltos (Tamansari)">Bandung - Baltos (Tamansari)</option>
              <option value="Bandung - Pasteur">Bandung - Pasteur</option>
              <option value="Bandung - Buah Batu">Bandung - Buah Batu</option>
            </select>
            <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Swap Button */}
        <div className="hidden md:flex md:col-span-1 justify-center pb-1">
          <button
            type="button"
            onClick={handleSwapRoute}
            title="Tukar Rute"
            className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 transition shadow-2xs cursor-pointer"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Tujuan */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-[11px] font-semibold tracking-wide text-slate-600 dark:text-slate-300 uppercase flex items-center space-x-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>Outlet Tujuan</span>
          </label>
          <div className="relative">
            <select
              value={destinationPool}
              onChange={(e) => setDestinationPool(e.target.value)}
              className="w-full h-11 pl-3.5 pr-8 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 appearance-none transition"
            >
              <option value="Jakarta - Blora Sudirman">Jakarta - Blora Sudirman</option>
              <option value="Jakarta - Bekasi Barat">Jakarta - Bekasi Barat</option>
              <option value="Tangerang - Bandara Soetta T3">Tangerang - Bandara Soetta T3</option>
            </select>
            <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Tanggal */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[11px] font-semibold tracking-wide text-slate-600 dark:text-slate-300 uppercase flex items-center space-x-1">
            <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
            <span>Tanggal</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 transition"
            />
          </div>
        </div>

        {/* Penumpang */}
        <div className="md:col-span-1 space-y-1.5">
          <label className="text-[11px] font-semibold tracking-wide text-slate-600 dark:text-slate-300 uppercase flex items-center space-x-1">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            <span>Orang</span>
          </label>
          <div className="relative">
            <select
              value={passengerCount}
              onChange={(e) => setPassengerCount(e.target.value)}
              className="w-full h-11 pl-3 pr-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 appearance-none transition"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 absolute right-2 top-4 pointer-events-none" />
          </div>
        </div>

        {/* Action Cek */}
        <div className="md:col-span-2">
          <button
            type="button"
            onClick={() => setHasSearched(true)}
            className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-white font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-sm cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>Cari Jadwal</span>
          </button>
        </div>
      </div>
    </section>
  );
}
