import React from 'react'

export default function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 shadow-glass">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">API URL</div>
            <div className="font-mono text-sm mt-1">{import.meta.env.VITE_API_URL || 'http://localhost:8000'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Version</div>
            <div className="font-semibold mt-1">1.0.0</div>
          </div>
        </div>
      </div>
    </div>
  )
}
