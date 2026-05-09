"use client"

import { useState} from "react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UtensilsIcon,
  CoffeeIcon,
  SandwichIcon,
  FlameIcon,
  ImageIcon,
  XIcon,
} from "lucide-react"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"

// Type definitions
interface MenuItem {
  id: number
  name: string
  price: number
  category: "mains" | "drinks" | "sides"
  available: boolean
  popular: boolean
  spicy: boolean
  preparationTime: number
  imageUrl: string
}

interface MenuData {
  mains: MenuItem[]
  drinks: MenuItem[]
  sides: MenuItem[]
}

// Mock data with images - replace with API call
const mockMenuItems: MenuData = {
  mains: [
    { id: 1, name: "Jollof Rice & Chicken", price: 45.00, category: "mains", available: true, popular: true, spicy: true, preparationTime: 15, imageUrl: "/images/jollof-rice.jpg" },
    { id: 2, name: "Fried Rice & Chicken", price: 45.00, category: "mains", available: true, popular: false, spicy: false, preparationTime: 15, imageUrl: "/images/fried-rice.jpg" },
    { id: 3, name: "Waakye & Spaghetti", price: 40.00, category: "mains", available: true, popular: true, spicy: true, preparationTime: 12, imageUrl: "/images/waakye.jpg" },
    { id: 4, name: "Banku & Tilapia", price: 55.00, category: "mains", available: false, popular: false, spicy: true, preparationTime: 20, imageUrl: "/images/banku.jpg" },
  ],
  drinks: [
    { id: 5, name: "Soft Drink", price: 10.00, category: "drinks", available: true, popular: true, spicy: false, preparationTime: 2, imageUrl: "/images/soft-drink.jpg" },
    { id: 6, name: "Bottled Water", price: 5.00, category: "drinks", available: true, popular: false, spicy: false, preparationTime: 1, imageUrl: "/images/water.jpg" },
    { id: 7, name: "Fresh Juice", price: 15.00, category: "drinks", available: true, popular: true, spicy: false, preparationTime: 5, imageUrl: "/images/juice.jpg" },
    { id: 8, name: "Smoothie", price: 20.00, category: "drinks", available: false, popular: false, spicy: false, preparationTime: 7, imageUrl: "/images/smoothie.jpg" },
  ],
  sides: [
    { id: 9, name: "Plantain", price: 25.00, category: "sides", available: true, popular: true, spicy: false, preparationTime: 8, imageUrl: "/images/plantain.jpg" },
    { id: 10, name: "Extra Chicken", price: 30.00, category: "sides", available: true, popular: true, spicy: false, preparationTime: 5, imageUrl: "/images/chicken.jpg" },
    { id: 11, name: "Coleslaw", price: 15.00, category: "sides", available: true, popular: false, spicy: false, preparationTime: 3, imageUrl: "/images/coleslaw.jpg" },
    { id: 12, name: "Fried Yam", price: 20.00, category: "sides", available: false, popular: false, spicy: false, preparationTime: 10, imageUrl: "/images/fried-yam.jpg" },
  ],
}

