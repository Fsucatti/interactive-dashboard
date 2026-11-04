// Settings are kept in this browser: the site is static and has no server.
export type Settings = {
  name: string
  email: string
  avatar: string | null
  darkMode: boolean
  notifications: boolean
  twoFA: boolean
  language: string
}

const STORAGE_KEY = "dashboard:settings"

const DEFAULT_SETTINGS: Settings = {
  name: "Francisco",
  email: "francisco@example.com",
  avatar: null,
  darkMode: true,
  notifications: true,
  twoFA: false,
  language: "en",
}

export function loadSettings(): Settings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS
  } catch {
    return DEFAULT_SETTINGS
  }
}

/** Throws if the browser refuses, for example when an avatar exceeds the storage quota. */
export function saveSettings(settings: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}
