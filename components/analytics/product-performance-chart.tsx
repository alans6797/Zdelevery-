"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Datos de ejemplo
const data = [
  { name: "Hamburguesa Clásica", value: 120 },
  { name: "Hamburguesa con Queso", value: 98 },
  { name: "Papas Fritas", value: 86 },
  { name: "Refresco Cola", value: 75 },
  { name: "Ensalada César", value: 45 },
  { name: "Alitas BBQ", value: 42 },
  { name: "Agua Mineral", value: 38 },
  { name: "Helado de Vainilla", value: 25 },
]

export function ProductPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={150} />
        <Tooltip formatter={(value) => [`${value} unidades`, "Vendidos"]} />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
