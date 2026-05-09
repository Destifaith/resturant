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
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, PlusIcon, PencilIcon, TrashIcon, TagIcon, PercentIcon, GiftIcon, ClockIcon, XIcon, StoreIcon, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"

// Type definitions
interface Promotion {
  id: number
  title: string
  description: string
  type: "percentage" | "fixed" | "buy_one_get_one"
  value: number
  applicableItems: string[]
  startDate: Date
  endDate: Date
  active: boolean
  minOrderAmount?: number
  maxDiscount?: number
  code?: string
  imageUrl?: string
}

// Mock data
const getDefaultDates = () => {
  const today = new Date()
  const nextWeek = new Date()
  nextWeek.setDate(today.getDate() + 7)
  return { today, nextWeek }
}

const mockPromotions: Promotion[] = [
  {
    id: 1,
    title: "Jollof Rice Special",
    description: "Get 10% off on all Jollof Rice & Chicken orders",
    type: "percentage",
    value: 10,
    applicableItems: ["Jollof Rice & Chicken"],
    startDate: new Date(2026, 4, 1),
    endDate: new Date(2026, 4, 30),
    active: true,
    minOrderAmount: 45,
    imageUrl: "/images/promotions/jollof-special.jpg",
  },
  {
    id: 2,
    title: "Happy Hour Drinks",
    description: "20% off on all soft drinks",
    type: "percentage",
    value: 20,
    applicableItems: ["Soft Drink"],
    startDate: new Date(2026, 4, 1),
    endDate: new Date(2026, 4, 15),
    active: true,
    imageUrl: "/images/promotions/happy-hour.jpg",
  },
  {
    id: 3,
    title: "Student Discount",
    description: "GHS 10 off on orders above GHS 50",
    type: "fixed",
    value: 10,
    applicableItems: ["all"],
    startDate: new Date(2026, 3, 1),
    endDate: new Date(2026, 5, 30),
    active: true,
    minOrderAmount: 50,
    code: "STUDENT10",
    imageUrl: "/images/promotions/student-discount.jpg",
  },
  {
    id: 4,
    title: "Buy One Get One Free",
    description: "Buy one Jollof Rice & Chicken, get one free",
    type: "buy_one_get_one",
    value: 100,
    applicableItems: ["Jollof Rice & Chicken"],
    startDate: new Date(2026, 4, 10),
    endDate: new Date(2026, 4, 20),
    active: false,
    imageUrl: "/images/promotions/bogo.jpg",
  },
]

