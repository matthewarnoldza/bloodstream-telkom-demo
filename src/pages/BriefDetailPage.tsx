import {
  AlertTriangle,
  Info,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Calendar,
  User,
  DollarSign,
} from 'lucide-react'

import { useAISimulation } from '../hooks/useAISimulation'
import { StatusBadge } from '../components/ui/StatusBadge'
import { AILoader } from '../components/ui/AILoader'
import { briefDetail } from '../data/mockData'

// ─── Types ────────────────────────────────────────────────────────────────

type FlagSeverity = 'warning' | 'info' | 'success'

interface PulseFlag {
  severity: FlagSeverity
  title: string
  detail: string
}

interface PulseResult {
  score: number
  grade: string
  flags: PulseFlag[]
  recommendation: string
}

// ─── Severity config ──────────────────────────────────────────────────────

const SEVERITY_CONFIG: Record<
  FlagSeverity,
  { icon: React.ReactNode; bg: string; border: string; iconColor: string; label: string }
> = {
  warning: {
    icon: <AlertTriangle size={16} />,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-500',
    label: 'Warning',
  },
  info: {
    icon: <Info size={16} />,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-500',
    label: 'Note',
  },
  success: {
    icon: <CheckCircle2 size={16} />,
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-tk-green',
    label: 'Pass',
  },
}

// ─── SVG arc score ring ───────────────────────────────────────────────────

function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const radius = 52
  const stroke = 8
  const cx = 64
  const cy = 64
  const circumference = 2 * Math.PI * radius
  // Show only 270° of the circle (start at -225deg, end at 45deg)
  const arc = 0.75 // 75% of full circle
  const dashLen = circumference * arc * (score / 100)
  const dashTotal = circumference * arc

  // Colour: ≥90 green, ≥75 blue, else amber
  const trackColor = '#E0E4E8'
  const fillColor =
    score >= 90 ? '#00B140' : score >= 75 ? '#0077C8' : '#F59E0B'

  // rotation so arc starts at bottom-left
  const rotation = 135

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <svg width="128" height="128" className="absolute inset-0">
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
          strokeDasharray={`${dashTotal} ${circumference}`}
          strokeLinecap="round"
          strokeDashoffset={0}
          transform={`rotate(${rotation} ${cx} ${cy})`}
        />
        {/* Fill */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={fillColor}
          strokeWidth={stroke}
          strokeDasharray={`${dashLen} ${circumference}`}
          strokeLinecap="round"
          strokeDashoffset={0}
          transform={`rotate(${rotation} ${cx} ${cy})`}
          style={{ transition: 'stroke-dasharray 1s ease-out' }}
        />
      </svg>
      {/* Inner text */}
      <div className="relative z-10 flex flex-col items-center">
        <span
          className="text-3xl font-bold font-telkom leading-none"
          style={{ color: fillColor }}
        >
          {score}
        </span>
        <span className="text-xs text-tk-grey/50 font-semibold">/ 100</span>
        <span
          className="text-sm font-bold mt-0.5"
          style={{ color: fillColor }}
        >
          {grade}
        </span>
      </div>
    </div>
  )
}

// ─── Deliverable status badge helper ────────────────────────────────────

