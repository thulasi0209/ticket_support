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
      <div className="relative flex h-screen bg-gradient-to-br from-slate-50 via-primary-50/40 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="bg-blobs">
          <div className="bg-blob w-96 h-96 bg-primary-300 dark:bg-primary-800 -top-24 -left-24" />
          <div className="bg-blob w-96 h-96 bg-accent-light dark:bg-emerald-800 top-1/2 -right-24" style={{ animationDelay: '2s' }} />
        </div>
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="p-6 overflow-auto">
            <Suspense fallback={<div className="flex items-center justify-center h-40 text-slate-400 animate-pulse">Loading…</div>}>
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
