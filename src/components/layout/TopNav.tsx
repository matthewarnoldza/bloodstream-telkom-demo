import { NavLink } from 'react-router-dom'
import { Settings } from 'lucide-react'

const navItems = [
  { to: '/dashboard',    label: 'Dashboard' },
  { to: '/briefs',       label: 'Brief Intake' },
  { to: '/circulation',  label: 'Circulation' },
  { to: '/qa-gates',     label: 'QA Gates' },
  { to: '/versions',     label: 'Version History' },
  { to: '/resources',    label: 'Resources' },
  { to: '/files',        label: 'Files' },
]

export function TopNav() {
  return (
    <header className="bg-white border-b border-tk-border shadow-tk-sm sticky top-0 z-50">
      <div className="flex items-center gap-4 px-6 py-3">

        {/* Brand — VML + Bloodstream (matching original) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* VML wordmark text mark */}
          <span className="text-[#0099FF] font-bold text-xl leading-none tracking-tight">VML</span>
          <div className="h-6 w-px bg-gray-300" />
          <span className="font-bold text-[22px] text-gray-900 tracking-tight leading-none font-telkom">
            Bloodstream
          </span>
        </div>

        {/* Nav items — matching original Bloodstream bold pill buttons */}
        <nav className="flex items-center gap-1 ml-6 flex-1 overflow-x-auto">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0099FF] text-white shadow-vml-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side — Settings + Telkom badge */}
        <div className="flex items-center gap-3 shrink-0">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${isActive ? 'bg-[#0099FF] text-white' : 'text-gray-500 hover:bg-gray-100'}`
            }
            title="Settings"
          >
            <Settings size={16} />
          </NavLink>

          {/* Telkom logo badge */}
          <div className="flex items-center gap-2 bg-tk-grey-lt border border-tk-border rounded-lg px-3 py-1.5">
            <img
              src="/telkom-logo.svg"
              alt="Telkom"
              className="h-4 w-auto"
              style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(91%) saturate(1234%) hue-rotate(183deg) brightness(97%) contrast(107%)' }}
            />
            <span className="text-[10px] font-semibold text-tk-grey uppercase tracking-wider">Demo</span>
          </div>
        </div>
      </div>
    </header>
  )
}
