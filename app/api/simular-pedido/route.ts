import { NextResponse } from "next/server"
import { sendWhatsAppMessage } from "@/lib/whatsapp-service"

// Contador de pedidos (en una aplicación real, esto vendría de una base de datos)
let id = 1

export async function POST() {
  try {
    // Generar datos aleatorios para el pedido
    const pedido = {
      id: id++,
      plataforma: ["Rappi", "UberEats", "DidiFood"][Math.floor(Math.random() * 3)],
      cliente: "Alan",
      total: Math.floor(Math.random() * 200) + 50,
      productos: ["Hamburguesa", "Refresco", "Papas"],
      hora: new Date().toLocaleTimeString(),
    }

    // Enviar a WhatsApp usando el servicio
    try {
      await sendWhatsAppMessage(
        "+5217298136940",
        `🛎️ *Nuevo pedido de ${pedido.plataforma}*

👤 *Cliente:* ${pedido.cliente}
💵 *Total:* $${pedido.total}
📦 *Productos:*
- ${pedido.productos.join("\n- ")}
🕒 *Hora:* ${pedido.hora}`,
      )
    } catch (error) {
      console.error("❌ Error al enviar a WhatsApp:", error instanceof Error ? error.message : String(error))
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

export async function GET() {
  return NextResponse.json({ message: "Método no permitido" }, { status: 405 })
}
