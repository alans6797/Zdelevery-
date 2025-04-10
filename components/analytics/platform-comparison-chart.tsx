"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Datos de ejemplo
const data = [
  { name: "Rappi", value: 45 },
  { name: "UberEats", value: 30 },
  { name: "DidiFood", value: 25 },
]

const COLORS = ["#FF5733", "#000000", "#2196F3"]

export function PlatformComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
