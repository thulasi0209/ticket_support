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
    <aside className="w-72 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col">
      <div className="mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-500 shadow-lg flex items-center justify-center text-white font-bold">AI</div>
          <div>
            <div className="font-semibold">AI Support</div>
            <div className="text-xs text-gray-500">Enterprise</div>
          </div>
        </div>
      </div>
      <nav className="flex-1">
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <div className="text-xl">{it.icon}</div>
            <div className="font-medium">{it.label}</div>
          </NavLink>
        ))}
      </nav>
      <div className="mt-4 px-2">
        <div className="text-xs text-gray-500">v1.0.0</div>
      </div>
    </aside>
  )
}
