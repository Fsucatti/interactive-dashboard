"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { FiLogIn, FiMenu } from "react-icons/fi"
import Sidebar from "./components/Sidebar"
import Notifications from "./components/Notifications"
import DashboardSection from "./components/sections/DashboardSection"
import ReportsSection from "./components/sections/ReportsSection"
import AnalyticsSection from "./components/sections/AnalyticsSection"
import SettingsSection from "./components/sections/SettingsSection"
import type { SectionId } from "./components/NavItems"
import ProjectFooter, { CatIcon, PORTFOLIO_URL } from "./components/ProjectFooter"
import { SettingsProvider, useSettings } from "./lib/SettingsContext"

export default function Page() {
  return (
    <SettingsProvider>
      <Dashboard />
    </SettingsProvider>
  )
}

function Dashboard() {
  const { t } = useSettings()
  const [active, setActive] = useState<SectionId>("dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  // A demo sign-out: there is no account, so it only swaps the view.
  const [signedOut, setSignedOut] = useState(false)

  if (signedOut) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6">
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-800/60 p-8 text-center shadow-lg">
            <CatIcon className="mx-auto mb-4 h-12 w-12 text-teal-300" />
            <h1 className="mb-3 text-2xl font-bold">{t.signedOut.title}</h1>
            <p className="mb-6 text-gray-400">{t.signedOut.text}</p>
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setSignedOut(false)}
                className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 font-medium text-white transition-colors hover:bg-teal-500"
              >
                <FiLogIn /> {t.signedOut.button}
              </button>
              <a href={PORTFOLIO_URL} className="text-sm text-teal-300 hover:underline">
                {t.common.backToPortfolio}
              </a>
            </div>
          </div>
        </main>
        <ProjectFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        active={active}
        setActive={setActive}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onLogout={() => setSignedOut(true)}
      />

      <main className="flex-1 min-w-0 p-4 sm:p-8 overflow-y-auto scroll-smooth">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between gap-2 mb-6">
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label={t.common.openMenu}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <FiMenu size={22} />
          </button>
          <p className="text-xl font-bold">{t.nav[active]}</p>
          <div className="flex items-center gap-2">
            <Notifications />
            <a
              href={PORTFOLIO_URL}
              aria-label={t.common.backToPortfolio}
              className="p-2 rounded-lg bg-slate-800 text-teal-300 hover:bg-slate-700 transition-colors"
            >
              <CatIcon className="h-[22px] w-[22px]" />
            </a>
          </div>
        </div>

        {/* Desktop top bar */}
        <div className="hidden lg:flex justify-end mb-2">
          <Notifications />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
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

        <ProjectFooter />
      </main>
    </div>
  )
}
