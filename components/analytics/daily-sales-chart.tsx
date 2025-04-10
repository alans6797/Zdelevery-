"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Datos de ejemplo
const data = [
  { name: "01/06", value: 1200 },
  { name: "02/06", value: 1800 },
  { name: "03/06", value: 1600 },
  { name: "04/06", value: 2200 },
  { name: "05/06", value: 1900 },
  { name: "06/06", value: 2800 },
  { name: "07/06", value: 2400 },
  { name: "08/06", value: 2200 },
  { name: "09/06", value: 2600 },
  { name: "10/06", value: 2900 },
  { name: "11/06", value: 3100 },
  { name: "12/06", value: 2800 },
  { name: "13/06", value: 3200 },
  { name: "14/06", value: 3500 },
  { name: "15/06", value: 3800 },
]

export function DailySalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={(value) => [`$${value}`, "Ventas"]} />
        <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
