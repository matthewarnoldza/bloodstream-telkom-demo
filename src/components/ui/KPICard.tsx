import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

// Top-border colours matching theme-1 (blue, indigo, green, amber per position)
const TOP_BORDER_COLORS = [
  '#0099FF',  // blue
  '#6366F1',  // indigo
  '#16A34A',  // green
  '#F59E0B',  // amber
]
const VALUE_COLORS = [
  '#0099FF',
  '#6366F1',
  '#16A34A',
  '#F59E0B',
]

interface KPICardProps {
  title: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'flat'
  trendLabel?: string
  index?: number  // 0–3 determines colour
  icon?: React.ReactNode
}

export function KPICard({ title, value, unit, trend, trendLabel, index = 0, icon }: KPICardProps) {
  const colorIdx = index % 4
  const topColor = TOP_BORDER_COLORS[colorIdx]
  const valueColor = VALUE_COLORS[colorIdx]

  const trendColor = trend === 'up' ? '#16A34A' : trend === 'down' ? '#EF4444' : '#9CA3AF'
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <div
      className="bg-white rounded-xl border border-tk-border shadow-tk-sm p-5 flex flex-col gap-3 hover:shadow-tk-md transition-all duration-200 hover:-translate-y-0.5 relative overflow-hidden"
      style={{ borderTop: `3px solid ${topColor}` }}
    >
      <div className="flex items-start justify-between">
        <p className="label">{title}</p>
        {icon && <div style={{ color: topColor, opacity: 0.6 }}>{icon}</div>}
      </div>
      <div className="flex items-end gap-1">
        <span className="text-[32px] font-extrabold leading-none tracking-tight font-telkom" style={{ color: valueColor }}>
          {value}
        </span>
        {unit && <span className="text-base font-medium text-tk-grey mb-0.5 opacity-70">{unit}</span>}
      </div>
      {trendLabel && (
        <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: trendColor }}>
          <TrendIcon size={12} />
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  )
}
