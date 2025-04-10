import { type NextRequest, NextResponse } from "next/server"
import { sendOrderNotification } from "@/lib/whatsapp-service"

// Contador de pedidos (en una aplicación real, esto vendría de una base de datos)
let pedidoId = 100

export async function POST(request: NextRequest) {
  try {
    // Simulamos un nuevo pedido
    const pedido = {
      id: pedidoId++,
      plataforma: "Rappi",
      cliente: "Alan Foodie",
      total: 189,
      productos: ["Hamburguesa x2", "Papas", "Refresco"],
      hora: new Date().toLocaleTimeString(),
    }

    // Enviar a WhatsApp usando el servicio
    try {
      await sendOrderNotification(
        "+5217298136940", // Tu número de WhatsApp
        pedido,
      )
    } catch (err) {
      console.error("Error al enviar WhatsApp:", err instanceof Error ? err.message : String(err))
      // Continuamos con la ejecución aunque falle el envío de WhatsApp
    }

    // Devolver una respuesta exitosa
    return NextResponse.json({ success: true, pedido }, { status: 200 })
  } catch (error) {
    console.error("Error al procesar pedido:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 },
    )
  }
}
