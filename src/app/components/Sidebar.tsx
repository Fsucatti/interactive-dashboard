"use client"
import { motion, AnimatePresence } from "framer-motion"
import { FiUser, FiLogOut, FiX } from "react-icons/fi"
import { navItems } from "./NavItems"

type SidebarProps = {
  collapsed: boolean
  setCollapsed: (val: boolean) => void
  active: string
  setActive: (val: string) => void
  isMobileOpen: boolean
  setIsMobileOpen: (val: boolean) => void
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  active,
  setActive,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) {
  // ✅ Instead of scrolling, just set active section
  const handleNavClick = (id: string) => {
    setActive(id)
    setIsMobileOpen(false) // Close drawer on mobile after selecting
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
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="self-end mb-6 p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            ➤
          </motion.span>
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md w-full 
                    transition-colors duration-200
                    ${isActive ? "bg-teal-600/30 text-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.6)]" : "text-gray-400 hover:bg-slate-800 hover:text-white"}`}
                >
                  <Icon className="text-xl" />
                  {!collapsed && <span>{item.label}</span>}
                </button>

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span
                    className="absolute left-14 top-1/2 -translate-y-1/2 
                               bg-black text-sm text-white px-2 py-1 rounded 
                               opacity-0 group-hover:opacity-100 
                               transition-opacity shadow-md border border-gray-600"
                  >
                    {item.label}
                  </span>
                )}
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-gray-700 flex items-center gap-2">
          <FiUser className="text-teal-300 text-xl" />
          {!collapsed && (
            <div>
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="text-teal-300 font-medium">Francisco</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          className="mt-4 flex items-center gap-2 px-3 py-2 rounded-md 
                     text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
        >
          <FiLogOut />
          {!collapsed && <span>Logout</span>}
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
              className="w-64 bg-gradient-to-b from-black via-slate-900 to-black text-white p-4 shadow-lg"
              onClick={(e) => e.stopPropagation()} // Prevent closing on sidebar click
            >
              {/* Close button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="mb-6 p-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <FiX /> Close
              </button>

              {/* Nav Items */}
              <nav className="flex flex-col gap-2 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = active === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md w-full 
                        transition-colors duration-200
                        ${isActive ? "bg-teal-600/30 text-teal-300" : "text-gray-400 hover:bg-slate-800 hover:text-white"}`}
                    >
                      <Icon className="text-xl" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
