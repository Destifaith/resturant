"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Building2Icon,
  DollarSignIcon,
  BellIcon,
  ShieldIcon,
} from "lucide-react"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    restaurantName: "The Canteen",
    email: "info@thecanteen.com",
    phone: "+233 20 123 4567",
    address: "123 Restaurant Street, Accra, Ghana",
    currency: "GHS",
    timezone: "Africa/Accra",
  })

  const [feeSettings, setFeeSettings] = useState({
    serviceFee: 25.00,
    serviceFeeEnabled: true,
    deliveryFee: 10.00,
    deliveryFeeEnabled: false,
    minOrderForFreeDelivery: 100.00,
    taxRate: 12.5,
    taxEnabled: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    orderReceived: true,
    orderReady: true,
    orderCompleted: true,
    lowStockAlert: true,
    promotionUpdates: false,
    dailyReport: true,
  })

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
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your restaurant preferences and configurations</p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-100">
              <TabsTrigger value="general" className="gap-2">
                <Building2Icon className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="fees" className="gap-2">
                <DollarSignIcon className="h-4 w-4" />
                Fees & Tax
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <BellIcon className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="advanced" className="gap-2">
                <ShieldIcon className="h-4 w-4" />
                Advanced
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Information</CardTitle>
                  <CardDescription>
                    Update your restaurant&apos;s basic information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="restaurantName">Restaurant Name</Label>
                      <Input
                        id="restaurantName"
                        value={generalSettings.restaurantName}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, restaurantName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={generalSettings.email}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={generalSettings.phone}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={generalSettings.currency}
                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GHS">GHS - Ghana Cedi</SelectItem>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Restaurant Address</Label>
                      <Input
                        id="address"
                        value={generalSettings.address}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={generalSettings.timezone}
                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Accra">Africa/Accra (GMT+0)</SelectItem>
                          <SelectItem value="Africa/Lagos">Africa/Lagos (GMT+1)</SelectItem>
                          <SelectItem value="Africa/Nairobi">Africa/Nairobi (GMT+3)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="mt-4">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fees & Tax Settings */}
            <TabsContent value="fees" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Service Fees & Tax</CardTitle>
                  <CardDescription>
                    Configure additional charges and tax rates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Service Fee</Label>
                      <p className="text-sm text-muted-foreground">Charge a service fee on all orders</p>
                    </div>
                    <Switch
                      checked={feeSettings.serviceFeeEnabled}
                      onCheckedChange={(checked) => setFeeSettings({ ...feeSettings, serviceFeeEnabled: checked })}
                    />
                  </div>
                  {feeSettings.serviceFeeEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="serviceFee">Service Fee Amount (GHS)</Label>
                      <Input
                        id="serviceFee"
                        type="number"
                        step="0.01"
                        value={feeSettings.serviceFee}
                        onChange={(e) => setFeeSettings({ ...feeSettings, serviceFee: parseFloat(e.target.value) })}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <Label>Delivery Fee</Label>
                      <p className="text-sm text-muted-foreground">Charge for delivery orders</p>
                    </div>
                    <Switch
                      checked={feeSettings.deliveryFeeEnabled}
                      onCheckedChange={(checked) => setFeeSettings({ ...feeSettings, deliveryFeeEnabled: checked })}
                    />
                  </div>
                  {feeSettings.deliveryFeeEnabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="deliveryFee">Delivery Fee Amount (GHS)</Label>
                        <Input
                          id="deliveryFee"
                          type="number"
                          step="0.01"
                          value={feeSettings.deliveryFee}
                          onChange={(e) => setFeeSettings({ ...feeSettings, deliveryFee: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minOrderForFreeDelivery">Minimum Order for Free Delivery (GHS)</Label>
                        <Input
                          id="minOrderForFreeDelivery"
                          type="number"
                          step="0.01"
                          value={feeSettings.minOrderForFreeDelivery}
                          onChange={(e) => setFeeSettings({ ...feeSettings, minOrderForFreeDelivery: parseFloat(e.target.value) })}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <Label>Tax (VAT)</Label>
                      <p className="text-sm text-muted-foreground">Apply tax to all orders</p>
                    </div>
                    <Switch
                      checked={feeSettings.taxEnabled}
                      onCheckedChange={(checked) => setFeeSettings({ ...feeSettings, taxEnabled: checked })}
                    />
                  </div>
                  {feeSettings.taxEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        step="0.1"
                        value={feeSettings.taxRate}
                        onChange={(e) => setFeeSettings({ ...feeSettings, taxRate: parseFloat(e.target.value) })}
                      />
                    </div>
                  )}

                  <Button className="mt-4">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure when and how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Order Received</Label>
                      <p className="text-sm text-muted-foreground">Get notified when a new order comes in</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderReceived}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, orderReceived: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Order Ready</Label>
                      <p className="text-sm text-muted-foreground">Notify when order is ready for pickup</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderReady}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, orderReady: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Order Completed</Label>
                      <p className="text-sm text-muted-foreground">Notify when order is completed</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderCompleted}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, orderCompleted: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Low Stock Alert</Label>
                      <p className="text-sm text-muted-foreground">Alert when inventory is running low</p>
                    </div>
                    <Switch
                      checked={notificationSettings.lowStockAlert}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, lowStockAlert: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Promotion Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about promotion performance</p>
                    </div>
                    <Switch
                      checked={notificationSettings.promotionUpdates}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, promotionUpdates: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Daily Report</Label>
                      <p className="text-sm text-muted-foreground">Receive daily sales summary</p>
                    </div>
                    <Switch
                      checked={notificationSettings.dailyReport}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, dailyReport: checked })}
                    />
                  </div>

                  <Button className="mt-4">Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Settings */}
            <TabsContent value="advanced" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>
                    System configuration and maintenance options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="qrCodeExpiry">QR Code Expiry (Days)</Label>
                    <Input
                      id="qrCodeExpiry"
                      type="number"
                      defaultValue="30"
                      placeholder="30"
                    />
                    <p className="text-sm text-muted-foreground">How long QR codes remain valid</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="autoCancelTime">Auto-cancel Unpaid Orders (Minutes)</Label>
                    <Input
                      id="autoCancelTime"
                      type="number"
                      defaultValue="15"
                      placeholder="15"
                    />
                    <p className="text-sm text-muted-foreground">Automatically cancel orders not paid within this time</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxOrderItems">Maximum Items Per Order</Label>
                    <Input
                      id="maxOrderItems"
                      type="number"
                      defaultValue="20"
                      placeholder="20"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <Label className="text-red-600">Clear All Data</Label>
                      <p className="text-sm text-muted-foreground">Permanently delete all orders, menu items, and settings</p>
                    </div>
                    <Button variant="destructive">Clear Data</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-red-600">Export Database</Label>
                      <p className="text-sm text-muted-foreground">Download a backup of all your data</p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>

                  <Button className="mt-4">Save Advanced Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}