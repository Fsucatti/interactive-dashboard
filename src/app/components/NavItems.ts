import { FiHome, FiFileText, FiBarChart2, FiSettings } from "react-icons/fi"

/** Labels come from the dictionary in lib/i18n.ts, under `nav`. */
export const navItems = [
  { id: "dashboard", icon: FiHome },
  { id: "reports", icon: FiFileText },
  { id: "analytics", icon: FiBarChart2 },
  { id: "settings", icon: FiSettings },
] as const

export type SectionId = (typeof navItems)[number]["id"]
