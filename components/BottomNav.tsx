"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingCart, User, Plus } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/6 flex items-center justify-around px-1 pt-1 pb-2 z-40">
      <NavItem
        href="/"
        label="Home"
        active={pathname === "/"}
        icon={
          <Home
            className={`w-3.5 h-3.5 ${pathname === "/" ? "fill-[#1E3A2F] text-[#1E3A2F]" : "text-gray-400"}`}
          />
        }
      />
      <NavItem
        href="/menu"
        label="Menu"
        active={isActive("/menu")}
        icon={<UtensilsCrossed className={`w-3.5 h-3.5 ${isActive("/menu") ? "text-[#1E3A2F]" : "text-gray-400"}`} />}
      />

      {/* Centre FAB */}
      <div className="-mt-4">
        <Link href="/menu">
          <button className="w-8 h-8 bg-[#1E3A2F] rounded-full flex items-center justify-center border-2 border-[#f5f0eb] hover:bg-[#2E5940] transition-colors active:scale-95">
            <Plus className="w-3.5 h-3.5 text-white" />
          </button>
        </Link>
      </div>

      <NavItem
        href="/cart"
        label="Cart"
        active={isActive("/cart")}
        icon={<ShoppingCart className={`w-3.5 h-3.5 ${isActive("/cart") ? "text-[#1E3A2F]" : "text-gray-400"}`} />}
      />
      <NavItem
        href="/profile"
        label="Profile"
        active={isActive("/profile")}
        icon={<User className={`w-3.5 h-3.5 ${isActive("/profile") ? "text-[#1E3A2F]" : "text-gray-400"}`} />}
      />
    </nav>
  );
}

function NavItem({
  href,
  label,
  active,
  icon,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href} className="flex flex-col items-center gap-0.5 px-1.5 py-0.5">
      {icon}
      <span className={`text-[8px] font-medium ${active ? "text-[#1E3A2F] font-semibold" : "text-gray-400"}`}>
        {label}
      </span>
      {active && <span className="w-0.5 h-0.5 rounded-full bg-[#E07B39]" />}
    </Link>
  );
}