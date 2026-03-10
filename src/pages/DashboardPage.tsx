import { Activity, Zap, Shield, Clock } from 'lucide-react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ReferenceLine,
} from 'recharts'

import { KPICard } from '../components/ui/KPICard'
import { StatusBadge } from '../components/ui/StatusBadge'
import {
  campaigns,
  phaseDistribution,
  tierDistribution,
  kpiMetrics,
} from '../data/mockData'

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// ─── Custom tooltip for charts ─────────────────────────────────────────────

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color?: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-tk-border rounded-lg shadow-tk-md px-3 py-2 text-xs">
      {label && <p className="font-semibold text-tk-blue mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color ?? '#003B73' }}>
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

// ─── Phase badge colour helper (matches mockData colours) ──────────────────

function daysLabel(n: number) {
  return `${n}d`
}

// ─── Component ────────────────────────────────────────────────────────────

export function DashboardPage() {
  const today = new Date('2026-03-10').toLocaleDateString('en-ZA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-tk-blue via-tk-blue to-tk-blue2 shadow-tk-lg px-8 py-7 flex items-center justify-between">
        {/* Diagonal green accent */}
        <div
          className="absolute right-0 top-0 h-full w-64 opacity-20"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, #00B140 40%)',
          }}
        />
        {/* Second decorative stripe */}
        <div
          className="absolute right-16 top-0 h-full w-24 opacity-10"
          style={{
            background: 'linear-gradient(135deg, transparent 30%, #00B140 30%)',
          }}
        />

        {/* Left: text */}
        <div className="relative z-10">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
            Bloodstream · Telkom
          </p>
          <h1 className="text-white text-2xl font-bold font-telkom leading-tight">
            Campaign Intelligence Dashboard
          </h1>
          <p className="text-white/70 text-sm mt-1 font-medium">
            Possible Begins Here
          </p>
          <p className="text-white/45 text-xs mt-2">{today}</p>
        </div>

        {/* Right: logo */}
        <div className="relative z-10 flex items-center gap-3">
          <img
            src="/telkom-logo.svg"
            alt="Telkom"
            className="h-10 opacity-90"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>

      {/* ── KPI TILES ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title="Active Campaigns"
          value={10}
          trend="up"
          trendLabel="vs 8 last quarter"
          accent="blue"
          icon={<Activity size={18} />}
        />
        <KPICard
          title="Avg Velocity"
          value={14.2}
          unit="days"
          trend="up"
          trendLabel="↑ improved from 17.2"
          accent="green"
          icon={<Zap size={18} />}
        />
        <KPICard
          title="BG Pass Rate"
          value={91}
          unit="%"
          trend="up"
          trendLabel="↑ 3pts this quarter"
          accent="green"
          icon={<Shield size={18} />}
        />
        <KPICard
          title="On-Time Delivery"
          value={88}
          unit="%"
          trend="flat"
          trendLabel="stable"
          accent="blue"
          icon={<Clock size={18} />}
        />
      </div>

      {/* ── CAMPAIGN TABLE ──────────────────────────────────────────────── */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-tk-border flex items-center justify-between">
          <h2 className="section-title">Active Campaigns</h2>
          <span className="label">{campaigns.length} campaigns</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-tk-border bg-tk-grey-lt">
                <th className="px-5 py-3 text-left label">ID</th>
                <th className="px-5 py-3 text-left label">Campaign</th>
                <th className="px-5 py-3 text-left label">Client</th>
                <th className="px-5 py-3 text-left label">Tier</th>
                <th className="px-5 py-3 text-left label">Phase</th>
                <th className="px-5 py-3 text-left label">Status</th>
                <th className="px-5 py-3 text-right label">Days in Phase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tk-border">
              {campaigns.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-tk-grey-lt/60 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-tk-blue2 font-semibold">
                      {c.id}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-tk-blue">{c.name}</span>
                  </td>
                  <td className="px-5 py-3.5 text-tk-grey">{c.client}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge label={c.tier} variant="tier" />
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge label={c.phase} variant="phase" />
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge label={c.status} variant="status" />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span
                      className={`font-semibold tabular-nums ${
                        c.daysInPhase >= 7
                          ? 'text-amber-600'
                          : 'text-tk-grey'
                      }`}
                    >
                      {daysLabel(c.daysInPhase)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CHARTS ROW ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Phase Distribution Pie */}
        <div className="card p-5">
          <h2 className="section-title mb-4">Phase Distribution</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={phaseDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {phaseDistribution.map((entry, index) => (
                  <Cell key={`phase-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs text-tk-grey">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tier Distribution Bar */}
        <div className="card p-5">
          <h2 className="section-title mb-4">Tier Distribution</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={tierDistribution} barSize={36}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E0E4E8"
              />
              <XAxis
                dataKey="tier"
                tick={{ fontSize: 12, fill: '#4A4A4A' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#4A4A4A' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="count" name="Campaigns" fill="#0077C8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── VELOCITY TREND LINE CHART ────────────────────────────────────── */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Velocity Trend — 12 Weeks</h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-5 h-0.5 bg-tk-green rounded" />
              <span className="text-tk-grey/70">Actual velocity</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-5 h-0.5 rounded"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, #9CA3AF 0, #9CA3AF 4px, transparent 4px, transparent 8px)',
                }}
              />
              <span className="text-tk-grey/70">Target (15 days)</span>
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={kpiMetrics.velocityTrend}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E4E8" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: '#4A4A4A' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[12, 20]}
              tick={{ fontSize: 11, fill: '#4A4A4A' }}
              axisLine={false}
              tickLine={false}
              unit="d"
            />
            <Tooltip content={<ChartTooltip />} />
            <ReferenceLine
              y={15}
              stroke="#9CA3AF"
              strokeDasharray="6 4"
              strokeWidth={1.5}
              label={{
                value: 'Target 15d',
                position: 'insideTopRight',
                fontSize: 10,
                fill: '#9CA3AF',
              }}
            />
            <Line
              type="monotone"
              dataKey="days"
              name="Avg Velocity"
              stroke="#00B140"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#00B140', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#00B140', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
