import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StatCard from '../components/StatCard'
import { FiUsers, FiDollarSign, FiAlertCircle } from 'react-icons/fi'
import { getAnalytics } from '../services/api'
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'

const PIE_COLORS = ['#6c5ce7', '#00b894', '#00cec9', '#fdcb6e', '#e17055']

export default function Dashboard() {
  const [data, setData] = useState(null)
  useEffect(() => {
    let mounted = true
    getAnalytics().then((d) => mounted && setData(d)).catch(() => {})
    return () => (mounted = false)
  }, [])

  const dummy = {
    total: 1200,
    categories: { billing: 400, technical: 350, account: 150, hr: 150, general: 150 },
    trend: [
      { name: 'Jan', value: 80 },
      { name: 'Feb', value: 120 },
      { name: 'Mar', value: 150 },
      { name: 'Apr', value: 200 },
    ],
  }

  const stats = data || dummy

  return (
    <div className="space-y-6">
      <div>
        <h2 className="page-title">Dashboard</h2>
        <p className="page-subtitle">A snapshot of how your support tickets are being classified.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Total Predictions" value={stats.total} delta="+12% this week" icon={<FiUsers />} />
        <StatCard title="Billing Tickets" value={stats.categories.billing} icon={<FiDollarSign />} />
        <StatCard title="Technical Tickets" value={stats.categories.technical} icon={<FiAlertCircle />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 lg:col-span-2 glass-card p-5"
        >
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Prediction Trends</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats.trend}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
              <Area type="monotone" dataKey="value" stroke="#6c5ce7" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                dataKey="value"
                data={Object.entries(stats.categories).map(([k, v]) => ({ name: k, value: v }))}
                outerRadius={75}
                innerRadius={45}
                paddingAngle={3}
              >
                {Object.keys(stats.categories).map((k, i) => (
                  <Cell key={k} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}
