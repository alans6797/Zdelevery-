import { ArrowUpRight, TrendingUp } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Ventas Totales</div>
          <div className="rounded-full bg-primary/10 p-1">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold">$45,231.89</div>
        <div className="mt-1 flex items-center text-xs text-muted-foreground">
          <span className="text-green-500">+20.1%</span>
          <ArrowUpRight className="ml-1 h-3 w-3 text-green-500" />
          <span className="ml-1">vs. mes anterior</span>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Pedidos Hoy</div>
          <div className="rounded-full bg-primary/10 p-1">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold">24</div>
        <div className="mt-1 flex items-center text-xs text-muted-foreground">
          <span className="text-green-500">+12%</span>
          <ArrowUpRight className="ml-1 h-3 w-3 text-green-500" />
          <span className="ml-1">vs. ayer</span>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Ticket Promedio</div>
          <div className="rounded-full bg-primary/10 p-1">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold">$131.11</div>
        <div className="mt-1 flex items-center text-xs text-muted-foreground">
          <span className="text-green-500">+5%</span>
          <ArrowUpRight className="ml-1 h-3 w-3 text-green-500" />
          <span className="ml-1">vs. mes anterior</span>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Productos Activos</div>
          <div className="rounded-full bg-primary/10 p-1">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold">48</div>
        <div className="mt-1 flex items-center text-xs text-muted-foreground">
          <span className="text-red-500">3</span>
          <span className="ml-1">con stock bajo</span>
        </div>
      </div>
    </div>
  )
}
