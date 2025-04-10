import { Link } from "react-router-dom"
import { Bell, Home, LogOut, Menu, Settings, User } from "lucide-react"
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
import { Sheet, SheetTrigger } from "./ui/sheet"

function Header({ isMobile }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
        </Sheet>
      )}
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
        <Home className="h-6 w-6" />
        <span className="hidden md:inline">FoodAdmin</span>
      </Link>
      <div className="flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificaciones</span>
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              3
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="font-medium">Stock bajo:</span> Hamburguesa Clásica
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="font-medium">Nuevo pedido:</span> #1234 (Rappi)
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="font-medium">Mensaje:</span> Nuevo mensaje de WhatsApp
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
