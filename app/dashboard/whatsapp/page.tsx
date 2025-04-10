"use client"

import type React from "react"

import { useState } from "react"
import { Send, Smile, Paperclip, MoreVertical, Phone, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { QuickReplyButton } from "@/components/whatsapp/quick-reply-button"
import { SendWhatsAppMessage } from "./send-message"

// Datos de ejemplo
const contacts = [
  {
    id: 1,
    name: "Juan Pérez",
    lastMessage: "Hola, ¿tienen disponible la hamburguesa especial?",
    time: "10:30",
    unread: true,
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "María López",
    lastMessage: "Gracias por la atención",
    time: "Ayer",
    unread: false,
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    lastMessage: "¿A qué hora cierran hoy?",
    time: "Ayer",
    unread: true,
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Ana Martínez",
    lastMessage: "Mi pedido no ha llegado aún",
    time: "Lun",
    unread: false,
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Roberto Gómez",
    lastMessage: "¿Tienen opciones vegetarianas?",
    time: "Dom",
    unread: false,
    avatar: "/placeholder.svg",
  },
]

const messages = [
  {
    id: 1,
    sender: "customer",
    text: "Hola, ¿tienen disponible la hamburguesa especial?",
    time: "10:30",
  },
  {
    id: 2,
    sender: "business",
    text: "¡Hola Juan! Sí, tenemos disponible la hamburguesa especial. ¿Te gustaría ordenarla?",
    time: "10:32",
  },
  {
    id: 3,
    sender: "customer",
    text: "Genial, ¿cuánto tiempo tardaría en llegar a la zona centro?",
    time: "10:33",
  },
  {
    id: 4,
    sender: "business",
    text: "Aproximadamente 30-40 minutos dependiendo del tráfico. ¿Deseas hacer el pedido ahora?",
    time: "10:35",
  },
  {
    id: 5,
    sender: "customer",
    text: "Sí, por favor. Quiero una hamburguesa especial con papas fritas y una bebida grande.",
    time: "10:36",
  },
]

const quickReplies = [
  "Sí, tenemos disponible ese producto",
  "El tiempo de entrega es de 30-40 minutos",
  "¿Desea agregar algo más a su pedido?",
  "Gracias por su preferencia",
  "Lamentamos el inconveniente",
]

export default function WhatsAppPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const [currentView, setCurrentView] = useState<"chat" | "notifications">("chat")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return
    // Aquí iría la lógica para enviar el mensaje
    setNewMessage("")
  }

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">WhatsApp</h1>
        <p className="text-muted-foreground">
          Gestiona tus conversaciones de WhatsApp y envía notificaciones a tus clientes.
        </p>
      </div>

      <Tabs defaultValue="chat" onValueChange={(value) => setCurrentView(value as "chat" | "notifications")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-base">Chats</CardTitle>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>
              <div className="px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar o empezar un chat nuevo" className="pl-8" />
                </div>
              </div>
              <Tabs defaultValue="todos" onValueChange={setActiveTab}>
                <div className="px-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="no-leidos">No leídos</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
              <CardContent className="p-0 pt-2">
                <ScrollArea className="h-[calc(100vh-350px)]">
                  {contacts
                    .filter((contact) => activeTab === "todos" || (activeTab === "no-leidos" && contact.unread))
                    .map((contact) => (
                      <div key={contact.id}>
                        <button
                          className={`flex w-full items-center gap-3 p-4 text-left hover:bg-muted ${
                            selectedContact.id === contact.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedContact(contact)}
                        >
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback>
                                {contact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {contact.unread && (
                              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                !
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-xs text-muted-foreground">{contact.time}</p>
                            </div>
                            <p className="truncate text-sm text-muted-foreground">{contact.lastMessage}</p>
                          </div>
                        </button>
                        <Separator />
                      </div>
                    ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader className="px-4 py-3 flex flex-row items-center gap-3 border-b">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback>
                    {selectedContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-base">{selectedContact.name}</CardTitle>
                  <CardDescription>En línea</CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col">
                <ScrollArea className="flex-1 h-[calc(100vh-450px)] p-4">
                  <div className="flex flex-col gap-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "business" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "business" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className="mt-1 text-right text-xs opacity-70">{message.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-3 border-t">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {quickReplies.map((reply, index) => (
                      <QuickReplyButton key={index} text={reply} onClick={() => handleQuickReply(reply)} />
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Button type="button" variant="ghost" size="icon">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Escribe un mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="rounded-full">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Enviar mensaje</span>
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Enviar notificación de WhatsApp</CardTitle>
              <CardDescription>
                Envía mensajes de notificación a tus clientes utilizando plantillas predefinidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SendWhatsAppMessage />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