const typeConfig = {
  percentage: { label: "Percentage", icon: PercentIcon, color: "bg-green-100 text-green-800" },
  fixed: { label: "Fixed Amount", icon: TagIcon, color: "bg-blue-100 text-blue-800" },
  buy_one_get_one: { label: "Buy One Get One", icon: GiftIcon, color: "bg-purple-100 text-purple-800" },
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions)
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active")

  const handleDeletePromotion = (id: number) => {
    setPromotions(prev => prev.filter(promo => promo.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setPromotions(prev => prev.map(promo =>
      promo.id === id ? { ...promo, active: !promo.active } : promo
    ))
  }

  const handleSavePromotion = (promotion: Promotion) => {
    if (editingPromo) {
      setPromotions(prev => prev.map(p => p.id === promotion.id ? promotion : p))
    } else {
      const newId = Math.max(...promotions.map(p => p.id), 0) + 1
      setPromotions(prev => [...prev, { ...promotion, id: newId }])
    }
    setIsDialogOpen(false)
    setEditingPromo(null)
  }

  const openEditDialog = (promotion: Promotion) => {
    setEditingPromo(promotion)
    setIsDialogOpen(true)
  }

  const openAddDialog = () => {
    setEditingPromo(null)
    setIsDialogOpen(true)
  }

  const filteredPromotions = promotions.filter(promo => 
    activeTab === "active" ? promo.active : !promo.active
  )

  const isExpired = (endDate: Date) => {
    return new Date() > endDate
  }

  const isUpcoming = (startDate: Date) => {
    return new Date() < startDate
  }

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
          <BreadcrumbPage>Promotions</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
  <div className="px-4 flex items-center gap-2">
    <ModeToggle />
  </div>
</header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Promotions Management</h1>
              <p className="text-sm text-muted-foreground">Manage discounts and special offers</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Promotion
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingPromo ? "Edit Promotion" : "Create New Promotion"}</DialogTitle>
                  <DialogDescription>
                    Set up discounts, valid dates, and conditions
                  </DialogDescription>
                </DialogHeader>
                <PromotionForm
                  initialData={editingPromo}
                  onSave={handleSavePromotion}
                  onCancel={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{promotions.filter(p => p.active).length}</div>
                <p className="text-sm text-muted-foreground">Active Promotions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{promotions.filter(p => !p.active).length}</div>
                <p className="text-sm text-muted-foreground">Inactive Promotions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{promotions.filter(p => p.type === "percentage").length}</div>
                <p className="text-sm text-muted-foreground">Percentage Discounts</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === "active"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === "inactive"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Inactive
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPromotions.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="p-8 text-center text-muted-foreground">
                  No {activeTab} promotions found
                </CardContent>
              </Card>
            ) : (
              filteredPromotions.map((promo) => {
                const TypeIcon = typeConfig[promo.type].icon
                const isExpiredPromo = isExpired(promo.endDate)
                const isUpcomingPromo = isUpcoming(promo.startDate)
                
                return (
                  <Card key={promo.id} className={`relative overflow-hidden ${isExpiredPromo && promo.active ? "border-yellow-500" : ""}`}>
                    {/* Image Section */}
                    <div className="relative h-40 w-full bg-linear-to-r from-orange-500 to-red-500">
                      {promo.imageUrl ? (
                        <Image
                          src={promo.imageUrl}
                          alt={promo.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <GiftIcon className="h-12 w-12 text-white/50" />
                        </div>
                      )}
                      {/* Overlay for better text visibility if needed */}
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={typeConfig[promo.type].color}>
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {typeConfig[promo.type].label}
                          </Badge>
                          {promo.code && (
                            <Badge variant="outline" className="font-mono">
                              {promo.code}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditDialog(promo)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeletePromotion(promo.id)}
                          >
                            <TrashIcon className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h3 className="font-semibold text-lg">{promo.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{promo.description}</p>
                      </div>

                      <div className="flex items-baseline gap-1 mb-3">
                        {promo.type === "percentage" && (
                          <span className="text-2xl font-bold text-primary">{promo.value}%</span>
                        )}
                        {promo.type === "fixed" && (
                          <span className="text-2xl font-bold text-primary">GHS {promo.value}</span>
                        )}
                        {promo.type === "buy_one_get_one" && (
                          <span className="text-2xl font-bold text-primary">BOGO Free</span>
                        )}
                        <span className="text-sm text-muted-foreground">OFF</span>
                      </div>

                      <div className="space-y-2 text-sm">
                        {promo.minOrderAmount && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <StoreIcon className="h-3 w-3" />
                            Min. Order: GHS {promo.minOrderAmount}
                          </div>
                        )}
                        {promo.maxDiscount && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <TagIcon className="h-3 w-3" />
                            Max Discount: GHS {promo.maxDiscount}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="h-3 w-3" />
                          {format(promo.startDate, "MMM dd, yyyy")} - {format(promo.endDate, "MMM dd, yyyy")}
                        </div>
                        <div className="flex items-center gap-2">
                          {isExpiredPromo && (
                            <Badge variant="destructive" className="gap-1">
                              <XIcon className="h-3 w-3" /> Expired
                            </Badge>
                          )}
                          {isUpcomingPromo && (
                            <Badge variant="secondary" className="gap-1">
                              <ClockIcon className="h-3 w-3" /> Upcoming
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-3 border-t">
                        <span className="text-sm text-muted-foreground">Active</span>
                        <Switch
                          checked={promo.active}
                          onCheckedChange={() => handleToggleActive(promo.id)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Promotion Form Component
interface PromotionFormProps {
  initialData: Promotion | null
  onSave: (promotion: Promotion) => void
  onCancel: () => void
}

function PromotionForm({ initialData, onSave, onCancel }: PromotionFormProps) {
  const defaultDates = getDefaultDates()
  const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl || "")
  
  const [formData, setFormData] = useState({
    id: initialData?.id,
    title: initialData?.title || "",
    description: initialData?.description || "",
    type: initialData?.type || "percentage" as "percentage" | "fixed" | "buy_one_get_one",
    value: initialData?.value || 0,
    applicableItems: initialData?.applicableItems || ["all"],
    startDate: initialData?.startDate || defaultDates.today,
    endDate: initialData?.endDate || defaultDates.nextWeek,
    active: initialData?.active !== undefined ? initialData.active : true,
    minOrderAmount: initialData?.minOrderAmount || undefined,
    maxDiscount: initialData?.maxDiscount || undefined,
    code: initialData?.code || "",
    imageUrl: initialData?.imageUrl || "",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      setFormData({ ...formData, imageUrl: previewUrl })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPromotion: Promotion = {
      id: formData.id || 0,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      value: formData.value,
      applicableItems: formData.applicableItems,
      startDate: formData.startDate,
      endDate: formData.endDate,
      active: formData.active,
      minOrderAmount: formData.minOrderAmount,
      maxDiscount: formData.maxDiscount,
      code: formData.code || undefined,
      imageUrl: formData.imageUrl,
    }
    onSave(newPromotion)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        {/* Image Upload Section */}
        <div className="grid gap-2">
          <Label>Promotion Image</Label>
          <div className="flex items-center gap-4">
            <div className="relative h-32 w-32 rounded-lg border-2 border-dashed border-muted-foreground/25 overflow-hidden bg-linear-to-r from-orange-500 to-red-500">
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("")
                      setFormData({ ...formData, imageUrl: "" })
                    }}
                    className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
                  >
                    <XIcon className="h-3 w-3 text-white" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <ImageIcon className="h-8 w-8 text-white/70 mb-1" />
                  <span className="text-xs text-white/70">No image</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Upload a promotional image (JPG, PNG, WebP) - Recommended size: 400x200
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="title">Promotion Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Jollof Rice Special"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the promotion details..."
            rows={2}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="type">Discount Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: "percentage" | "fixed" | "buy_one_get_one") => 
              setFormData({ ...formData, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
              <SelectItem value="fixed">Fixed Amount (GHS)</SelectItem>
              <SelectItem value="buy_one_get_one">Buy One Get One Free</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="value">
            {formData.type === "percentage" && "Discount Percentage (%)"}
            {formData.type === "fixed" && "Discount Amount (GHS)"}
            {formData.type === "buy_one_get_one" && "BOGO Details"}
          </Label>
          <Input
            id="value"
            type="number"
            step={formData.type === "percentage" ? "1" : "0.01"}
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
            placeholder={formData.type === "percentage" ? "10" : "10.00"}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="code">Promo Code (Optional)</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="e.g., STUDENT10"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !formData.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !formData.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="minOrderAmount">Minimum Order Amount (Optional)</Label>
          <Input
            id="minOrderAmount"
            type="number"
            step="0.01"
            value={formData.minOrderAmount || ""}
            onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value ? parseFloat(e.target.value) : undefined })}
            placeholder="e.g., 50"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="maxDiscount">Maximum Discount (Optional)</Label>
          <Input
            id="maxDiscount"
            type="number"
            step="0.01"
            value={formData.maxDiscount || ""}
            onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value ? parseFloat(e.target.value) : undefined })}
            placeholder="e.g., 20"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="active">Active Status</Label>
          <Switch
            id="active"
            checked={formData.active}
            onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update" : "Create"} Promotion
        </Button>
      </DialogFooter>
    </form>
  )
}