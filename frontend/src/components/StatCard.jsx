import React from 'react'
import { motion } from 'framer-motion'

export default function StatCard({ title, value, delta, icon }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-2xl p-4 shadow-glass">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
          <div className="text-2xl font-semibold mt-1">{value}</div>
        </div>
        <div className="text-3xl text-primary">{icon}</div>
      </div>
      {delta && <div className="text-xs text-green-500 mt-2">{delta}</div>}
    </motion.div>
  )
}
