import React from 'react'
import { batchPredict } from '../services/api'
import toast from 'react-hot-toast'

export default function BatchPrediction() {
  const [progress, setProgress] = React.useState(0)
  const fileRef = React.useRef()

  const upload = async () => {
    const file = fileRef.current.files[0]
    if (!file) return toast.error('Please select a CSV')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await batchPredict(fd)
      toast.success('Batch prediction completed')
      // optionally provide download
    } catch (e) {
      toast.error('Batch failed')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Batch Prediction</h2>
      <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 shadow-glass">
        <input ref={fileRef} type="file" accept=".csv" />
        <div className="mt-4 flex gap-2">
          <button onClick={upload} className="px-4 py-2 rounded-md bg-primary text-white">Upload & Predict</button>
          <div className="flex-1 self-center">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div style={{ width: `${progress}%` }} className="h-full bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
