"use client"

import { Suspense } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { useSearchParams } from "next/navigation"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CookingPotIcon,
  PackageIcon,
  EyeIcon,
  PrinterIcon,
} from "lucide-react"

// Mock data
const mockOrders = [
  {
    id: "81234",
    table: "TABLE12",
    customerName: "John Doe",
    items: [{ name: "Jollof Rice & Chicken", quantity: 1, price: 45.00 }],
    total: 45.00,
    status: "preparing",
    paymentMethod: "Mobile Money",
    time: "10:30 AM",
  },
  {
    id: "81235",
    table: "TABLE5",
    customerName: "Jane Smith",
    items: [{ name: "Jollof Rice & Chicken", quantity: 1, price: 45.00 }],
    total: 70.00,
    status: "ready",
    paymentMethod: "Card",
    time: "10:25 AM",
  },
  {
    id: "81236",
    table: "TABLE8",
    customerName: "Mike Johnson",
    items: [{ name: "Jollof Rice & Chicken", quantity: 2, price: 90.00 }],
    total: 90.00,
    status: "waiting",
    paymentMethod: "Mobile Money",
    time: "10:15 AM",
  },
  {
    id: "81237",
    table: "TABLE3",
    customerName: "Sarah Williams",
    items: [{ name: "Jollof Rice & Chicken", quantity: 1, price: 45.00 }],
    total: 65.00,
    status: "completed",
    paymentMethod: "Pay at Counter",
    time: "09:45 AM",
  },
  {
    id: "81238",
    table: "TABLE7",
    customerName: "David Brown",
    items: [{ name: "Jollof Rice & Chicken", quantity: 1, price: 45.00 }],
    total: 95.00,
    status: "cancelled",
    paymentMethod: "Card",
    time: "09:30 AM",
  },
]

const statusConfig = {
  waiting: { label: "Waiting", color: "bg-blue-100 text-blue-800", icon: ClockIcon },
  preparing: { label: "Preparing", color: "bg-yellow-100 text-yellow-800", icon: CookingPotIcon },
  ready: { label: "Ready", color: "bg-green-100 text-green-800", icon: CheckCircleIcon },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-800", icon: PackageIcon },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircleIcon },
}

// Component that uses useSearchParams - wrapped in Suspense
function OrdersContent() {
  const searchParams = useSearchParams()
  const statusFilter = searchParams.get("status")

  // Determine which orders to show based on URL param
  const getFilteredOrders = () => {
    if (statusFilter === "completed") {
      return mockOrders.filter(order => order.status === "completed")
    }
    if (statusFilter === "cancelled") {
      return mockOrders.filter(order => order.status === "cancelled")
    }
    // Default: "active" shows waiting, preparing, ready
    return mockOrders.filter(order => ["waiting", "preparing", "ready"].includes(order.status))
  }

  const filteredOrders = getFilteredOrders()

  const getPageTitle = () => {
    if (statusFilter === "completed") return "Completed Orders"
    if (statusFilter === "cancelled") return "Cancelled Orders"
    return "Active Orders"
  }

  const getPageDescription = () => {
    if (statusFilter === "completed") return "Orders that have been served and completed"
    if (statusFilter === "cancelled") return "Orders that were cancelled"
    return "Orders currently being prepared or ready for pickup"
  }

  const getStatusCount = (type: string) => {
    if (type === "active") {
      return mockOrders.filter(order => ["waiting", "preparing", "ready"].includes(order.status)).length
    }
    if (type === "completed") {
      return mockOrders.filter(order => order.status === "completed").length
    }
    if (type === "cancelled") {
      return mockOrders.filter(order => order.status === "cancelled").length
    }
    return 0
  }

  return (
    <>
      {/* Status Summary Cards - Clickable to navigate */}
      <div className="grid gap-4 md:grid-cols-3">
        <a href="/dashboard/orders?status=active" className="block">
          <Card className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "active" || !statusFilter ? "ring-2 ring-primary" : ""}`}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{getStatusCount("active")}</div>
              <p className="text-sm text-muted-foreground">Active Orders</p>
              <p className="text-xs text-muted-foreground mt-1">Waiting • Preparing • Ready</p>
            </CardContent>
          </Card>
        </a>

        <a href="/dashboard/orders?status=completed" className="block">
          <Card className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "completed" ? "ring-2 ring-primary" : ""}`}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{getStatusCount("completed")}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-xs text-muted-foreground mt-1">Finished orders</p>
            </CardContent>
          </Card>
        </a>

        <a href="/dashboard/orders?status=cancelled" className="block">
          <Card className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "cancelled" ? "ring-2 ring-primary" : ""}`}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{getStatusCount("cancelled")}</div>
              <p className="text-sm text-muted-foreground">Cancelled</p>
              <p className="text-xs text-muted-foreground mt-1">Cancelled orders</p>
            </CardContent>
          </Card>
        </a>
      </div>

      {/* Orders List - Changes based on URL param */}
      <Card>
        <CardHeader>
          <CardTitle>{getPageTitle()}</CardTitle>
          <p className="text-sm text-muted-foreground">{getPageDescription()}</p>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No {getPageTitle().toLowerCase()} found
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                        <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </Badge>
                        <Badge variant="outline">{order.table}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Customer: {order.customerName}</p>
                        <p>Items: {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-bold text-lg">GHS {order.total.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{order.paymentMethod}</p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <PrinterIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

// Main page component with Suspense boundary
export default function OrdersPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 self-auto" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Orders</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading orders...</p>
              </div>
            </div>
          }>
            <OrdersContent />
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}