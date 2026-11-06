"use client"
import { useState, useEffect, useId } from "react"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { FiUser, FiMail, FiMoon, FiBell, FiCamera, FiGlobe, FiRotateCcw } from "react-icons/fi"
import type { Language, Settings } from "../../lib/settings"
import { useSettings } from "../../lib/SettingsContext"
import { dictionaries } from "../../lib/i18n"

function Switch({ checked, onChange, labelledBy }: { checked: boolean; onChange: () => void; labelledBy: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      onClick={onChange}
      className={`relative w-12 h-6 shrink-0 flex items-center rounded-full transition-colors ${checked ? "bg-teal-500" : "bg-gray-600"}`}
    >
      <span className={`absolute left-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-0"}`} />
    </button>
  )
}

export default function SettingsSection() {
  const { settings: saved, save, reset, t } = useSettings()
  // The form edits a draft: nothing changes until you save, and Cancel goes back.
  const [draft, setDraft] = useState<Settings>(saved)
  const ids = { dark: useId(), notifications: useId(), language: useId() }

  useEffect(() => setDraft(saved), [saved])

  const changed = JSON.stringify(draft) !== JSON.stringify(saved)
  const update = (patch: Partial<Settings>) => setDraft((prev) => ({ ...prev, ...patch }))

  const handleSave = () => {
    try {
      save(draft)
      // In the language just chosen.
      toast.success(dictionaries[draft.language].settings.saved)
    } catch {
      toast.error(t.settings.saveError)
    }
  }

  const handleReset = () => {
    reset()
    toast.success(t.settings.resetDone)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => update({ avatar: reader.result as string })
    reader.readAsDataURL(file)
  }

  return (
    <section id="settings" className="min-h-screen flex flex-col items-center justify-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-4xl bg-gray-800/60 rounded-xl p-4 sm:p-8 shadow-lg border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
          {t.settings.title}
        </h2>

        <div className="space-y-10">
          {/* === Profile === */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-300">{t.settings.profile}</h3>

            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24">
                <img
                  src={draft.avatar || "/default-avatar.svg"}
                  alt=""
                  className="w-24 h-24 rounded-full object-cover border-2 border-teal-400 shadow"
                />
                <label
                  htmlFor="avatar-upload"
                  title={t.settings.changePhoto}
                  className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700"
                >
                  <FiCamera className="text-white" />
                  <span className="sr-only">{t.settings.changePhoto}</span>
                </label>
                <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="sr-only" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <FiUser className="text-cyan-400 text-2xl shrink-0" />
                <input
                  type="text"
                  aria-label={t.settings.name}
                  placeholder={t.settings.name}
                  value={draft.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
                />
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-cyan-400 text-2xl shrink-0" />
                <input
                  type="email"
                  aria-label={t.settings.email}
                  placeholder={t.settings.email}
                  value={draft.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>
          </div>

          {/* === Preferences === */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-300">{t.settings.preferences}</h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FiMoon className="text-cyan-400 text-2xl shrink-0" />
                  <span id={ids.dark} className="text-gray-300">{t.settings.darkMode}</span>
                </div>
                <Switch checked={draft.darkMode} onChange={() => update({ darkMode: !draft.darkMode })} labelledBy={ids.dark} />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FiBell className="text-cyan-400 text-2xl shrink-0" />
                  <div>
                    <p id={ids.notifications} className="text-gray-300">{t.settings.notifications}</p>
                    <p className="text-xs text-gray-400">{t.settings.notificationsHint}</p>
                  </div>
                </div>
                <Switch checked={draft.notifications} onChange={() => update({ notifications: !draft.notifications })} labelledBy={ids.notifications} />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FiGlobe className="text-cyan-400 text-2xl shrink-0" />
                  <label htmlFor={ids.language} className="text-gray-300">{t.settings.language}</label>
                </div>
                <select
                  id={ids.language}
                  value={draft.language}
                  onChange={(e) => update({ language: e.target.value as Language })}
                  className="px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          </div>

          {/* === Demo data === */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-teal-300">{t.settings.demo}</h3>
            <p className="mb-4 text-sm text-gray-400">{t.settings.demoHint}</p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded-md text-white font-medium transition-colors"
            >
              <FiRotateCcw /> {t.settings.reset}
            </button>
          </div>

          {/* === Save Buttons === */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              onClick={() => setDraft(saved)}
              disabled={!changed}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 rounded-md text-gray-200 transition-colors"
            >
              {t.settings.cancel}
            </button>
            <button
              onClick={handleSave}
              disabled={!changed}
              className="px-4 py-2 rounded-md font-medium transition-colors bg-teal-600 hover:bg-teal-500 text-white disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              {t.settings.save}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
