"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  ClipboardListIcon,
  UtensilsIcon,
  TagIcon,
  CreditCardIcon,
  QrCodeIcon,
  UsersIcon,
  Settings2Icon,
  TrendingUpIcon,
  StoreIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Admin User",
    email: "admin@thecanteen.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "The Canteen",
      logo: <StoreIcon />,
      plan: "Restaurant Pro",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
      isActive: true,
      items: [],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: <ClipboardListIcon />,
      items: [
        {
          title: "Active Orders",
          url: "/dashboard/orders?status=active",
        },
        {
          title: "Completed",
          url: "/dashboard/orders?status=completed",
        },
        {
          title: "Cancelled",
          url: "/dashboard/orders?status=cancelled",
        },
      ],
    },
    {
      title: "Menu",
      url: "/dashboard/menu",
      icon: <UtensilsIcon />,
      items: [
        {
          title: "Mains",
          url: "/dashboard/menu?category=mains",
        },
        {
          title: "Drinks",
          url: "/dashboard/menu?category=drinks",
        },
        {
          title: "Sides",
          url: "/dashboard/menu?category=sides",
        },
        {
          title: "Add-ons",
          url: "/dashboard/menu?category=addons",
        },
      ],
    },
    {
      title: "Promotions",
      url: "/dashboard/promotions",
      icon: <TagIcon />,
      items: [
        {
          title: "Active Promos",
          url: "/dashboard/promotions?status=active",
        },
        {
          title: "Create New",
          url: "/dashboard/promotions/new",
        },
      ],
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: <CreditCardIcon />,
      items: [
        {
          title: "All Transactions",
          url: "/dashboard/payments",
        },
        {
          title: "Mobile Money",
          url: "/dashboard/payments?method=mobile_money",
        },
        {
          title: "Card",
          url: "/dashboard/payments?method=card",
        },
        {
          title: "Pay at Counter",
          url: "/dashboard/payments?method=counter",
        },
      ],
    },
    {
      title: "QR & Tables",
      url: "/dashboard/tables",
      icon: <QrCodeIcon />,
      items: [
        {
          title: "Manage Tables",
          url: "/dashboard/tables",
        },
        {
          title: "Generate QR Codes",
          url: "/dashboard/tables/qr",
        },
      ],
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: <UsersIcon />,
      items: [
        {
          title: "Customer List",
          url: "/dashboard/customers",
        },
        {
          title: "Order History",
          url: "/dashboard/customers/orders",
        },
      ],
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: <TrendingUpIcon />,
      items: [
        {
          title: "Sales Report",
          url: "/dashboard/reports/sales",
        },
        {
          title: "Popular Items",
          url: "/dashboard/reports/popular",
        },
        {
          title: "Payment Summary",
          url: "/dashboard/reports/payments",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings2Icon />,
      items: [
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
        {
          title: "Service Fees",
          url: "/dashboard/settings/fees",
        },
        {
          title: "Order Settings",
          url: "/dashboard/settings/orders",
        },
      ],
    },
  ],
  projects: [], // Removed dummy projects, can add shortcuts here later
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {data.projects.length > 0 && <NavProjects projects={data.projects} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}