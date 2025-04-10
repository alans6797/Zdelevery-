"use client"

import { useState } from "react"
import InventoryTable from "../components/InventoryTable"
import { AddProductDialog } from "../components/inventory/AddProductDialog"
import { EditProductDialog } from "../components/inventory/EditProductDialog"
import { PlatformPricesDialog } from "../components/inventory/PlatformPricesDialog"
import { Button } from "../components/ui/button"
import { Plus } from "lucide-react"

function Inventory() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPricesDialog, setShowPricesDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setShowEditDialog(true)
  }

  const handlePrices = (product) => {
    setSelectedProduct(product)
    setShowPricesDialog(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
        <p className="text-muted-foreground">Gestiona tu inventario de productos y precios por plataforma.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Producto
        </Button>
      </div>

      <InventoryTable onEdit={handleEdit} onPrices={handlePrices} />

      {showAddDialog && <AddProductDialog open={showAddDialog} onOpenChange={setShowAddDialog} />}

      {showEditDialog && selectedProduct && (
        <EditProductDialog open={showEditDialog} onOpenChange={setShowEditDialog} product={selectedProduct} />
      )}

      {showPricesDialog && selectedProduct && (
        <PlatformPricesDialog open={showPricesDialog} onOpenChange={setShowPricesDialog} product={selectedProduct} />
      )}
    </div>
  )
}

export default Inventory
