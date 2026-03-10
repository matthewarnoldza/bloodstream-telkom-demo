import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  RefreshCcw,
  ShieldCheck,
  GitBranch,
  Users,
  FolderOpen,
  Settings,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard',    label: 'Dashboard',       icon: LayoutDashboard },
  { to: '/briefs',       label: 'Brief Intake',    icon: FileText },
  { to: '/circulation',  label: 'Circulation',     icon: RefreshCcw },
  { to: '/qa-gates',     label: 'QA Gates',        icon: ShieldCheck },
  { to: '/versions',     label: 'Version History', icon: GitBranch },
  { to: '/resources',    label: 'Resources',       icon: Users },
  { to: '/files',        label: 'Files',           icon: FolderOpen },
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

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-white/30 text-[9px] uppercase tracking-widest px-3 mb-2 font-semibold">Navigation</p>
        <ul className="flex flex-col gap-0.5">
          {navItems.map(({ to, label, icon: Icon }) => (
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
                    <Icon
                      size={16}
                      className={`shrink-0 transition-colors ${isActive ? 'text-tk-green' : 'text-white/40 group-hover:text-white/70'}`}
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-white/10">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/8 transition-all"
          >
            <Settings size={16} />
            <span>Settings</span>
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
