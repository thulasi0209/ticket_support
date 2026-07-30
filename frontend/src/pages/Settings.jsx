import React from 'react'
import { motion } from 'framer-motion'

export default function Settings() {
  return (
    <div>
      <h2 className="page-title">Settings</h2>
      <p className="page-subtitle mb-6">Environment and version details for this deployment.</p>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">API URL</div>
            <div className="font-mono text-sm mt-1.5 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 inline-block">
              {import.meta.env.VITE_API_URL || 'http://localhost:8000'}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Version</div>
            <div className="font-semibold mt-1.5 text-slate-900 dark:text-white">1.0.0</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