const categoryIcons = {
  mains: <UtensilsIcon className="h-4 w-4" />,
  drinks: <CoffeeIcon className="h-4 w-4" />,
  sides: <SandwichIcon className="h-4 w-4" />,
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuData>(mockMenuItems)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"mains" | "drinks" | "sides">("mains")

  const handleDeleteItem = (category: keyof MenuData, id: number) => {
    setMenuItems(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }))
  }

  const handleToggleAvailable = (category: keyof MenuData, id: number) => {
    setMenuItems(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    }))
  }

  const handleSaveItem = (item: MenuItem) => {
    if (editingItem) {
      // Update existing item
      setMenuItems(prev => ({
        ...prev,
        [item.category]: prev[item.category].map((existingItem: MenuItem) =>
          existingItem.id === item.id ? item : existingItem
        )
      }))
    } else {
      // Add new item
      const newId = Math.max(...Object.values(menuItems).flatMap(items => items.map((item: MenuItem) => item.id))) + 1
      setMenuItems(prev => ({
        ...prev,
        [item.category]: [...prev[item.category], { ...item, id: newId }]
      }))
    }
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item)
    setIsDialogOpen(true)
  }

  const openAddDialog = () => {
    setEditingItem(null)
    setIsDialogOpen(true)
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
          <BreadcrumbPage>Menu</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
  <div className="px-4 flex items-center gap-2">
    <ModeToggle />
  </div>
</header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Menu Management</h1>
              <p className="text-sm text-muted-foreground">Manage your food and beverage items</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the menu item
                  </DialogDescription>
                </DialogHeader>
                <MenuForm
                  initialData={editingItem}
                  onSave={handleSaveItem}
                  onCancel={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Menu Tabs */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "mains" | "drinks" | "sides")} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mains" className="gap-2">
                {categoryIcons.mains} Mains
              </TabsTrigger>
              <TabsTrigger value="drinks" className="gap-2">
                {categoryIcons.drinks} Drinks
              </TabsTrigger>
              <TabsTrigger value="sides" className="gap-2">
                {categoryIcons.sides} Sides
              </TabsTrigger>
            </TabsList>

            {(Object.entries(menuItems) as [keyof MenuData, MenuItem[]][]).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="capitalize flex items-center gap-2">
                      {categoryIcons[category]}
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {items.map((item) => (
                        <Card key={item.id} className={`relative overflow-hidden ${!item.available ? "opacity-60" : ""}`}>
                          {/* Image Section */}
                          <div className="relative h-48 w-full bg-muted">
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  // Fallback if image fails to load
                                  (e.target as HTMLImageElement).style.display = 'none'
                                }}
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full bg-muted">
                                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-2xl font-bold text-primary mt-1">
                                  GHS {item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => openEditDialog(item)}
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteItem(category, item.id)}
                                >
                                  <TrashIcon className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              {item.popular && (
                                <Badge variant="secondary" className="gap-1">
                                  <FlameIcon className="h-3 w-3" /> Popular
                                </Badge>
                              )}
                              {item.spicy && (
                                <Badge variant="outline" className="gap-1 text-red-600">
                                  🌶️ Spicy
                                </Badge>
                              )}
                              <Badge variant="outline" className="gap-1">
                                ⏱️ {item.preparationTime} min
                              </Badge>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-3 border-t">
                              <span className="text-sm text-muted-foreground">Available</span>
                              <Switch
                                checked={item.available}
                                onCheckedChange={() => handleToggleAvailable(category, item.id)}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Menu Form Component Props
interface MenuFormProps {
  initialData: MenuItem | null
  onSave: (item: MenuItem) => void
  onCancel: () => void
}

function MenuForm({ initialData, onSave, onCancel }: MenuFormProps) {
  const [formData, setFormData] = useState<Omit<MenuItem, "id"> & { id?: number }>({
    id: initialData?.id,
    name: initialData?.name || "",
    price: initialData?.price || 0,
    category: initialData?.category || "mains",
    available: initialData?.available !== undefined ? initialData.available : true,
    popular: initialData?.popular || false,
    spicy: initialData?.spicy || false,
    preparationTime: initialData?.preparationTime || 15,
    imageUrl: initialData?.imageUrl || "",
  })
  
  const [imagePreview, setImagePreview] = useState<string>(formData.imageUrl || "")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a local preview URL
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      setFormData({ ...formData, imageUrl: previewUrl })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem: MenuItem = {
      id: formData.id || 0,
      name: formData.name,
      price: typeof formData.price === "string" ? parseFloat(formData.price) : formData.price,
      category: formData.category as "mains" | "drinks" | "sides",
      available: formData.available,
      popular: formData.popular,
      spicy: formData.spicy,
      preparationTime: formData.preparationTime,
      imageUrl: formData.imageUrl,
    }
    onSave(newItem)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-1">
        {/* Image Upload Section */}
        <div className="grid gap-2">
          <Label>Item Image</Label>
          <div className="flex items-center gap-4">
            <div className="relative h-32 w-32 rounded-lg border-2 border-dashed border-muted-foreground/25 overflow-hidden bg-muted">
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
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">No image</span>
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
                Upload an image for this menu item (JPG, PNG, WebP)
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Jollof Rice & Chicken"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Price (GHS)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            placeholder="45.00"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value as "mains" | "drinks" | "sides" })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mains">Mains</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
              <SelectItem value="sides">Sides</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="preparationTime">Preparation Time (minutes)</Label>
          <Input
            id="preparationTime"
            type="number"
            value={formData.preparationTime}
            onChange={(e) => setFormData({ ...formData, preparationTime: parseInt(e.target.value) })}
            placeholder="15"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="popular">Popular Item</Label>
          <Switch
            id="popular"
            checked={formData.popular}
            onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="spicy">Spicy</Label>
          <Switch
            id="spicy"
            checked={formData.spicy}
            onCheckedChange={(checked) => setFormData({ ...formData, spicy: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="available">Available</Label>
          <Switch
            id="available"
            checked={formData.available}
            onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update" : "Add"} Item
        </Button>
      </DialogFooter>
    </form>
  )
}