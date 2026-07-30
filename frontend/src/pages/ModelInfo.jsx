import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCpu, FiTarget, FiBookOpen, FiHash } from 'react-icons/fi'
import { getModelInfo } from '../services/api'

export default function ModelInfo() {
  const [info, setInfo] = useState(null)
  useEffect(() => { getModelInfo().then((d) => setInfo(d)).catch(() => {}) }, [])
  const data = info || { name: 'Support Ticket Classifier', algorithm: 'MultinomialNB', vocabulary_size: 4200, accuracy: 0.87, trained_at: '2026-07-30' }

  const fields = [
    { label: 'Model Name', value: data.name, icon: <FiHash /> },
    { label: 'Algorithm', value: data.algorithm, icon: <FiCpu /> },
    { label: 'Accuracy', value: `${(data.accuracy * 100).toFixed(2)}%`, icon: <FiTarget /> },
    { label: 'Vocabulary Size', value: data.vocabulary_size, icon: <FiBookOpen /> },
  ]

  return (
    <div>
      <h2 className="page-title">Model Information</h2>
      <p className="page-subtitle mb-6">Details about the machine-learning pipeline powering predictions.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card-hover p-5 flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-slate-800 dark:to-slate-700 text-primary-600 dark:text-primary-300 text-xl flex items-center justify-center shrink-0">
              {f.icon}
            </div>
            <div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{f.label}</div>
              <div className="font-semibold text-slate-900 dark:text-white">{f.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
