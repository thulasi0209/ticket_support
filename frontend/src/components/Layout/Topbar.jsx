import React from 'react'
import { FiSearch, FiBell, FiSun, FiMoon } from 'react-icons/fi'
import useTheme from '../../hooks/useTheme'

export default function Topbar() {
  const { mode, toggle } = useTheme()
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200/70 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <input
            aria-label="Search"
            placeholder="Search tickets, customers..."
            className="w-72 pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/15 focus:w-80"
          />
          <FiSearch className="absolute left-3 top-3 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button aria-label="Notifications" className="relative p-2.5 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors duration-200">
          <FiBell />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent" />
        </button>
        <button
          aria-label="Toggle theme"
          onClick={toggle}
          className="p-2.5 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-800 hover:text-primary-600 transition-all duration-200 hover:rotate-12"
        >
          {mode === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-white flex items-center justify-center font-semibold shadow-md shadow-primary-500/30">TJ</div>
      </div>
    </header>
  )
}
