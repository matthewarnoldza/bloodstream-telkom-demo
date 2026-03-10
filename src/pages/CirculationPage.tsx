import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts'
import { circulationData } from '../data/mockData'

// ─── Chart Card ────────────────────────────────
interface ChartCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <div className="card p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-tk-blue leading-tight">{title}</h3>
        {subtitle && <p className="text-xs text-tk-grey/60 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

// ─── Shared axis tick style ─────────────────────
const tickStyle = { fontSize: 10, fill: '#4A4A4A' }

export function CirculationPage() {
  return (
    <div className="space-y-6">
      <div className="hero-header">
        <div className="hero-breadcrumb">Analytics · Circulation</div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="hero-title">CIRCULATION</div>
            <div className="hero-subtitle">
              13 performance metrics · <span className="accent">Week 12 of 12</span>
            </div>
          </div>
          <button className="btn-outline" style={{ fontSize: 13, padding: '8px 16px' }}>Export Report</button>
        </div>
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* 1. Velocity Trend */}
        <ChartCard title="Velocity Trend" subtitle="Avg days per campaign · target 15d">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={circulationData.velocityTrend} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis dataKey="week" tick={tickStyle} />
              <YAxis tick={tickStyle} domain={[12, 18]} />
              <Tooltip />
              <ReferenceLine y={15} stroke="#0077C8" strokeDasharray="4 3" label={{ value: 'Target', fontSize: 10, fill: '#0077C8', position: 'insideTopRight' }} />
              <Line type="monotone" dataKey="days" stroke="#0077C8" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Revert Rate */}
        <ChartCard title="Revert Rate" subtitle="Percentage of artworks reverted per month">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={circulationData.revertRate} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis dataKey="month" tick={tickStyle} />
              <YAxis tick={tickStyle} unit="%" />
              <Tooltip formatter={(v) => [`${v}%`, 'Revert Rate']} />
              <Bar dataKey="rate" fill="#003B73" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. BG Pass Rate */}
        <ChartCard title="BG Pass Rate" subtitle="Brand Guardian gate pass % · target 90%">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={circulationData.bgPassRate} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis dataKey="week" tick={tickStyle} />
              <YAxis tick={tickStyle} domain={[78, 96]} unit="%" />
              <Tooltip formatter={(v) => [`${v}%`, 'Pass Rate']} />
              <ReferenceLine y={90} stroke="#00B140" strokeDasharray="4 3" label={{ value: '90%', fontSize: 10, fill: '#00B140', position: 'insideTopRight' }} />
              <Area type="monotone" dataKey="rate" fill="#00B140" fillOpacity={0.2} stroke="#00B140" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 4. On-Time Delivery */}
        <ChartCard title="On-Time Delivery" subtitle="% delivered on or before deadline · target 85%">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={circulationData.onTimeDelivery} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis dataKey="week" tick={tickStyle} />
              <YAxis tick={tickStyle} domain={[76, 92]} unit="%" />
              <Tooltip formatter={(v) => [`${v}%`, 'On-Time Rate']} />
              <ReferenceLine y={85} stroke="#0077C8" strokeDasharray="4 3" label={{ value: '85%', fontSize: 10, fill: '#0077C8', position: 'insideTopRight' }} />
              <Line type="monotone" dataKey="rate" stroke="#0077C8" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 5. DTP Corrections */}
        <ChartCard title="DTP Corrections" subtitle="Number of corrections per month">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={circulationData.dtpCorrections} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis dataKey="month" tick={tickStyle} />
              <YAxis tick={tickStyle} />
              <Tooltip formatter={(v) => [v, 'Corrections']} />
              <Bar dataKey="count" fill="#0077C8" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 6. Tier Distribution Over Time */}
        <ChartCard title="Tier Distribution Over Time" subtitle="Active campaigns by tier per month">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={circulationData.tierDistributionTrend} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis dataKey="month" tick={tickStyle} />
              <YAxis tick={tickStyle} />
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="Bronze" stackId="1" fill="#D97706" fillOpacity={0.4} stroke="#D97706" strokeWidth={1.5} />
              <Area type="monotone" dataKey="Silver" stackId="1" fill="#6B7280" fillOpacity={0.5} stroke="#6B7280" strokeWidth={1.5} />
              <Area type="monotone" dataKey="Gold" stackId="1" fill="#D97706" fillOpacity={0.7} stroke="#D97706" strokeWidth={1.5} />
              <Area type="monotone" dataKey="Platinum" stackId="1" fill="#7C3AED" fillOpacity={0.7} stroke="#7C3AED" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 7. Phase Dwell Time */}
        <ChartCard title="Phase Dwell Time" subtitle="Average days campaigns spend in each phase">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={circulationData.phaseDwellTime}
              layout="vertical"
              margin={{ top: 4, right: 16, bottom: 0, left: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis type="number" tick={tickStyle} unit="d" />
              <YAxis type="category" dataKey="phase" tick={{ fontSize: 10, fill: '#4A4A4A' }} width={80} />
              <Tooltip formatter={(v) => [`${v} days`, 'Avg Dwell']} />
              <Bar dataKey="days" fill="#003B73" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 8. Revert Reasons */}
        <ChartCard title="Revert Reasons" subtitle="Distribution of reasons artworks were reverted">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={circulationData.revertReasons}
                cx="50%"
                cy="45%"
                innerRadius={45}
                outerRadius={70}
                dataKey="value"
                paddingAngle={2}
              >
                {circulationData.revertReasons.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v, name) => [`${v}%`, name]} />
              <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 9. Brief Quality Score */}
        <ChartCard title="Brief Quality Score" subtitle="AI-assessed brief quality over time (0–100)">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={circulationData.briefQualityScore} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis dataKey="week" tick={tickStyle} />
              <YAxis tick={tickStyle} domain={[65, 95]} />
              <Tooltip formatter={(v) => [v, 'Quality Score']} />
              <Line type="monotone" dataKey="score" stroke="#00B140" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 10. Avg Revisions */}
        <ChartCard title="Avg Revisions per Campaign" subtitle="Mean number of revision cycles per month">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={circulationData.avgRevisions} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis dataKey="month" tick={tickStyle} />
              <YAxis tick={tickStyle} domain={[0, 5]} />
              <Tooltip formatter={(v) => [v, 'Revisions']} />
              <Bar dataKey="revisions" fill="#0077C8" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 11. Resource Utilisation */}
        <ChartCard title="Resource Utilisation" subtitle="% of team capacity utilised · 100% = full capacity">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={circulationData.resourceUtilisation} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis dataKey="week" tick={tickStyle} />
              <YAxis tick={tickStyle} domain={[60, 115]} unit="%" />
              <Tooltip formatter={(v) => [`${v}%`, 'Utilisation']} />
              <ReferenceLine y={100} stroke="#0077C8" strokeDasharray="4 3" label={{ value: '100%', fontSize: 10, fill: '#0077C8', position: 'insideTopRight' }} />
              <Area type="monotone" dataKey="utilisation" fill="#0077C8" fillOpacity={0.15} stroke="#0077C8" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 12. Gate Pass/Fail Rate */}
        <ChartCard title="Gate Pass / Fail Rate" subtitle="Cumulative pass and fail % per QA gate">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={circulationData.gatePassFail} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis dataKey="gate" tick={tickStyle} />
              <YAxis tick={tickStyle} unit="%" />
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="pass" name="Pass" stackId="a" fill="#00B140" radius={[0, 0, 0, 0]} />
              <Bar dataKey="fail" name="Fail" stackId="a" fill="#EF4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 13. Campaign Health Radar */}
        <ChartCard title="Campaign Health" subtitle="Multi-dimensional health score across 6 dimensions">
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart cx="50%" cy="50%" outerRadius={80} data={circulationData.campaignHealth}>
              <PolarGrid stroke="#E0E4E8" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#4A4A4A' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: '#4A4A4A' }} tickCount={3} />
              <Radar name="Health" dataKey="score" stroke="#0077C8" fill="#0077C8" fillOpacity={0.3} strokeWidth={2} />
              <Tooltip formatter={(v) => [v, 'Score']} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  )
}
