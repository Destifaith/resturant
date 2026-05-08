"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Home, UtensilsCrossed, ShoppingCart, User, Plus } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface PromoProps {
  title: string;
  price: string;
  img: string;
  tag: string;
  tagStyle: "off" | "popular" | "new";
}

interface MenuCardProps {
  title: string;
  img: string;
  href?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────
const TABLES = ["TABLE 12", "TABLE 7", "TABLE 3", "TABLE 1", "TABLE 15"];

const PROMOS: PromoProps[] = [
  {
    title: "Breakfast Special",
    price: "45",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    tag: "20% OFF",
    tagStyle: "off",
  },
  {
    title: "Spicy Jollof",
    price: "65",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
    tag: "POPULAR",
    tagStyle: "popular",
  },
  {
    title: "Platter Mix",
    price: "120",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    tag: "NEW",
    tagStyle: "new",
  },
];

const MENU_ITEMS: MenuCardProps[] = [
  {
    title: "Jollof Rice & Chicken",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
    href: "/menu/jollof-rice",
  },
  {
    title: "Banku & Tilapia",
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445",
    href: "/menu/banku-tilapia",
  },
  {
    title: "Fufu & Light Soup",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    href: "/menu/fufu-light-soup",
  },
  {
    title: "Kelewele",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    href: "/menu/kelewele",
  },
];

const TAG_STYLES: Record<PromoProps["tagStyle"], string> = {
  off:     "bg-[#FFF0E6] text-[#C85A0A]",
  popular: "bg-[#E6F4EC] text-[#1E6B38]",
  new:     "bg-[#E8F0FE] text-[#1D4ED8]",
};

// ── Page ───────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [selectedTable, setSelectedTable] = useState("TABLE 12");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f0eb] font-sans">

      {/* ── HEADER ── */}
      <header className="bg-[#1E3A2F] px-5 pt-4 pb-0 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#2E5940] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C10 2 6 5 6 9C6 11.2 7.8 13 10 13C12.2 13 14 11.2 14 9C14 5 10 2 10 2Z" fill="#7BC67A"/>
              <path d="M10 13V18M8 18H12" stroke="#7BC67A" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7 7C7 7 5 8.5 5 10.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-white/60 text-[11px] tracking-widest uppercase">The Canteen</span>
        </div>

