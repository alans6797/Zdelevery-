"use client"

import { useState } from "react"
import PricingManager from "../components/PricingManager"
import { EditPriceDialog } from "../components/pricing/EditPriceDialog"

function Pricing() {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState("")

  const handleEdit = (product, platform) => {
    setSelectedProduct(product)
    setSelectedPlatform(platform)
    setShowEditDialog(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Precios</h1>
        <p className="text-muted-foreground">Gestiona los precios de tus productos en las diferentes plataformas.</p>
      </div>

      <PricingManager onEdit={handleEdit} />

      {showEditDialog && selectedProduct && (
        <EditPriceDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          product={selectedProduct}
          platform={selectedPlatform}
        />
      )}
    </div>
  )
}

export default Pricing
