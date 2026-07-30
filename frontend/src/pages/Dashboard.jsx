import React, { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import { FiUsers, FiDollarSign, FiAlertCircle } from 'react-icons/fi'
import { getAnalytics } from '../services/api'
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'

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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Total Predictions" value={stats.total} icon={<FiUsers />} />
        <StatCard title="Billing Tickets" value={stats.categories.billing} icon={<FiDollarSign />} />
        <StatCard title="Technical Tickets" value={stats.categories.technical} icon={<FiAlertCircle />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 bg-white/60 dark:bg-gray-900/60 rounded-2xl p-4 shadow-glass">
          <h3 className="font-semibold mb-2">Prediction Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stats.trend}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#6c5ce7" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/60 dark:bg-gray-900/60 rounded-2xl p-4 shadow-glass">
          <h3 className="font-semibold mb-2">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie dataKey="value" data={Object.entries(stats.categories).map(([k,v])=>({name:k,value:v}))} outerRadius={70} fill="#8884d8">
                {Object.keys(stats.categories).map((k,i)=> <Cell key={k} fill={["#6c5ce7","#00b894","#00cec9","#fdcb6e","#e17055"][i%5]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
