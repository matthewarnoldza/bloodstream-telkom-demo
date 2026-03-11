import { useState } from 'react'
import { ShieldCheck, BarChart3 } from 'lucide-react'
import { QAGatesContent } from './QAGatesPage'
import { CirculationContent } from './CirculationPage'

type DiagnoseTab = 'qa-gates' | 'statistics'

export function DiagnosePage() {
  const [activeTab, setActiveTab] = useState<DiagnoseTab>('qa-gates')

  return (
    <div className="flex flex-col animate-fade-in">

      {/* ── TAB SWITCHER ─────────────────────────────────────────────── */}
      <div className="px-6 pt-6">
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
