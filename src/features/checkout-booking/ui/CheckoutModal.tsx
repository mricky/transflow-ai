"use client";

import React from "react";
import { Bus, X, QrCode, CheckCircle2, Check, FileDown } from "lucide-react";
import { useBooking } from "@/shared/lib/booking-context";

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    isPaymentConfirmed,
    setIsPaymentConfirmed,
    passengerName,
    setPassengerName,
    passengerPhone,
    setPassengerPhone,
    selectedTripObj,
    selectedSeatObj,
    originPool,
    destinationPool,
    departureDate,
    handleDownloadTicket
  } = useBooking();

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#101625] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Bus className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Konfirmasi Tiket & Checkout
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Pessimistic Row Lock Active • Idempotency Guaranteed
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setIsPaymentConfirmed(false);
            }}
            className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!isPaymentConfirmed ? (
          <div className="space-y-4">
            {/* Trip Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-500 font-mono text-[11px]">
                <span>Rute Perjalanan</span>
                <span>{selectedTripObj.time} WIB ({departureDate})</span>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {originPool.split(" - ")[1]} ➔ {destinationPool.split(" - ")[1]}
              </p>
              <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-slate-500">Nomor Kursi: </span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">{selectedSeatObj.name}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                    {selectedSeatObj.wheelNote}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Tarif: </span>
                  <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">Rp{selectedSeatObj.price.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            {/* Passenger Form */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Nama Lengkap Penumpang
                </label>
                <input
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Nomor WhatsApp (Untuk Notifikasi E-Ticket)
                </label>
                <input
                  type="text"
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                />
              </div>
            </div>

            {/* Payment Simulator */}
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">QRIS Instan / Virtual Account</p>
                  <p className="text-[10px] text-slate-500">Biaya admin Rp0 • Konfirmasi Real-Time</p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Bebas Admin
              </span>
            </div>

            {/* Action Confirm */}
            <button
              onClick={() => setIsPaymentConfirmed(true)}
              className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Bayar & Terbitkan Tiket Resmi</span>
            </button>
          </div>
        ) : (
          /* Payment Confirmed State & Download PDF */
          <div className="space-y-4 py-2 text-center animate-in fade-in">
            <div className="h-14 w-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Check className="h-7 w-7" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Pemesanan Berhasil & Tiket Terbit!
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Status kursi telah berubah dari <span className="font-mono font-semibold">HELD</span> menjadi <span className="font-mono font-semibold text-emerald-600">CONFIRMED</span> dengan pengamanan idempotency.
              </p>
            </div>

            {/* Ticket Card Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-400 text-[10px]">
                <span>KODE BOOKING</span>
                <span className="text-emerald-500 font-bold">LUNAS</span>
              </div>
              <p className="text-base font-bold text-slate-900 dark:text-white">
                TF{selectedTripObj.id.replace("TRIP-", "")}-{selectedSeatObj.id}
              </p>
              <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <p>Penumpang: <strong>{passengerName}</strong></p>
                <p>Kursi: <strong>{selectedSeatObj.name} ({selectedSeatObj.wheelNote})</strong></p>
                <p>Armada: <strong>HiAce VIP ({selectedTripObj.plateNumber})</strong></p>
              </div>
            </div>

            {/* Real PDF Download Button */}
            <button
              onClick={handleDownloadTicket}
              className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-sm"
            >
              <FileDown className="h-4 w-4" />
              <span>Unduh E-Ticket Boarding Pass (.PDF)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
