import React from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp } from 'react-icons/fi'

export default function StatCard({ title, value, delta, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-5 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</div>
          <div className="text-3xl font-bold mt-1.5 text-slate-900 dark:text-white tracking-tight">{value}</div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-slate-800 dark:to-slate-700 text-primary-600 dark:text-primary-300 text-2xl flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>
      {delta && (
        <div className="flex items-center gap-1 text-xs font-medium text-accent mt-3">
          <FiTrendingUp />
          {delta}
        </div>
      )}
    </motion.div>
  )
}
