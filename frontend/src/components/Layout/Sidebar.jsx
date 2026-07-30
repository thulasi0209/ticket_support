import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiPlusSquare, FiList, FiBarChart2, FiDatabase, FiSettings } from 'react-icons/fi'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
  { to: '/new', label: 'New Ticket', icon: <FiPlusSquare /> },
  { to: '/batch', label: 'Batch Prediction', icon: <FiBarChart2 /> },
  { to: '/history', label: 'Prediction History', icon: <FiList /> },
  { to: '/analytics', label: 'Analytics', icon: <FiBarChart2 /> },
  { to: '/model', label: 'Model Information', icon: <FiDatabase /> },
  { to: '/settings', label: 'Settings', icon: <FiSettings /> },
]

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-slate-200/70 dark:border-slate-800 p-4 flex flex-col">
      <div className="mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/30 flex items-center justify-center text-white font-bold text-lg">AI</div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">AI Support</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Enterprise</div>
          </div>
        </div>
      </div>
      <nav className="flex-1">
        {items.map((it, i) => (
          <NavLink
            key={it.to}
            to={it.to}
            style={{ animationDelay: `${i * 40}ms` }}
            className={({ isActive }) => `animate-fade-in-up ${isActive ? 'nav-link nav-link-active' : 'nav-link'}`}
          >
            <div className="text-xl">{it.icon}</div>
            <div>{it.label}</div>
          </NavLink>
        ))}
      </nav>
      <div className="mt-4 px-2">
        <div className="text-xs text-slate-400 dark:text-slate-500">v1.0.0</div>
      </div>
    </aside>
  )
}
