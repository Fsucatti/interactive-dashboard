import type { Language } from "./settings"

const en = {
  nav: { dashboard: "Dashboard", reports: "Reports", analytics: "Analytics", settings: "Settings" },
  common: {
    backToPortfolio: "Back to portfolio",
    loggedInAs: "Logged in as",
    logout: "Log out",
    close: "Close",
    openMenu: "Open menu",
    collapse: "Collapse sidebar",
    expand: "Expand sidebar",
  },
  signedOut: {
    title: "You're signed out",
    text: "This is a demo, so there is no real account. Sign back in to keep exploring.",
    button: "Sign back in",
  },
  notifications: {
    label: "Notifications",
    empty: "No new notifications",
    items: ["December revenue is up 14% on November.", "Your monthly report is ready to export.", "Traffic from search grew for the sixth month in a row."],
    markRead: "Mark all as read",
  },
  dashboard: {
    title: "Interactive Dashboard",
    weekly: "Weekly Activity",
    focus: "Tech Stack Focus",
    value: "Activity",
    stack: { Frontend: "Frontend", Backend: "Backend", DevOps: "DevOps", Other: "Other" } as Record<string, string>,
  },
  reports: {
    title: "Monthly Reports",
    revenue: "Revenue",
    expenses: "Expenses",
    month: "Month",
    totalRevenue: "Total Revenue",
    totalExpenses: "Total Expenses",
    netProfit: "Net Profit",
    growth: "Growth (MoM)",
    search: "Search by month...",
    export: "Export CSV",
    exported: "Report exported",
    noResults: "No months match your search.",
    prev: "Prev",
    next: "Next",
    page: (page: number, total: number) => `Page ${page} of ${total}`,
    file: "monthly_reports.csv",
  },
  analytics: {
    title: "Analytics Overview",
    users: "Active Users",
    sessions: "Sessions",
    bounce: "Bounce Rate",
    conversion: "Conversion Rate",
    usersLine: "Users",
    sessionsLine: "Sessions",
    page: "Page",
    views: "Views",
    conversions: "Conversions",
    sources: { Direct: "Direct", Social: "Social", Organic: "Organic", Referral: "Referral" } as Record<string, string>,
  },
  settings: {
    title: "Settings",
    loading: "Loading settings...",
    profile: "Profile",
    changePhoto: "Change profile photo",
    name: "Your Name",
    email: "Email Address",
    preferences: "Preferences",
    darkMode: "Dark mode",
    notifications: "Notifications",
    notificationsHint: "Shows the bell with sample alerts",
    language: "Language",
    demo: "Demo data",
    demoHint: "Everything here is saved only in this browser.",
    reset: "Reset demo",
    resetDone: "Demo reset to its defaults",
    cancel: "Cancel",
    save: "Save changes",
    saving: "Saving...",
    saved: "Settings saved",
    saveError: "Couldn't save. The photo may be too large.",
  },
  footer: {
    by: "by Francisco Sucatti. Sample data.",
    built: "Built with Next.js, Recharts, and Tailwind CSS.",
    portfolio: "Portfolio",
    code: "Source code",
    links: "Project links",
  },
}

export type Dictionary = typeof en

const es: Dictionary = {
  nav: { dashboard: "Panel", reports: "Informes", analytics: "Analítica", settings: "Ajustes" },
  common: {
    backToPortfolio: "Volver al portfolio",
    loggedInAs: "Sesión iniciada como",
    logout: "Cerrar sesión",
    close: "Cerrar",
    openMenu: "Abrir menú",
    collapse: "Contraer barra lateral",
    expand: "Expandir barra lateral",
  },
  signedOut: {
    title: "Cerraste la sesión",
    text: "Es una demo, así que no hay una cuenta real. Volvé a entrar para seguir recorriéndola.",
    button: "Volver a entrar",
  },
  notifications: {
    label: "Notificaciones",
    empty: "No hay notificaciones nuevas",
    items: ["Los ingresos de diciembre subieron un 14 % respecto de noviembre.", "Tu informe mensual está listo para exportar.", "Las visitas desde buscadores crecieron por sexto mes seguido."],
    markRead: "Marcar todas como leídas",
  },
  dashboard: {
    title: "Panel interactivo",
    weekly: "Actividad semanal",
    focus: "Foco por área",
    value: "Actividad",
    stack: { Frontend: "Frontend", Backend: "Backend", DevOps: "DevOps", Other: "Otros" },
  },
  reports: {
    title: "Informes mensuales",
    revenue: "Ingresos",
    expenses: "Gastos",
    month: "Mes",
    totalRevenue: "Ingresos totales",
    totalExpenses: "Gastos totales",
    netProfit: "Ganancia neta",
    growth: "Crecimiento mensual",
    search: "Buscar por mes...",
    export: "Exportar CSV",
    exported: "Informe exportado",
    noResults: "Ningún mes coincide con la búsqueda.",
    prev: "Anterior",
    next: "Siguiente",
    page: (page: number, total: number) => `Página ${page} de ${total}`,
    file: "informes_mensuales.csv",
  },
  analytics: {
    title: "Resumen de analítica",
    users: "Usuarios activos",
    sessions: "Sesiones",
    bounce: "Tasa de rebote",
    conversion: "Tasa de conversión",
    usersLine: "Usuarios",
    sessionsLine: "Sesiones",
    page: "Página",
    views: "Visitas",
    conversions: "Conversiones",
    sources: { Direct: "Directo", Social: "Redes sociales", Organic: "Buscadores", Referral: "Referencias" },
  },
  settings: {
    title: "Ajustes",
    loading: "Cargando ajustes...",
    profile: "Perfil",
    changePhoto: "Cambiar foto de perfil",
    name: "Tu nombre",
    email: "Correo electrónico",
    preferences: "Preferencias",
    darkMode: "Modo oscuro",
    notifications: "Notificaciones",
    notificationsHint: "Muestra la campana con avisos de ejemplo",
    language: "Idioma",
    demo: "Datos de la demo",
    demoHint: "Todo lo que cambies se guarda solo en este navegador.",
    reset: "Restablecer la demo",
    resetDone: "La demo volvió a sus valores iniciales",
    cancel: "Cancelar",
    save: "Guardar cambios",
    saving: "Guardando...",
    saved: "Ajustes guardados",
    saveError: "No se pudo guardar. Puede que la foto sea muy grande.",
  },
  footer: {
    by: "por Francisco Sucatti. Datos de ejemplo.",
    built: "Hecho con Next.js, Recharts y Tailwind CSS.",
    portfolio: "Portfolio",
    code: "Código",
    links: "Enlaces del proyecto",
  },
}

export const dictionaries: Record<Language, Dictionary> = { en, es }

export const LOCALES: Record<Language, string> = { en: "en-US", es: "es-AR" }

/** Short month name, from 0 for January. */
export function monthName(index: number, language: Language) {
  return new Date(2026, index, 1).toLocaleString(LOCALES[language], { month: "short" }).replace(".", "")
}

/** Short weekday name, from 0 for Monday. */
export function weekdayName(index: number, language: Language) {
  // 5 January 2026 was a Monday.
  return new Date(2026, 0, 5 + index).toLocaleString(LOCALES[language], { weekday: "short" }).replace(".", "")
}

export function formatNumber(value: number, language: Language) {
  return value.toLocaleString(LOCALES[language])
}

export function formatMoney(value: number, language: Language) {
  return value.toLocaleString(LOCALES[language], { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}
