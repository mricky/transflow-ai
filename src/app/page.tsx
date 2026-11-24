"use client";

import React from "react";
import { BookingProvider } from "@/shared/lib/booking-context";
import { Header } from "@/widgets/header/ui/Header";
import { TelemetryInspectorWidget } from "@/widgets/telemetry-inspector/ui/TelemetryInspectorWidget";
import { ReservationFormWidget } from "@/widgets/reservation-form/ui/ReservationFormWidget";
import { SchedulePickerWidget } from "@/widgets/schedule-picker/ui/SchedulePickerWidget";
import { CabinVisualizerWidget } from "@/widgets/cabin-visualizer/ui/CabinVisualizerWidget";
import { ConciergePanelWidget } from "@/widgets/concierge-panel/ui/ConciergePanelWidget";
import { CheckoutModal } from "@/features/checkout-booking/ui/CheckoutModal";

export default function Home() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-200 dark:selection:bg-slate-800">
        
        {/* Top Header Widget */}
        <Header />

        {/* Concurrency & Optimistic Rollback Telemetry Drawer */}
        <TelemetryInspectorWidget />

        {/* Main Content Workbench */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
          
          {/* SECTION 1: Reservation Form Widget */}
          <ReservationFormWidget />

          {/* SECTION 2: Available Schedules Widget */}
          <SchedulePickerWidget />

          {/* SECTION 3: Visual HiAce Premio Blueprint (Full Width Centered) */}
          <section className="w-full">
            <CabinVisualizerWidget />
          </section>

          {/* FLOATING AI CHATBOT CONCIERGE */}
          <ConciergePanelWidget />

          {/* SECTION 4: Checkout Modal Feature */}
          <CheckoutModal />

          {/* Footer Info */}
          <footer className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
            <div>
              TransFlow AI • Feature-Sliced Design (FSD) & Optimistic UI Rollback Architecture
            </div>
            <div>
              Toyota HiAce Premio Executive VIP (8-Seat Top-Down Blueprint)
            </div>
          </footer>

        </main>
      </div>
    </BookingProvider>
  );
}
