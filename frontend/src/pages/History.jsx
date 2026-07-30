import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getHistory } from '../services/api'

export default function History() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getHistory().then((r) => setRows(r || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="page-title">Prediction History</h2>
      <p className="page-subtitle mb-6">All classified tickets, most recent first.</p>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 bg-slate-50/80 dark:bg-slate-800/60">
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Confidence</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Review</th>
                <th className="px-4 py-3 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-200 hover:bg-primary-50/60 dark:hover:bg-slate-800/60 transition-colors duration-150">
                  <td className="px-4 py-3 font-medium">{r.customer_name}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{r.customer_email}</td>
                  <td className="px-4 py-3">{r.subject}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-slate-800 dark:text-primary-300 capitalize">
                      {r.predicted_category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">{(r.confidence_score || 0).toFixed?.(2)}%</td>
                  <td className="px-4 py-3 capitalize">{r.priority}</td>
                  <td className="px-4 py-3 capitalize">{r.review_status}</td>
                  <td className="px-4 py-3 text-slate-400">{r.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && rows.length === 0 && (
            <div className="text-center text-slate-400 py-12">No predictions yet — submit a ticket to get started.</div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
