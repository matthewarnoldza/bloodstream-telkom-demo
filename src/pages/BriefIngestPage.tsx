import { useState } from 'react'
import {
  Upload,
  FileText,
  CheckCircle2,
  Plus,
  X,
  Calendar,
  DollarSign,
  Users,
  Target,
  Megaphone,
  Sparkles,
} from 'lucide-react'

// ─── Pre-populated Samsung S26 Ultra brief data ─────────────────────────────

const INITIAL_FORM = {
  campaignName: 'Samsung Galaxy S26 Ultra Launch',
  client: 'Samsung / Telkom Mobile',
  jobNumber: 'TLK-2026-0042',
  tier: 'Platinum',
  submittedBy: 'Lerato Dlamini',
  launchDate: '2026-03-25',
  budget: '4800000',
  objective:
    'Drive awareness and pre-order conversion for the Samsung Galaxy S26 Ultra within the Telkom ecosystem, positioning Telkom Mobile as the preferred network for premium device experiences.',
  audience:
    'Adults 25–45, LSM 8–10, existing Telkom subscribers and high-value prospects. Tech-forward early adopters and business professionals.',
  keyMessage:
    'The Galaxy S26 Ultra on Telkom delivers the ultimate connected experience — blazing fast 5G, exclusive data deals, and premium service from day one.',
  mandatories: [
    'Must include Telkom T logo',
    'Samsung partnership lockup',
    '#PossibleBeginsHere tagline',
    'Legal disclaimer (font size ≥ 8pt)',
    'Pricing must show "from" value',
  ],
  deliverables: [
    { name: 'Hero OOH 48-sheet', channel: 'OOH', format: 'Digital Print', deadline: '2026-03-18' },
    { name: 'Mall Activation Banner 6m', channel: 'OOH', format: 'Large Format', deadline: '2026-03-18' },
    { name: 'Facebook/IG Static Posts', channel: 'Social', format: 'JPG 1080×1080', deadline: '2026-03-20' },
    { name: 'Facebook/IG Stories', channel: 'Social', format: 'MP4 9:16', deadline: '2026-03-20' },
    { name: 'Twitter/X Banner', channel: 'Social', format: 'JPG 1500×500', deadline: '2026-03-21' },
    { name: 'Email Header', channel: 'Digital', format: 'HTML 600px', deadline: '2026-03-19' },
    { name: 'MyTelkom App Banner', channel: 'Digital', format: 'JPG 750×350', deadline: '2026-03-19' },
    { name: 'In-Store A2 Poster', channel: 'Retail', format: 'CMYK PDF', deadline: '2026-03-15' },
  ],
  attachments: [
    { name: 'S26_BriefFinal_v2.docx', size: '0.4 MB' },
    { name: 'Samsung_Brand_Guidelines_2026.pdf', size: '12.1 MB' },
    { name: 'S26_Hero_Reference.jpg', size: '3.2 MB' },
  ],
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-tk-blue/8 flex items-center justify-center text-tk-blue2">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-bold text-tk-navy">{title}</h2>
        {subtitle && <p className="text-xs text-tk-grey/60">{subtitle}</p>}
      </div>
    </div>
  )
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-tk-grey/70 uppercase tracking-wide mb-1.5">
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function BriefIngestPage() {
  const [form] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col animate-fade-in">
        <div className="p-6 max-w-screen-xl mx-auto w-full">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-tk-green/10 flex items-center justify-center mb-5">
              <CheckCircle2 size={40} className="text-tk-green" />
            </div>
            <h1 className="text-2xl font-bold text-tk-navy mb-2">Brief Submitted Successfully</h1>
            <p className="text-sm text-tk-grey/70 max-w-md mb-1">
              <span className="font-semibold text-tk-blue">{form.jobNumber}</span> — {form.campaignName}
            </p>
            <p className="text-sm text-tk-grey/50 max-w-md mb-6">
              Your brief has been injected into Bloodstream and is now being processed. Track progress in the <span className="font-semibold">Define</span> tab.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #00B140 0%, #009933 100%)',
                boxShadow: '0 4px 16px rgba(0, 177, 64, 0.35)',
              }}
            >
              Submit Another Brief
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col animate-fade-in">
      <div className="p-6 max-w-screen-xl mx-auto w-full flex flex-col gap-5">

        {/* ── Page intro ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-tk-navy tracking-tight">Brief Ingest</h1>
            <p className="text-sm text-tk-grey/60 mt-0.5">Submit a new campaign brief into Bloodstream</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tk-green/10 text-tk-green text-xs font-bold border border-tk-green/20">
              <CheckCircle2 size={13} />
              Pre-populated
            </span>
            <span className="text-xs text-tk-grey/50">Samsung S26 Ultra Launch</span>
          </div>
        </div>

        {/* ── FORM GRID ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── LEFT COLUMN (2/3) ──────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Campaign Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <SectionHeader icon={<FileText size={16} />} title="Campaign Details" subtitle="Basic brief information" />
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <FieldLabel label="Campaign Name" required />
                  <input type="text" value={form.campaignName} readOnly className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-tk-navy font-semibold focus:outline-none" />
                </div>
                <div>
                  <FieldLabel label="Client" required />
                  <input type="text" value={form.client} readOnly className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-tk-navy focus:outline-none" />
                </div>
                <div>
                  <FieldLabel label="Job Number" />
                  <input type="text" value={form.jobNumber} readOnly className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-tk-blue font-mono focus:outline-none" />
                </div>
                <div>
                  <FieldLabel label="Campaign Tier" required />
                  <select value={form.tier} disabled className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-tk-navy font-semibold focus:outline-none appearance-none">
                    <option>Platinum</option>
                    <option>Gold</option>
                    <option>Silver</option>
                  </select>
                </div>
                <div>
                  <FieldLabel label="Submitted By" />
                  <input type="text" value={form.submittedBy} readOnly className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-tk-navy focus:outline-none" />
                </div>
                <div>
                  <FieldLabel label="Launch Date" required />
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value="25 March 2026" readOnly className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-tk-navy focus:outline-none" />
                  </div>
                </div>
                <div>
                  <FieldLabel label="Budget" required />
                  <div className="relative">
                    <DollarSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value="R 4,800,000" readOnly className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-tk-navy font-semibold focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Brief */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <SectionHeader icon={<Target size={16} />} title="Strategic Brief" subtitle="Objective, audience, and key message" />
              <div className="flex flex-col gap-4">
                <div>
                  <FieldLabel label="Campaign Objective" required />
                  <textarea value={form.objective} readOnly rows={3} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-tk-grey leading-relaxed resize-none focus:outline-none" />
                </div>
                <div>
                  <FieldLabel label="Target Audience" required />
                  <textarea value={form.audience} readOnly rows={2} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-tk-grey leading-relaxed resize-none focus:outline-none" />
                </div>
                <div>
                  <FieldLabel label="Key Message" required />
                  <textarea value={form.keyMessage} readOnly rows={2} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-tk-grey leading-relaxed resize-none focus:outline-none italic" />
                </div>
              </div>
            </div>

            {/* Mandatories */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <SectionHeader icon={<Megaphone size={16} />} title="Brand Mandatories" subtitle="Required elements for compliance" />
              <div className="flex flex-col gap-2">
                {form.mandatories.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <CheckCircle2 size={15} className="text-tk-green shrink-0" />
                    <span className="text-sm text-tk-grey flex-1">{item}</span>
                    <button className="text-gray-300 hover:text-gray-500 transition-colors"><X size={14} /></button>
                  </div>
                ))}
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-tk-blue2 font-semibold rounded-xl border border-dashed border-tk-blue2/30 hover:bg-tk-blue2/5 transition-colors">
                  <Plus size={14} />
                  Add Mandatory
                </button>
              </div>
            </div>

            {/* Deliverables Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 pb-0">
                <SectionHeader icon={<Users size={16} />} title="Deliverables" subtitle={`${form.deliverables.length} items across ${new Set(form.deliverables.map(d => d.channel)).size} channels`} />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-y border-gray-100">
                      <th className="text-left px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-8">#</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Deliverable</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Channel</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Format</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Deadline</th>
                      <th className="px-4 py-3 w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {form.deliverables.map((d, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-3 text-xs text-gray-400 font-mono">{i + 1}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-tk-navy">{d.name}</td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2.5 py-0.5 bg-tk-blue/8 text-tk-blue text-xs font-bold rounded-full">{d.channel}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-tk-grey/60 font-mono">{d.format}</td>
                        <td className="px-4 py-3 text-xs text-tk-grey/70 tabular-nums">
                          {new Date(d.deadline).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-gray-300 hover:text-red-400 transition-colors"><X size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-gray-100">
                <button className="flex items-center gap-2 text-sm text-tk-blue2 font-semibold hover:text-tk-blue transition-colors">
                  <Plus size={14} />
                  Add Deliverable
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (1/3) ─────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Attachments */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <SectionHeader icon={<Upload size={16} />} title="Attachments" subtitle={`${form.attachments.length} files uploaded`} />
              <div className="flex flex-col gap-2 mb-4">
                {form.attachments.map((file, i) => (
                  <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <FileText size={15} className="text-tk-blue2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-tk-navy truncate">{file.name}</p>
                      <p className="text-[10px] text-gray-400">{file.size}</p>
                    </div>
                    <button className="text-gray-300 hover:text-red-400 transition-colors"><X size={13} /></button>
                  </div>
                ))}
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-tk-blue2/40 hover:bg-tk-blue2/5 transition-colors cursor-pointer">
                <Upload size={20} className="mx-auto text-gray-300 mb-2" />
                <p className="text-xs text-gray-400 font-medium">Drag & drop or click to upload</p>
                <p className="text-[10px] text-gray-300 mt-1">PDF, DOCX, JPG, AI — Max 200MB</p>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-tk-navy mb-4">Brief Summary</h3>
              <dl className="flex flex-col gap-3">
                <div className="flex justify-between text-xs">
                  <dt className="text-tk-grey/60">Job Number</dt>
                  <dd className="font-mono font-bold text-tk-blue">{form.jobNumber}</dd>
                </div>
                <div className="flex justify-between text-xs">
                  <dt className="text-tk-grey/60">Client</dt>
                  <dd className="font-semibold text-tk-navy">{form.client}</dd>
                </div>
                <div className="flex justify-between text-xs">
                  <dt className="text-tk-grey/60">Tier</dt>
                  <dd><span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-bold">{form.tier}</span></dd>
                </div>
                <div className="flex justify-between text-xs">
                  <dt className="text-tk-grey/60">Launch Date</dt>
                  <dd className="font-semibold text-tk-navy">25 Mar 2026</dd>
                </div>
                <div className="flex justify-between text-xs">
                  <dt className="text-tk-grey/60">Budget</dt>
                  <dd className="font-semibold text-tk-navy">R 4,800,000</dd>
                </div>
                <div className="flex justify-between text-xs">
                  <dt className="text-tk-grey/60">Deliverables</dt>
                  <dd className="font-semibold text-tk-navy">{form.deliverables.length} items</dd>
                </div>
                <div className="flex justify-between text-xs">
                  <dt className="text-tk-grey/60">Attachments</dt>
                  <dd className="font-semibold text-tk-navy">{form.attachments.length} files</dd>
                </div>
              </dl>
            </div>

            {/* AI Pre-check hint */}
            <div className="rounded-2xl border border-tk-blue2/20 bg-gradient-to-br from-tk-blue2/5 to-purple-50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={15} className="text-tk-blue2" />
                <span className="text-xs font-bold text-tk-blue2">AI Pre-Check</span>
              </div>
              <p className="text-xs text-tk-grey/70 leading-relaxed mb-3">
                Once submitted, Bloodstream AI will automatically run a Pulse Check to validate brand compliance, completeness, and strategic alignment.
              </p>
              <div className="flex items-center gap-2 text-xs text-tk-grey/50">
                <div className="w-1.5 h-1.5 rounded-full bg-tk-green animate-pulse" />
                AI Engine ready
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setSubmitted(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #00B140 0%, #009933 100%)',
                boxShadow: '0 4px 16px rgba(0, 177, 64, 0.35)',
              }}
            >
              <Upload size={15} />
              Submit Brief to Bloodstream
            </button>

            <p className="text-[10px] text-center text-gray-400 -mt-2">
              This will inject the brief into the Bloodstream workflow pipeline
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
