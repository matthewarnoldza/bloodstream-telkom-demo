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

        {/* Brand — black VML logo + gradient Bloodstream wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="/vml-logo-black.png"
            alt="VML"
            className="h-7 w-auto object-contain"
          />
          <div className="h-6 w-px bg-gray-300" />
          <span
            className="font-bold text-[22px] tracking-tight leading-none font-telkom"
            style={{
              background: 'linear-gradient(135deg, #0099FF 0%, #00C8FF 40%, #91E200 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Bloodstream
          </span>
        </div>

        {/* Nav items — Bloodstream-style bold pill buttons */}
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

        {/* Right side — Settings + Telkom logo */}
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

          {/* Telkom logo — larger, no "Demo" text */}
          <img
            src="/telkom-logo.svg"
            alt="Telkom"
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  )
}
