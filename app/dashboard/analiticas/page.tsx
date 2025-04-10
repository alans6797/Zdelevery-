"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DailySalesChart } from "@/components/analytics/daily-sales-chart"
import { PlatformComparisonChart } from "@/components/analytics/platform-comparison-chart"
import { ProductPerformanceChart } from "@/components/analytics/product-performance-chart"
import { DateRangePicker } from "@/components/date-range-picker"
import { PlatformIcon } from "@/components/platform-icon"

export default function AnaliticasPage() {
  const [date, setDate] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analíticas</h1>
        <p className="text-muted-foreground">
          Visualiza el rendimiento de tu negocio a través de las diferentes plataformas.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">Periodo de análisis</h2>
        <DateRangePicker date={date} setDate={setDate} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Ventas Totales</CardTitle>
            <CardDescription>Periodo actual vs. anterior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-600 bg-green-100 px-1 py-0.5 rounded">+20.1%</span>
              <span className="text-xs text-muted-foreground ml-1">vs. periodo anterior</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform="rappi" />
                  <span>Rappi</span>
                </div>
                <span className="font-medium">$20,354.35</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform="ubereats" />
                  <span>UberEats</span>
                </div>
                <span className="font-medium">$15,642.80</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform="didifood" />
                  <span>DidiFood</span>
                </div>
                <span className="font-medium">$9,234.74</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Pedidos</CardTitle>
            <CardDescription>Total de pedidos procesados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">345</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-600 bg-green-100 px-1 py-0.5 rounded">+12%</span>
              <span className="text-xs text-muted-foreground ml-1">vs. periodo anterior</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform="rappi" />
                  <span>Rappi</span>
                </div>
                <span className="font-medium">156 pedidos</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform="ubereats" />
                  <span>UberEats</span>
                </div>
                <span className="font-medium">124 pedidos</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform="didifood" />
                  <span>DidiFood</span>
                </div>
                <span className="font-medium">65 pedidos</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Ticket Promedio</CardTitle>
            <CardDescription>Valor promedio por pedido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$131.11</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-600 bg-green-100 px-1 py-0.5 rounded">+5%</span>
              <span className="text-xs text-muted-foreground ml-1">vs. periodo anterior</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform="rappi" />
                  <span>Rappi</span>
                </div>
                <span className="font-medium">$130.48</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform="ubereats" />
                  <span>UberEats</span>
                </div>
                <span className="font-medium">$126.15</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform="didifood" />
                  <span>DidiFood</span>
                </div>
                <span className="font-medium">$142.07</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ventas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ventas">Ventas Diarias</TabsTrigger>
          <TabsTrigger value="plataformas">Comparativa de Plataformas</TabsTrigger>
          <TabsTrigger value="productos">Rendimiento de Productos</TabsTrigger>
        </TabsList>
        <TabsContent value="ventas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ventas Diarias</CardTitle>
              <CardDescription>Ventas totales por día durante el periodo seleccionado</CardDescription>
            </CardHeader>
            <CardContent>
              <DailySalesChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="plataformas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativa de Plataformas</CardTitle>
              <CardDescription>Comparación de ventas entre Rappi, UberEats y DidiFood</CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformComparisonChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="productos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento de Productos</CardTitle>
              <CardDescription>Los productos más vendidos durante el periodo seleccionado</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductPerformanceChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
