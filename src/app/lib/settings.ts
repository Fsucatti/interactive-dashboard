// Settings are kept in this browser: the site is static and has no server.
export type Language = "en" | "es"

export type Settings = {
  name: string
  email: string
  avatar: string | null
  darkMode: boolean
  notifications: boolean
  language: Language
}

const STORAGE_KEY = "dashboard:settings"

export const DEFAULT_SETTINGS: Settings = {
  name: "Francisco",
  email: "francisco@example.com",
  avatar: null,
  darkMode: true,
  notifications: true,
  language: "en",
}

export function loadSettings(): Settings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const settings = saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : { ...DEFAULT_SETTINGS }
    // Older versions offered French and saved a 2FA flag.
    if (settings.language !== "es") settings.language = "en"
    delete settings.twoFA
    return settings
  } catch {
    return DEFAULT_SETTINGS
  }
}

/** Throws if the browser refuses, for example when an avatar exceeds the storage quota. */
export function saveSettings(settings: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function clearSettings() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage may be blocked; the defaults apply anyway.
  }
}
