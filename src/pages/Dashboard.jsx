import { ArrowUpRight, Package, ShoppingCart, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import PlatformSalesChart from "../components/dashboard/PlatformSalesChart"
import RecentOrders from "../components/dashboard/RecentOrders"
import StockAlerts from "../components/dashboard/StockAlerts"

function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración centralizado para tus plataformas de delivery.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% respecto al mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Hoy</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24</div>
            <p className="text-xs text-muted-foreground">+12% respecto a ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+18 nuevos hoy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">3 con stock bajo</p>
          </CardContent>
          <CardFooter className="p-2">
            <Link to="/inventory" className="text-xs text-blue-500 flex items-center">
              Ver inventario
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Tabs defaultValue="ventas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ventas">Ventas por Plataforma</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos Recientes</TabsTrigger>
          <TabsTrigger value="alertas">Alertas de Stock</TabsTrigger>
        </TabsList>
        <TabsContent value="ventas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ventas por Plataforma</CardTitle>
              <CardDescription>Comparativa de ventas entre Rappi, UberEats y DidiFood</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <PlatformSalesChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pedidos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recientes</CardTitle>
              <CardDescription>Los últimos pedidos recibidos de todas las plataformas</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentOrders />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alertas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertas de Stock</CardTitle>
              <CardDescription>Productos con stock bajo que requieren atención</CardDescription>
            </CardHeader>
            <CardContent>
              <StockAlerts />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard
