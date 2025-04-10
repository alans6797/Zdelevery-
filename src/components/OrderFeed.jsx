"use client"

import { useState } from "react"
import { Filter, MoreHorizontal, Search } from "lucide-react"
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
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import PlatformIcon from "./PlatformIcon"
import OrderDetails from "./orders/OrderDetails"

// Datos de ejemplo
const orders = [
  {
    id: "ORD-001",
    platform: "rappi",
    customer: "Juan Pérez",
    items: 3,
    total: "$245.00",
    status: "pending",
    date: "2023-06-15T10:30:00",
  },
  {
    id: "ORD-002",
    platform: "ubereats",
    customer: "María López",
    items: 2,
    total: "$180.50",
    status: "processing",
    date: "2023-06-15T11:15:00",
  },
  {
    id: "ORD-003",
    platform: "didifood",
    customer: "Carlos Rodríguez",
    items: 4,
    total: "$320.75",
    status: "completed",
    date: "2023-06-15T09:45:00",
  },
  {
    id: "ORD-004",
    platform: "rappi",
    customer: "Ana Martínez",
    items: 1,
    total: "$95.00",
    status: "pending",
    date: "2023-06-15T12:00:00",
  },
  {
    id: "ORD-005",
    platform: "ubereats",
    customer: "Roberto Gómez",
    items: 3,
    total: "$215.25",
    status: "completed",
    date: "2023-06-15T08:30:00",
  },
  {
    id: "ORD-006",
    platform: "didifood",
    customer: "Laura Sánchez",
    items: 2,
    total: "$175.50",
    status: "processing",
    date: "2023-06-15T10:00:00",
  },
  {
    id: "ORD-007",
    platform: "rappi",
    customer: "Pedro Díaz",
    items: 5,
    total: "$410.00",
    status: "pending",
    date: "2023-06-15T11:30:00",
  },
  {
    id: "ORD-008",
    platform: "ubereats",
    customer: "Sofía Hernández",
    items: 2,
    total: "$165.75",
    status: "completed",
    date: "2023-06-15T09:15:00",
  },
]

const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pendiente
        </Badge>
      )
    case "processing":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          En preparación
        </Badge>
      )
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
          Entregado
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function OrderFeed({ status = "all", onViewDetails }) {
  const [platform, setPlatform] = useState("all")
  const [statusFilter, setStatusFilter] = useState(status)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  const filteredOrders = orders.filter((order) => {
    if (platform !== "all" && order.platform !== platform) return false
    if (statusFilter !== "all" && order.status !== statusFilter) return false
    return true
  })

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
    if (onViewDetails) {
      onViewDetails(order)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar pedidos..."
              className="w-full pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtrar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2">
                <p className="mb-1 text-xs font-medium">Plataforma</p>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las plataformas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las plataformas</SelectItem>
                    <SelectItem value="rappi">Rappi</SelectItem>
                    <SelectItem value="ubereats">UberEats</SelectItem>
                    <SelectItem value="didifood">DidiFood</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-2">
                <p className="mb-1 text-xs font-medium">Estado</p>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="processing">En preparación</SelectItem>
                    <SelectItem value="completed">Entregado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Plataforma</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Artículos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <PlatformIcon platform={order.platform} />
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="hidden md:table-cell">{order.items}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(order.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Acciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(order)}>Ver detalles</DropdownMenuItem>
                      <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Cancelar pedido</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedOrder && (
        <OrderDetails open={showOrderDetails} onOpenChange={setShowOrderDetails} order={selectedOrder} />
      )}
    </>
  )
}

export default OrderFeed
