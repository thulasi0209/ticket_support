import React from 'react'
import { motion } from 'framer-motion'

export default function PredictionCard({ result }) {
  if (!result) return null
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 dark:bg-gray-800/60 backdrop-blur rounded-xl p-4 shadow-lg mt-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Category</div>
          <div className="text-lg font-semibold">{result.predicted_category}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Confidence</div>
          <div className="text-xl font-semibold">{Number(result.confidence_score).toFixed(2)}%</div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-600">Priority: {result.priority} • Review: {result.review_status}</div>
      <div className="mt-2 text-xs text-gray-400">Predicted at: {result.timestamp}</div>
    </motion.div>
  )
}
