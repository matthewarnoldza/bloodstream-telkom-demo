import { NavLink } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const navItems = [
  { to: '/discover', label: 'DISCOVER' },
  { to: '/define',   label: 'DEFINE' },
  { to: '/develop',  label: 'DEVELOP' },
  { to: '/deliver',  label: 'DELIVER' },
  { to: '/diagnose', label: 'DIAGNOSE' },
  { to: '/history',  label: 'HISTORY' },
]

export function TopNav() {
  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Row 1: Brand bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
            <ArrowLeft size={16} />
          </button>
          <div className="h-6 w-px bg-gray-200" />
          <h1 className="text-2xl font-bold text-tk-navy tracking-tight">
            TELKOM
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="/telkom-logo.svg"
            alt="Telkom"
            className="h-9 w-auto object-contain"
          />
        </div>
      </div>

      {/* Row 2: Tab navigation */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? 'px-5 py-1.5 rounded-full bg-tk-green text-tk-navy text-sm font-bold tracking-wide transition-all'
                  : 'px-5 py-1.5 rounded-full text-gray-400 text-sm font-semibold tracking-wide hover:text-gray-600 hover:bg-gray-50 transition-all'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-medium">Matthew Arnold</span>
          <span className="text-xs text-gray-300">Logout</span>
        </div>
      </div>
    </header>
  )
}
