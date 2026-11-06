"use client"
import { useEffect, useRef, useState } from "react"
import { FiBell } from "react-icons/fi"
import { useSettings } from "../lib/SettingsContext"

/** A bell with sample alerts. The Notifications setting shows or hides it. */
export default function Notifications() {
  const { settings, t } = useSettings()
  const [open, setOpen] = useState(false)
  const [read, setRead] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  // Close when clicking outside or pressing Escape.
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  if (!settings.notifications) return null
  const items = read ? [] : t.notifications.items

  return (
    <div ref={box} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={t.notifications.label}
        aria-expanded={open}
        className="relative p-2 rounded-lg bg-slate-800 text-teal-300 hover:bg-slate-700 transition-colors"
      >
        <FiBell size={22} />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
            {items.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-xl">
          <p className="mb-2 font-semibold text-gray-200">{t.notifications.label}</p>
          {items.length === 0 ? (
            <p className="text-sm text-gray-400">{t.notifications.empty}</p>
          ) : (
            <>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="rounded-md bg-gray-800 p-2 text-sm text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => setRead(true)} className="mt-3 text-sm text-teal-300 hover:underline">
                {t.notifications.markRead}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
