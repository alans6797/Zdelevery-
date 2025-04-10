"use client"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlatformIcon } from "@/components/platform-icon"
import { Badge } from "@/components/ui/badge"

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
]

const getStatusBadge = (status: string) => {
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

export function RecentOrders() {
  return (
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
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                <PlatformIcon platform={order.platform} />
              </TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell className="hidden md:table-cell">{order.items}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Acciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
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
  )
}
