'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Wallet, CreditCard, MapPin, Smartphone } from 'lucide-react';

type PaymentMethod = 'mobile' | 'card' | 'counter';

const PAYMENT_METHODS = [
  {
    id: 'mobile' as const,
    label: 'Mobile Money (Vodafone)',
    icon: Smartphone,
    description: 'Quick and secure payment via mobile',
  },
  {
    id: 'card' as const,
    label: 'Card',
    icon: CreditCard,
    description: 'Debit or credit card',
  },
  {
    id: 'counter' as const,
    label: 'Pay at Counter',
    icon: Wallet,
    description: 'Pay when your order arrives',
  },
];

export default function OrderPage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('mobile');

  return (
    <main className="flex min-h-screen flex-col bg-background pb-24 md:pb-20">
      {/* Header */}
      <header className="px-5 md:px-8 pt-10 md:pt-12 pb-6 md:pb-8 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-20">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-muted">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Order Details</h1>
        </div>
      </header>

      {/* Content */}
      <div className="px-5 md:px-8 py-6 md:py-8 flex-1">
        <div className="max-w-2xl mx-auto space-y-8 md:space-y-10">
          
          {/* Order Summary Card */}
          <Card className="p-5 md:p-6 border border-border bg-card">
            <h2 className="font-bold text-lg md:text-xl text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>GHS 45.00</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>GHS 2.25</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service Fee</span>
                <span>GHS 25.00</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary text-lg">GHS 72.25</span>
              </div>
            </div>
          </Card>

          {/* Delivery Address */}
          <Card className="p-5 md:p-6 border border-border bg-card">
            <h2 className="font-bold text-lg md:text-xl text-foreground mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Delivery Address
            </h2>
            <div className="space-y-2 text-sm md:text-base text-foreground">
              <p className="font-medium">Your Home</p>
              <p className="text-muted-foreground">123 Main Street, Kasoa, Central Region, Ghana</p>
            </div>
          </Card>

          {/* Payment Method Selection */}
          <div>
            <h2 className="font-bold text-lg md:text-xl text-foreground mb-4">Select Payment Method</h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedPayment === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full p-4 md:p-5 rounded-2xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-border bg-card'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                          <h3 className="font-bold text-foreground">{method.label}</h3>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">{method.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Details */}
          <Card className="p-5 md:p-6 border border-border bg-card">
            <h2 className="font-bold text-lg md:text-xl text-foreground mb-4">Contact Details</h2>
            <div className="space-y-2 text-sm md:text-base text-foreground">
              <p className="font-medium">Please confirm your phone number</p>
              <p className="text-muted-foreground">+233 24 123 4567</p>
            </div>
          </Card>

        </div>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 z-30 max-w-2xl md:max-w-none">
        <Link href="/confirmation">
          <Button className="w-full h-13 md:h-14 rounded-full shadow-2xl bg-primary text-white hover:bg-primary/90 text-base md:text-lg font-bold transition-all active:scale-95 md:active:scale-100">
            Place Order
            <span className="ml-2 text-white/80">GHS 72.25</span>
          </Button>
        </Link>
      </div>
    </main>
  );
}
