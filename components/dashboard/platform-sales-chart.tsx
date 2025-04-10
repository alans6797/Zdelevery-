"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Datos de ejemplo
const data = [
  {
    name: "Lun",
    Rappi: 4000,
    UberEats: 2400,
    DidiFood: 2400,
  },
  {
    name: "Mar",
    Rappi: 3000,
    UberEats: 1398,
    DidiFood: 2210,
  },
  {
    name: "Mié",
    Rappi: 2000,
    UberEats: 9800,
    DidiFood: 2290,
  },
  {
    name: "Jue",
    Rappi: 2780,
    UberEats: 3908,
    DidiFood: 2000,
  },
  {
    name: "Vie",
    Rappi: 1890,
    UberEats: 4800,
    DidiFood: 2181,
  },
  {
    name: "Sáb",
    Rappi: 2390,
    UberEats: 3800,
    DidiFood: 2500,
  },
  {
    name: "Dom",
    Rappi: 3490,
    UberEats: 4300,
    DidiFood: 2100,
  },
]

export function PlatformSalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value}`, "Ventas"]} />
        <Legend />
        <Bar dataKey="Rappi" fill="#FF5733" />
        <Bar dataKey="UberEats" fill="#000000" />
        <Bar dataKey="DidiFood" fill="#2196F3" />
      </BarChart>
    </ResponsiveContainer>
  )
}
