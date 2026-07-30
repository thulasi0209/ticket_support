import React, { useEffect, useState } from 'react'
import { getHistory } from '../services/api'

export default function History() {
  const [rows, setRows] = useState([])
  useEffect(() => { getHistory().then(r=>setRows(r||[])).catch(()=>{}) }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Prediction History</h2>
      <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 shadow-glass overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th>Customer</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Confidence</th>
              <th>Priority</th>
              <th>Review</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=> (
              <tr key={i} className="border-t">
                <td>{r.customer_name}</td>
                <td>{r.customer_email}</td>
                <td>{r.subject}</td>
                <td>{r.predicted_category}</td>
                <td>{(r.confidence_score||0).toFixed?.(2)}%</td>
                <td>{r.priority}</td>
                <td>{r.review_status}</td>
                <td>{r.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
