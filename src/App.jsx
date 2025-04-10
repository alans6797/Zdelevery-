import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Orders from "./pages/Orders"
import WhatsApp from "./pages/WhatsApp"
import Inventory from "./pages/Inventory"
import Pricing from "./pages/Pricing"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="food-admin-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="whatsapp" element={<WhatsApp />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
