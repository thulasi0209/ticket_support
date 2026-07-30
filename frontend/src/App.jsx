import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Topbar from './components/Layout/Topbar'
import Sidebar from './components/Layout/Sidebar'
import { ThemeProvider } from './context/ThemeContext'
import { CssBaseline } from '@mui/material'
import ToastProvider from './components/ToastProvider'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const NewTicket = lazy(() => import('./pages/NewTicket'))
const BatchPrediction = lazy(() => import('./pages/BatchPrediction'))
const History = lazy(() => import('./pages/History'))
const Analytics = lazy(() => import('./pages/Analytics'))
const ModelInfo = lazy(() => import('./pages/ModelInfo'))
const Settings = lazy(() => import('./pages/Settings'))

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <ToastProvider />
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="p-6 overflow-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new" element={<NewTicket />} />
                <Route path="/batch" element={<BatchPrediction />} />
                <Route path="/history" element={<History />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/model" element={<ModelInfo />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
