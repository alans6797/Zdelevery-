"use client"

import { useEffect, useState } from "react"
import { Plus, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

type Pedido = {
  id: number
  plataforma: string
  cliente: string
  total: number
  productos: string[]
  hora: string
}

export default function OrderFeed() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [estados, setEstados] = useState<Record<number, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const obtenerPedido = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/simular-pedido", { method: "POST" })

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`)
      }

      const data = await res.json()

      if (data?.pedido) {
        setPedidos((prev) => [data.pedido, ...prev])
        setEstados((prev) => ({
          ...prev,
          [data.pedido.id]: "pendiente",
        }))

        // Mostrar notificación de nuevo pedido
        toast({
          title: "Nuevo pedido recibido",
          description: `Pedido #${data.pedido.id} de ${data.pedido.cliente} (${data.pedido.plataforma})`,
        })
      }
    } catch (error) {
      console.error("Error al obtener pedido:", error)
      setError("No se pudo obtener el pedido. Intente nuevamente.")
      toast({
        title: "Error",
        description: "No se pudo obtener el pedido",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const intervalo = setInterval(obtenerPedido, 15000) // Cada 15 segundos
    return () => clearInterval(intervalo)
  }, [])

  const actualizarEstado = async (id: number, nuevoEstado: string, pedido: Pedido) => {
    setEstados((prev) => ({
      ...prev,
      [id]: nuevoEstado,
    }))

    toast({
      title: `Pedido ${nuevoEstado}`,
      description: `El pedido #${id} ha sido ${nuevoEstado}`,
      variant: nuevoEstado === "aceptado" ? "default" : "destructive",
    })

    // Enviar confirmación automática a tu WhatsApp
    try {
      await fetch("/api/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "+5217298136940", // tu número
          message: `✅ El pedido #${id} de ${pedido.plataforma} ha sido *${nuevoEstado.toUpperCase()}*.\n\nTotal: $${pedido.total}\nCliente: ${pedido.cliente}`,
        }),
      })
    } catch (error) {
      console.error("❌ Error al enviar confirmación:", error)
      toast({
        title: "Error",
        description: "No se pudo enviar la confirmación por WhatsApp",
        variant: "destructive",
      })
    }
  }

  const getPlatformBadge = (plataforma: string) => {
    switch (plataforma) {
      case "Rappi":
        return <Badge className="bg-orange-500 hover:bg-orange-600">Rappi</Badge>
      case "UberEats":
        return <Badge className="bg-black hover:bg-gray-800">UberEats</Badge>
      case "DidiFood":
        return <Badge className="bg-blue-500 hover:bg-blue-600">DidiFood</Badge>
      default:
        return <Badge>{plataforma}</Badge>
    }
  }

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "aceptado":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Aceptado
          </Badge>
        )
      case "rechazado":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Rechazado
          </Badge>
        )
      case "pendiente":
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pendiente
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Pedidos en tiempo real</CardTitle>
        <Button onClick={obtenerPedido} disabled={isLoading} variant="outline" size="sm">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Simulando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Simular pedido
            </span>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 flex justify-between items-center">
            <p>{error}</p>
            <Button variant="ghost" size="sm" onClick={() => setError(null)}>
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        )}

        {isLoading && pedidos.length === 0 && (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}

        {!isLoading && pedidos.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">Esperando nuevos pedidos...</div>
        )}

        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="border rounded-lg p-4 animate-in fade-in-50 duration-300">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Pedido #{pedido.id}</span>
                    {getPlatformBadge(pedido.plataforma)}
                    {getStatusBadge(estados[pedido.id] || "pendiente")}
                  </div>
                  <p className="mb-1">
                    <span className="font-medium">Cliente:</span> {pedido.cliente}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Total:</span> ${pedido.total}
                  </p>
                  <div className="bg-muted p-2 rounded-md mb-2">
                    <p className="font-medium mb-1">Productos:</p>
                    <ul className="ml-4 list-disc">
                      {pedido.productos.map((prod, i) => (
                        <li key={i} className="text-sm">
                          {prod}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">Hora: {pedido.hora}</p>
                </div>

                <div className="flex flex-col gap-2 justify-end md:items-end">
                  <button
                    onClick={() => actualizarEstado(pedido.id, "aceptado", pedido)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    disabled={estados[pedido.id] === "aceptado" || estados[pedido.id] === "rechazado"}
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => actualizarEstado(pedido.id, "rechazado", pedido)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    disabled={estados[pedido.id] === "aceptado" || estados[pedido.id] === "rechazado"}
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
