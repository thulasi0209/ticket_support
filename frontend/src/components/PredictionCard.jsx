import React from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'

const priorityStyles = {
  high: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
}

function confidenceColor(score) {
  if (score >= 80) return 'text-accent'
  if (score >= 50) return 'text-amber-500'
  return 'text-rose-500'
}

export default function PredictionCard({ result }) {
  if (!result) return null
  const priorityClass = priorityStyles[String(result.priority).toLowerCase()] || 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
  const score = Number(result.confidence_score)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="glass-card p-5 mt-4 border-l-4 border-l-primary-500"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FiCheckCircle className="text-accent text-xl shrink-0" />
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Predicted Category</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">{result.predicted_category}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500 dark:text-slate-400">Confidence</div>
          <div className={`text-2xl font-bold ${confidenceColor(score)}`}>{score.toFixed(2)}%</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${priorityClass}`}>
          {result.priority} priority
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-slate-800 dark:text-primary-300 capitalize">
          {result.review_status}
        </span>
      </div>
      <div className="mt-3 text-xs text-slate-400 dark:text-slate-500">Predicted at: {result.timestamp}</div>
    </motion.div>
  )
}
