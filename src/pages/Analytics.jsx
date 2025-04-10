"use client"

import { useState } from "react"
import AnalyticsPanel from "../components/AnalyticsPanel"
import DateRangePicker from "../components/DateRangePicker"

function Analytics() {
  const [date, setDate] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Estadísticas</h1>
        <p className="text-muted-foreground">
          Visualiza el rendimiento de tu negocio a través de las diferentes plataformas.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">Periodo de análisis</h2>
        <DateRangePicker date={date} setDate={setDate} />
      </div>

      <AnalyticsPanel dateRange={date} />
    </div>
  )
}

export default Analytics
