"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Search, Trash } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

// Datos de ejemplo
const products = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    category: "Hamburguesas",
    price: 120.0,
    stock: 5,
    minStock: 10,
    status: "low",
    prices: {
      rappi: 130.0,
      ubereats: 135.0,
      didifood: 125.0,
    },
  },
  {
    id: 2,
    name: "Hamburguesa con Queso",
    category: "Hamburguesas",
    price: 140.0,
    stock: 15,
    minStock: 10,
    status: "normal",
    prices: {
      rappi: 150.0,
      ubereats: 155.0,
      didifood: 145.0,
    },
  },
  {
    id: 3,
    name: "Papas Fritas",
    category: "Acompañamientos",
    price: 50.0,
    stock: 25,
    minStock: 10,
    status: "normal",
    prices: {
      rappi: 55.0,
      ubereats: 60.0,
      didifood: 52.0,
    },
  },
  {
    id: 4,
    name: "Refresco Cola",
    category: "Bebidas",
    price: 35.0,
    stock: 8,
    minStock: 15,
    status: "low",
    prices: {
      rappi: 40.0,
      ubereats: 42.0,
      didifood: 38.0,
    },
  },
  {
    id: 5,
    name: "Ensalada César",
    category: "Ensaladas",
    price: 90.0,
    stock: 12,
    minStock: 10,
    status: "normal",
    prices: {
      rappi: 95.0,
      ubereats: 100.0,
      didifood: 92.0,
    },
  },
  {
    id: 6,
    name: "Alitas BBQ",
    category: "Entradas",
    price: 110.0,
    stock: 0,
    minStock: 10,
    status: "out",
    prices: {
      rappi: 120.0,
      ubereats: 125.0,
      didifood: 115.0,
    },
  },
]

const getStockBadge = (status) => {
  switch (status) {
    case "low":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Stock Bajo
        </Badge>
      )
    case "normal":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
          Normal
        </Badge>
      )
    case "out":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
          Agotado
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function InventoryTable({ onEdit, onPrices }) {
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) => {
    // Filtro por búsqueda
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    // Filtro por categoría
    if (category !== "all" && product.category !== category) {
      return false
    }
    // Filtro por estado
    if (status !== "all" && product.status !== status) {
      return false
    }
    return true
  })

  const handleEdit = (product) => {
    if (onEdit) {
      onEdit(product)
    }
  }

  const handlePrices = (product) => {
    if (onPrices) {
      onPrices(product)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="w-full pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            <SelectItem value="Hamburguesas">Hamburguesas</SelectItem>
            <SelectItem value="Acompañamientos">Acompañamientos</SelectItem>
            <SelectItem value="Bebidas">Bebidas</SelectItem>
            <SelectItem value="Ensaladas">Ensaladas</SelectItem>
            <SelectItem value="Entradas">Entradas</SelectItem>
            <SelectItem value="Postres">Postres</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="low">Stock Bajo</SelectItem>
            <SelectItem value="out">Agotado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="bajo">Stock Bajo</TabsTrigger>
          <TabsTrigger value="agotado">Agotados</TabsTrigger>
        </TabsList>
        <TabsContent value="todos">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio Base</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            product.status === "low"
                              ? "text-yellow-600"
                              : product.status === "out"
                                ? "text-red-600"
                                : ""
                          }
                        >
                          {product.stock}
                        </span>
                        {product.status === "low" && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Bajo
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStockBadge(product.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Acciones</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar producto
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePrices(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar precios por plataforma
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="bajo">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio Base</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Stock Mínimo</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products
                  .filter((product) => product.status === "low")
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-yellow-600">{product.stock}</TableCell>
                      <TableCell>{product.minStock}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                          Reabastecer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="agotado">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio Base</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Stock Mínimo</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products
                  .filter((product) => product.status === "out")
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-red-600">{product.stock}</TableCell>
                      <TableCell>{product.minStock}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                          Reabastecer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default InventoryTable
