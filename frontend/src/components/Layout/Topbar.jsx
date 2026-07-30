import React from 'react'
import { FiSearch, FiBell, FiSun, FiMoon } from 'react-icons/fi'
import useTheme from '../../hooks/useTheme'

export default function Topbar() {
  const { mode, toggle } = useTheme()
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-transparent">
      <div className="flex items-center gap-4">
        <div className="relative">
          <input aria-label="Search" placeholder="Search tickets, customers..." className="pl-10 pr-4 py-2 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700" />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="Notifications" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <FiBell />
        </button>
        <button aria-label="Toggle theme" onClick={toggle} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          {mode === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 text-white flex items-center justify-center">TJ</div>
      </div>
    </header>
  )
}
