"use client"
import { motion, AnimatePresence } from "framer-motion"
import { FiUser, FiLogOut, FiX } from "react-icons/fi"
import { navItems, type SectionId } from "./NavItems"
import { CatIcon, PORTFOLIO_URL } from "./ProjectFooter"
import { useSettings } from "../lib/SettingsContext"

type SidebarProps = {
  collapsed: boolean
  setCollapsed: (val: boolean) => void
  active: SectionId
  setActive: (val: SectionId) => void
  isMobileOpen: boolean
  setIsMobileOpen: (val: boolean) => void
  onLogout: () => void
}

function Avatar({ src }: { src: string | null }) {
  if (src) return <img src={src} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover border border-teal-400" />
  return <FiUser className="text-teal-300 text-xl shrink-0" />
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  active,
  setActive,
  isMobileOpen,
  setIsMobileOpen,
  onLogout,
}: SidebarProps) {
  const { settings, t } = useSettings()

  const handleNavClick = (id: SectionId) => {
    setActive(id)
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* === Desktop Sidebar === */}
      <motion.aside
        animate={{ width: collapsed ? "4.5rem" : "16rem" }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex h-screen bg-gradient-to-b from-black via-slate-900 to-black
                   text-white border-r border-gray-700 flex-col p-4 shadow-lg sticky top-0"
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? t.common.expand : t.common.collapse}
          className="self-end mb-6 p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <motion.span aria-hidden animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            ➤
          </motion.span>
        </button>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            const label = t.nav[item.id]

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNavClick(item.id)}
                  aria-label={collapsed ? label : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md w-full
                    transition-colors duration-200
                    ${isActive ? "bg-teal-600/30 text-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.6)]" : "text-gray-400 hover:bg-slate-800 hover:text-white"}`}
                >
                  <Icon className="text-xl" />
                  {!collapsed && <span>{label}</span>}
                </button>

                {collapsed && (
                  <span
                    aria-hidden
                    className="absolute left-14 top-1/2 -translate-y-1/2
                               bg-black text-sm text-white px-2 py-1 rounded
                               opacity-0 group-hover:opacity-100
                               transition-opacity shadow-md border border-gray-600 whitespace-nowrap"
                  >
                    {label}
                  </span>
                )}
              </div>
            )
          })}
        </nav>

        <a
          href={PORTFOLIO_URL}
          title={collapsed ? t.common.backToPortfolio : undefined}
          aria-label={t.common.backToPortfolio}
          className="mb-4 flex items-center gap-3 px-3 py-2 rounded-md text-teal-300 hover:bg-slate-800 transition-colors"
        >
          <CatIcon className="h-5 w-5 shrink-0" />
          {!collapsed && <span>{t.common.backToPortfolio}</span>}
        </a>

        <div className="pt-6 border-t border-gray-700 flex items-center gap-2 min-w-0">
          <Avatar src={settings.avatar} />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm text-gray-400">{t.common.loggedInAs}</p>
              <p className="text-teal-300 font-medium truncate">{settings.name || "—"}</p>
            </div>
          )}
        </div>

        <button
          onClick={onLogout}
          aria-label={collapsed ? t.common.logout : undefined}
          className="mt-4 flex items-center gap-2 px-3 py-2 rounded-md
                     text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
        >
          <FiLogOut />
          {!collapsed && <span>{t.common.logout}</span>}
        </button>
      </motion.aside>

      {/* === Mobile Sidebar (Drawer) === */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-50 flex"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="w-64 bg-gradient-to-b from-black via-slate-900 to-black text-white p-4 shadow-lg flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsMobileOpen(false)}
                className="mb-6 p-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 w-fit"
              >
                <FiX /> {t.common.close}
              </button>

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = active === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md w-full
                        transition-colors duration-200
                        ${isActive ? "bg-teal-600/30 text-teal-300" : "text-gray-400 hover:bg-slate-800 hover:text-white"}`}
                    >
                      <Icon className="text-xl" />
                      <span>{t.nav[item.id]}</span>
                    </button>
                  )
                })}
              </nav>

              <a
                href={PORTFOLIO_URL}
                className="mt-4 flex items-center gap-3 px-3 py-2 rounded-md text-teal-300 hover:bg-slate-800 transition-colors"
              >
                <CatIcon className="h-5 w-5 shrink-0" />
                <span>{t.common.backToPortfolio}</span>
              </a>

              <div className="mt-auto pt-6 border-t border-gray-700 flex items-center gap-2 min-w-0">
                <Avatar src={settings.avatar} />
                <div className="min-w-0">
                  <p className="text-sm text-gray-400">{t.common.loggedInAs}</p>
                  <p className="text-teal-300 font-medium truncate">{settings.name || "—"}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMobileOpen(false)
                  onLogout()
                }}
                className="mt-4 flex items-center gap-2 px-3 py-2 rounded-md text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
              >
                <FiLogOut /> <span>{t.common.logout}</span>
              </button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
