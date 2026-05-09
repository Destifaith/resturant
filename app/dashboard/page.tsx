"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ClipboardListIcon,
  UtensilsIcon,
  CreditCardIcon,
  TrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-4">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Stats Cards */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders Today</CardTitle>
                <ClipboardListIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+12% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue (Today)</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GHS 1,080</div>
                <p className="text-xs text-muted-foreground">+8% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">4 waiting, 3 preparing, 1 ready</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
                <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GHS 1,080</div>
                <p className="text-xs text-muted-foreground">MM: GHS 540 | Card: GHS 270 | Counter: GHS 270</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders Section */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "#81234", table: "TABLE12", items: "Jollof Rice & Chicken", total: "GHS 45.00", status: "Preparing", time: "5 min ago" },
                  { id: "#81235", table: "TABLE5", items: "Jollof Rice & Chicken + Plantain", total: "GHS 70.00", status: "Ready", time: "12 min ago" },
                  { id: "#81236", table: "TABLE8", items: "2x Jollof Rice & Chicken", total: "GHS 90.00", status: "Waiting", time: "18 min ago" },
                  { id: "#81237", table: "TABLE3", items: "Jollof Rice & Chicken + Drink", total: "GHS 65.00", status: "Completed", time: "32 min ago" },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">{order.id} - {order.table}</p>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium">{order.total}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "Preparing" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                          order.status === "Ready" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                          order.status === "Waiting" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-xs text-muted-foreground">{order.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bottom Row */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Top Selling Items */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><UtensilsIcon className="h-4 w-4" /> Jollof Rice & Chicken</span>
                    <span className="font-semibold">45 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><UtensilsIcon className="h-4 w-4" /> Plantain (Add-on)</span>
                    <span className="font-semibold">28 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><UtensilsIcon className="h-4 w-4" /> Soft Drinks</span>
                    <span className="font-semibold">22 orders</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions / Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Alerts &amp; Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg">
                    <AlertCircleIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Low Stock Alert</p>
                      <p className="text-xs text-muted-foreground">Jollof Rice running low (15 servings left)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 bg-green-50 dark:bg-green-950/50 rounded-lg">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Promotion Active</p>
                      <p className="text-xs text-muted-foreground">“Current promotions” - 10% off on Jollof Rice</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}