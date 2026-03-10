import { useState } from 'react'
import { AlertTriangle, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import { teamMembers, TeamMember } from '../data/mockData'

// ─── Types ──────────────────────────────────────────────────────────────────

type Department = 'All' | 'Creative' | 'Strategy' | 'Production' | 'Account'

const FILTER_OPTIONS: Department[] = ['All', 'Creative', 'Strategy', 'Production', 'Account']

const WEEKS = [
  { key: 'w1' as const, label: 'W10', range: 'Mar 2–8' },
  { key: 'w2' as const, label: 'W11', range: 'Mar 9–15' },
  { key: 'w3' as const, label: 'W12', range: 'Mar 16–22' },
  { key: 'w4' as const, label: 'W13', range: 'Mar 23–29' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function barColor(cap: number): string {
  if (cap <= 80) return '#91E200'
  if (cap <= 100) return '#F59E0B'
  return '#EF4444'
}

function barTextColor(cap: number): string {
  return cap > 100 ? '#FFFFFF' : '#0B1A2E'
}

function teamWeekAvg(members: TeamMember[], key: 'w1' | 'w2' | 'w3' | 'w4'): number {
  if (members.length === 0) return 0
  return Math.round(members.reduce((sum, m) => sum + m.capacity[key], 0) / members.length)
}

function overallAvg(members: TeamMember[]): number {
  if (members.length === 0) return 0
  const all = members.flatMap(m => [m.capacity.w1, m.capacity.w2, m.capacity.w3, m.capacity.w4])
  return Math.round(all.reduce((a, b) => a + b, 0) / all.length)
}

// ─── Capacity Bar Cell ────────────────────────────────────────────────────────

function CapacityCell({ cap }: { cap: number }) {
  const fill = Math.min(cap, 100)
  const color = barColor(cap)
  const textColor = barTextColor(cap)

  return (
    <div className="mx-3 my-2 relative h-7 bg-[#E2E8F0] rounded-md overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full rounded-md transition-all duration-300"
        style={{ width: `${fill}%`, backgroundColor: color }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center text-xs font-bold"
        style={{ color: textColor }}
      >
        {cap}%
      </div>
      {cap > 100 && (
        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-white font-bold leading-none">
          !
        </span>
      )}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ResourcePlannerPage() {
  const [activeFilter, setActiveFilter] = useState<Department>('All')
  const [selectedWeekOffset, setSelectedWeekOffset] = useState<number>(0)

  const filtered = activeFilter === 'All'
    ? teamMembers
    : teamMembers.filter(m => m.department === activeFilter)

  const avgUtil = overallAvg(teamMembers)

  const overallocatedMembers = teamMembers.filter(
    m => m.capacity.w1 > 100 || m.capacity.w2 > 100 || m.capacity.w3 > 100 || m.capacity.w4 > 100
  )

  const overallocatedFiltered = filtered.filter(
    m => m.capacity.w1 > 100 || m.capacity.w2 > 100 || m.capacity.w3 > 100 || m.capacity.w4 > 100
  )

  return (
    <div className="flex flex-col h-full">

      {/* ── Hero Header ─────────────────────────────────────────────────── */}
      <div className="px-6 pt-6">
        <div className="hero-header">
          <div className="hero-breadcrumb">Planning · Resource Planner</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="hero-title">RESOURCES</div>
            <div className="hero-subtitle">
              11-member team · <span className="accent">Weeks 10–13, March 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary Cards ───────────────────────────────────────────────── */}
      <div className="px-6 py-4 grid grid-cols-4 gap-4">
        {/* Total Resources */}
        <div className="bg-white border border-tk-border rounded-xl shadow-tk-sm p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users size={14} className="text-tk-grey" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-tk-grey">Total Resources</span>
          </div>
          <div className="text-3xl font-black text-[#0B1A2E] leading-none">11</div>
          <div className="text-xs text-tk-grey mt-1">Active team members</div>
        </div>

        {/* Avg Utilisation */}
        <div className="bg-white border border-tk-border rounded-xl shadow-tk-sm p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] inline-block" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-tk-grey">Avg Utilisation</span>
          </div>
          <div
            className="text-3xl font-black leading-none"
            style={{ color: barColor(avgUtil) }}
          >
            {avgUtil}%
          </div>
          <div className="text-xs text-tk-grey mt-1">Across all 4 weeks</div>
        </div>

        {/* Overallocated */}
        <div className="bg-white border border-tk-border rounded-xl shadow-tk-sm p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-[#EF4444]" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-tk-grey">Overallocated</span>
          </div>
          <div className="text-3xl font-black leading-none text-[#EF4444]">
            {overallocatedMembers.length}
          </div>
          <div className="text-xs text-tk-grey mt-1">Members &gt;100% any week</div>
        </div>

        {/* Dept Breakdown */}
        <div className="bg-white border border-tk-border rounded-xl shadow-tk-sm p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#0099FF] inline-block" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-tk-grey">Dept Breakdown</span>
          </div>
          <div className="text-sm font-bold text-[#0B1A2E] leading-snug mt-1">
            4 Creative · 2 Strategy
          </div>
          <div className="text-sm font-bold text-[#0B1A2E] leading-snug">
            3 Production · 2 Account
          </div>
        </div>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="px-6 pb-4 flex items-center justify-between">
        {/* Department filter chips */}
        <div className="flex items-center gap-2">
          {FILTER_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activeFilter === opt
                  ? 'bg-[#0099FF] text-white border-[#0099FF]'
                  : 'bg-white text-tk-grey border-tk-border hover:border-[#0099FF] hover:text-[#0099FF]'
              }`}
            >
              {opt === 'All' ? 'All Depts' : opt}
            </button>
          ))}
        </div>

        {/* Week navigation — visual only */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedWeekOffset(o => o - 1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-tk-border bg-white text-tk-grey hover:border-[#0099FF] hover:text-[#0099FF] transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-xs font-semibold text-[#0B1A2E] min-w-[130px] text-center">
            Week 10–13, Mar 2026
          </span>
          <button
            onClick={() => setSelectedWeekOffset(o => o + 1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-tk-border bg-white text-tk-grey hover:border-[#0099FF] hover:text-[#0099FF] transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Main Panel ──────────────────────────────────────────────────── */}
      <div
        className="mx-6 flex border border-tk-border rounded-xl overflow-hidden bg-white"
        style={{ height: 'calc(100vh - 400px)', minHeight: '400px' }}
      >
        {/* LEFT — Resource List */}
        <div className="w-64 shrink-0 border-r border-tk-border bg-white flex flex-col">
          {/* Column header */}
          <div className="px-4 py-3 bg-[#F8FAFC] border-b border-tk-border shrink-0">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-tk-grey">
              Resource
            </span>
          </div>

          {/* Member rows */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map(member => (
              <div
                key={member.id}
                className="flex items-center gap-3 px-4 border-b border-[#EDF2F7]"
                style={{ height: '52px' }}
              >
                <div className="w-8 h-8 rounded-full bg-[#0099FF]/10 text-[#0099FF] text-xs font-bold flex items-center justify-center shrink-0">
                  {member.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#0B1A2E] truncate leading-tight">
                    {member.name}
                  </div>
                  <div className="text-xs text-tk-grey truncate leading-tight">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer — Team Average label */}
          <div
            className="flex items-center px-4 border-t-2 border-tk-border bg-[#F8FAFC] shrink-0"
            style={{ height: '52px' }}
          >
            <span className="text-xs font-bold text-[#0B1A2E] uppercase tracking-wider">
              Team Average
            </span>
          </div>
        </div>

        {/* RIGHT — Timeline / Capacity Bars */}
        <div className="flex-1 overflow-x-auto bg-[#F8FAFC] flex flex-col">
          {/* Week column headers */}
          <div
            className="grid shrink-0 border-b border-tk-border"
            style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', height: '44px' }}
          >
            {WEEKS.map((w, i) => (
              <div
                key={w.key}
                className={`flex flex-col items-center justify-center bg-[#F8FAFC] ${
                  i < WEEKS.length - 1 ? 'border-r border-tk-border' : ''
                }`}
              >
                <span className="text-[10px] uppercase tracking-widest font-semibold text-tk-grey leading-none">
                  {w.label}
                </span>
                <span className="text-[9px] text-tk-grey/60 mt-0.5 leading-none">
                  {w.range}
                </span>
              </div>
            ))}
          </div>

          {/* Member rows */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map((member, rowIdx) => (
              <div
                key={member.id}
                className={`grid border-b border-[#EDF2F7] ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
                style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', height: '52px' }}
              >
                {WEEKS.map((w, i) => (
                  <div
                    key={w.key}
                    className={`flex items-center ${i < WEEKS.length - 1 ? 'border-r border-[#EDF2F7]' : ''}`}
                  >
                    <div className="flex-1">
                      <CapacityCell cap={member.capacity[w.key]} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer — Team Average row */}
          <div
            className="grid shrink-0 border-t-2 border-tk-border bg-[#F8FAFC]"
            style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', height: '52px' }}
          >
            {WEEKS.map((w, i) => {
              const avg = teamWeekAvg(filtered, w.key)
              return (
                <div
                  key={w.key}
                  className={`flex items-center ${i < WEEKS.length - 1 ? 'border-r border-tk-border' : ''}`}
                >
                  <div className="flex-1">
                    <CapacityCell cap={avg} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Overallocation Warning Banner ───────────────────────────────── */}
      {overallocatedFiltered.length > 0 && (
        <div className="mx-6 mb-6 mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-600 shrink-0" />
            <p className="text-sm font-bold text-amber-800">
              Overallocation Warnings — {overallocatedFiltered.length} member{overallocatedFiltered.length > 1 ? 's' : ''} over capacity
            </p>
          </div>
          <ul className="space-y-1.5">
            {overallocatedFiltered.map(m => {
              const overWeeks = WEEKS.filter(w => m.capacity[w.key] > 100)
              return (
                <li key={m.id} className="flex items-center gap-2 text-xs text-amber-800 flex-wrap">
                  <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {m.avatar}
                  </div>
                  <span className="font-semibold">{m.name}</span>
                  <span className="text-amber-500">·</span>
                  <span className="text-amber-700">{m.role}</span>
                  <span className="text-amber-500">—</span>
                  <span>
                    over capacity in{' '}
                    {overWeeks.map(w => `${w.label} (${m.capacity[w.key]}%)`).join(', ')}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
