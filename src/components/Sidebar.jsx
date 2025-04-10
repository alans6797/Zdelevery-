"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { BarChart3, LayoutDashboard, MessageSquare, Package, Settings, ShoppingCart, Tag } from "lucide-react"
import { cn } from "../lib/utils"
import { Sheet, SheetContent } from "./ui/sheet"
import { Badge } from "./ui/badge"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Pedidos",
    href: "/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
    badge: "12",
  },
  {
    title: "WhatsApp",
    href: "/whatsapp",
    icon: <MessageSquare className="h-5 w-5" />,
    badge: "5",
  },
  {
    title: "Inventario",
    href: "/inventory",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Precios",
    href: "/pricing",
    icon: <Tag className="h-5 w-5" />,
  },
  {
    title: "Estadísticas",
    href: "/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

function Sidebar({ isMobile }) {
  const [isOpen, setIsOpen] = useState(false)

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-72 sm:max-w-none p-0">
          <nav className="grid gap-2 p-4 text-lg font-medium">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                    isActive && "bg-muted text-foreground",
                  )
                }
              >
                {item.icon}
                <span>{item.title}</span>
                {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r md:block">
      <nav className="grid gap-2 p-4 text-sm">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                isActive && "bg-muted text-foreground",
              )
            }
          >
            {item.icon}
            <span>{item.title}</span>
            {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
