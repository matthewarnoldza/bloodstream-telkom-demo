import {
  FileCheck, Palette, GitBranch, Share2, Rocket,
  CheckCircle2, XCircle, AlertTriangle, Shield,
} from 'lucide-react'
import { qaGates, qaMatrix, campaigns, brandGuardianScan, GateStatus } from '../data/mockData'
import { StatusBadge } from '../components/ui/StatusBadge'

// ─── Gate icon map ──────────────────────────────
const GATE_ICONS: Record<string, React.ReactNode> = {
  'FileCheck':  <FileCheck  size={20} />,
  'Palette':    <Palette    size={20} />,
  'GitBranch':  <GitBranch  size={20} />,
  'Share2':     <Share2     size={20} />,
  'Rocket':     <Rocket     size={20} />,
}

// ─── Gate pipeline card ─────────────────────────
interface GatePipelineCardProps {
  name: string
  icon: React.ReactNode
  passCount: number
  failCount: number
  avgHours: number
  isLast: boolean
}

function GatePipelineCard({ name, icon, passCount, failCount, avgHours, isLast }: GatePipelineCardProps) {
  const total = passCount + failCount
  const passRate = Math.round((passCount / total) * 100)

  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <div className="card border-t-4 border-t-tk-green p-3 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-tk-green">{icon}</span>
          <span className="text-xs font-semibold text-tk-blue leading-tight">{name}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
            {passCount} passed
          </span>
          <span className="text-[10px] font-semibold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-full">
            {failCount} failed
          </span>
        </div>
        <div className="text-[10px] text-tk-grey/60">avg {avgHours}h · {passRate}% pass</div>
      </div>
      {!isLast && (
        <span className="text-tk-grey/40 text-lg font-light flex-shrink-0">→</span>
      )}
    </div>
  )
}

// ─── Gate status cell colour ────────────────────
function cellBg(status: GateStatus): string {
  switch (status) {
    case 'pass':        return 'bg-green-50'
    case 'fail':        return 'bg-red-50'
    case 'in-progress': return 'bg-blue-50'
    case 'pending':     return 'bg-gray-50'
  }
}

// ─── Brand Guardian check icon ──────────────────
function CheckIcon({ status }: { status: string }) {
  if (status === 'pass')    return <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
  if (status === 'fail')    return <XCircle      size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
  return <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
}

// ─── Overall status badge styles ───────────────
function overallStatusClass(status: string): string {
  switch (status) {
    case 'Pass':    return 'bg-green-100 text-green-800'
    case 'Fail':    return 'bg-red-100 text-red-800'
    case 'Warning': return 'bg-amber-100 text-amber-800'
    default:        return 'bg-gray-100 text-gray-600'
  }
}

// ─── Gate columns for the matrix ───────────────
const GATE_COLUMNS = [
  { id: 'brief-qa',     label: 'Brief QA' },
  { id: 'creative',     label: 'Creative' },
  { id: 'version',      label: 'Version' },
  { id: 'distribution', label: 'Distribution' },
  { id: 'rollout',      label: 'Rollout' },
]

export function QAGatesPage() {
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="px-6 pt-6">
        <div className="hero-header">
          <div className="hero-breadcrumb">Quality Control · QA Gates</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="hero-title">QA GATES</div>
            <div className="hero-subtitle">
              5-gate quality pipeline · <span className="accent">91% overall pass rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Gate Visual Pipeline */}
      <div className="card p-4">
        <h2 className="section-title mb-4 text-base">Gate Pipeline Overview</h2>
        <div className="flex items-start gap-1 overflow-x-auto pb-1">
          {qaGates.map((gate, i) => (
            <GatePipelineCard
              key={gate.id}
              name={gate.name}
              icon={GATE_ICONS[gate.icon]}
              passCount={gate.passCount}
              failCount={gate.failCount}
              avgHours={gate.avgHours}
              isLast={i === qaGates.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Campaign QA Matrix */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-tk-border">
          <h2 className="section-title text-base">Campaign QA Matrix</h2>
          <p className="text-xs text-tk-grey/60 mt-0.5">Gate status for all active campaigns</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-tk-grey-lt border-b border-tk-border">
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-tk-grey/70 uppercase tracking-wide w-28">
                  ID
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-tk-grey/70 uppercase tracking-wide">
                  Campaign
                </th>
                {GATE_COLUMNS.map(col => (
                  <th
                    key={col.id}
                    className="text-center px-3 py-3 text-[11px] font-semibold text-tk-grey/70 uppercase tracking-wide whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-tk-border">
              {campaigns.map(campaign => {
                const row = qaMatrix[campaign.id] ?? {}
                return (
                  <tr key={campaign.id} className="hover:bg-tk-grey-lt/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px] text-tk-blue2 whitespace-nowrap">
                      {campaign.id}
                    </td>
                    <td className="px-4 py-3 max-w-[180px]">
                      <span
                        className="block truncate text-tk-grey font-medium"
                        title={campaign.name}
                      >
                        {campaign.name}
                      </span>
                    </td>
                    {GATE_COLUMNS.map(col => {
                      const status = (row[col.id] ?? 'pending') as GateStatus
                      return (
                        <td key={col.id} className={`px-3 py-3 text-center ${cellBg(status)}`}>
                          <StatusBadge label={status} variant="gate" size="sm" />
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand Guardian Scan */}
      <div className="card p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-tk-blue flex-shrink-0" />
            <div>
              <h2 className="section-title text-base leading-tight">
                Brand Guardian Scan &nbsp;·&nbsp;
                <span className="font-mono text-sm font-semibold text-tk-blue2">
                  {brandGuardianScan.campaign}
                </span>
              </h2>
              <p className="text-xs text-tk-grey/50 mt-0.5">
                Scanned {brandGuardianScan.scannedAt}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${overallStatusClass(brandGuardianScan.overallStatus)}`}
          >
            {brandGuardianScan.overallStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {brandGuardianScan.checks.map(check => (
            <div
              key={check.rule}
              className={`flex items-start gap-3 rounded-lg px-3 py-2.5 border ${
                check.status === 'pass'
                  ? 'bg-green-50/60 border-green-100'
                  : check.status === 'fail'
                  ? 'bg-red-50/60 border-red-100'
                  : 'bg-amber-50/60 border-amber-100'
              }`}
            >
              <CheckIcon status={check.status} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[10px] font-bold text-tk-grey/50">{check.rule}</span>
                  <span className="text-xs font-semibold text-tk-grey">{check.name}</span>
                </div>
                <p className="text-[11px] text-tk-grey/70 mt-0.5 leading-snug">{check.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
