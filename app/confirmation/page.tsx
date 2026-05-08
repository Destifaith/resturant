'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';

export default function ConfirmationPage() {
  // In a real app, this would come from the previous order/URL params
  const orderNumber = 'P1234';
  const estimatedTime = '15-20 mins';
  const orderTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Success Section */}
      <div className="flex-1 px-5 md:px-8 py-12 md:py-16 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl w-32 h-32 mx-auto"></div>
              <CheckCircle className="w-28 h-28 md:w-32 md:h-32 text-primary relative z-10" strokeWidth={1.5} />
            </div>
          </div>

          {/* Success Text */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Order Confirmed!</h1>
          <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
            Your delicious meal is being prepared and will be ready soon.
          </p>

          {/* Order Details Card */}
          <Card className="p-6 md:p-8 border border-border bg-card mb-8 space-y-5">
            {/* Order Number */}
            <div className="border-b border-border pb-5">
              <p className="text-muted-foreground text-sm mb-2">Order Number</p>
              <p className="text-2xl md:text-3xl font-bold text-primary">{orderNumber}</p>
            </div>

            {/* Estimated Time */}
            <div className="flex items-start gap-4 pb-5 border-b border-border">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-left flex-1">
                <p className="text-muted-foreground text-sm mb-1">Estimated Time</p>
                <p className="font-bold text-foreground">{estimatedTime}</p>
                <p className="text-xs text-muted-foreground mt-1">Ordered at {orderTime}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 pb-5 border-b border-border">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-left flex-1">
                <p className="text-muted-foreground text-sm mb-1">Delivery Location</p>
                <p className="font-bold text-foreground">Your Location</p>
                <p className="text-xs text-muted-foreground mt-1">We&apos;ll deliver to your provided address</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-left flex-1">
                <p className="text-muted-foreground text-sm mb-1">Need Help?</p>
                <p className="font-bold text-foreground">+233 24 000 0000</p>
                <p className="text-xs text-muted-foreground mt-1">Call us anytime for assistance</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/order-tracking" className="block">
              <Button className="w-full h-12 md:h-13 rounded-full bg-primary text-white hover:bg-primary/90 font-bold text-base">
                Track Status
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full h-12 md:h-13 rounded-full border-2 border-border text-foreground hover:bg-muted font-bold text-base">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-5 md:px-8 py-8 md:py-12 border-t border-border bg-card">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Thank you for your order! A confirmation email has been sent to your registered email address.
          </p>
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">View Order Details</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
            <a href="#" className="hover:text-primary transition-colors">Report an Issue</a>
          </div>
        </div>
      </div>
    </main>
  );
}
