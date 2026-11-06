"use client"
import { motion } from "framer-motion"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts"
import { FiUsers, FiActivity, FiTrendingDown, FiTrendingUp } from "react-icons/fi"
import { useSettings } from "../../lib/SettingsContext"
import { formatNumber, monthName } from "../../lib/i18n"

// Sample data, January to June.
const trafficTrend = [
  { users: 1200, sessions: 1800 },
  { users: 1500, sessions: 2100 },
  { users: 1700, sessions: 2500 },
  { users: 2000, sessions: 3000 },
  { users: 2200, sessions: 3300 },
  { users: 2600, sessions: 3900 },
]

const trafficSources = [
  { name: "Direct", value: 400 },
  { name: "Social", value: 300 },
  { name: "Organic", value: 500 },
  { name: "Referral", value: 200 },
]

const COLORS = ["#22d3ee", "#fb7185", "#34d399", "#fbbf24"]

const topPages = [
  { page: "/home", views: 5400, conversions: 230 },
  { page: "/pricing", views: 3200, conversions: 410 },
  { page: "/blog/how-to", views: 2900, conversions: 120 },
  { page: "/contact", views: 1800, conversions: 95 },
]

const kpis = { users: 2600, sessions: 3900, bounceRate: 42.5, conversionRate: 3.7 }

export default function AnalyticsSection() {
  const { settings, t, chart } = useSettings()
  const lang = settings.language
  const trend = trafficTrend.map((row, i) => ({ ...row, month: monthName(i, lang) }))
  const sources = trafficSources.map((s) => ({ ...s, name: t.analytics.sources[s.name] ?? s.name }))

  const kpiCards = [
    { label: t.analytics.users, value: formatNumber(kpis.users, lang), Icon: FiUsers, color: "text-cyan-400" },
    { label: t.analytics.sessions, value: formatNumber(kpis.sessions, lang), Icon: FiActivity, color: "text-teal-400" },
    { label: t.analytics.bounce, value: `${formatNumber(kpis.bounceRate, lang)}%`, Icon: FiTrendingDown, color: "text-rose-400" },
    { label: t.analytics.conversion, value: `${formatNumber(kpis.conversionRate, lang)}%`, Icon: FiTrendingUp, color: "text-green-400" },
  ]

  return (
    <section id="analytics" className="min-h-screen flex flex-col items-center justify-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-6xl bg-gray-800/60 rounded-xl p-4 sm:p-8 shadow-lg border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
          {t.analytics.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpiCards.map(({ label, value, Icon, color }) => (
            <div key={label} className="bg-gray-900/70 rounded-lg p-6 shadow border border-gray-700 flex items-center gap-4">
              <Icon className={`${color} text-3xl shrink-0`} />
              <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className={`text-xl font-semibold ${color}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-[300px] mb-10"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="month" stroke={chart.axis} />
              <YAxis stroke={chart.axis} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" name={t.analytics.usersLine} stroke="#22d3ee" strokeWidth={2} />
              <Line type="monotone" dataKey="sessions" name={t.analytics.sessionsLine} stroke="#34d399" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-[300px] mb-10 flex justify-center"
        >
          <ResponsiveContainer width="100%" height="100%" className="max-w-xl">
            <PieChart>
              <Pie
                data={sources}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: { percent?: number }) => `${entry.percent ? (entry.percent * 100).toFixed(0) : 0}%`}
                outerRadius={100}
                dataKey="value"
              >
                {sources.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-gray-200">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-2 border border-gray-700 text-left">{t.analytics.page}</th>
                <th className="px-4 py-2 border border-gray-700 text-center">{t.analytics.views}</th>
                <th className="px-4 py-2 border border-gray-700 text-center">{t.analytics.conversions}</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((row) => (
                <tr key={row.page} className="hover:bg-gray-700/30">
                  <td className="px-4 py-2 border border-gray-700">{row.page}</td>
                  <td className="px-4 py-2 border border-gray-700 text-center text-cyan-400">{formatNumber(row.views, lang)}</td>
                  <td className="px-4 py-2 border border-gray-700 text-center text-green-400">{formatNumber(row.conversions, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  )
}
