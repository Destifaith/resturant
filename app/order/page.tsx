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
  const [phone, setPhone] = useState("");

  const total = 75;

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f0eb] pb-20">

      {/* ── HEADER (Reduced) ── */}
      <header className="bg-[#1E3A2F] px-4 pt-10 pb-4 flex items-center justify-between sticky top-0 z-20">
        <Link href="/cart">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ChevronLeft className="h-4 w-4 text-white" />
          </div>
        </Link>
        <h1 className="text-lg font-bold text-white">Order</h1>
        <div className="w-8" />
      </header>

      <div className="flex-1 px-4 py-4 space-y-4 pb-32">

        {/* ── PAYMENT SECTION ── */}
        <div className="bg-white rounded-xl p-4 border border-black/4">
          <h2 className="font-bold text-gray-900 text-sm mb-3">Payment Method</h2>
          <div className="space-y-2">
            {PAYMENT_METHODS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedPayment(id)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                  selectedPayment === id
                    ? "border-[#1E3A2F] bg-[#1E3A2F]/5"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                {/* Radio dot */}
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  selectedPayment === id ? "border-[#1E3A2F]" : "border-gray-300"
                }`}>
                  {selectedPayment === id && (
                    <div className="w-2 h-2 rounded-full bg-[#1E3A2F]" />
                  )}
                </div>
                <Icon className={`h-3.5 w-3.5 shrink-0 ${selectedPayment === id ? "text-[#1E3A2F]" : "text-gray-400"}`} />
                <span className={`text-sm font-medium ${selectedPayment === id ? "text-[#1E3A2F]" : "text-gray-600"}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── CONFIRMATION ── */}
        <div className="bg-white rounded-xl p-4 border border-black/4">
          <h2 className="font-bold text-gray-900 text-sm mb-1">Confirmation</h2>
          <p className="text-gray-400 text-xs mb-3">Please confirm your name and details</p>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#1E3A2F]/40"
            />
          </div>
        </div>

        {/* ── CONTACT DETAILS ── */}
        <div className="bg-white rounded-xl p-4 border border-black/4">
          <h2 className="font-bold text-gray-900 text-sm mb-2">Contact Details</h2>
          <input
            type="tel"
            placeholder="+233 24 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#1E3A2F]/40"
          />
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div className="bg-white rounded-xl p-4 border border-black/4">
          <h2 className="font-bold text-gray-900 text-sm mb-2">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-semibold text-gray-900">GHS {total}.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Delivery Fee</span>
              <span className="font-semibold text-gray-900">GHS 0.00</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-100">
              <span className="text-gray-900">Total</span>
              <span className="text-[#1E3A2F]">GHS {total}.00</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── PLACE ORDER BUTTON (Moved Up) ── */}
      <div className="px-4 pb-24">
        <Link href="/confirmation">
          <button className="w-full bg-[#E07B39] text-white rounded-full py-3.5 text-center font-bold text-sm shadow-lg active:scale-95 transition-transform">
            PLACE ORDER • GHS {total}.00
          </button>
        </Link>
      </div>
      
      <BottomNav />
    </main>
  );
}