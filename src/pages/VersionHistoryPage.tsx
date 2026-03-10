import { useState } from 'react'
import {
  Sparkles,
  GitBranch,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  User,
} from 'lucide-react'

import { versionHistory, adjudicationResult } from '../data/mockData'
import { StatusBadge } from '../components/ui/StatusBadge'
import { AILoader } from '../components/ui/AILoader'
import { useAISimulation } from '../hooks/useAISimulation'

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getVersionDotClass(status: string) {
  switch (status) {
    case 'Current':  return 'bg-tk-blue2 ring-2 ring-tk-blue2/30'
    case 'Approved': return 'bg-tk-green ring-2 ring-tk-green/30'
    case 'Reverted': return 'bg-orange-500 ring-2 ring-orange-300'
    case 'Rejected': return 'bg-red-500 ring-2 ring-red-300'
    case 'Flagged':  return 'bg-amber-500 ring-2 ring-amber-300'
    default:         return 'bg-gray-400'
  }
}

// ─── AI Adjudication Steps ─────────────────────────────────────────────────

const ADJUDICATION_STEPS = [
  'Parsing version diff...',
  'Checking brand compliance...',
  'Generating recommendation...',
]

// ─── Component ─────────────────────────────────────────────────────────────

export function VersionHistoryPage() {
  const [hoveredVersion, setHoveredVersion] = useState<string | null>(null)

  const { state, trigger, reset, result, step } = useAISimulation(
    adjudicationResult,
    3000,
  )

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title mb-1">Version History</h1>
          <p className="text-sm text-tk-grey/70 flex items-center gap-2">
            <GitBranch size={14} />
            March Monthly Broadsheet · TLK-2026-0036
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge label="At Risk" variant="status" size="md" />
          <div className="flex items-center gap-1.5 text-sm text-tk-grey/60">
            <Clock size={14} />
            <span>9 versions · 4 weeks</span>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── LEFT: Version Timeline (60%) ─────────────────────────── */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            <h2 className="section-title mb-6">Version Timeline</h2>

            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-tk-border" />

              <div className="space-y-0">
                {versionHistory.map((v, idx) => {
                  const isLast = idx === versionHistory.length - 1
                  const isComparison = v.version === 'v3.0' || v.version === 'v3.2'

                  return (
                    <div
                      key={v.id}
                      className={`relative flex gap-4 group cursor-default ${isLast ? '' : 'pb-6'}`}
                      onMouseEnter={() => setHoveredVersion(v.id)}
                      onMouseLeave={() => setHoveredVersion(null)}
                    >
                      {/* Dot */}
                      <div className="relative z-10 shrink-0 mt-0.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getVersionDotClass(v.status)}`}>
                          {v.version.replace('v', '')}
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`flex-1 pb-0 ${isComparison && hoveredVersion === v.id ? 'bg-tk-blue2/5 rounded-lg p-3 -ml-1' : 'p-0 ml-0'} transition-all`}>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-tk-blue text-sm">{v.version}</span>
                            <StatusBadge label={v.changeType} variant="change" />
                          </div>
                          <span className="text-xs text-tk-grey/50">{formatDate(v.date)}</span>
                        </div>

                        <div className="flex items-center gap-1.5 mt-0.5 mb-1">
                          <User size={11} className="text-tk-grey/40" />
                          <span className="text-xs text-tk-grey/60">{v.author}</span>
                          <span className="text-xs text-tk-grey/40">·</span>
                          <span className="text-xs text-tk-grey/40">{v.role}</span>
                        </div>

                        <p className="text-xs text-tk-grey/70 leading-relaxed mb-1.5">{v.note}</p>

                        <StatusBadge label={v.status} variant="status" />

                        {/* Hover: compare button */}
                        {isComparison && (
                          <div className={`mt-2 transition-all duration-200 ${hoveredVersion === v.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                            <span className="text-xs text-tk-blue2 font-semibold cursor-pointer hover:underline">
                              Select for comparison
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Compare trigger */}
            <div className="mt-6 pt-5 border-t border-tk-border flex justify-end">
              <button
                className="btn-green"
                onClick={trigger}
                disabled={state !== 'idle'}
              >
                <RotateCcw size={15} />
                Compare v3.0 ↔ v3.2
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: AI Adjudication Panel (40%) ───────────────────── */}
        <div className="lg:col-span-2">
          <div className="card p-6 h-full">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={18} className="text-tk-blue2" />
              <h2 className="section-title">AI Adjudication</h2>
            </div>

            {/* IDLE */}
            {state === 'idle' && (
              <div className="flex flex-col items-center text-center gap-5 py-6">
                <div className="w-14 h-14 rounded-full bg-tk-blue2/10 flex items-center justify-center">
                  <Sparkles size={24} className="text-tk-blue2" />
                </div>
                <p className="text-sm text-tk-grey/70 leading-relaxed max-w-xs">
                  Select two versions to compare. The AI will analyse differences, identify brand compliance issues, and recommend the approved version.
                </p>
                <button className="btn-green" onClick={trigger}>
                  <Sparkles size={15} />
                  Run Adjudication (v3.0 vs v3.2)
                </button>
              </div>
            )}

            {/* LOADING */}
            {state === 'loading' && (
              <AILoader step={step} steps={ADJUDICATION_STEPS} />
            )}

            {/* DONE */}
            {state === 'done' && result && (
              <div className="space-y-5 animate-fade-in">
                {/* Recommendation header */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="label mb-1">Recommendation</p>
                    <h3 className="text-lg font-bold text-tk-blue leading-tight">
                      Revert to v3.0
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-tk-green/10 text-tk-green rounded-full text-sm font-bold border border-tk-green/20">
                    {result.confidence}% confidence
                  </span>
                </div>

                {/* Side-by-side comparison */}
                <div className="grid grid-cols-2 gap-3">
                  {/* v3.0 — recommended */}
                  <div className="rounded-lg border-2 border-tk-green bg-green-50 p-3">
                    <p className="text-xs font-bold text-tk-green mb-2">v3.0 — Recommended</p>
                    <ul className="space-y-1.5">
                      {result.v30Flags.map((flag, i) => {
                        const isPass = flag.includes('✓')
                        return (
                          <li key={i} className="flex items-start gap-1.5">
                            {isPass
                              ? <CheckCircle2 size={13} className="text-tk-green shrink-0 mt-0.5" />
                              : <XCircle size={13} className="text-red-500 shrink-0 mt-0.5" />
                            }
                            <span className="text-xs text-tk-grey leading-snug">{flag.replace('✓', '').replace('✗', '').trim()}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* v3.2 — not recommended */}
                  <div className="rounded-lg border-2 border-red-300 bg-red-50 p-3">
                    <p className="text-xs font-bold text-red-600 mb-2">v3.2 — Issues Found</p>
                    <ul className="space-y-1.5">
                      {result.v32Flags.map((flag, i) => {
                        const isPass = flag.includes('✓')
                        return (
                          <li key={i} className="flex items-start gap-1.5">
                            {isPass
                              ? <CheckCircle2 size={13} className="text-tk-green shrink-0 mt-0.5" />
                              : <XCircle size={13} className="text-red-500 shrink-0 mt-0.5" />
                            }
                            <span className="text-xs text-tk-grey leading-snug">{flag.replace('✓', '').replace('✗', '').trim()}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="bg-tk-grey-lt rounded-lg p-3 border border-tk-border">
                  <p className="label mb-1.5">AI Reasoning</p>
                  <p className="text-xs text-tk-grey/80 leading-relaxed">{result.reasoning}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <button className="btn-green flex-1 justify-center">
                    Apply Recommendation
                  </button>
                  <button
                    onClick={reset}
                    className="text-xs text-tk-grey/50 hover:text-tk-grey transition-colors underline"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
