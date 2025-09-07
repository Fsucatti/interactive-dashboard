"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { FiUser, FiMail, FiMoon, FiBell, FiShield, FiCamera } from "react-icons/fi"

type Settings = {
  name: string
  email: string
  avatar: string | null
  darkMode: boolean
  notifications: boolean
  twoFA: boolean
  language: string
}

export default function SettingsSection() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Load settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings")
        const data = await res.json()
        setSettings(data)
      } catch {
        toast.error("Failed to load settings")
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  // Save settings
  const handleSave = async () => {
    if (!settings) return
    setSaving(true)
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error("Save failed")
      const data = await res.json()
      setSettings(data.settings)
      toast.success("Settings saved successfully 🎉")
    } catch {
      toast.error("Error saving settings")
    } finally {
      setSaving(false)
    }
  }

   // Avatar handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () =>
        setSettings((prev) => prev && { ...prev, avatar: reader.result as string })
      reader.readAsDataURL(file)
    }
  }

  if (loading) {
    return (
      <section id="settings" className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading settings...</p>
      </section>
    )
  }

  return (
    <section id="settings" className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-4xl bg-gray-800/60 rounded-xl p-8 shadow-lg border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
          Settings
        </h2>

        {settings && (
          <div className="space-y-10">
            {/* === Profile === */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-300">Profile</h3>

              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24">
                  <img
                    src={settings.avatar || "/default-avatar.png"}
                    alt=""
                    className="w-24 h-24 rounded-full object-cover border-2 border-teal-400 shadow"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700"
                  >
                    <FiCamera className="text-white" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <FiUser className="text-cyan-400 text-2xl" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="text-cyan-400 text-2xl" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>
            </div>

            {/* === Preferences === */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-300">Preferences</h3>
              <div className="flex flex-col gap-4">
                {/* Dark Mode */}
                <label className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FiMoon className="text-cyan-400 text-2xl" />
                    <span className="text-gray-300">Dark Mode</span>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                    className={`relative w-12 h-6 flex items-center rounded-full transition-colors ${
                      settings.darkMode ? "bg-teal-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.darkMode ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </label>

                {/* Notifications */}
                <label className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FiBell className="text-cyan-400 text-2xl" />
                    <span className="text-gray-300">Email Notifications</span>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                    className={`relative w-12 h-6 flex items-center rounded-full transition-colors ${
                      settings.notifications ? "bg-teal-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.notifications ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </label>

                {/* Language */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-300">Language</span>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </div>

            {/* === Security === */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-300">Security</h3>
              <div className="flex flex-col gap-4">
                {/* 2FA */}
                <label className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FiShield className="text-cyan-400 text-2xl" />
                    <span className="text-gray-300">Enable 2FA</span>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, twoFA: !settings.twoFA })}
                    className={`relative w-12 h-6 flex items-center rounded-full transition-colors ${
                      settings.twoFA ? "bg-teal-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.twoFA ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </label>

                <button className="px-4 py-2 w-fit bg-rose-600 hover:bg-rose-500 rounded-md text-white font-medium transition-colors">
                  Reset Password
                </button>
              </div>
            </div>

            {/* === Save Buttons === */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  saving
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-500 text-white"
                }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}
// Note: The API endpoints /api/settings for GET and POST are assumed to exist and handle settings data appropriately.