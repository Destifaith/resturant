"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, ChevronLeft, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const MENU_ITEMS = [
  { id: 1, name: "Jollof Rice & Chicken", price: 45, cat: "mains", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3", desc: "Smoky party jollof with grilled chicken and plantain." },
  { id: 2, name: "Fufu & Light Soup", price: 55, cat: "mains", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd", desc: "Fresh goat meat with authentic pounded fufu." },
  { id: 3, name: "Beef Burger", price: 85, cat: "mains", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", desc: "Double patty with caramelized onions and fries." },
  { id: 4, name: "Stir Fry Noodles", price: 70, cat: "mains", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246", desc: "Veggie packed noodles with soy glaze." },
  { id: 5, name: "Sobolo (Chilled)", price: 15, cat: "drinks", img: "https://images.unsplash.com/photo-1544145945-f904253d0c7b", desc: "Local hibiscus spiced drink, served cold." },
  { id: 6, name: "Fresh Mango Juice", price: 20, cat: "drinks", img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba", desc: "Freshly blended mango with a hint of ginger." },
  { id: 7, name: "French Fries", price: 25, cat: "sides", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877", desc: "Crispy golden fries with your choice of dip." },
  { id: 8, name: "Kelewele", price: 20, cat: "sides", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", desc: "Spiced fried plantain cubes, a Ghanaian street snack." },
];

const CATEGORIES = [
  { id: "all",    label: "All" },
  { id: "mains",  label: "Mains" },
  { id: "drinks", label: "Drinks" },
  { id: "sides",  label: "Sides" },
];

export default function MenuPage() {
  const [activeTab, setActiveTab]     = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount]     = useState(0);
  const [cartTotal, setCartTotal]     = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredItems = MENU_ITEMS.filter(
    (item) =>
      (activeTab === "all" || item.cat === activeTab) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      item.price >= priceRange[0] && 
      item.price <= priceRange[1] &&
      (selectedCategories.length === 0 || selectedCategories.includes(item.cat))
  );

  const addToCart = (price: number) => {
    setCartCount((c) => c + 1);
    setCartTotal((t) => t + price);
  };

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCategories([]);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f0eb]">

      {/* ── HEADER (Reduced Size) ── */}
      <header className="bg-[#1E3A2F] px-4 pt-10 pb-3 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <Link href="/">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <ChevronLeft className="h-4 w-4 text-white" />
            </div>
          </Link>
          
          {/* Logo */}
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍽️</span>
            </div>
          </div>
          
          <Link href="/cart">
            <div className="relative w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E07B39] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Search with Filter Button */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-10 h-10 bg-white/10 border border-white/10 rounded-full flex items-center justify-center shrink-0 hover:bg-white/15 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4 text-white" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              placeholder="Search for a dish..."
              className="w-full bg-white/10 border border-white/10 text-white placeholder:text-white/40 pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:border-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Pills - Maintained */}
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === cat.id
                  ? "bg-white text-[#1E3A2F]"
                  : "bg-white/15 text-white/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── MENU LIST ── */}
      <div className="flex-1 px-4 py-4 space-y-3 pb-28">
        {filteredItems.map((item) => (
          <Link href={`/item/${item.id}`} key={item.id}>
            <div className="flex items-center gap-3 bg-white rounded-xl p-2.5 border border-black4 active:scale-[0.98] transition-transform">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={item.img}
                  fill
                  className="object-cover"
                  alt={item.name}
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 leading-relaxed">{item.desc}</p>
                <p className="text-[#1E3A2F] font-bold text-sm mt-1">GHS {item.price}.00</p>
              </div>
              <button
                onClick={(e) => { e.preventDefault(); addToCart(item.price); }}
                className="w-7 h-7 bg-[#1E3A2F] rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
              >
                <Plus className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          </Link>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>No dishes found.</p>
          </div>
        )}
      </div>

      {/* ── FLOATING CART BAR ── */}
      {cartCount > 0 && (
        <div className="fixed bottom-16 left-4 right-4 z-30">
          <Link href="/cart">
            <div className="bg-[#1E3A2F] text-white rounded-full px-5 py-3 flex items-center justify-between shadow-2xl active:scale-95 transition-transform">
              <div className="flex items-center gap-2">
                <div className="bg-white/15 px-2 py-0.5 rounded-full">
                  <span className="text-xs font-bold">{cartCount}</span>
                </div>
                <span className="font-bold text-sm">View Order</span>
              </div>
              <span className="font-bold text-sm">GHS {cartTotal}.00</span>
            </div>
          </Link>
        </div>
      )}
      
      <BottomNav />

      {/* ── FULL PAGE FILTER OVERLAY ── */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-white animate-in slide-in-from-right duration-300">
          <div className="flex flex-col h-full">
            {/* Filter Header */}
            <div className="bg-[#1E3A2F] px-4 pt-12 pb-4 sticky top-0">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-lg font-bold">Filter Menu</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
              {/* Price Range Filter */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GHS {priceRange[0]}</span>
                    <span>GHS {priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Math.max(0, parseInt(e.target.value) || 0), priceRange[1]])}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Math.min(200, parseInt(e.target.value) || 0)])}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.filter(cat => cat.id !== "all").map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 py-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1E3A2F] focus:ring-[#1E3A2F]"
                      />
                      <span className="text-gray-700">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="border-t border-gray-200 px-4 py-4 bg-white">
              <div className="flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 border border-gray-300 rounded-full text-gray-700 font-semibold text-sm"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-3 bg-[#1E3A2F] text-white rounded-full font-semibold text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}