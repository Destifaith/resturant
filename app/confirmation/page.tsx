"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function ConfirmationPage() {
  const orderNumber = "#1234";
  const estimatedTime = "15-20 MINS";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f0eb] px-5 py-12">

      {/* ── BIG GREEN CHECK ── */}
      <div className="mb-6">
        <div className="w-28 h-28 rounded-full bg-[#1E3A2F]/10 flex items-center justify-center">
          <CheckCircle2 className="w-20 h-20 text-[#1E3A2F]" strokeWidth={1.5} />
        </div>
      </div>

      {/* ── CONFIRMED TEXT ── */}
      <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1 text-center">
        ORDER CONFIRMED!
      </h1>
      <p className="text-gray-400 text-sm text-center mb-8">
        YOUR ORDER NO: <span className="font-bold text-gray-700">{orderNumber}</span>
      </p>

      {/* ── TIME BADGE ── */}
      <div className="bg-white border border-black/6 rounded-2xl px-8 py-4 mb-10 text-center shadow-sm">
        <p className="text-3xl font-extrabold text-[#1E3A2F]">{estimatedTime}</p>
        <p className="text-xs text-gray-400 mt-1">Estimated preparation time</p>
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div className="w-full max-w-xs space-y-3">
        <Link href="/tracking">
          <div className="bg-[#1E3A2F] text-white rounded-full py-4 text-center font-bold text-base shadow-lg active:scale-95 transition-transform">
            Track Status
          </div>
        </Link>
        <Link href="/">
          <div className="bg-white border border-gray-200 text-gray-700 rounded-full py-4 text-center font-bold text-base active:scale-95 transition-transform mt-3">
            Return to Home
          </div>
        </Link>
      </div>
 <BottomNav />
    </main>
  );
}