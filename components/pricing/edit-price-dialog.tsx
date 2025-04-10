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

interface EditPriceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: any
  platform: string
}

export function EditPriceDialog({ open, onOpenChange, product, platform }: EditPriceDialogProps) {
  const [price, setPrice] = useState("")

  useEffect(() => {
    if (product && platform) {
      setPrice(product.prices[platform].toString())
    }
  }, [product, platform])

  const getPlatformName = () => {
    switch (platform) {
      case "base":
        return "Base"
      case "rappi":
        return "Rappi"
      case "ubereats":
        return "UberEats"
      case "didifood":
        return "DidiFood"
      default:
        return platform
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar el precio
    console.log(`Precio de ${product.name} en ${platform} actualizado a: ${price}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Precio</DialogTitle>
          <DialogDescription>
            Actualiza el precio de {product?.name} en {getPlatformName()}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              {platform !== "base" && <PlatformIcon platform={platform} />}
              <span className="font-medium">{getPlatformName()}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Precio
              </Label>
              <div className="relative col-span-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-7"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
