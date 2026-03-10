import { Activity, Zap, Shield, Clock } from 'lucide-react'
import {
  ResponsiveContainer,
  PieChart, Pie, Cell, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ReferenceLine,
} from 'recharts'
import { KPICard } from '../components/ui/KPICard'
import { StatusBadge } from '../components/ui/StatusBadge'
import { campaigns, phaseDistribution, tierDistribution, kpiMetrics } from '../data/mockData'

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color?: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-tk-border rounded-lg shadow-tk-md px-3 py-2 text-xs">
      {label && <p className="font-semibold text-[#0B1A2E] mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color ?? '#0099FF' }}>
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export function DashboardPage() {
  return (
    <div className="flex flex-col animate-fade-in">

      {/* ── HERO HEADER (contained, theme-1 style) ──────────────────────── */}
      <div className="px-6 pt-6">
        <div className="hero-header">
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                lineHeight: 1.1,
                color: '#ffffff',
                marginBottom: 8,
              }}>
                Campaign Intelligence Dashboard
              </div>
              <div className="hero-subtitle">
                <span className="accent">Possible Begins Here</span> · Telkom Campaign Intelligence
              </div>
            </div>
            {/* Date badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, padding: '8px 16px', flexShrink: 0,
            }}>
              <img src="/telkom-logo.svg" alt="Telkom" style={{ height: 20, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 10 }}>10 Mar 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">

        {/* ── SECTION HEADER ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <div className="page-title"><span style={{ color: '#0099FF' }}>Campaign Intelligence</span> Dashboard</div>
            <div className="text-xs text-tk-grey mt-0.5">Tuesday, 10 March 2026</div>
          </div>
          <span className="text-xs font-semibold text-[#0099FF] bg-[#0099FF]/8 px-3 py-1 rounded-full">10 active campaigns</span>
        </div>

        {/* ── KPI TILES ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPICard title="Active Campaigns" value={10} trend="up"   trendLabel="vs 8 last quarter"    index={0} icon={<Activity size={18} />} />
          <KPICard title="Avg Velocity"    value={14.2} unit="days" trend="up"   trendLabel="↑ improved from 17.2" index={1} icon={<Zap size={18} />} />
          <KPICard title="BG Pass Rate"    value={91}   unit="%"    trend="up"   trendLabel="↑ 3pts this quarter"  index={2} icon={<Shield size={18} />} />
          <KPICard title="On-Time Delivery" value={88}  unit="%"    trend="flat" trendLabel="— stable"             index={3} icon={<Clock size={18} />} />
        </div>

        {/* ── CAMPAIGN TABLE ─────────────────────────────────────────────── */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-tk-border flex items-center justify-between">
            <div className="section-title">Active Campaigns</div>
            <span className="text-xs font-semibold text-tk-grey bg-[#0099FF]/8 px-3 py-1 rounded-full text-[#0099FF]">{campaigns.length} campaigns</span>
          </div>
          <div className="overflow-x-auto">
            <table className="tk-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Campaign</th>
                  <th>Client</th>
                  <th>Tier</th>
                  <th>Phase</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Days</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#0099FF', fontWeight: 600 }}>{c.id}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#0B1A2E' }}>{c.name}</span>
                    </td>
                    <td style={{ color: '#5F7089' }}>{c.client}</td>
                    <td><StatusBadge label={c.tier} variant="tier" /></td>
                    <td><StatusBadge label={c.phase} variant="phase" /></td>
                    <td><StatusBadge label={c.status} variant="status" /></td>
                    <td style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 600, color: c.daysInPhase >= 7 ? '#D97706' : '#5F7089' }}>
                        {c.daysInPhase}d
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── CHARTS ROW ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-5">
            <div className="section-title mb-4">Phase Distribution</div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={phaseDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                  {phaseDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 12, color: '#5F7089' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-5">
            <div className="section-title mb-4">Tier Distribution</div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={tierDistribution} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="tier" tick={{ fontSize: 12, fill: '#5F7089' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#5F7089' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Campaigns" fill="#0099FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── VELOCITY TREND ───────────────────────────────────────────────── */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="section-title">Velocity Trend — 12 Weeks</div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-5 h-0.5 rounded" style={{ background: '#91E200' }} />
                <span style={{ color: '#5F7089' }}>Actual velocity</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-5 h-0.5 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #9CA3AF 0, #9CA3AF 4px, transparent 4px, transparent 8px)' }} />
                <span style={{ color: '#5F7089' }}>Target (15 days)</span>
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={kpiMetrics.velocityTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#5F7089' }} axisLine={false} tickLine={false} />
              <YAxis domain={[12, 20]} tick={{ fontSize: 11, fill: '#5F7089' }} axisLine={false} tickLine={false} unit="d" />
              <Tooltip content={<ChartTooltip />} />
              <ReferenceLine y={15} stroke="#9CA3AF" strokeDasharray="6 4" strokeWidth={1.5} label={{ value: 'Target 15d', position: 'insideTopRight', fontSize: 10, fill: '#9CA3AF' }} />
              <Line type="monotone" dataKey="days" name="Avg Velocity" stroke="#91E200" strokeWidth={2.5} dot={{ r: 3, fill: '#91E200', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#91E200', strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}
