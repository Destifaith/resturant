'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/card';

// Type definitions
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
  details: string;
  customizations: Customization[];
}

// Sample item data - in a real app, this would come from a database or API
const ITEMS: Record<string, MenuItem> = {
  '1': {
    id: '1',
    name: 'Jollof Rice & Chicken',
    price: 45,
    img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
    desc: 'Fluffy red rice cooked in tomato sauce with perfectly seasoned chicken. A Ghanaian favorite served with plantain.',
    details: 'A traditional West African dish featuring aromatic jollof rice, slow-cooked with tomatoes, onions, and spices, paired with tender grilled chicken.',
    customizations: [
      { id: 'spicy', label: 'Make it Spicy?', default: false },
      { id: 'plantain', label: 'Add Plantain?', default: true }
    ]
  },
  '2': {
    id: '2',
    name: 'Waakye Special',
    price: 35,
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    desc: 'Savory rice and beans combo with stewed meat and fresh vegetables.',
    details: 'An authentic Ghanaian breakfast and lunch favorite. Waakye is a delicious combination of millet, rice, and red beans cooked together.',
    customizations: [
      { id: 'spicy', label: 'Make it Spicy?', default: false },
      { id: 'extra-meat', label: 'Add Extra Meat?', default: false }
    ]
  }
};

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = ITEMS[params.id] || ITEMS['1'];
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState<Record<string, boolean>>(
    item.customizations.reduce((acc: Record<string, boolean>, c: Customization) => {
      acc[c.id] = c.default;
      return acc;
    }, {})
  );

  const handleCustomizationChange = (id: string) => {
    setCustomizations(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const totalPrice = item.price * quantity;

  return (
    <main className="flex min-h-screen flex-col bg-background pb-28 md:pb-24">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 md:px-8 py-4 sticky top-0 bg-background/95 backdrop-blur z-20 border-b border-border">
        <Link href="/menu">
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-muted">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Item Details</h1>
      </header>

      {/* Content */}
      <div className="flex-1 px-5 md:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Product Image */}
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg bg-muted">
            <Image
              src={item.img}
              fill
              className="object-cover"
              alt={item.name}
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{item.name}</h2>
              <p className="text-2xl md:text-3xl font-bold text-primary mt-2">GHS {item.price}.00</p>
            </div>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {item.details}
            </p>
          </div>

          {/* Customizations */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-foreground">Customizations</h3>
            <div className="space-y-3">
              {item.customizations.map((customization: Customization) => (
                <Card key={customization.id} className="p-4 border border-border hover:border-primary/30 cursor-pointer transition-colors">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customizations[customization.id]}
                      onChange={() => handleCustomizationChange(customization.id)}
                      className="w-5 h-5 rounded cursor-pointer accent-primary"
                    />
                    <span className="text-base md:text-lg font-medium text-foreground flex-1">
                      {customization.label}
                    </span>
                  </label>
                </Card>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-foreground">Quantity</h3>
            <div className="flex items-center gap-4">
              <Button
                onClick={decrementQuantity}
                variant="outline"
                size="icon"
                className="h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-muted hover:border-primary text-foreground hover:text-primary transition-colors"
              >
                <Minus className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              
              <div className="flex-1 text-center">
                <span className="text-3xl md:text-4xl font-bold text-foreground">
                  {quantity}
                </span>
              </div>
              
              <Button
                onClick={incrementQuantity}
                className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary text-white hover:bg-primary/90 transition-all shadow-md"
                size="icon"
              >
                <Plus className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </div>
          </div>

          {/* Price Summary */}
          <Card className="p-5 md:p-6 bg-muted border-none space-y-3">
            <div className="flex justify-between items-center text-base">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold text-foreground">GHS {item.price}.00</span>
            </div>
            <div className="flex justify-between items-center text-base">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-bold text-foreground">x {quantity}</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between items-center text-xl md:text-2xl">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-primary">GHS {totalPrice}.00</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="fixed bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 z-30 max-w-2xl md:max-w-2xl mx-auto">
        <Link href="/cart">
          <Button className="w-full h-13 md:h-14 rounded-full bg-primary text-white hover:bg-primary/90 text-base md:text-lg font-bold shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 md:active:scale-100">
            <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
            <span>Add to Cart</span>
            <span className="ml-auto font-bold">GHS {totalPrice}.00</span>
          </Button>
        </Link>
      </div>
    </main>
  );
}
