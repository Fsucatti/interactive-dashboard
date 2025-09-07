"use client"
import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts"
import { FiUsers, FiActivity, FiTrendingDown, FiTrendingUp } from "react-icons/fi"

// === Sample Data ===
const trafficTrend = [
  { month: "Jan", users: 1200, sessions: 1800 },
  { month: "Feb", users: 1500, sessions: 2100 },
  { month: "Mar", users: 1700, sessions: 2500 },
  { month: "Apr", users: 2000, sessions: 3000 },
  { month: "May", users: 2200, sessions: 3300 },
  { month: "Jun", users: 2600, sessions: 3900 },
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

// === Analytics Section ===
export default function AnalyticsSection() {
  // Example KPI values
  const kpis = useMemo(() => ({
    users: 2600,
    sessions: 3900,
    bounceRate: 42.5,
    conversionRate: 3.7,
  }), [])

  return (
    <section id="analytics" className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-6xl bg-gray-800/60 rounded-xl p-8 shadow-lg border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
          Analytics Overview
        </h2>

        {/* === KPI CARDS === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-900/70 rounded-lg p-6 shadow border border-gray-700 flex items-center gap-4">
            <FiUsers className="text-cyan-400 text-3xl" />
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-xl font-semibold text-cyan-400">
                {kpis.users.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-gray-900/70 rounded-lg p-6 shadow border border-gray-700 flex items-center gap-4">
            <FiActivity className="text-teal-400 text-3xl" />
            <div>
              <p className="text-gray-400 text-sm">Sessions</p>
              <p className="text-xl font-semibold text-teal-400">
                {kpis.sessions.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-gray-900/70 rounded-lg p-6 shadow border border-gray-700 flex items-center gap-4">
            <FiTrendingDown className="text-rose-400 text-3xl" />
            <div>
              <p className="text-gray-400 text-sm">Bounce Rate</p>
              <p className="text-xl font-semibold text-rose-400">
                {kpis.bounceRate}%
              </p>
            </div>
          </div>

          <div className="bg-gray-900/70 rounded-lg p-6 shadow border border-gray-700 flex items-center gap-4">
            <FiTrendingUp className="text-green-400 text-3xl" />
            <div>
              <p className="text-gray-400 text-sm">Conversion Rate</p>
              <p className="text-xl font-semibold text-green-400">
                {kpis.conversionRate}%
              </p>
            </div>
          </div>
        </div>

        {/* === Line Chart === */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-[300px] mb-10"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#22d3ee" strokeWidth={2} />
              <Line type="monotone" dataKey="sessions" stroke="#34d399" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* === Pie Chart === */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-[300px] mb-10 flex justify-center"
        >
          <ResponsiveContainer width="60%" height="100%">
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: { name: string; percent?: number }) =>
  `${entry.name}: ${entry.percent ? (entry.percent * 100).toFixed(0) : 0}%`
}
                outerRadius={100}
                dataKey="value"
              >
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* === Engagement Table === */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-gray-200">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-2 border border-gray-700 text-left">Page</th>
                <th className="px-4 py-2 border border-gray-700 text-center">Views</th>
                <th className="px-4 py-2 border border-gray-700 text-center">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((row) => (
                <tr key={row.page} className="hover:bg-gray-700/30">
                  <td className="px-4 py-2 border border-gray-700">{row.page}</td>
                  <td className="px-4 py-2 border border-gray-700 text-center text-cyan-400">
                    {row.views.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-center text-green-400">
                    {row.conversions.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  )
}
