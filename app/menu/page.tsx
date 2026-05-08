"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Plus, ChevronLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// 1. Mock Data (In a real app, this comes from Supabase)
const MENU_ITEMS = [
  { id: 1, name: "Fufu & Light Soup", price: 55, cat: "local", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd", desc: "Fresh goat meat with authentic pound fufu." },
  { id: 2, name: "Beef Burger", price: 85, cat: "inter", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", desc: "Double patty with caramelized onions." },
  { id: 3, name: "Jollof Rice Special", price: 65, cat: "local", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3", desc: "Smoky party jollof with grilled chicken." },
  { id: 4, name: "Stir Fry Noodles", price: 70, cat: "inter", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246", desc: "Veggie packed noodles with soy glaze." },
  { id: 5, name: "Sobolo (Chilled)", price: 15, cat: "drinks", img: "https://images.unsplash.com/photo-1544145945-f904253d0c7b", desc: "Local hibiscus spiced drink." },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "local", label: "Local" },
  { id: "inter", label: "Intercontinental" },
  { id: "drinks", label: "Drinks" },
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = MENU_ITEMS.filter(item => 
    (activeTab === "all" || item.cat === activeTab) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex min-h-screen flex-col bg-background pb-28 md:pb-24">
      {/* 1. Header */}
      <header className="px-5 md:px-8 pt-10 md:pt-12 pb-6 md:pb-8 sticky top-0 bg-background/95 backdrop-blur z-20 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-muted">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Our Menu</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-5 md:mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for a dish..." 
              className="pl-10 h-11 md:h-12 rounded-full bg-muted border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:pb-0 scroll-smooth">
            {CATEGORIES.map((cat) => (
              <Badge
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 md:px-5 py-2 rounded-full cursor-pointer transition-all whitespace-nowrap text-sm font-medium ${
                  activeTab === cat.id 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {/* 2. Menu List */}
      <div className="px-5 md:px-8 py-6 md:py-8 flex-1">
        <div className="max-w-7xl mx-auto space-y-4 md:space-y-5">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex items-start gap-4 md:gap-5 p-4 md:p-5 bg-card rounded-2xl border border-border hover:shadow-md transition-shadow duration-300 active:scale-95 md:active:scale-100">
              <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-2xl overflow-hidden shadow-sm shrink-0 bg-muted">
                <Image 
                  src={item.img} 
                  fill 
                  className="object-cover" 
                  alt={item.name} 
                  sizes="(max-width: 768px) 96px, 112px"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-sm md:text-base leading-tight">{item.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 my-2">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary text-base md:text-lg">GHS {item.price}.00</span>
                  <Button size="icon" className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary text-white hover:bg-primary/90 shadow-md active:scale-90 transition-transform">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-base md:text-lg">No dishes found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Floating Cart Bar */}
      <div className="fixed bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 z-30 max-w-7xl mx-auto">
        <Link href="/cart">
          <Button className="w-full h-13 md:h-14 rounded-full shadow-2xl bg-primary text-white hover:bg-primary/90 flex justify-between px-6 md:px-8 text-base md:text-lg font-bold transition-all active:scale-95 md:active:scale-100">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <span>View Order</span>
            </div>
            <span>GHS 0.00</span>
          </Button>
        </Link>
      </div>
    </main>
  );
}
