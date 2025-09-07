"use client"
import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { FiDownload, FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi'

// === Sample Data for Reports ===
const reportData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 5000, expenses: 2800 },
  { month: "Apr", revenue: 4780, expenses: 3908 },
  { month: "May", revenue: 5890, expenses: 4800 },
  { month: "Jun", revenue: 4390, expenses: 3800 },
  { month: "Jul", revenue: 6000, expenses: 3100 },
  { month: "Aug", revenue: 5200, expenses: 2900 },
  { month: "Sep", revenue: 4500, expenses: 3200 },
  { month: "Oct", revenue: 6100, expenses: 4000 },
  { month: "Nov", revenue: 7000, expenses: 4500 },
  { month: "Dec", revenue: 8000, expenses: 5000 },
]

// === Count-up animation hook ===
function useCountUp(target: number, duration = 1000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration / 16) // ~60fps
    const step = () => {
      start += increment
      if (start < target) {
        setCount(Math.floor(start))
        requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }
    step()
  }, [target, duration])

  return count
}

export default function Reports() {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<"month" | "revenue" | "expenses">("month")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)
  const rowsPerPage = 6

  // === KPI Calculations ===
  const kpis = useMemo(() => {
    const totalRevenue = reportData.reduce((sum, row) => sum + row.revenue, 0)
    const totalExpenses = reportData.reduce((sum, row) => sum + row.expenses, 0)
    const netProfit = totalRevenue - totalExpenses
    const lastMonth = reportData[reportData.length - 2]
    const currentMonth = reportData[reportData.length - 1]
    const growth = (((currentMonth.revenue - lastMonth.revenue) / lastMonth.revenue) * 100)

    return { totalRevenue, totalExpenses, netProfit, growth }
  }, [])

  // === Animated KPI values ===
  const animatedRevenue = (kpis.totalRevenue)
  const animatedExpenses = (kpis.totalExpenses)
  const animatedProfit = (kpis.netProfit)
  const animatedGrowth = (Math.round(kpis.growth))

  // === Filter + Sort Data ===
  const filteredData = reportData
    .filter((row) => row.month.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]
      if (valA < valB) return sortOrder === "asc" ? -1 : 1
      if (valA > valB) return sortOrder === "asc" ? 1 : -1
      return 0
    })

  // === Pagination ===
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const handleSort = (key: "month" | "revenue" | "expenses") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  // === Export to CSV ===
  const downloadCSV = () => {
    const headers = ["Month", "Revenue", "Expenses"]
    const rows = filteredData.map((row) => [row.month, row.revenue, row.expenses])

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "monthly_reports.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="reports" className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-6xl bg-gray-800/60 rounded-xl p-8 shadow-lg border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
          Monthly Reports
        </h2>

        {/* === KPI CARDS (with count-up) === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-900/70 rounded-lg p-6 shadow border border-gray-700 flex items-center gap-4">
            <FiDollarSign className="text-cyan-400 text-3xl" />
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-xl font-semibold text-cyan-400">
                ${animatedRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-gray-900/70 rounded-lg p-6 shadow border border-gray-700 flex items-center gap-4">
            <FiTrendingDown className="text-rose-400 text-3xl" />
            <div>
              <p className="text-gray-400 text-sm">Total Expenses</p>
              <p className="text-xl font-semibold text-rose-400">
                ${animatedExpenses.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-gray-900/70 rounded-lg p-6 shadow border border-gray-700 flex items-center gap-4">
            <FiTrendingUp className="text-green-400 text-3xl" />
            <div>
              <p className="text-gray-400 text-sm">Net Profit</p>
              <p className="text-xl font-semibold text-green-400">
                ${animatedProfit.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-gray-900/70 rounded-lg p-6 shadow border border-gray-700 flex items-center gap-4">
            <FiTrendingUp className="text-yellow-400 text-3xl" />
            <div>
              <p className="text-gray-400 text-sm">Growth (MoM)</p>
              <p className="text-xl font-semibold text-yellow-400">
                {animatedGrowth}%
              </p>
            </div>
          </div>
        </div>

         {/* === Chart (delayed fade-in) === */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#22d3ee" />
              <Bar dataKey="expenses" fill="#fb7185" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* === Search + Actions === */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search by month..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
          />

          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-md text-white font-medium transition-colors"
          >
            <FiDownload className="inline mr-2" /> Export CSV
          </button>
        </div>

        {/* === Data Table === */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-gray-200">
            <thead className="bg-gray-900">
              <tr>
                <th onClick={() => handleSort("month")}
                  className="px-4 py-2 border border-gray-700 cursor-pointer hover:text-teal-300">
                  Month {sortKey === "month" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("revenue")}
                  className="px-4 py-2 border border-gray-700 cursor-pointer hover:text-teal-300">
                  Revenue {sortKey === "revenue" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("expenses")}
                  className="px-4 py-2 border border-gray-700 cursor-pointer hover:text-teal-300">
                  Expenses {sortKey === "expenses" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.month} className="hover:bg-gray-700/30">
                  <td className="px-4 py-2 border border-gray-700 text-center">{row.month}</td>
                  <td className="px-4 py-2 border border-gray-700 text-center text-cyan-400">
                    ${row.revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-center text-rose-400">
                    ${row.expenses.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* === Pagination === */}
        <div className="mt-4 flex justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded bg-gray-700 disabled:opacity-40 hover:bg-gray-600"
          >
            Prev
          </button>
          <span className="px-4 py-1 text-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded bg-gray-700 disabled:opacity-40 hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      </motion.div>
    </section>
  )
}
