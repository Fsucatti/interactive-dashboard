"use client"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { FiDownload, FiTrendingUp, FiTrendingDown, FiDollarSign } from "react-icons/fi"
import { useSettings } from "../../lib/SettingsContext"
import { formatMoney, monthName } from "../../lib/i18n"

// Sample data, January first.
const reportData = [
  { revenue: 4000, expenses: 2400 },
  { revenue: 3000, expenses: 1398 },
  { revenue: 5000, expenses: 2800 },
  { revenue: 4780, expenses: 3908 },
  { revenue: 5890, expenses: 4800 },
  { revenue: 4390, expenses: 3800 },
  { revenue: 6000, expenses: 3100 },
  { revenue: 5200, expenses: 2900 },
  { revenue: 4500, expenses: 3200 },
  { revenue: 6100, expenses: 4000 },
  { revenue: 7000, expenses: 4500 },
  { revenue: 8000, expenses: 5000 },
]

type SortKey = "index" | "revenue" | "expenses"
const ROWS_PER_PAGE = 6

export default function Reports() {
  const { settings, t, chart } = useSettings()
  const lang = settings.language
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("index")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)

  const rows = useMemo(() => reportData.map((row, index) => ({ ...row, index, month: monthName(index, lang) })), [lang])

  const kpis = useMemo(() => {
    const totalRevenue = reportData.reduce((sum, row) => sum + row.revenue, 0)
    const totalExpenses = reportData.reduce((sum, row) => sum + row.expenses, 0)
    const lastMonth = reportData[reportData.length - 2]
    const currentMonth = reportData[reportData.length - 1]
    const growth = ((currentMonth.revenue - lastMonth.revenue) / lastMonth.revenue) * 100
    return { totalRevenue, totalExpenses, netProfit: totalRevenue - totalExpenses, growth: Math.round(growth) }
  }, [])

  const filteredData = rows
    .filter((row) => row.month.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => (a[sortKey] - b[sortKey]) * (sortOrder === "asc" ? 1 : -1))

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ROWS_PER_PAGE))
  // A narrower search can leave fewer pages than the one you were on.
  const currentPage = Math.min(page, totalPages)
  const paginatedData = filteredData.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  const sortMark = (key: SortKey) => (sortKey === key ? (sortOrder === "asc" ? " ↑" : " ↓") : "")
  const ariaSort = (key: SortKey) => (sortKey === key ? (sortOrder === "asc" ? "ascending" : "descending") : "none")

  const downloadCSV = () => {
    const headers = [t.reports.month, t.reports.revenue, t.reports.expenses]
    const lines = [headers, ...filteredData.map((row) => [row.month, row.revenue, row.expenses])]
    const blob = new Blob([lines.map((line) => line.join(",")).join("\n")], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = t.reports.file
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    toast.success(t.reports.exported)
  }

  const kpiCards = [
    { label: t.reports.totalRevenue, value: formatMoney(kpis.totalRevenue, lang), Icon: FiDollarSign, color: "text-cyan-400" },
    { label: t.reports.totalExpenses, value: formatMoney(kpis.totalExpenses, lang), Icon: FiTrendingDown, color: "text-rose-400" },
    { label: t.reports.netProfit, value: formatMoney(kpis.netProfit, lang), Icon: FiTrendingUp, color: "text-green-400" },
    { label: t.reports.growth, value: `${kpis.growth}%`, Icon: FiTrendingUp, color: "text-yellow-400" },
  ]

  return (
    <section id="reports" className="min-h-screen flex flex-col items-center justify-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-6xl bg-gray-800/60 rounded-xl p-4 sm:p-8 shadow-lg border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
          {t.reports.title}
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
          className="w-full h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="month" stroke={chart.axis} />
              <YAxis stroke={chart.axis} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" name={t.reports.revenue} fill="#22d3ee" />
              <Bar dataKey="expenses" name={t.reports.expenses} fill="#fb7185" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="search"
            aria-label={t.reports.search}
            placeholder={t.reports.search}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full md:w-auto px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
          />

          <button
            onClick={downloadCSV}
            disabled={filteredData.length === 0}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 rounded-md text-white font-medium transition-colors"
          >
            <FiDownload className="inline mr-2" /> {t.reports.export}
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-gray-200">
            <thead className="bg-gray-900">
              <tr>
                {([
                  ["index", t.reports.month],
                  ["revenue", t.reports.revenue],
                  ["expenses", t.reports.expenses],
                ] as const).map(([key, label]) => (
                  <th key={key} aria-sort={ariaSort(key)} className="border border-gray-700 p-0">
                    <button onClick={() => handleSort(key)} className="w-full px-4 py-2 font-bold hover:text-teal-300">
                      {label}
                      {sortMark(key)}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.index} className="hover:bg-gray-700/30">
                  <td className="px-4 py-2 border border-gray-700 text-center capitalize">{row.month}</td>
                  <td className="px-4 py-2 border border-gray-700 text-center text-cyan-400">{formatMoney(row.revenue, lang)}</td>
                  <td className="px-4 py-2 border border-gray-700 text-center text-rose-400">{formatMoney(row.expenses, lang)}</td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 border border-gray-700 text-center text-gray-400">
                    {t.reports.noResults}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="px-3 py-1 rounded bg-gray-700 disabled:opacity-40 hover:bg-gray-600"
          >
            {t.reports.prev}
          </button>
          <span className="px-4 py-1 text-gray-300">{t.reports.page(currentPage, totalPages)}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            className="px-3 py-1 rounded bg-gray-700 disabled:opacity-40 hover:bg-gray-600"
          >
            {t.reports.next}
          </button>
        </div>
      </motion.div>
    </section>
  )
}
