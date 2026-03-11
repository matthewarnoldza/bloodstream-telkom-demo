import { useState } from 'react'
import { Search, Filter, FileText, Calendar, User } from 'lucide-react'
import { discoverBriefs, DiscoverBrief } from '../data/mockData'
import { StatusBadge } from '../components/ui/StatusBadge'

// ─── Brief status badge ──────────────────────────────────────────────────────

function BriefStatusBadge({ status }: { status: DiscoverBrief['status'] }) {
  const cfg: Record<string, string> = {
    'New':       'bg-blue-100 text-blue-800',
    'In Review': 'bg-amber-100 text-amber-800',
    'Approved':  'bg-green-100 text-green-800',
    'Returned':  'bg-red-100 text-red-800',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

function PriorityDot({ priority }: { priority: DiscoverBrief['priority'] }) {
  const color = priority === 'High' ? 'bg-red-500' : priority === 'Medium' ? 'bg-amber-400' : 'bg-gray-300'
  return (
    <span className="flex items-center gap-1.5 text-xs text-tk-grey/60">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {priority}
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [filterTier, setFilterTier] = useState<string>('All')

  const filtered = discoverBriefs.filter(b => {
    if (filterStatus !== 'All' && b.status !== filterStatus) return false
    if (filterTier !== 'All' && b.tier !== filterTier) return false
    if (searchTerm && !b.title.toLowerCase().includes(searchTerm.toLowerCase()) && !b.client.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const countByStatus = (s: string) => discoverBriefs.filter(b => b.status === s).length

  return (
    <div className="flex flex-col animate-fade-in">

      {/* ── HERO HEADER ──────────────────────────────────────────────── */}
      <div className="px-6 pt-6">
        <div className="hero-header">
          <div className="hero-breadcrumb">D1 · Discover</div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="hero-title">DISCOVER</div>
              <div className="hero-subtitle">
                Incoming campaign briefs · <span className="accent">All Telkom brands</span>
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

      <div className="p-6 flex flex-col gap-6">

        {/* ── STATS ROW ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-[#0099FF] bg-[#0099FF]/8 px-3 py-1 rounded-full">
            {discoverBriefs.length} total briefs
          </span>
          <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            {countByStatus('New')} new
          </span>
          <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            {countByStatus('In Review')} in review
          </span>
          <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
            {countByStatus('Approved')} approved
          </span>
          <span className="text-xs font-semibold text-red-700 bg-red-100 px-3 py-1 rounded-full">
            {countByStatus('Returned')} returned
          </span>
        </div>

        {/* ── FILTERS ──────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-tk-grey/40" />
            <input
              type="text"
              placeholder="Search briefs…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-tk-border rounded-lg bg-white text-tk-grey placeholder-tk-grey/40 focus:outline-none focus:border-tk-blue2"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-tk-grey/40" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="text-xs border border-tk-border rounded-lg px-2.5 py-2 bg-white text-tk-grey focus:outline-none focus:border-tk-blue2"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
              <option value="Returned">Returned</option>
            </select>
            <select
              value={filterTier}
              onChange={e => setFilterTier(e.target.value)}
              className="text-xs border border-tk-border rounded-lg px-2.5 py-2 bg-white text-tk-grey focus:outline-none focus:border-tk-blue2"
            >
              <option value="All">All Tiers</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>
        </div>

        {/* ── BRIEF CARDS GRID ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(brief => (
            <div
              key={brief.id}
              className="card p-5 hover:shadow-tk-md transition-shadow duration-200 cursor-default group"
            >
              {/* Top row: ID + badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[11px] text-tk-blue2 font-bold bg-tk-blue2/8 px-2 py-0.5 rounded">
                  {brief.id}
                </span>
                <div className="flex items-center gap-1.5">
                  <StatusBadge label={brief.tier} variant="tier" size="sm" />
                  <BriefStatusBadge status={brief.status} />
                </div>
              </div>

              {/* Title + client */}
              <h3 className="font-bold text-tk-blue text-sm leading-tight mb-1 group-hover:text-tk-blue2 transition-colors">
                {brief.title}
              </h3>
              <p className="text-xs text-tk-grey/60 mb-2">{brief.client}</p>

              {/* Description */}
              <p className="text-xs text-tk-grey/80 leading-relaxed mb-3 line-clamp-2">
                {brief.description}
              </p>

              {/* Footer meta */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-tk-border">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-tk-grey/60">
                    <FileText size={11} className="text-tk-blue2" />
                    {brief.category}
                  </span>
                  <PriorityDot priority={brief.priority} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] text-tk-grey/50">
                    <User size={10} />
                    {brief.submittedBy.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-tk-grey/50">
                    <Calendar size={10} />
                    {new Date(brief.submittedDate).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card flex flex-col items-center justify-center py-16 text-center">
            <FileText size={32} className="text-tk-grey/30 mb-3" />
            <p className="text-sm text-tk-grey/50">No briefs match your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
