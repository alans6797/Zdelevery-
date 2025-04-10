import WhatsAppPanel from "../components/WhatsAppPanel"

function WhatsApp() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">WhatsApp</h1>
        <p className="text-muted-foreground">Gestiona tus conversaciones de WhatsApp y responde a tus clientes.</p>
      </div>

      <WhatsAppPanel />
    </div>
  )
}

export default WhatsApp