function DeliverableStatusBadge({ status }: { status: string }) {
  const cfg: Record<string, string> = {
    'In Progress': 'bg-blue-100 text-blue-800',
    'Pending':     'bg-gray-100 text-gray-600',
    'Complete':    'bg-green-100 text-green-800',
    'Blocked':     'bg-red-100 text-red-800',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${cfg[status] ?? 'bg-gray-100 text-gray-600'}`}
    >
      {status}
    </span>
  )
}

// ─── Version timeline item ────────────────────────────────────────────────

function VersionItem({
  version,
  last,
}: {
  version: (typeof briefDetail.versions)[0]
  last: boolean
}) {
  const isCurrent = version.status === 'Current'
  return (
    <div className="flex gap-3">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full mt-1 shrink-0 ${
            isCurrent
              ? 'bg-tk-blue2 ring-2 ring-tk-blue2/30'
              : 'bg-tk-border border-2 border-white ring-1 ring-tk-border'
          }`}
        />
        {!last && <div className="w-px flex-1 bg-tk-border mt-1" />}
      </div>
      {/* Content */}
      <div className={`pb-5 flex-1 ${last ? 'pb-0' : ''}`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`font-mono text-xs font-bold ${
              isCurrent ? 'text-tk-blue2' : 'text-tk-grey/60'
            }`}
          >
            {version.version}
          </span>
          <StatusBadge label={version.status} variant="status" />
          <span className="text-xs text-tk-grey/40 ml-auto">{version.date}</span>
        </div>
        <p className="text-sm text-tk-grey mt-1">{version.note}</p>
        <p className="text-xs text-tk-grey/50 mt-0.5">— {version.author}</p>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────

export function BriefDetailPage() {
  const pulseResult: PulseResult = briefDetail.aiPulseCheck as PulseResult

  const { state, trigger, reset, result, step } = useAISimulation<PulseResult>(
    pulseResult,
    3000,
  )

  const PULSE_STEPS = [
    'Reading brief parameters...',
    'Checking brand guidelines...',
    'Generating recommendations...',
  ]

  return (
    <div className="flex flex-col gap-0 animate-fade-in">

      {/* ── TOP BAR (breadcrumb) ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-tk-border px-6 py-3 flex items-center gap-2 text-sm">
        <span className="text-tk-grey/50 font-medium">Brief Intake</span>
        <ChevronRight size={14} className="text-tk-grey/30" />
        <span className="font-semibold text-tk-blue">{briefDetail.id}</span>
      </div>

      <div className="p-6 flex flex-col gap-6">

        {/* ── HERO CARD ─────────────────────────────────────────────────── */}
        <div className="card p-6">
          <div className="flex flex-col gap-4">
            {/* Title row */}
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-mono text-xs text-tk-blue2 font-bold bg-tk-blue2/8 px-2 py-0.5 rounded">
                    {briefDetail.id}
                  </span>
                  <StatusBadge label={briefDetail.tier} variant="tier" size="md" />
                  <StatusBadge label={briefDetail.status} variant="phase" size="md" />
                </div>
                <h1 className="page-title leading-tight">{briefDetail.title}</h1>
                <p className="text-sm text-tk-grey/60 mt-0.5">{briefDetail.client}</p>
              </div>
            </div>

            {/* Team chips */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-tk-grey-lt rounded-full px-3 py-1 text-xs font-semibold text-tk-grey">
                <User size={11} className="text-tk-blue2" />
                <span className="text-tk-grey/50">PM</span>
                {briefDetail.pm}
              </div>
              <div className="flex items-center gap-1.5 bg-tk-grey-lt rounded-full px-3 py-1 text-xs font-semibold text-tk-grey">
                <User size={11} className="text-tk-blue2" />
                <span className="text-tk-grey/50">CD</span>
                {briefDetail.cd}
              </div>
              <div className="flex items-center gap-1.5 bg-tk-grey-lt rounded-full px-3 py-1 text-xs font-semibold text-tk-grey">
                <User size={11} className="text-tk-blue2" />
                <span className="text-tk-grey/50">Strategist</span>
                {briefDetail.strategist}
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm border-t border-tk-border pt-4">
              <div className="flex items-center gap-1.5 text-tk-grey/70">
                <Calendar size={13} className="text-tk-blue2" />
                <span className="label mr-1">Submitted</span>
                {briefDetail.submittedDate}
              </div>
              <div className="flex items-center gap-1.5 text-tk-grey/70">
                <Calendar size={13} className="text-tk-green" />
                <span className="label mr-1">Launch</span>
                <span className="font-semibold text-tk-blue">{briefDetail.launchDate}</span>
              </div>
              <div className="flex items-center gap-1.5 text-tk-grey/70">
                <DollarSign size={13} className="text-tk-green" />
                <span className="label mr-1">Budget</span>
                <span className="font-semibold text-tk-blue">{briefDetail.budget}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TWO-COLUMN BODY ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6 items-start">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Brief Overview */}
            <div className="card p-6 flex flex-col gap-5">
              <h2 className="section-title">Brief Overview</h2>

              <div>
                <p className="label mb-1">Objective</p>
                <p className="text-sm text-tk-grey leading-relaxed">
                  {briefDetail.objective}
                </p>
              </div>

              <div>
                <p className="label mb-1">Audience</p>
                <p className="text-sm text-tk-grey leading-relaxed">
                  {briefDetail.audience}
                </p>
              </div>

              <div>
                <p className="label mb-1">Key Message</p>
                <p className="text-sm text-tk-grey leading-relaxed italic border-l-2 border-tk-green pl-3">
                  "{briefDetail.keyMessage}"
                </p>
              </div>
            </div>

            {/* Mandatories */}
            <div className="card p-6">
              <h2 className="section-title mb-4">Mandatories</h2>
              <ul className="flex flex-col gap-2.5">
                {briefDetail.mandatories.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-tk-grey">
                    <CheckCircle2
                      size={15}
                      className="text-tk-green mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables table */}
            <div className="card overflow-hidden">
              <div className="px-6 py-4 border-b border-tk-border flex items-center justify-between">
                <h2 className="section-title">Deliverables</h2>
                <span className="label">{briefDetail.deliverables.length} items</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-tk-grey-lt border-b border-tk-border">
                      <th className="px-4 py-3 text-left label w-8">#</th>
                      <th className="px-4 py-3 text-left label">Deliverable</th>
                      <th className="px-4 py-3 text-left label">Channel</th>
                      <th className="px-4 py-3 text-left label">Format</th>
                      <th className="px-4 py-3 text-left label">Deadline</th>
                      <th className="px-4 py-3 text-left label">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tk-border">
                    {briefDetail.deliverables.map((d) => (
                      <tr
                        key={d.id}
                        className="hover:bg-tk-grey-lt/60 transition-colors"
                      >
                        <td className="px-4 py-3 text-tk-grey/40 font-mono text-xs">
                          {d.id}
                        </td>
                        <td className="px-4 py-3 font-semibold text-tk-blue">
                          {d.name}
                        </td>
                        <td className="px-4 py-3 text-tk-grey/70">{d.channel}</td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs text-tk-grey/60 bg-tk-grey-lt px-1.5 py-0.5 rounded">
                            {d.format}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-tk-grey/70 tabular-nums">
                          {d.deadline}
                        </td>
                        <td className="px-4 py-3">
                          <DeliverableStatusBadge status={d.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* ── AI PULSE CHECK ────────────────────────────────────────── */}
            <div className="card overflow-hidden">
              {/* Card header — gradient strip */}
              <div className="relative bg-gradient-to-r from-tk-navy to-tk-blue px-6 py-4 flex items-center justify-between overflow-hidden">
                <div
                  className="absolute right-0 top-0 h-full w-32 opacity-15"
                  style={{
                    background:
                      'linear-gradient(135deg, transparent 40%, #00B140 40%)',
                  }}
                />
                <div className="flex items-center gap-2 relative z-10">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                    <Sparkles size={14} className="text-tk-green" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">
                      AI Pulse Check
                    </p>
                    <p className="text-white/50 text-xs">Powered by Bloodstream AI</p>
                  </div>
                </div>
                {state === 'done' && result && (
                  <button
                    onClick={reset}
                    className="relative z-10 flex items-center gap-1 text-white/60 hover:text-white text-xs font-medium transition-colors"
                  >
                    <RotateCcw size={12} />
                    Reset
                  </button>
                )}
              </div>

              {/* Card body */}
              <div className="p-6">
                {/* ── IDLE STATE ────────────────────────────────────── */}
                {state === 'idle' && (
                  <div className="flex flex-col items-center gap-5 py-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tk-blue/10 to-tk-green/10 flex items-center justify-center">
                      <Sparkles size={28} className="text-tk-blue2" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-tk-blue text-sm">
                        Ready to analyse brief
                      </p>
                      <p className="text-xs text-tk-grey/50 mt-1 max-w-[220px]">
                        AI will check for compliance, completeness, and strategic alignment.
                      </p>
                    </div>
                    <button
                      onClick={trigger}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-tk-green transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background:
                          'linear-gradient(135deg, #00B140 0%, #009933 100%)',
                        boxShadow: '0 4px 16px rgba(0, 177, 64, 0.35)',
                      }}
                    >
                      <Sparkles size={14} />
                      Run Pulse Check
                    </button>
                  </div>
                )}

                {/* ── LOADING STATE ────────────────────────────────── */}
                {state === 'loading' && (
                  <AILoader step={step} steps={PULSE_STEPS} />
                )}

                {/* ── DONE STATE ───────────────────────────────────── */}
                {state === 'done' && result && (
                  <div className="flex flex-col gap-5 animate-fade-up">

                    {/* Score ring + summary */}
                    <div className="flex items-center gap-5 bg-gradient-to-r from-tk-grey-lt to-white rounded-xl p-4 border border-tk-border">
                      <ScoreRing score={result.score} grade={result.grade} />
                      <div>
                        <p className="label mb-1">Brief Quality Score</p>
                        <p className="text-2xl font-bold text-tk-blue font-telkom">
                          {result.score}/100
                        </p>
                        <p className="text-xs text-tk-grey/60 mt-1 max-w-[160px] leading-relaxed">
                          Brief is well-structured and nearly production-ready.
                        </p>
                      </div>
                    </div>

                    {/* Flag cards */}
                    <div className="flex flex-col gap-3">
                      <p className="label">Analysis Flags</p>
                      {result.flags.map((flag, i) => {
                        const cfg = SEVERITY_CONFIG[flag.severity]
                        return (
                          <div
                            key={i}
                            className={`rounded-xl border px-4 py-3.5 flex gap-3 ${cfg.bg} ${cfg.border}`}
                          >
                            <div
                              className={`mt-0.5 shrink-0 ${cfg.iconColor}`}
                            >
                              {cfg.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span
                                  className={`text-xs font-bold uppercase tracking-wide ${cfg.iconColor}`}
                                >
                                  {cfg.label}
                                </span>
                                <span className="font-semibold text-sm text-tk-blue">
                                  {flag.title}
                                </span>
                              </div>
                              <p className="text-xs text-tk-grey/70 leading-relaxed">
                                {flag.detail}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Recommendation */}
                    <div className="rounded-xl border border-tk-blue2/20 bg-tk-blue2/5 px-4 py-4">
                      <p className="label mb-1.5 text-tk-blue2">
                        AI Recommendation
                      </p>
                      <p className="text-sm text-tk-blue leading-relaxed">
                        {result.recommendation}
                      </p>
                    </div>

                    {/* Reset */}
                    <button
                      onClick={reset}
                      className="btn-outline w-full justify-center"
                    >
                      <RotateCcw size={14} />
                      Run Again
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── VERSION TIMELINE ─────────────────────────────────────── */}
            <div className="card p-6">
              <h2 className="section-title mb-5">Version Timeline</h2>
              <div className="flex flex-col">
                {briefDetail.versions.map((v, i) => (
                  <VersionItem
                    key={v.version}
                    version={v}
                    last={i === briefDetail.versions.length - 1}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
