import React, { useEffect, useState } from 'react'
import { getModelInfo } from '../services/api'

export default function ModelInfo() {
  const [info, setInfo] = useState(null)
  useEffect(()=>{ getModelInfo().then(d=>setInfo(d)).catch(()=>{}) },[])
  const data = info || { name: 'Support Ticket Classifier', algorithm: 'MultinomialNB', vocabulary_size: 4200, accuracy: 0.87, trained_at: '2026-07-30' }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Model Information</h2>
      <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 shadow-glass">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Model Name</div>
            <div className="font-semibold">{data.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Algorithm</div>
            <div className="font-semibold">{data.algorithm}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Accuracy</div>
            <div className="font-semibold">{(data.accuracy*100).toFixed(2)}%</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Vocabulary Size</div>
            <div className="font-semibold">{data.vocabulary_size}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
