import { NavLink } from 'react-router-dom'
import { Clock } from 'lucide-react'

const dItems = [
  { to: '/discover', label: 'Discover', d: 1 },
  { to: '/define',   label: 'Define',   d: 2 },
  { to: '/develop',  label: 'Develop',  d: 3 },
  { to: '/deliver',  label: 'Deliver',  d: 4 },
  { to: '/diagnose', label: 'Diagnose', d: 5 },
]

// VML logo mark as inline SVG
function VMLLogo() {
  return (
    <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-4">
      <text x="0" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="white" opacity="0.9">VML</text>
    </svg>
  )
}

// Bloodstream wordmark — stylised
function BloodstreamWordmark() {
  return (
    <span className="font-telkom font-bold text-white text-base tracking-tight leading-none">
      Blood<span className="text-tk-green">stream</span>
    </span>
  )
}

// Telkom T logo inline
function TelkomLogo({ size = 36 }: { size?: number }) {
  return (
    <img
      src="/telkom-logo.svg"
      alt="Telkom"
      style={{ height: size, width: 'auto', filter: 'brightness(0) invert(1)' }}
      className="object-contain"
    />
  )
}

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-tk-navy flex flex-col h-screen sticky top-0 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 flex items-center justify-center">
            <TelkomLogo size={32} />
          </div>
          <BloodstreamWordmark />
        </div>
        <p className="text-white/40 text-[10px] uppercase tracking-widest pl-12">Campaign Intelligence</p>
      </div>

      {/* 5D Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-white/30 text-[9px] uppercase tracking-widest px-3 mb-3 font-semibold">5D Framework</p>
        <ul className="flex flex-col gap-1">
          {dItems.map(({ to, label, d }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative ${
                    isActive
                      ? 'bg-tk-blue2/20 text-white border-l-2 border-tk-green -ml-[2px] pl-[14px]'
                      : 'text-white/60 hover:text-white hover:bg-white/8'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#0099FF] text-white'
                          : 'bg-white/10 text-white/50 group-hover:bg-white/15 group-hover:text-white/70'
                      }`}
                    >
                      D{d}
                    </div>
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-white/10">
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-tk-blue2/20 text-white border-l-2 border-tk-green -ml-[2px] pl-[14px]'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Clock
                  size={16}
                  className={`shrink-0 transition-colors ${isActive ? 'text-tk-green' : 'text-white/40 group-hover:text-white/70'}`}
                />
                <span>History</span>
              </>
            )}
          </NavLink>
        </div>
      </nav>

      {/* Footer — VML branding */}
      <div className="px-5 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white/10 rounded-md flex items-center justify-center">
            <VMLLogo />
          </div>
          <div>
            <p className="text-white/70 text-[11px] font-semibold">Powered by VML</p>
            <p className="text-white/30 text-[9px]">Possible Begins Here</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
