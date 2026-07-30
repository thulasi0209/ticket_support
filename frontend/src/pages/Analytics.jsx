import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getAnalytics } from '../services/api'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function Analytics() {
  const [data, setData] = useState(null)
  useEffect(() => { getAnalytics().then((d) => setData(d)).catch(() => {}) }, [])
  const series = data?.trend || [{ name: 'Jan', value: 10 }, { name: 'Feb', value: 20 }]

  return (
    <div>
      <h2 className="page-title">Analytics</h2>
      <p className="page-subtitle mb-6">Track prediction confidence over time.</p>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Confidence Trend</h3>
        <div style={{ height: 260 }}>
          <ResponsiveContainer>
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
              <Line type="monotone" dataKey="value" stroke="#6c5ce7" strokeWidth={3} dot={{ r: 4, fill: '#6c5ce7' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
