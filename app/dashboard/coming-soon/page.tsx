"use client"

import { useState, useEffect, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BellIcon,
  UtensilsIcon,
  CoffeeIcon,
  SandwichIcon,
  SparklesIcon,
  ChevronRightIcon,
} from "lucide-react"
import Link from "next/link"

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Use useMemo to prevent recreation on every render
  const launchDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [launchDate])

  const features = [
    {
      icon: <UtensilsIcon className="h-6 w-6" />,
      title: "QR Ordering System",
      description: "Customers can scan and order directly from their tables",
    },
    {
      icon: <BellIcon className="h-6 w-6" />,
      title: "Real-time Notifications",
      description: "Instant updates on orders and status changes",
    },
    {
      icon: <CoffeeIcon className="h-6 w-6" />,
      title: "Digital Menu",
      description: "Easy to update menu with images and prices",
    },
    {
      icon: <SandwichIcon className="h-6 w-6" />,
      title: "Promotion Engine",
      description: "Create and manage discounts and special offers",
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-linear-to-br from-orange-500 via-red-500 to-orange-600">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-100 text-center px-4 py-16">
              {/* Logo/Brand */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <UtensilsIcon className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                  The Canteen
                </h1>
                <p className="text-white/80 text-lg">Restaurant Management System</p>
              </div>

              {/* Coming Soon Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
                <SparklesIcon className="h-4 w-4 text-yellow-300" />
                <span className="text-white font-medium">Coming Soon</span>
              </div>

              {/* Description */}
              <p className="text-white/90 text-lg max-w-2xl mb-12">
                We&apos;re working hard to bring you the best restaurant management experience. 
                Get ready to streamline your operations and delight your customers.
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Launching In</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl md:text-5xl font-bold text-primary">
                      {timeLeft.days}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Days</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl md:text-5xl font-bold text-primary">
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Hours</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl md:text-5xl font-bold text-primary">
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Minutes</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl md:text-5xl font-bold text-primary">
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Seconds</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-12 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-4">What&apos;s Coming?</h2>
              <p className="text-center text-muted-foreground mb-12">
                Everything you need to manage your restaurant efficiently
              </p>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="py-12 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Development Progress</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>QR Ordering System</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Admin Dashboard</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Mobile App Integration</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Analytics &amp; Reporting</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="py-12 px-4 bg-linear-to-r from-orange-500 to-red-500">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Get notified when we launch
              </h2>
              <p className="text-white/80 mb-6">
                Be the first to know when The Canteen Management System is ready
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="bg-white text-orange-600 hover:bg-white/90">
                  Notify Me
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t">
            <p>&copy; 2026 The Canteen. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link href="/dashboard" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/dashboard/orders" className="hover:text-primary transition-colors">
                Orders
              </Link>
              <Link href="/dashboard/menu" className="hover:text-primary transition-colors">
                Menu
              </Link>
              <Link href="/dashboard/promotions" className="hover:text-primary transition-colors">
                Promotions
              </Link>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}