import { useState } from 'react'
import { ShieldCheck, BarChart3 } from 'lucide-react'
import { QAGatesContent } from './QAGatesPage'
import { CirculationContent } from './CirculationPage'

type DiagnoseTab = 'qa-gates' | 'statistics'

export function DiagnosePage() {
  const [activeTab, setActiveTab] = useState<DiagnoseTab>('qa-gates')

  return (
    <div className="flex flex-col animate-fade-in">

      {/* ── HERO HEADER ──────────────────────────────────────────────── */}
      <div className="px-6 pt-6">
        <div className="hero-header">
          <div className="hero-breadcrumb">D5 · Diagnose</div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="hero-title">DIAGNOSE</div>
              <div className="hero-subtitle">
                Quality assurance & <span className="accent">campaign analytics</span>
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, padding: '8px 16px', flexShrink: 0,
            }}>
              <img src="/telkom-logo.svg" alt="Telkom" style={{ height: 20, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 10 }}>11 Mar 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TAB SWITCHER ─────────────────────────────────────────────── */}
      <div className="px-6 pt-4">
        <div className="flex items-center gap-2 bg-white border border-tk-border rounded-xl p-1 w-fit shadow-tk-sm">
          <button
            onClick={() => setActiveTab('qa-gates')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'qa-gates'
                ? 'bg-[#0099FF] text-white shadow-md'
                : 'text-tk-grey hover:bg-tk-grey-lt'
            }`}
          >
            <ShieldCheck size={15} />
            QA Gates
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'statistics'
                ? 'bg-[#0099FF] text-white shadow-md'
                : 'text-tk-grey hover:bg-tk-grey-lt'
            }`}
          >
            <BarChart3 size={15} />
            Statistics
          </button>
        </div>
      </div>

      {/* ── TAB CONTENT ──────────────────────────────────────────────── */}
      <div className="animate-fade-in" key={activeTab}>
        {activeTab === 'qa-gates' ? <QAGatesContent /> : <CirculationContent />}
      </div>
    </div>
  )
}
