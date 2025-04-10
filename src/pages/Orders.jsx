"use client"

import { useState } from "react"
import OrderFeed from "../components/OrderFeed"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import OrderDetails from "../components/OrderDetails" // Import OrderDetails

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <p className="text-muted-foreground">
          Gestiona los pedidos de todas tus plataformas de delivery en un solo lugar.
        </p>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="preparacion">En Preparación</TabsTrigger>
          <TabsTrigger value="entregados">Entregados</TabsTrigger>
        </TabsList>
        <TabsContent value="todos">
          <Card>
            <CardHeader>
              <CardTitle>Todos los pedidos</CardTitle>
              <CardDescription>Gestiona todos los pedidos de las diferentes plataformas</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderFeed status="all" onViewDetails={handleViewDetails} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pendientes">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos pendientes</CardTitle>
              <CardDescription>Pedidos que aún no han sido procesados</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderFeed status="pending" onViewDetails={handleViewDetails} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preparacion">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos en preparación</CardTitle>
              <CardDescription>Pedidos que están siendo preparados</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderFeed status="processing" onViewDetails={handleViewDetails} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="entregados">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos entregados</CardTitle>
              <CardDescription>Pedidos que han sido completados</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderFeed status="completed" onViewDetails={handleViewDetails} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedOrder && (
        <OrderDetails open={showOrderDetails} onOpenChange={setShowOrderDetails} order={selectedOrder} />
      )}
    </div>
  )
}

export default Orders
