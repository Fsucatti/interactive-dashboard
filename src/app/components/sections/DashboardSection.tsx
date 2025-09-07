"use client"
import { motion } from "framer-motion"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts"

// Sample data
const lineData = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 30 },
  { name: "Wed", value: 20 },
  { name: "Thu", value: 27 },
  { name: "Fri", value: 18 },
  { name: "Sat", value: 23 },
  { name: "Sun", value: 34 },
]

const pieData = [
  { name: "Frontend", value: 40, color: "#6366F1" },
  { name: "Backend", value: 30, color: "#22C55E" },
  { name: "DevOps", value: 20, color: "#F59E0B" },
  { name: "Other", value: 10, color: "#EC4899" },
]

export default function DashboardSection() {
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
        Interactive Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Line Chart */}
        <div className="bg-gray-800/60 rounded-xl p-6 shadow-lg border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800/60 rounded-xl p-6 shadow-lg border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Tech Stack Focus</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
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
