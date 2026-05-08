"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShoppingBag, Minus, Plus } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Customization {
  id: string;
  label: string;
  default: boolean;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  img: string;
  desc: string;
  customizations: Customization[];
}

const ITEMS: Record<string, MenuItem> = {
  "1": {
    id: "1",
    name: "Jollof Rice & Chicken",
    price: 45,
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
    desc: "Fluffy red rice cooked in tomato sauce with perfectly seasoned grilled chicken. A Ghanaian favorite served with plantain.",
    customizations: [
      { id: "spicy",    label: "Spicy?",        default: false },
      { id: "plantain", label: "Add Plantain?",  default: false },
    ],
  },
  "2": {
    id: "2",
    name: "Fufu & Light Soup",
    price: 55,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    desc: "Authentic pounded fufu with a rich goat meat light soup. A true Ghanaian classic.",
    customizations: [
      { id: "spicy",      label: "Spicy?",            default: false },
      { id: "extra-meat", label: "Add Extra Meat?",    default: false },
    ],
  },
  "3": {
    id: "3",
    name: "Beef Burger",
    price: 85,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    desc: "Double patty beef burger with caramelized onions, fresh lettuce and golden fries.",
    customizations: [
      { id: "extra-cheese", label: "Add Extra Cheese?", default: false },
      { id: "no-onions",    label: "No Onions?",         default: false },
    ],
  },
  "4": {
    id: "4",
    name: "Stir Fry Noodles",
    price: 70,
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
    desc: "Veggie packed stir fry noodles with a rich soy glaze and sesame seeds.",
    customizations: [
      { id: "spicy",  label: "Spicy?",          default: false },
      { id: "prawns", label: "Add Prawns?",      default: false },
    ],
  },
};

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = ITEMS[params.id] ?? ITEMS["1"];

  const [quantity, setQuantity] = useState(1);
  const [toggles, setToggles]   = useState<Record<string, boolean>>(
    Object.fromEntries(item.customizations.map((c) => [c.id, c.default]))
  );

  const toggle = (id: string) =>
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  const total = item.price * quantity;

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f0eb]">

      {/* ── FOOD IMAGE (full width) ── */}
      <div className="relative w-full h-72 bg-gray-200">
        <Image
          src={item.img}
          fill
          className="object-cover"
          alt={item.name}
          sizes="100vw"
          priority
        />
        {/* Gradient overlay for header icons */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-transparent" />

        {/* Back + Cart icons on top of image */}
        <div className="absolute top-12 left-5 right-5 flex items-center justify-between">
          <Link href="/menu">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ChevronLeft className="h-5 w-5 text-white" />
            </div>
          </Link>
          <Link href="/cart">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
          </Link>
        </div>
      </div>

      {/* ── CONTENT CARD (slides up over image) ── */}
      <div className="flex-1 bg-[#f5f0eb] -mt-5 rounded-t-3xl px-5 pt-6 pb-32 relative z-10">

        {/* Name + Price */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">{item.name}</h1>
          <p className="text-[#1E3A2F] font-bold text-xl mt-1">GHS {item.price}.00</p>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.desc}</p>
        </div>

        {/* ── CUSTOMISATIONS (Toggle Switches) ── */}
        <div className="space-y-3 mb-8">
          {item.customizations.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between bg-white rounded-2xl px-4 py-3.5 border border-black/4"
            >
              <span className="font-semibold text-gray-800 text-sm">{c.label}</span>
              {/* Toggle switch */}
              <button
                onClick={() => toggle(c.id)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  toggles[c.id] ? "bg-[#1E3A2F]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    toggles[c.id] ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* ── QUANTITY STEPPER ── */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center active:scale-90 transition-transform"
          >
            <Minus className="h-4 w-4 text-gray-600" />
          </button>
          <span className="text-3xl font-extrabold text-gray-900 w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 rounded-full bg-[#1E3A2F] flex items-center justify-center active:scale-90 transition-transform shadow-md"
          >
            <Plus className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      {/* ── ADD TO CART BUTTON ── */}
      <div className="fixed bottom-5 left-5 right-5 z-30">
        <Link href="/cart">
          <div className="bg-[#E07B39] text-white rounded-full px-6 py-4 flex items-center justify-between shadow-2xl active:scale-95 transition-transform">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5" />
              <span className="font-bold text-base">ADD TO CART</span>
            </div>
            <span className="font-bold text-base">GHS {total}.00</span>
          </div>
        </Link>
      </div>
       <BottomNav />
    </main>
  );
}