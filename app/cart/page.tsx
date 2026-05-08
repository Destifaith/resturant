"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";


interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "Jollof Rice & Chicken", price: 45, quantity: 1, img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3" },
    { id: "2", name: "Add Plantain",           price: 45, quantity: 1, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" },
    { id: "3", name: "Saon Samar",             price: 45, quantity: 1, img: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445" },
  ]);

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) { setCartItems((items) => items.filter((i) => i.id !== id)); return; }
    setCartItems((items) => items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const subtotal   = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax        = Math.round(subtotal * 0.05 * 100) / 100;
  const serviceFee = 25;
  const total      = subtotal + tax + serviceFee;

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f0eb] pb-20">

      {/* ── HEADER ── */}
      <header className="bg-[#1E3A2F] px-4 pt-10 pb-4 flex items-center justify-between sticky top-0 z-20">
        <Link href="/menu">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ChevronLeft className="h-4 w-4 text-white" />
          </div>
        </Link>
        <h1 className="text-lg font-bold text-white">Cart</h1>
        <div className="w-8" />
      </header>

      {/* ── CART ITEMS ── */}
      <div className="flex-1 px-4 py-4 space-y-3">
        {cartItems.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="mb-4">Your cart is empty</p>
            <Link href="/menu" className="text-[#1E3A2F] font-bold">Browse Menu →</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 bg-white rounded-xl p-2.5 border border-black/4">
              <div className="relative h-14 w-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                <Image src={item.img} fill className="object-cover" alt={item.name} sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1">{item.name}</h3>
                <p className="text-[#1E3A2F] font-bold text-sm mt-1">GHS {item.price}.00</p>
              </div>
              {/* Qty controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
                >
                  {item.quantity === 1 ? <Trash2 className="h-3 w-3 text-red-400" /> : <Minus className="h-3 w-3 text-gray-600" />}
                </button>
                <span className="font-bold text-gray-900 text-sm w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full bg-[#1E3A2F] flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Plus className="h-3 w-3 text-white" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── PRICE SUMMARY & PROCEED BUTTON ── */}
      {cartItems.length > 0 && (
        <div className="px-4 pb-24">
          <div className="bg-white rounded-xl p-4 border border-black/4 space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-semibold text-gray-900">GHS {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Taxes (5%)</span>
              <span className="font-semibold text-gray-900">GHS {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Service Fee</span>
              <span className="font-semibold text-gray-900">GHS {serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-3 border-t border-gray-100">
              <span className="text-gray-900">Total</span>
              <span className="text-[#1E3A2F]">GHS {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Proceed to Order Button - Moved up */}
          <Link href="/order">
            <button className="w-full bg-[#E07B39] text-white rounded-full py-3.5 text-center font-bold text-sm shadow-lg active:scale-95 transition-transform">
              PROCEED TO ORDER • GHS {total.toFixed(2)}
            </button>
          </Link>
        </div>
      )}
      
      <BottomNav />
    </main>
  );
}