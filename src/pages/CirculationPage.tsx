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

// Exported content component (no hero) for use in DiagnosePage
export function CirculationContent() {
  return (
    <div className="px-6 pb-6 pt-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="page-title"><span style={{ color: '#0099FF' }}>Campaign</span> Statistics</div>
          <div className="text-xs text-tk-grey mt-0.5">13 performance metrics · Week 12 of 12</div>
        </div>
        <button className="btn-outline" style={{ fontSize: 13, padding: '8px 16px' }}>Export Report</button>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <CirculationCharts />
      </div>
    </div>
  )
}

function CirculationCharts() {
  return (
    <>
      {/* 1 */}
      <div className="col-span-4">
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
      </div>
      {/* 2 */}
      <div className="col-span-2">
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
      </div>
      {/* 3 */}
      <div className="col-span-2">
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
      </div>
      {/* 4 */}
      <div className="col-span-2">
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
      </div>
      {/* 5 */}
      <div className="col-span-2">
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
      </div>
      {/* 6 */}
      <div className="col-span-4">
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
      </div>
      {/* 7 */}
      <div className="col-span-3">
        <ChartCard title="Phase Dwell Time" subtitle="Average days campaigns spend in each phase">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={circulationData.phaseDwellTime} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" />
              <XAxis type="number" tick={tickStyle} unit="d" />
              <YAxis type="category" dataKey="phase" tick={{ fontSize: 10, fill: '#4A4A4A' }} width={80} />
              <Tooltip formatter={(v) => [`${v} days`, 'Avg Dwell']} />
              <Bar dataKey="days" fill="#003B73" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      {/* 8 */}
      <div className="col-span-3">
        <ChartCard title="Revert Reasons" subtitle="Distribution of reasons artworks were reverted">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={circulationData.revertReasons} cx="50%" cy="45%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                {circulationData.revertReasons.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
              </Pie>
              <Tooltip formatter={(v, name) => [`${v}%`, name]} />
              <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      {/* 9 */}
      <div className="col-span-2">
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
      </div>
      {/* 10 */}
      <div className="col-span-2">
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
      </div>
      {/* 11 */}
      <div className="col-span-2">
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
      </div>
      {/* 12 */}
      <div className="col-span-4">
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
      </div>
      {/* 13 */}
      <div className="col-span-2">
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
    </>
  )
}

export function CirculationPage() {
  return (
    <div className="space-y-6">
      <div className="px-6 pt-6">
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
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-6 gap-4 px-6 pb-6">

        {/* 1. Velocity Trend — col-span-4 */}
        <div className="col-span-4">
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
        </div>

        {/* 2. Revert Rate — col-span-2 */}
        <div className="col-span-2">
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
        </div>

        {/* 3. BG Pass Rate — col-span-2 */}
        <div className="col-span-2">
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
        </div>

        {/* 4. On-Time Delivery — col-span-2 */}
        <div className="col-span-2">
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
        </div>

        {/* 5. DTP Corrections — col-span-2 */}
        <div className="col-span-2">
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
        </div>

        {/* 6. Tier Distribution Over Time — col-span-4 */}
        <div className="col-span-4">
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
        </div>

        {/* 7. Phase Dwell Time — col-span-3 */}
        <div className="col-span-3">
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
        </div>

        {/* 8. Revert Reasons — col-span-3 */}
        <div className="col-span-3">
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
        </div>

        {/* 9. Brief Quality Score — col-span-2 */}
        <div className="col-span-2">
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
        </div>

        {/* 10. Avg Revisions — col-span-2 */}
        <div className="col-span-2">
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
        </div>

        {/* 11. Resource Utilisation — col-span-2 */}
        <div className="col-span-2">
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
        </div>

        {/* 12. Gate Pass/Fail Rate — col-span-4 */}
        <div className="col-span-4">
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
        </div>

        {/* 13. Campaign Health Radar — col-span-2 */}
        <div className="col-span-2">
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
    </div>
  )
}
