import React from 'react'
import { motion } from 'framer-motion'
import { FiUploadCloud, FiFileText } from 'react-icons/fi'
import { batchPredict } from '../services/api'
import toast from 'react-hot-toast'

export default function BatchPrediction() {
  const [progress, setProgress] = React.useState(0)
  const [fileName, setFileName] = React.useState(null)
  const [busy, setBusy] = React.useState(false)
  const fileRef = React.useRef()

  const upload = async () => {
    const file = fileRef.current.files[0]
    if (!file) return toast.error('Please select a CSV')
    const fd = new FormData()
    fd.append('file', file)
    setBusy(true)
    setProgress(15)
    try {
      await batchPredict(fd)
      setProgress(100)
      toast.success('Batch prediction completed')
    } catch (e) {
      toast.error('Batch failed')
      setProgress(0)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h2 className="page-title">Batch Prediction</h2>
      <p className="page-subtitle mb-6">Upload a CSV of tickets to classify them all in one go.</p>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <label
          htmlFor="csv-upload"
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-primary-200 dark:border-slate-700 rounded-2xl py-10 cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-slate-800/50 transition-all duration-200"
        >
          <FiUploadCloud className="text-4xl text-primary-500" />
          <div className="font-medium text-slate-700 dark:text-slate-200">
            {fileName ? (
              <span className="flex items-center gap-2"><FiFileText /> {fileName}</span>
            ) : (
              'Click to select, or drag a CSV file here'
            )}
          </div>
          <div className="text-xs text-slate-400">.csv files only</div>
          <input
            id="csv-upload"
            ref={fileRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => setFileName(e.target.files[0]?.name || null)}
          />
        </label>

        <div className="mt-5 flex items-center gap-4">
          <button onClick={upload} disabled={busy} className="btn-primary">
            {busy ? 'Processing…' : 'Upload & Predict'}
          </button>
          <div className="flex-1">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
                className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
