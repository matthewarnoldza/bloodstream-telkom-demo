import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'flat'
  trendLabel?: string
  accent?: 'green' | 'blue' | 'default'
  icon?: React.ReactNode
}

export function KPICard({ title, value, unit, trend, trendLabel, accent = 'green', icon }: KPICardProps) {
  const accentClass = accent === 'green' ? 'border-l-tk-green' : accent === 'blue' ? 'border-l-tk-blue2' : 'border-l-tk-border'

  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-gray-400'
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <div className={`card border-l-4 ${accentClass} p-5 flex flex-col gap-3 hover:shadow-tk-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold text-tk-grey/70 uppercase tracking-wide">{title}</p>
        {icon && <div className="text-tk-blue2 opacity-60">{icon}</div>}
      </div>
      <div className="flex items-end gap-1">
        <span className="text-4xl font-bold text-tk-blue font-telkom leading-none">{value}</span>
        {unit && <span className="text-lg text-tk-grey/60 mb-0.5">{unit}</span>}
      </div>
      {trendLabel && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendColor}`}>
          <TrendIcon size={13} />
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  )
}
