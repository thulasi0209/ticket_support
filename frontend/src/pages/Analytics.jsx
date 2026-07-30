import React, { useEffect, useState } from 'react'
import { getAnalytics } from '../services/api'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Analytics() {
  const [data, setData] = useState(null)
  useEffect(()=>{ getAnalytics().then(d=>setData(d)).catch(()=>{}) },[])
  const series = data?.trend || [{name:'Jan',value:10},{name:'Feb',value:20}]
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
      <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 shadow-glass">
        <h3 className="font-medium mb-2">Confidence Trend</h3>
        <div style={{height:220}}>
          <ResponsiveContainer>
            <LineChart data={series}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6c5ce7" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