        {/* Table Selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7BC67A]" />
            <span className="text-white text-xs font-semibold">{selectedTable}</span>
            <ChevronDown className="text-white/60 w-3 h-3" />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute top-[calc(100%+8px)] right-0 bg-white rounded-xl border border-black/10 min-w-32.5 overflow-hidden z-50 shadow-xl">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3.5 pt-2.5 pb-1.5">
                  Select Table
                </p>
                {TABLES.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setSelectedTable(t); setDropdownOpen(false); }}
                    className="w-full text-left px-3.5 py-2 text-sm font-medium text-[#1E3A2F] hover:bg-[#f5f0eb] flex items-center justify-between"
                  >
                    {t.replace("TABLE ", "Table ")}
                    {selectedTable === t && <span className="text-[#3E8B5C] text-xs">✓</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="bg-[#1E3A2F] px-5 pt-7 pb-9 text-center">
        <p className="text-white/50 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2.5">
          Fresh · Daily · Authentic
        </p>
        <h1 className="text-[28px] font-extrabold text-white leading-tight tracking-tight mb-6">
          WELCOME TO<br />THE CANTEEN!
        </h1>
        <Link href="/menu">
          <button className="bg-[#E07B39] text-white font-semibold text-sm px-9 py-3 rounded-full hover:bg-[#cf6f2f] transition-colors active:scale-95">
            VIEW MENU →
          </button>
        </Link>
      </section>

      {/* ── WAVE DIVIDER ── */}
      <div className="bg-[#1E3A2F] leading-0">
        <svg viewBox="0 0 390 28" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-7">
          <path d="M0,0 C80,28 180,28 390,8 L390,0 Z" fill="#1E3A2F"/>
          <path d="M0,0 L0,28 C80,28 180,28 390,28 L390,8 C180,28 80,28 0,0 Z" fill="#f5f0eb"/>
        </svg>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 pb-24 bg-[#f5f0eb]">

        {/* Current Promotions */}
        <section>
          <div className="flex items-center justify-between px-5 pt-5 pb-3.5">
            <h2 className="font-bold text-base text-gray-900">Current Promotions</h2>
            <span className="text-xs font-semibold text-[#3E8B5C] cursor-pointer">See all →</span>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PROMOS.map((p) => (
              <PromoCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        {/* Browse Menu */}
        <section className="mt-2">
          <div className="flex items-center justify-between px-5 pt-5 pb-3.5">
            <h2 className="font-bold text-base text-gray-900">Browse Menu</h2>
            <Link href="/menu" className="text-xs font-semibold text-[#3E8B5C]">View all →</Link>
          </div>
          <div className="grid grid-cols-2 gap-2.5 px-5">
            {MENU_ITEMS.map((item) => (
              <MenuCard key={item.title} {...item} />
            ))}
          </div>
        </section>

      </div>

      {/* ── BOTTOM NAV ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/6 flex items-center justify-around px-2 pt-3 pb-5 z-40">
        <NavItem icon={<Home className="w-5 h-5 fill-[#1E3A2F] text-[#1E3A2F]" />} label="Home" active />
        <NavItem icon={<UtensilsCrossed className="w-5 h-5 text-gray-400" />} label="Menu" href="/menu" />

        {/* Centre FAB */}
        <div className="-mt-6">
          <button className="w-12 h-12 bg-[#1E3A2F] rounded-full flex items-center justify-center border-[3px] border-[#f5f0eb] hover:bg-[#2E5940] transition-colors active:scale-95">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        <NavItem icon={<ShoppingCart className="w-5 h-5 text-gray-400" />} label="Cart" href="/cart" />
        <NavItem icon={<User className="w-5 h-5 text-gray-400" />} label="Profile" href="/profile" />
      </nav>

    </main>
  );
}

// ── Helper Components ──────────────────────────────────────────────────────────
function PromoCard({ title, price, img, tag, tagStyle }: PromoProps) {
  return (
    <div className="min-w-37 bg-white rounded-2xl overflow-hidden shrink-0 border border-black5 group cursor-pointer">
      <div className="relative w-full h-24 bg-muted overflow-hidden">
        <Image
          src={img}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          alt={title}
          sizes="148px"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="p-3">
        <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 ${TAG_STYLES[tagStyle]}`}>
          {tag}
        </span>
        <p className="font-semibold text-xs text-gray-900 mb-1">{title}</p>
        <p className="font-bold text-sm text-[#3E8B5C]">GHS {price}.00</p>
      </div>
    </div>
  );
}

function MenuCard({ title, img, href = "#" }: MenuCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl overflow-hidden border border-black/5 group cursor-pointer hover:-translate-y-0.5 transition-transform active:scale-95">
        <div className="relative w-full h-20 bg-muted overflow-hidden">
          <Image
            src={img}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            alt={title}
            sizes="(max-width: 640px) 160px, 200px"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" />
        </div>
        <div className="px-2.5 py-2 flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-gray-900 leading-tight flex-1 line-clamp-2">{title}</p>
          <div className="w-5 h-5 bg-[#1E3A2F] rounded-full flex items-center justify-center shrink-0">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1.5 4H6.5M6.5 4L4.5 2M6.5 4L4.5 6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

function NavItem({
  icon,
  label,
  active,
  href = "#",
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 px-3 py-1">
      {icon}
      <span className={`text-[10px] font-medium ${active ? "text-[#1E3A2F] font-semibold" : "text-gray-400"}`}>
        {label}
      </span>
      {active && <span className="w-1 h-1 rounded-full bg-[#E07B39]" />}
    </Link>
  );
}