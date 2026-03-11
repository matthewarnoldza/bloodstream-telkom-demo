import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowUpCircle, Zap, Archive, Plus, ChevronUp } from 'lucide-react'
import { discoverBriefs, DiscoverBrief } from '../data/mockData'

// ─── Flow status mapping ────────────────────────────────────────────────────

type FlowStatus = 'INTAKE' | 'PRODUCTION' | 'RESOLVED' | 'RETURNED'

function mapStatusToFlow(status: DiscoverBrief['status']): FlowStatus {
  switch (status) {
    case 'New': return 'INTAKE'
    case 'In Review': return 'PRODUCTION'
    case 'Approved': return 'RESOLVED'
    case 'Returned': return 'RETURNED'
  }
}

function FlowBadge({ flow }: { flow: FlowStatus }) {
  const cfg: Record<FlowStatus, { bg: string; dot: string; text: string }> = {
    INTAKE:     { bg: 'bg-blue-50 text-blue-700',   dot: 'bg-blue-500',   text: 'INTAKE' },
    PRODUCTION: { bg: 'bg-red-50 text-red-600',     dot: 'bg-red-500',    text: 'PRODUCTION' },
    RESOLVED:   { bg: 'bg-gray-100 text-gray-500',  dot: 'bg-gray-400',   text: 'RESOLVED' },
    RETURNED:   { bg: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500',  text: 'RETURNED' },
  }
  const c = cfg[flow]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${c.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.text}
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function DiscoverPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClient, setFilterClient] = useState<string>('All')
  const [infoOpen, setInfoOpen] = useState(true)

  const clients = ['All', ...new Set(discoverBriefs.map(b => b.client))]

  const filtered = discoverBriefs.filter(b => {
    if (filterClient !== 'All' && b.client !== filterClient) return false
    if (searchTerm && !b.title.toLowerCase().includes(searchTerm.toLowerCase()) && !b.id.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const intakeCount = discoverBriefs.filter(b => b.status === 'New').length
  const inFlowCount = discoverBriefs.filter(b => b.status === 'In Review').length
  const resolvedCount = discoverBriefs.filter(b => b.status === 'Approved').length

  return (
    <div className="flex flex-col animate-fade-in">
      <div className="p-6 flex flex-col gap-5 max-w-screen-xl mx-auto w-full">

        {/* ── KPI SUMMARY ROW ──────────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-4">
          {/* Intake */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Intake</p>
              <p className="text-3xl font-bold text-tk-blue mt-1">{intakeCount}</p>
            </div>
            <ArrowUpCircle size={28} className="text-pink-400 opacity-60" />
          </div>
          {/* In Flow */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">In Flow</p>
              <p className="text-3xl font-bold text-tk-blue mt-1">{inFlowCount}</p>
            </div>
            <Zap size={28} className="text-blue-400 opacity-60" />
          </div>
          {/* Resolved */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Resolved</p>
              <p className="text-3xl font-bold text-gray-500 mt-1">{resolvedCount}</p>
            </div>
            <Archive size={28} className="text-gray-300" />
          </div>
          {/* Create New Brief CTA */}
          <div
            className="rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-[1.02] transition-transform"
            style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 50%, #F97316 100%)',
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-2">
              <Plus size={20} className="text-white" />
            </div>
            <p className="text-white/80 text-xs font-medium">Create New Brief</p>
            <p className="text-white text-lg font-bold">Inject</p>
          </div>
        </div>

        {/* ── BRIEF DISCOVERY INFO ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <button
            onClick={() => setInfoOpen(!infoOpen)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search size={16} className="text-gray-400" />
              <span className="text-sm font-semibold text-tk-navy">Brief Discovery</span>
            </div>
            <ChevronUp size={16} className={`text-gray-400 transition-transform ${infoOpen ? '' : 'rotate-180'}`} />
          </button>
          {infoOpen && (
            <div className="px-6 pb-5 pt-0">
              <ul className="space-y-1.5 text-sm text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="text-tk-blue mt-0.5">•</span>
                  <span><span className="font-semibold text-gray-700">Browse incoming briefs</span> — view all briefs from clients, use filters to find specific ones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tk-blue mt-0.5">•</span>
                  <span><span className="font-semibold text-gray-700">Accept to begin</span> — click "Accept" on a brief to take ownership and start the enhancement process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tk-blue mt-0.5">•</span>
                  <span><span className="font-semibold text-gray-700">Inject your own</span> — use the "Inject" button above to create a brief manually</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* ── FILTER BAR ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <select
            value={filterClient}
            onChange={e => setFilterClient(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-tk-navy font-medium focus:outline-none focus:border-tk-blue2 min-w-[180px]"
          >
            {clients.map(c => (
              <option key={c} value={c}>{c === 'All' ? 'All Clients' : c}</option>
            ))}
          </select>

          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Search by job # or campaign name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-tk-navy placeholder-gray-300 focus:outline-none focus:border-tk-blue2"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm">
              <span className="text-tk-blue font-bold">{filtered.length}</span>
              <span className="text-gray-400"> of {discoverBriefs.length}</span>
            </span>
            {(searchTerm || filterClient !== 'All') && (
              <button
                onClick={() => { setSearchTerm(''); setFilterClient('All') }}
                className="text-sm text-gray-400 hover:text-gray-600 font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── DATA TABLE ───────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Campaign Name</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Client</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Submitted Date</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Flow</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Accepted By</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Reverts</th>
                <th className="text-right px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(brief => {
                const flow = mapStatusToFlow(brief.status)
                return (
                  <tr key={brief.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-tk-blue font-bold text-sm">#{brief.id}</span>
                        <span className="text-tk-navy font-semibold text-sm ml-2">{brief.title}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{brief.category}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{brief.client}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 tabular-nums">
                      {new Date(brief.submittedDate).toLocaleDateString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}
                    </td>
                    <td className="px-4 py-4">
                      <FlowBadge flow={flow} />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {brief.status === 'In Review' ? brief.submittedBy : brief.status === 'Approved' ? 'System' : '–'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-400">–</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/define/${brief.id}`)}
                          className="px-4 py-1.5 rounded-full border border-tk-green text-tk-green text-xs font-semibold hover:bg-tk-green hover:text-tk-navy transition-colors"
                        >
                          View
                        </button>
                        {flow !== 'RESOLVED' && (
                          <button className="px-4 py-1.5 rounded-full bg-tk-blue text-white text-xs font-semibold hover:bg-tk-blue2 transition-colors">
                            Next Steps
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
