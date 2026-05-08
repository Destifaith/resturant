'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Jollof Rice & Chicken',
      price: 45,
      quantity: 2,
      img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
    },
    {
      id: '2',
      name: 'Fufu & Light Soup',
      price: 35,
      quantity: 1,
      img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    },
    {
      id: '3',
      name: 'Grilled Salmon',
      price: 75,
      quantity: 1,
      img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const serviceFee = 25;
  const total = subtotal + tax + serviceFee;

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col bg-background pb-32 md:pb-24">
      {/* Header */}
      <header className="px-5 md:px-8 pt-10 md:pt-12 pb-6 sticky top-0 bg-background/95 backdrop-blur z-20 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Link href="/menu">
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-muted">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Your Cart</h1>
        </div>
      </header>

      {/* Cart Items */}
      <div className="px-5 md:px-8 py-6 md:py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
              <Link href="/menu">
                <Button className="bg-primary text-white hover:bg-primary/90">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-5">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4 md:p-5 border border-border flex gap-4 items-start">
                  {/* Item Image */}
                  <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-2xl overflow-hidden shrink-0 bg-muted">
                    <Image
                      src={item.img}
                      fill
                      className="object-cover"
                      alt={item.name}
                      sizes="(max-width: 768px) 96px, 112px"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-foreground text-sm md:text-base">{item.name}</h3>
                      <p className="text-primary font-bold text-base md:text-lg mt-2">GHS {item.price}.00</p>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 bg-muted rounded-full p-1.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 rounded-full hover:bg-background"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-foreground w-6 text-center text-sm">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 rounded-full hover:bg-background"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing Summary */}
      {cartItems.length > 0 && (
        <div className="px-5 md:px-8 py-6 md:py-8 border-t border-border bg-card">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold text-foreground">GHS {subtotal.toFixed(2)}</span>
            </div>

            {/* Tax */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax (5%)</span>
              <span className="font-bold text-foreground">GHS {tax.toFixed(2)}</span>
            </div>

            {/* Service Fee */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="text-muted-foreground">Service Fees</span>
              <span className="font-bold text-foreground">GHS {serviceFee.toFixed(2)}</span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-foreground">Total</span>
              <span className="text-2xl md:text-3xl font-bold text-primary">GHS {total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" className="block">
              <Button className="w-full h-13 md:h-14 rounded-full bg-primary text-white hover:bg-primary/90 font-bold text-base md:text-lg mt-6">
                Proceed to Order
              </Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
