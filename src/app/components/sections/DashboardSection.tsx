"use client"
import { motion } from "framer-motion"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts"
import { useSettings } from "../../lib/SettingsContext"
import { weekdayName } from "../../lib/i18n"

// Sample data, Monday first.
const weekly = [40, 30, 20, 27, 18, 23, 34]

const pieData = [
  { name: "Frontend", value: 40, color: "#6366F1" },
  { name: "Backend", value: 30, color: "#22C55E" },
  { name: "DevOps", value: 20, color: "#F59E0B" },
  { name: "Other", value: 10, color: "#EC4899" },
]

export default function DashboardSection() {
  const { settings, t, chart } = useSettings()
  const lineData = weekly.map((value, i) => ({ name: weekdayName(i, settings.language), value }))
  const pie = pieData.map((p) => ({ ...p, name: t.dashboard.stack[p.name] ?? p.name }))

  return (
    <section id="dashboard" className="min-h-screen mb-16">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-center mb-12
                   bg-gradient-to-r from-indigo-400 via-teal-300 to-yellow-400
                   bg-clip-text text-transparent drop-shadow-lg"
      >
        {t.dashboard.title}
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="bg-gray-800/60 rounded-xl p-6 shadow-lg border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">{t.dashboard.weekly}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="name" stroke={chart.axis} />
              <YAxis stroke={chart.axis} />
              <Tooltip />
              <Line type="monotone" dataKey="value" name={t.dashboard.value} stroke="#22C55E" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800/60 rounded-xl p-6 shadow-lg border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">{t.dashboard.focus}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pie} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {pie.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
