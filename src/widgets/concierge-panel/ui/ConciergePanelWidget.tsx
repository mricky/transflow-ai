"use client";

import React, { useRef, useEffect } from "react";
import { Sparkles, Send, X, Minus } from "lucide-react";
import { useBooking } from "@/shared/lib/booking-context";

export function ConciergePanelWidget() {
  const {
    chatInput,
    setChatInput,
    chatMessages,
    handleSendMessage,
    isChatOpen,
    setIsChatOpen
  } = useBooking();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen]);

  return (
    <>
      {/* FLOATING ACTION BUTTON (When closed) */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center space-x-3 px-4 py-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-[0_8px_30px_rgb(0,0,0,0.18)] hover:shadow-[0_10px_35px_rgb(0,0,0,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-slate-700/40 dark:border-slate-300"
          >
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-blue-600 dark:bg-slate-900 text-white flex items-center justify-center font-bold">
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-slate-900 dark:border-white animate-pulse"></span>
            </div>
            <div className="text-left pr-1">
              <p className="text-xs font-bold leading-tight flex items-center space-x-1.5">
                <span>AI Concierge</span>
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 dark:text-cyan-700 text-[9px] font-mono">
                  RAG+MCP
                </span>
              </p>
              <p className="text-[10px] text-slate-300 dark:text-slate-600 font-medium">
                Tanya koper, kursi & rute
              </p>
            </div>
          </button>
        </div>
      )}

      {/* FLOATING CHATBOT DRAWER (When open) */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl bg-white dark:bg-[#101625] border border-slate-200 dark:border-slate-800 shadow-[0_12px_45px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-200">
          
          {/* Chatbot Header */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-[#0D121F]">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center shadow-xs">
                <Sparkles className="h-4 w-4 text-cyan-400 dark:text-cyan-600" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono flex items-center space-x-1.5">
                  <span>AI Travel Concierge</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-slate-500">
                  Model Context Protocol & Grounded Policy
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsChatOpen(false)}
                title="Minimize Chat"
                className="h-7 w-7 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 transition cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                title="Close Chat"
                className="h-7 w-7 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 transition cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Stream with MCP & RAG Badges */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-50/40 dark:bg-[#0C111C]">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[92%] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-slate-900 text-white dark:bg-slate-800 rounded-tr-xs"
                      : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200/80 dark:border-slate-800 shadow-xs whitespace-pre-line"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Grounded RAG Policy Citation Card */}
                  {msg.ragCitation && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-mono flex items-start space-x-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold shrink-0">
                        {msg.ragCitation.docId}
                      </span>
                      <div className="truncate">
                        <p className="font-semibold text-slate-700 dark:text-slate-300">{msg.ragCitation.title}</p>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Context Prompt Chips */}
          <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#101625]">
            <button
              onClick={() => handleSendMessage("Bagaimana kondisi lalu lintas Tol Cipularang dan estimasi waktu tempuh saat ini?")}
              className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-[11px] text-blue-700 dark:text-cyan-300 font-semibold transition cursor-pointer"
            >
              🚦 Cek Macet & ETA Tol
            </button>
            <button
              onClick={() => handleSendMessage("Apakah shuttle HiAce boleh melintas via Tol Layang MBZ?")}
              className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 transition cursor-pointer"
            >
              🌉 Aturan Portal MBZ 2.1m
            </button>
            <button
              onClick={() => handleSendMessage("Ada jadwal istirahat di rest area mana untuk rute ini?")}
              className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 transition cursor-pointer"
            >
              ☕ Rest Area KM 72/97
            </button>
            <button
              onClick={() => handleSendMessage("Kursi mana yang bebas gundukan ban dan paling lega?")}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold transition cursor-pointer"
            >
              🛞 Bebas Ban (Lantai Rata)
            </button>
            <button
              onClick={() => handleSendMessage("Boleh bawa koper 25kg dan ransel?")}
              className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 transition cursor-pointer"
            >
              🧳 Aturan Bagasi 24"
            </button>
            <button
              onClick={() => handleSendMessage("Gimana kebijakan reschedule kalau rapat molor?")}
              className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 transition cursor-pointer"
            >
              🔄 Reschedule 2 Jam
            </button>
          </div>

          {/* Chat Input Field */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2 bg-white dark:bg-[#101625]">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Tanyakan kursi, aturan koper, atau reschedule..."
              className="flex-1 h-10 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400 transition"
            />
            <button
              onClick={() => handleSendMessage()}
              className="h-10 w-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center hover:bg-slate-800 transition cursor-pointer shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
