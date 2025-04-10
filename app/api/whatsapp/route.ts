import { type NextRequest, NextResponse } from "next/server"
import { sendWhatsAppMessage } from "@/lib/whatsapp-service"

export async function POST(request: NextRequest) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { to, name, date, time } = await request.json()

    // Validar los datos requeridos
    if (!to || !name || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Faltan datos requeridos (to, name, date, time)" },
        { status: 400 },
      )
    }

    // Crear el mensaje para la cita
    const message = `Hola ${name}, tu cita ha sido confirmada para el ${date} a las ${time}. ¡Te esperamos!`

    // Enviar el mensaje de WhatsApp
    const result = await sendWhatsAppMessage(to, message)

    // Devolver una respuesta exitosa
    return NextResponse.json({ success: true, sid: result.sid }, { status: 200 })
  } catch (error) {
    // Manejar cualquier error que ocurra
    console.error("Error al enviar mensaje de WhatsApp:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 },
    )
  }
}
