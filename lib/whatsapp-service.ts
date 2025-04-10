/**
 * Envía un mensaje de WhatsApp usando Twilio
 * @param to Número de teléfono del destinatario (con código de país, sin "whatsapp:")
 * @param message Contenido del mensaje
 * @returns Promesa con el resultado del envío
 */
export async function sendWhatsAppMessage(to: string, message: string) {
  const accountSid = process.env.TWILIO_SID
  const authToken = process.env.TWILIO_AUTH

  if (!accountSid || !authToken) {
    throw new Error("Faltan las credenciales de Twilio en las variables de entorno")
  }

  const client = require("twilio")(accountSid, authToken)

  return client.messages.create({
    body: message,
    from: "whatsapp:+14155238886", // Número de Twilio
    to: `whatsapp:${to}`,
  })
}

/**
 * Envía una notificación de nuevo pedido
 * @param to Número de teléfono del destinatario
 * @param pedido Datos del pedido
 * @returns Promesa con el resultado del envío
 */
export async function sendOrderNotification(to: string, pedido: any) {
  const mensaje = `🛎️ *Nuevo pedido de ${pedido.plataforma}*

👤 *Cliente:* ${pedido.cliente}
💵 *Total:* $${pedido.total}
📦 *Productos:*
- ${pedido.productos.join("\n- ")}
🕒 *Hora:* ${pedido.hora}`

  return sendWhatsAppMessage(to, mensaje)
}
