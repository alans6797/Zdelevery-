"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react"
import { cn } from "../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const navItems = [
  {
    title: "Inicio",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Pedidos",
    href: "/pedidos",
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
    href: "/inventario",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Precios",
    href: "/precios",
    icon: <Tag className="h-5 w-5" />,
  },
  {
    title: "Estadísticas",
    href: "/estadisticas",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Configuración",
    href: "/configuracion",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function Layout({ children }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        )}
        <div className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          <span>FoodAdmin</span>
        </div>
        <div className="flex-1" />
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notificaciones</span>
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="Avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside
          className={cn(
            "hidden w-64 shrink-0 border-r bg-white md:block",
            isMobileMenuOpen && isMobile ? "fixed inset-y-0 left-0 z-40 w-64 animate-in slide-in-from-left" : "",
          )}
        >
          <nav className="grid gap-2 p-4 text-sm">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                  pathname === item.href && "bg-gray-100 text-gray-900 font-medium",
                )}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile sidebar overlay */}
        {isMobileMenuOpen && isMobile && (
          <>
            <div
              className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 z-40 w-64 animate-in slide-in-from-left bg-white">
              <nav className="grid gap-2 p-4 text-sm">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                      pathname === item.href && "bg-gray-100 text-gray-900 font-medium",
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
                  </Link>
                ))}
              </nav>
            </aside>
          </>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
