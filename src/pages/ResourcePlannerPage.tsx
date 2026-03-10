import { useState } from 'react'
import { AlertTriangle, Users, Calendar } from 'lucide-react'
import { teamMembers, TeamMember } from '../data/mockData'

// ─── Types ─────────────────────────────────────────────────────────────────

type Department = 'All' | 'Creative' | 'Strategy' | 'Production' | 'Account'

const FILTER_OPTIONS: Department[] = ['All', 'Creative', 'Strategy', 'Production', 'Account']

const WEEKS = [
  { key: 'w1' as const, label: 'W10', range: 'Mar 2–8' },
  { key: 'w2' as const, label: 'W11', range: 'Mar 9–15' },
  { key: 'w3' as const, label: 'W12', range: 'Mar 16–22' },
  { key: 'w4' as const, label: 'W13', range: 'Mar 23–29' },
]

// ─── Helpers ───────────────────────────────────────────────────────────────

function capacityClass(pct: number): string {
  if (pct <= 80)  return 'bg-green-100 text-green-800'
  if (pct <= 100) return 'bg-amber-100 text-amber-800'
  return 'bg-red-100 text-red-800 font-bold'
}

function avg(member: TeamMember): number {
  const vals = [member.capacity.w1, member.capacity.w2, member.capacity.w3, member.capacity.w4]
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
}

function teamTotal(members: TeamMember[], key: 'w1' | 'w2' | 'w3' | 'w4'): number {
  return Math.round(members.reduce((sum, m) => sum + m.capacity[key], 0) / members.length)
}

// ─── Component ─────────────────────────────────────────────────────────────

export function ResourcePlannerPage() {
  const [activeFilter, setActiveFilter] = useState<Department>('All')

  const filtered = activeFilter === 'All'
    ? teamMembers
    : teamMembers.filter(m => m.department === activeFilter)

  // Overall average utilisation across all visible members and weeks
  const overallAvg = Math.round(
    filtered.flatMap(m => [m.capacity.w1, m.capacity.w2, m.capacity.w3, m.capacity.w4])
      .reduce((a, b) => a + b, 0) / (filtered.length * 4)
  )

  const overallocatedMembers = teamMembers.filter(
    m => m.capacity.w1 > 100 || m.capacity.w2 > 100 || m.capacity.w3 > 100 || m.capacity.w4 > 100
  )

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title mb-1">Resource Planner</h1>
          <p className="text-sm text-tk-grey/70 flex items-center gap-2">
            <Calendar size={14} />
            Team capacity overview — Week 10–13 of 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-tk-grey/60">
            <Users size={14} />
            <span>{filtered.length} team members</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-bold border ${overallAvg > 100 ? 'bg-red-100 text-red-700 border-red-200' : overallAvg > 80 ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-green-100 text-green-800 border-green-200'}`}>
            Avg {overallAvg}% utilisation
          </div>
        </div>
      </div>

      {/* ── Filter Chips ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTER_OPTIONS.map(opt => (
          <button
            key={opt}
            onClick={() => setActiveFilter(opt)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
              activeFilter === opt
                ? 'bg-tk-blue2 text-white border-tk-blue2'
                : 'bg-white text-tk-grey border-tk-border hover:border-tk-blue2 hover:text-tk-blue2'
            }`}
          >
            {opt === 'All' ? 'All Roles' : opt}
          </button>
        ))}
      </div>

      {/* ── Heatmap Card ─────────────────────────────────────────────── */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-tk-border bg-tk-grey-lt">
                <th className="text-left py-3 px-4 label w-48">Team Member</th>
                <th className="text-left py-3 px-3 label w-36">Role</th>
                {WEEKS.map(w => (
                  <th key={w.key} className="text-center py-3 px-3 label">
                    <span className="block">{w.label}</span>
                    <span className="text-xs font-normal text-tk-grey/50 normal-case tracking-normal">{w.range}</span>
                  </th>
                ))}
                <th className="text-center py-3 px-3 label">Avg</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, idx) => {
                const memberAvg = avg(member)
                return (
                  <tr key={member.id} className={`border-b border-tk-border last:border-0 transition-colors hover:bg-tk-grey-lt/60 ${idx % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                    {/* Name with avatar */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-tk-blue2/10 text-tk-blue2 text-xs font-bold flex items-center justify-center shrink-0">
                          {member.avatar}
                        </div>
                        <span className="text-sm font-semibold text-tk-blue">{member.name}</span>
                      </div>
                    </td>
                    {/* Role */}
                    <td className="py-3 px-3">
                      <span className="text-xs text-tk-grey/70">{member.role}</span>
                    </td>
                    {/* Week cells */}
                    {WEEKS.map(w => {
                      const val = member.capacity[w.key]
                      return (
                        <td key={w.key} className="py-3 px-3 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold min-w-[52px] ${capacityClass(val)}`}>
                            {val}%
                          </span>
                        </td>
                      )
                    })}
                    {/* Avg */}
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold min-w-[52px] ${capacityClass(memberAvg)}`}>
                        {memberAvg}%
                      </span>
                    </td>
                  </tr>
                )
              })}

              {/* ── Summary / totals row ─────────────────────────────── */}
              <tr className="border-t-2 border-tk-border bg-tk-grey-lt">
                <td className="py-3 px-4">
                  <span className="text-xs font-bold text-tk-blue uppercase tracking-wider">Team Average</span>
                </td>
                <td className="py-3 px-3" />
                {WEEKS.map(w => {
                  const total = teamTotal(filtered, w.key)
                  return (
                    <td key={w.key} className="py-3 px-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold min-w-[52px] ${capacityClass(total)}`}>
                        {total}%
                      </span>
                    </td>
                  )
                })}
                <td className="py-3 px-3 text-center">
                  <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold min-w-[52px] ${capacityClass(overallAvg)}`}>
                    {overallAvg}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Legend + Warnings row ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Legend */}
        <div className="card p-4">
          <p className="label mb-3">Capacity Legend</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-green-100 border border-green-200 block" />
              <span className="text-xs text-tk-grey">≤80% Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-amber-100 border border-amber-200 block" />
              <span className="text-xs text-tk-grey">81–100% Near Full</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-red-100 border border-red-200 block" />
              <span className="text-xs text-tk-grey">&gt;100% Overallocated</span>
            </div>
          </div>
        </div>

        {/* Overallocation warnings */}
        {overallocatedMembers.length > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-amber-600" />
              <p className="text-sm font-bold text-amber-800">Overallocation Warnings</p>
            </div>
            <ul className="space-y-1.5">
              {overallocatedMembers.map(m => {
                const overWeeks = WEEKS.filter(w => m.capacity[w.key] > 100)
                return (
                  <li key={m.id} className="flex items-center gap-2 text-xs text-amber-800">
                    <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {m.avatar}
                    </div>
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-amber-600">—</span>
                    <span>over capacity in {overWeeks.map(w => w.label).join(', ')} ({overWeeks.map(w => `${m.capacity[w.key]}%`).join(', ')})</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
