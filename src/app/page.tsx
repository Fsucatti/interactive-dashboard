"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { FiMenu } from "react-icons/fi"
import Sidebar from "./components/Sidebar"
import DashboardSection from "./components/sections/DashboardSection"
import ReportsSection from "./components/sections/ReportsSection"
import AnalyticsSection from "./components/sections/AnalyticsSection"
import SettingsSection from "./components/sections/SettingsSection"
import { navItems } from "./components/NavItems"

export default function Dashboard() {
  const [active, setActive] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        active={active}
        setActive={setActive}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto scroll-smooth">
        {/* === Mobile Topbar === */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <FiMenu size={22} />
          </button>
          <h1 className="text-xl font-bold capitalize">{active}</h1>
        </div>

        {/* === Animated Section Switching === */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active} // ensures unique animation per section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {active === "dashboard" && <DashboardSection />}
            {active === "reports" && <ReportsSection />}
            {active === "analytics" && <AnalyticsSection />}
            {active === "settings" && <SettingsSection />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
