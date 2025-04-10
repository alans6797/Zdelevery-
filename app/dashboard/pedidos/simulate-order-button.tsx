"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function SimulateOrderButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSimulateOrder = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Pedido simulado",
          description: `Se ha creado un nuevo pedido #${data.pedido.id} y se ha enviado una notificación por WhatsApp.`,
        })
      } else {
        throw new Error(data.error || "Error al simular pedido")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al simular pedido",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSimulateOrder} disabled={isLoading}>
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Simulando...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Simular nuevo pedido
        </span>
      )}
    </Button>
  )
}
