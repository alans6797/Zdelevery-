"use client"

import type React from "react"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlatformIcon } from "@/components/platform-icon"

interface PlatformPricesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: any
}

export function PlatformPricesDialog({ open, onOpenChange, product }: PlatformPricesDialogProps) {
  const [prices, setPrices] = useState({
    rappi: "",
    ubereats: "",
    didifood: "",
  })

  useEffect(() => {
    if (product && product.prices) {
      setPrices({
        rappi: product.prices.rappi.toString(),
        ubereats: product.prices.ubereats.toString(),
        didifood: product.prices.didifood.toString(),
      })
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPrices((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar los precios
    console.log(`Precios de ${product.name} actualizados:`, prices)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Precios por Plataforma</DialogTitle>
          <DialogDescription>Configura los precios de {product?.name} en cada plataforma.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PlatformIcon platform="rappi" />
                <Label htmlFor="rappi">Precio en Rappi</Label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <Input
                  id="rappi"
                  name="rappi"
                  type="number"
                  min="0"
                  step="0.01"
                  value={prices.rappi}
                  onChange={handleChange}
                  className="pl-7"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PlatformIcon platform="ubereats" />
                <Label htmlFor="ubereats">Precio en UberEats</Label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <Input
                  id="ubereats"
                  name="ubereats"
                  type="number"
                  min="0"
                  step="0.01"
                  value={prices.ubereats}
                  onChange={handleChange}
                  className="pl-7"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PlatformIcon platform="didifood" />
                <Label htmlFor="didifood">Precio en DidiFood</Label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <Input
                  id="didifood"
                  name="didifood"
                  type="number"
                  min="0"
                  step="0.01"
                  value={prices.didifood}
                  onChange={handleChange}
                  className="pl-7"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
