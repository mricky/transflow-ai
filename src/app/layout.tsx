import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "TransFlow AI | Autonomous Intercity Shuttle & Smart Seat Concierge",
  description:
    "Executive Toyota HiAce Premio VIP shuttle booking copilot powered by Gemini AI, Model Context Protocol (MCP), and Anti-Race-Condition Concurrency Engine.",
  openGraph: {
    title: "TransFlow AI | Executive Shuttle & Anti-Race-Condition Booking Engine",
    description:
      "Interactive 8-Seat HiAce Premio seat map, atomic distributed seat locks, and conversational AI concierge for Bandung – Jakarta corridor.",
    type: "website",
    locale: "id_ID",
    siteName: "TransFlow AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
