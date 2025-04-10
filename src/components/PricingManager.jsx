"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Edit, Search } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import PlatformIcon from "./PlatformIcon"

// Datos de ejemplo
const categories = [
  { value: "hamburguesas", label: "Hamburguesas" },
  { value: "acompañamientos", label: "Acompañamientos" },
  { value: "bebidas", label: "Bebidas" },
  { value: "ensaladas", label: "Ensaladas" },
  { value: "entradas", label: "Entradas" },
  { value: "postres", label: "Postres" },
]

const products = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    category: "Hamburguesas",
    prices: {
      base: 120.0,
      rappi: 130.0,
      ubereats: 135.0,
      didifood: 125.0,
    },
  },
  {
    id: 2,
    name: "Hamburguesa con Queso",
    category: "Hamburguesas",
    prices: {
      base: 140.0,
      rappi: 150.0,
      ubereats: 155.0,
      didifood: 145.0,
    },
  },
  {
    id: 3,
    name: "Papas Fritas",
    category: "Acompañamientos",
    prices: {
      base: 50.0,
      rappi: 55.0,
      ubereats: 60.0,
      didifood: 52.0,
    },
  },
  {
    id: 4,
    name: "Refresco Cola",
    category: "Bebidas",
    prices: {
      base: 35.0,
      rappi: 40.0,
      ubereats: 42.0,
      didifood: 38.0,
    },
  },
  {
    id: 5,
    name: "Ensalada César",
    category: "Ensaladas",
    prices: {
      base: 90.0,
      rappi: 95.0,
      ubereats: 100.0,
      didifood: 92.0,
    },
  },
]

function PricingManager({ onEdit }) {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.toLowerCase() === selectedCategory)
    : products

  const handleEdit = (product, platform) => {
    if (onEdit) {
      onEdit(product, platform)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-full pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                {selectedCategory
                  ? categories.find((category) => category.value === selectedCategory)?.label
                  : "Filtrar por categoría"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Buscar categoría..." />
                <CommandList>
                  <CommandEmpty>No se encontraron categorías.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setSelectedCategory("")
                        setOpen(false)
                      }}
                    >
                      <Check className={`mr-2 h-4 w-4 ${selectedCategory === "" ? "opacity-100" : "opacity-0"}`} />
                      Todas las categorías
                    </CommandItem>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.value}
                        onSelect={() => {
                          setSelectedCategory(category.value)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            selectedCategory === category.value ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        {category.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Tabs defaultValue="todas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todas">Todas las plataformas</TabsTrigger>
          <TabsTrigger value="rappi">Rappi</TabsTrigger>
          <TabsTrigger value="ubereats">UberEats</TabsTrigger>
          <TabsTrigger value="didifood">DidiFood</TabsTrigger>
        </TabsList>
        <TabsContent value="todas">
          <Card>
            <CardHeader>
              <CardTitle>Precios en todas las plataformas</CardTitle>
              <CardDescription>Gestiona los precios de tus productos en todas las plataformas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Precio Base</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <PlatformIcon platform="rappi" />
                          Rappi
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <PlatformIcon platform="ubereats" />
                          UberEats
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <PlatformIcon platform="didifood" />
                          DidiFood
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            ${product.prices.base.toFixed(2)}
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(product, "base")}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar precio base</span>
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            ${product.prices.rappi.toFixed(2)}
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(product, "rappi")}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar precio Rappi</span>
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            ${product.prices.ubereats.toFixed(2)}
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(product, "ubereats")}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar precio UberEats</span>
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            ${product.prices.didifood.toFixed(2)}
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(product, "didifood")}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar precio DidiFood</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rappi">
          <Card>
            <CardHeader>
              <CardTitle>Precios en Rappi</CardTitle>
              <CardDescription>Gestiona los precios de tus productos en Rappi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Precio Base</TableHead>
                      <TableHead>Precio en Rappi</TableHead>
                      <TableHead>Diferencia</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>${product.prices.base.toFixed(2)}</TableCell>
                        <TableCell>${product.prices.rappi.toFixed(2)}</TableCell>
                        <TableCell>
                          {(((product.prices.rappi - product.prices.base) / product.prices.base) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(product, "rappi")}>
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ubereats">
          <Card>
            <CardHeader>
              <CardTitle>Precios en UberEats</CardTitle>
              <CardDescription>Gestiona los precios de tus productos en UberEats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Precio Base</TableHead>
                      <TableHead>Precio en UberEats</TableHead>
                      <TableHead>Diferencia</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>${product.prices.base.toFixed(2)}</TableCell>
                        <TableCell>${product.prices.ubereats.toFixed(2)}</TableCell>
                        <TableCell>
                          {(((product.prices.ubereats - product.prices.base) / product.prices.base) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(product, "ubereats")}>
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="didifood">
          <Card>
            <CardHeader>
              <CardTitle>Precios en DidiFood</CardTitle>
              <CardDescription>Gestiona los precios de tus productos en DidiFood</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Precio Base</TableHead>
                      <TableHead>Precio en DidiFood</TableHead>
                      <TableHead>Diferencia</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>${product.prices.base.toFixed(2)}</TableCell>
                        <TableCell>${product.prices.didifood.toFixed(2)}</TableCell>
                        <TableCell>
                          {(((product.prices.didifood - product.prices.base) / product.prices.base) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(product, "didifood")}>
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default PricingManager
