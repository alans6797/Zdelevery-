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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface OrderDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: any
}

const getPlatformBadge = (platform: string) => {
  switch (platform) {
    case "rappi":
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold w-5 h-5">
            R
          </div>
          <span>Rappi</span>
        </div>
      )
    case "ubereats":
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-black text-white text-xs font-bold w-5 h-5">
            U
          </div>
          <span>UberEats</span>
        </div>
      )
    case "didifood":
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold w-5 h-5">
            D
          </div>
          <span>DidiFood</span>
        </div>
      )
    default:
      return <span>{platform}</span>
  }
}

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
  const [status, setStatus] = useState(order?.status || "pending")
  const [note, setNote] = useState("")

  const handleStatusChange = (value: string) => {
    setStatus(value)
  }

  const handleSendNote = () => {
    if (note.trim() === "") return

    toast({
      title: "Nota enviada",
      description: "La nota ha sido enviada correctamente",
    })

    setNote("")
  }

  const handleUpdateStatus = () => {
    toast({
      title: "Estado actualizado",
      description: `El pedido #${order.id} ha sido marcado como ${
        status === "pending" ? "pendiente" : status === "processing" ? "en preparación" : "entregado"
      }`,
    })

    onOpenChange(false)
  }

  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Pedido #{order.id}
            {getPlatformBadge(order.platform)}
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
                <p className="font-medium flex items-center gap-2">{getPlatformBadge(order.platform)}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Estado</Label>
                <p className="font-medium">{getStatusBadge(order.status)}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Teléfono</Label>
                <p className="font-medium">{order.phone || "No disponible"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Dirección</Label>
                <p className="font-medium">{order.address || "No disponible"}</p>
              </div>
            </div>
            <Separator />
            <div>
              <Label className="text-sm text-muted-foreground">Artículos</Label>
              <div className="mt-2 space-y-2">
                {order.products ? (
                  order.products.map((product: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{product.quantity}x </span>
                        {product.name}
                      </div>
                      <div>${product.price.toFixed(2)}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground">No hay detalles de productos disponibles</div>
                )}
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center font-medium">
              <div>Total</div>
              <div>${order.total}</div>
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
              <Button className="w-full" onClick={handleUpdateStatus}>
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
