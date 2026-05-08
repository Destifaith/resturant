"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Smartphone, CreditCard, Wallet } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type PaymentMethod = "mobile" | "card" | "counter";

const PAYMENT_METHODS = [
  { id: "mobile"  as const, label: "Mobile Money (MoMo)", Icon: Smartphone },
  { id: "card"    as const, label: "Card",                 Icon: CreditCard },
  { id: "counter" as const, label: "Pay at Counter",       Icon: Wallet     },
];

export default function OrderPage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("mobile");
  const [name, setName] = useState("");

  const total = 75;

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f0eb]">

      {/* ── HEADER ── */}
      <header className="bg-[#1E3A2F] px-5 pt-12 pb-5 flex items-center justify-between">
        <Link href="/cart">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <ChevronLeft className="h-5 w-5 text-white" />
          </div>
        </Link>
        <h1 className="text-xl font-bold text-white">Order</h1>
        <div className="w-9" />
      </header>

      <div className="flex-1 px-5 py-6 pb-32 space-y-5">

        {/* ── PAYMENT SECTION ── */}
        <div className="bg-white rounded-2xl p-4 border border-black/4">
          <h2 className="font-bold text-gray-900 text-base mb-4">Payment</h2>
          <div className="space-y-2">
            {PAYMENT_METHODS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedPayment(id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  selectedPayment === id
                    ? "border-[#1E3A2F] bg-[#1E3A2F]/5"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                {/* Radio dot */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  selectedPayment === id ? "border-[#1E3A2F]" : "border-gray-300"
                }`}>
                  {selectedPayment === id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1E3A2F]" />
                  )}
                </div>
                <Icon className={`h-4 w-4 shrink-0 ${selectedPayment === id ? "text-[#1E3A2F]" : "text-gray-400"}`} />
                <span className={`text-sm font-semibold ${selectedPayment === id ? "text-[#1E3A2F]" : "text-gray-600"}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── CONFIRMATION ── */}
        <div className="bg-white rounded-2xl p-4 border border-black/4">
          <h2 className="font-bold text-gray-900 text-base mb-1">Confirmation</h2>
          <p className="text-gray-400 text-xs mb-4">Please confirm your name and details</p>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#1E3A2F]/40"
            />
          </div>
        </div>

        {/* ── SIMPLE CONTACT DETAILS ── */}
        <div className="bg-white rounded-2xl p-4 border border-black/4">
          <h2 className="font-bold text-gray-900 text-base mb-3">Simple contact details</h2>
          <input
            type="tel"
            placeholder="+233 24 000 0000"
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#1E3A2F]/40"
          />
        </div>

      </div>

      {/* ── PLACE ORDER BUTTON ── */}
      <div className="fixed bottom-5 left-5 right-5 z-30">
        <Link href="/confirmation">
          <div className="bg-[#1E3A2F] text-white rounded-full px-6 py-4 text-center font-bold text-base shadow-2xl active:scale-95 transition-transform">
            PLACE ORDER (GHS {total}.00)
          </div>
        </Link>
      </div>
       <BottomNav />
    </main>
  );
}