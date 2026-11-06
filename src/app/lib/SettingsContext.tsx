"use client"
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { dictionaries, LOCALES, type Dictionary } from "./i18n"
import { clearSettings, DEFAULT_SETTINGS, loadSettings, saveSettings, type Settings } from "./settings"

type SettingsContextValue = {
  /** The saved settings. The Settings form edits a copy until you save. */
  settings: Settings
  t: Dictionary
  save: (settings: Settings) => void
  reset: () => void
  /** Chart colors that read well on the current theme. */
  chart: { grid: string; axis: string }
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  useEffect(() => {
    setSettings(loadSettings())
  }, [])

  // The theme and language apply to the whole page, so they live on <html>.
  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = settings.darkMode ? "dark" : "light"
    root.style.colorScheme = settings.darkMode ? "dark" : "light"
    root.lang = LOCALES[settings.language].slice(0, 2)
  }, [settings.darkMode, settings.language])

  const save = useCallback((next: Settings) => {
    saveSettings(next)
    setSettings(next)
  }, [])

  const reset = useCallback(() => {
    clearSettings()
    setSettings(DEFAULT_SETTINGS)
  }, [])

  const value = useMemo<SettingsContextValue>(
    () => ({
      settings,
      t: dictionaries[settings.language],
      save,
      reset,
      chart: settings.darkMode ? { grid: "#444", axis: "#ccc" } : { grid: "#cbd5e1", axis: "#475569" },
    }),
    [settings, save, reset],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const value = useContext(SettingsContext)
  if (!value) throw new Error("useSettings must be used inside SettingsProvider")
  return value
}
