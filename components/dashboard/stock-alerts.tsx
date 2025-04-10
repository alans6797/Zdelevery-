"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos de ejemplo
const lowStockProducts = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    category: "Hamburguesas",
    stock: 5,
    minStock: 10,
  },
  {
    id: 4,
    name: "Refresco Cola",
    category: "Bebidas",
    stock: 8,
    minStock: 15,
  },
  {
    id: 8,
    name: "Helado de Vainilla",
    category: "Postres",
    stock: 3,
    minStock: 8,
  },
]

export function StockAlerts() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Stock Actual</TableHead>
            <TableHead>Stock Mínimo</TableHead>
            <TableHead className="text-right">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lowStockProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-red-600">{product.stock}</TableCell>
              <TableCell>{product.minStock}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/inventario" className="flex items-center">
                    Reabastecer
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
