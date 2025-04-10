"use client"

import { useState } from "react"
import { Check, MessageSquare, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PlatformIcon } from "@/components/platform-icon"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OrderDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: any
}

// Datos de ejemplo para los items del pedido
const orderItems = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    quantity: 1,
    price: 120.0,
    total: 120.0,
  },
  {
    id: 2,
    name: "Papas Fritas",
    quantity: 1,
    price: 50.0,
    total: 50.0,
  },
  {
    id: 3,
    name: "Refresco Cola",
    quantity: 1,
    price: 35.0,
    total: 35.0,
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

export function OrderDetails({ open, onOpenChange, order }: OrderDetailsProps) {
  const [status, setStatus] = useState(order.status)
  const [note, setNote] = useState("")

  const handleStatusChange = (value: string) => {
    setStatus(value)
  }

  const handleSendNote = () => {
    if (note.trim() === "") return
    // Aquí iría la lógica para enviar la nota
    console.log("Nota enviada:", note)
    setNote("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Pedido {order.id}
            <PlatformIcon platform={order.platform} />
          </DialogTitle>
          <DialogDescription>Detalles del pedido realizado por {order.customer}</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="status">Estado</TabsTrigger>
            <TabsTrigger value="notes">Notas</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Cliente</Label>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Fecha</Label>
                <p className="font-medium">{new Date(order.date).toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Plataforma</Label>
                <p className="font-medium flex items-center gap-2">
                  <PlatformIcon platform={order.platform} />
                  {order.platform === "rappi" ? "Rappi" : order.platform === "ubereats" ? "UberEats" : "DidiFood"}
                </p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Estado</Label>
                <p className="font-medium">{getStatusBadge(order.status)}</p>
              </div>
            </div>
            <Separator />
            <div>
              <Label className="text-sm text-muted-foreground">Artículos</Label>
              <div className="mt-2 space-y-2">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.quantity}x </span>
                      {item.name}
                    </div>
                    <div>${item.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center font-medium">
              <div>Total</div>
              <div>{order.total}</div>
            </div>
          </TabsContent>
          <TabsContent value="status" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Cambiar estado del pedido</Label>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="processing">En preparación</SelectItem>
                  <SelectItem value="completed">Entregado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4">
              <Button className="w-full">
                <Check className="mr-2 h-4 w-4" />
                Actualizar Estado
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="notes" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="note">Agregar nota al pedido</Label>
              <Textarea
                id="note"
                placeholder="Escribe una nota para este pedido..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleSendNote} className="flex-1">
                <Send className="mr-2 h-4 w-4" />
                Enviar Nota
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Contactar Cliente
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
