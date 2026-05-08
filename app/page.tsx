import Link from "next/link";
import Image from "next/image";
import { UtensilsCrossed, ArrowRight, MapPin, Phone, Globe } from "lucide-react"; // Changed Instagram to Globe
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 1. Define Types for your helper components
interface PromoProps {
  title: string;
  price: string;
  img: string;
  tag: string;
}

interface CategoryProps {
  title: string;
  img: string;
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      
      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-br from-primary to-primary/90 pt-12 pb-16 px-5 md:px-8 lg:px-24 md:rounded-b-3xl md:flex md:items-center md:justify-between md:gap-12">
        <div className="md:max-w-2xl md:flex-1">
          <div className="inline-flex items-center justify-center bg-white/20 w-16 h-16 rounded-full mb-6 md:mb-8">
            <UtensilsCrossed className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 md:mb-6 leading-tight">
            Welcome to <br /> The Canteen
          </h1>
          <p className="text-white/85 text-sm md:text-base lg:text-lg mb-8 md:mb-10 leading-relaxed max-w-xl">
            Experience authentic Ghanaian flavors and global cuisines, crafted fresh and served with care.
          </p>
          <Link href="/menu">
            <Button size="lg" className="w-full md:w-auto h-12 md:h-14 px-8 rounded-full text-base md:text-lg font-bold bg-white text-primary hover:bg-white/95 shadow-lg transition-all active:scale-95 touch-none">
              Explore Menu
              <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
            </Button>
          </Link>
        </div>
        
        <div className="hidden md:flex md:flex-1 items-center justify-center relative min-h-80">
          <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
          <UtensilsCrossed className="text-white/30 w-64 h-64 md:w-80 md:h-80 rotate-12 relative z-10" />
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-16 space-y-12 md:space-y-16">
        
        {/* SECTION: PROMOTIONS */}
        <section>
          <h2 className="font-bold text-2xl md:text-3xl text-foreground mb-6">Chef&apos;s Specials</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible scroll-smooth -mx-5 px-5 md:mx-0 md:px-0">
            <PromoCard title="Breakfast Special" price="45" img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" tag="20% OFF" />
            <PromoCard title="Spicy Jollof" price="65" img="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3" tag="POPULAR" />
            <div className="hidden md:block">
               <PromoCard title="Platter Mix" price="120" img="https://images.unsplash.com/photo-1555939594-58d7cb561ad1" tag="NEW" />
            </div>
          </div>
        </section>

        {/* SECTION: LOCAL DISHES */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground">Local Ghanaian Dishes</h2>
            <Link href="/menu?cat=local" className="text-primary font-bold text-sm md:text-base hover:opacity-80 transition-opacity">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <CategoryCard title="Fufu & Light Soup" img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" />
            <CategoryCard title="Banku & Tilapia" img="https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445" />
            <CategoryCard title="Waakye Special" img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" />
            <div className="hidden md:block">
              <CategoryCard title="Kelewele" img="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" />
            </div>
          </div>
        </section>

        {/* SECTION: INTERCONTINENTAL */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground">Intercontinental</h2>
            <Link href="/menu?cat=inter" className="text-primary font-bold text-sm md:text-base hover:opacity-80 transition-opacity">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <CategoryCard title="Grilled Salmon" img="https://images.unsplash.com/photo-1467003909585-2f8a72700288" />
            <CategoryCard title="Beef Burger" img="https://images.unsplash.com/photo-1568901346375-23c9450c58cd" />
            <CategoryCard title="Stir Fry Noodles" img="https://images.unsplash.com/photo-1585032226651-759b368d7246" />
            <div className="hidden md:block">
              <CategoryCard title="Pasta Carbonara" img="https://images.unsplash.com/photo-1546548970-71785318a17b" />
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-foreground text-muted-foreground py-12 md:py-16 px-5 md:px-8 lg:px-24 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
          <div>
            <h3 className="text-foreground font-bold text-lg md:text-xl mb-4">The Canteen</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Bringing the world to your table. Experience authentic Ghanaian hospitality combined with global culinary standards.
            </p>
          </div>
          <div>
            <h4 className="text-foreground font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/menu" className="hover:text-primary transition-colors">Full Menu</Link></li>
              <li><Link href="/orders" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><MapPin size={16} /> Kasoa, Central Region, Ghana</div>
              <div className="flex items-center gap-2"><Phone size={16} /> +233 24 000 0000</div>
              <div className="flex items-center gap-2"><Globe size={16} /> @thecanteen_gh</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-border pt-8 text-center text-xs">
          © 2026 The Canteen. Crafted for food lovers.
        </div>
      </footer>
    </main>
  );
}

// 2. Applied the types to the helper components
function PromoCard({ title, price, img, tag }: PromoProps) {
  return (
    <Card className="min-w-[280px] md:min-w-0 p-0 overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 relative group active:scale-95 md:active:scale-100">
      <div className="relative h-44 md:h-48 bg-muted overflow-hidden">
        <Image 
          src={img} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-300" 
          alt={title} 
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 320px, 380px" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute top-3 right-3 z-10 bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full">{tag}</div>
      </div>
      <div className="p-4 bg-card">
        <p className="font-bold text-sm md:text-base text-card-foreground">{title}</p>
        <p className="text-sm font-bold mt-2 text-primary">GHS {price}.00</p>
      </div>
    </Card>
  );
}

function CategoryCard({ title, img }: CategoryProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-28 md:h-36 rounded-2xl overflow-hidden mb-3 shadow-sm hover:shadow-md transition-shadow duration-300">
        <Image 
          src={img} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-300" 
          alt={title} 
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
      </div>
      <p className="text-xs md:text-sm font-bold text-center text-foreground line-clamp-2">{title}</p>
    </div>
  );
}
