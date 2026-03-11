// ─────────────────────────────────────────────
// BLOODSTREAM TELKOM DEMO — MOCK DATA
// ─────────────────────────────────────────────

export type Tier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze'
export type Phase = 'Brief QA' | 'Creative' | 'Version Control' | 'Distribution' | 'Rollout'
export type GateStatus = 'pass' | 'fail' | 'pending' | 'in-progress'
export type CampaignStatus = 'On Track' | 'At Risk' | 'Delayed' | 'Complete'

// ─── KPI METRICS ───────────────────────────────
export const kpiMetrics = {
  activeCampaigns: 10,
  avgVelocityDays: 14.2,
  bgPassRate: 91,
  onTimeDelivery: 88,
  velocityTrend: [
    { week: 'W1', days: 17.2 },
    { week: 'W2', days: 16.8 },
    { week: 'W3', days: 15.9 },
    { week: 'W4', days: 16.1 },
    { week: 'W5', days: 15.3 },
    { week: 'W6', days: 14.8 },
    { week: 'W7', days: 15.0 },
    { week: 'W8', days: 14.5 },
    { week: 'W9', days: 14.2 },
    { week: 'W10', days: 13.9 },
    { week: 'W11', days: 14.1 },
    { week: 'W12', days: 14.2 },
  ],
}

// ─── CAMPAIGNS ─────────────────────────────────
export interface Campaign {
  id: string
  name: string
  client: string
  tier: Tier
  phase: Phase
  status: CampaignStatus
  daysInPhase: number
  totalDays: number
  launchDate: string
  pm: string
}

export const campaigns: Campaign[] = [
  {
    id: 'TLK-2026-0042',
    name: 'Samsung Galaxy S26 Ultra Launch',
    client: 'Samsung',
    tier: 'Platinum',
    phase: 'Creative',
    status: 'On Track',
    daysInPhase: 3,
    totalDays: 11,
    launchDate: '2026-03-25',
    pm: 'Lerato Dlamini',
  },
  {
    id: 'TLK-2026-0039',
    name: 'Telkom Business Fibre Q1',
    client: 'Telkom Business',
    tier: 'Platinum',
    phase: 'Distribution',
    status: 'On Track',
    daysInPhase: 5,
    totalDays: 18,
    launchDate: '2026-03-18',
    pm: 'Sipho Nkosi',
  },
  {
    id: 'TLK-2026-0038',
    name: 'LTE Home Connect Summer',
    client: 'Telkom Consumer',
    tier: 'Gold',
    phase: 'Brief QA',
    status: 'On Track',
    daysInPhase: 1,
    totalDays: 2,
    launchDate: '2026-04-01',
    pm: 'Amahle Zulu',
  },
  {
    id: 'TLK-2026-0036',
    name: 'March Monthly Broadsheet',
    client: 'Telkom Consumer',
    tier: 'Gold',
    phase: 'Version Control',
    status: 'At Risk',
    daysInPhase: 8,
    totalDays: 14,
    launchDate: '2026-03-15',
    pm: 'Tshepo Mokoena',
  },
  {
    id: 'TLK-2026-0035',
    name: 'FreeMe Unlimited Relaunch',
    client: 'Telkom Mobile',
    tier: 'Platinum',
    phase: 'Rollout',
    status: 'On Track',
    daysInPhase: 2,
    totalDays: 19,
    launchDate: '2026-03-12',
    pm: 'Lerato Dlamini',
  },
  {
    id: 'TLK-2026-0034',
    name: 'SME Starter Pack Campaign',
    client: 'Telkom Business',
    tier: 'Silver',
    phase: 'Creative',
    status: 'On Track',
    daysInPhase: 4,
    totalDays: 10,
    launchDate: '2026-03-28',
    pm: 'Sipho Nkosi',
  },
  {
    id: 'TLK-2026-0032',
    name: 'Youth Connect Data Bundles',
    client: 'Telkom Mobile',
    tier: 'Gold',
    phase: 'Brief QA',
    status: 'On Track',
    daysInPhase: 2,
    totalDays: 3,
    launchDate: '2026-04-05',
    pm: 'Amahle Zulu',
  },
  {
    id: 'TLK-2026-0031',
    name: 'OpenServe FTTH Awareness',
    client: 'OpenServe',
    tier: 'Silver',
    phase: 'Distribution',
    status: 'Delayed',
    daysInPhase: 9,
    totalDays: 22,
    launchDate: '2026-03-10',
    pm: 'Tshepo Mokoena',
  },
  {
    id: 'TLK-2026-0029',
    name: 'Executive Lifestyle Offer',
    client: 'Telkom Business',
    tier: 'Bronze',
    phase: 'Creative',
    status: 'On Track',
    daysInPhase: 3,
    totalDays: 9,
    launchDate: '2026-04-10',
    pm: 'Lerato Dlamini',
  },
  {
    id: 'TLK-2026-0027',
    name: 'Back to School Connectivity',
    client: 'Telkom Consumer',
    tier: 'Bronze',
    phase: 'Version Control',
    status: 'At Risk',
    daysInPhase: 6,
    totalDays: 12,
    launchDate: '2026-03-20',
    pm: 'Sipho Nkosi',
  },
]

// ─── PHASE DISTRIBUTION ────────────────────────
export const phaseDistribution = [
  { name: 'Brief QA',       value: 2, color: '#0077C8' },
  { name: 'Creative',       value: 4, color: '#003B73' },
  { name: 'Version Control',value: 2, color: '#00B140' },
  { name: 'Distribution',   value: 1, color: '#001F3F' },
  { name: 'Rollout',        value: 1, color: '#4A4A4A' },
]

export const tierDistribution = [
  { tier: 'Platinum', count: 3 },
  { tier: 'Gold',     count: 3 },
  { tier: 'Silver',   count: 2 },
  { tier: 'Bronze',   count: 2 },
]

// ─── BRIEF DETAIL (Samsung S26) ────────────────
export const briefDetail = {
  id: 'TLK-2026-0042',
  title: 'Samsung Galaxy S26 Ultra Launch',
  client: 'Samsung / Telkom Mobile',
  tier: 'Platinum' as Tier,
  status: 'Creative' as Phase,
  pm: 'Lerato Dlamini',
  cd: 'James Ferreira',
  strategist: 'Nomsa Vilakazi',
  submittedDate: '2026-03-01',
  launchDate: '2026-03-25',
  budget: 'R 4,800,000',
  objective: 'Drive awareness and pre-order conversion for the Samsung Galaxy S26 Ultra within the Telkom ecosystem, positioning Telkom Mobile as the preferred network for premium device experiences.',
  audience: 'Adults 25–45, LSM 8–10, existing Telkom subscribers and high-value prospects. Tech-forward early adopters and business professionals.',
  keyMessage: 'The Galaxy S26 Ultra on Telkom delivers the ultimate connected experience — blazing fast 5G, exclusive data deals, and premium service from day one.',
  mandatories: ['Must include Telkom T logo', 'Samsung partnership lockup', '#PossibleBeginsHere tagline', 'Legal disclaimer (font size ≥ 8pt)', 'Pricing must show "from" value'],
  versions: [
    { version: 'v1.0', date: '2026-03-01', author: 'Lerato Dlamini', note: 'Initial brief submission', status: 'Approved' },
    { version: 'v1.1', date: '2026-03-04', author: 'Nomsa Vilakazi', note: 'Budget revised, audience refined', status: 'Approved' },
    { version: 'v2.0', date: '2026-03-07', author: 'James Ferreira', note: 'Added DTP channel specs and deliverable breakdown', status: 'Current' },
  ],
  deliverables: [
    { id: 1, name: 'Hero OOH 48-sheet',        channel: 'OOH',   format: 'Digital Print',  deadline: '2026-03-18', status: 'In Progress' },
    { id: 2, name: 'Mall Activation Banner 6m', channel: 'OOH',   format: 'Large Format',   deadline: '2026-03-18', status: 'In Progress' },
    { id: 3, name: 'Facebook/IG Static Posts',  channel: 'Social', format: 'JPG 1080×1080', deadline: '2026-03-20', status: 'In Progress' },
    { id: 4, name: 'Facebook/IG Stories',       channel: 'Social', format: 'MP4 9:16',       deadline: '2026-03-20', status: 'Pending' },
    { id: 5, name: 'Twitter/X Banner',          channel: 'Social', format: 'JPG 1500×500',   deadline: '2026-03-21', status: 'Pending' },
    { id: 6, name: 'Email Header',              channel: 'Digital','format': 'HTML 600px',   deadline: '2026-03-19', status: 'In Progress' },
    { id: 7, name: 'MyTelkom App Banner',       channel: 'Digital','format': 'JPG 750×350',  deadline: '2026-03-19', status: 'Pending' },
    { id: 8, name: 'In-Store A2 Poster',        channel: 'Retail', format: 'CMYK PDF',       deadline: '2026-03-15', status: 'Complete' },
  ],
  aiPulseCheck: {
    score: 87,
    grade: 'B+',
    flags: [
      {
        severity: 'warning',
        title: 'Pricing Mandate Missing',
        detail: 'Brief references "competitive pricing" but no "from" price point specified. Required by Brand Guardian rule BG-07.',
      },
      {
        severity: 'info',
        title: 'Audience Overlap Risk',
        detail: 'Target audience (LSM 8–10, 25–45) overlaps with TLK-2026-0039 Business Fibre campaign. Consider differentiating messaging.',
      },
      {
        severity: 'success',
        title: 'Brand Compliance Strong',
        detail: 'All mandatory elements present: Telkom T logo, Samsung lockup, tagline, and legal disclaimer referenced.',
      },
    ],
    recommendation: 'Brief is well-structured and ready for creative briefing. Resolve pricing specification before artwork commences to avoid Brand Guardian gate failure.',
  },
}

// ─── VERSION HISTORY (March Broadsheet) ────────
export interface Version {
  id: string
  version: string
  date: string
  author: string
  role: string
  note: string
  status: 'Current' | 'Approved' | 'Reverted' | 'Rejected' | 'Flagged'
  changeType: 'Major' | 'Minor' | 'Patch'
}

export const versionHistory: Version[] = [
  { id: 'v1', version: 'v1.0', date: '2026-02-18', author: 'Lerato Dlamini', role: 'Account Manager', note: 'Initial brief and artwork submission', status: 'Approved', changeType: 'Major' },
  { id: 'v2', version: 'v1.1', date: '2026-02-20', author: 'James Ferreira', role: 'Creative Director', note: 'Hero image updated per client preference', status: 'Approved', changeType: 'Minor' },
  { id: 'v3', version: 'v2.0', date: '2026-02-22', author: 'Sipho Nkosi', role: 'DTP Operator', note: 'Full layout revision — new grid system applied', status: 'Approved', changeType: 'Major' },
  { id: 'v4', version: 'v3.0', date: '2026-02-25', author: 'Nomsa Vilakazi', role: 'Strategist', note: 'Pricing updated, offer extended to R399/month', status: 'Flagged', changeType: 'Major' },
  { id: 'v5', version: 'v3.1', date: '2026-02-26', author: 'Tshepo Mokoena', role: 'Traffic Manager', note: 'Minor copy corrections to T&Cs', status: 'Approved', changeType: 'Patch' },
  { id: 'v6', version: 'v3.2', date: '2026-02-28', author: 'James Ferreira', role: 'Creative Director', note: 'Brand Guardian correction — logo size adjusted to minimum spec', status: 'Reverted', changeType: 'Minor' },
  { id: 'v7', version: 'v3.3', date: '2026-03-01', author: 'Lerato Dlamini', role: 'Account Manager', note: 'Reverted to v3.0 — client approved previous price point', status: 'Approved', changeType: 'Patch' },
  { id: 'v8', version: 'v4.0', date: '2026-03-04', author: 'Sipho Nkosi', role: 'DTP Operator', note: 'Final pre-press checks, colour corrections applied', status: 'Approved', changeType: 'Major' },
  { id: 'v9', version: 'v4.1', date: '2026-03-06', author: 'Amahle Zulu', role: 'Traffic Manager', note: 'CURRENT — approved for print and distribution', status: 'Current', changeType: 'Patch' },
]

export const adjudicationResult = {
  comparing: 'v3.0 vs v3.2',
  recommendation: 'Revert to v3.0',
  confidence: 94,
  reasoning: 'v3.2 logo size adjustment reduced Telkom T to 28mm on A1 format, falling below the Brand Guardian minimum of 32mm. The v3.0 logo at 35mm meets all specifications. Additionally, v3.0 price point (R399/month) is client-approved, while v3.2 introduced an unapproved R349/month. Recommend reverting and resubmitting v3.2 changes separately through Brand Guardian gate.',
  v30Flags: ['Logo: 35mm ✓', 'Price: R399/month ✓', 'Legal font: 9pt ✓', 'Tagline present ✓'],
  v32Flags: ['Logo: 28mm ✗ (min 32mm)', 'Price: R349/month ✗ (unapproved)', 'Legal font: 9pt ✓', 'Tagline present ✓'],
}

// ─── CIRCULATION CHART DATA ────────────────────
const weeks = ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12']
const months = ['Oct','Nov','Dec','Jan','Feb','Mar']

export const circulationData = {
  velocityTrend: weeks.map((week, i) => ({
    week,
    days: [17.2, 16.8, 15.9, 16.1, 15.3, 14.8, 15.0, 14.5, 14.2, 13.9, 14.1, 14.2][i],
    target: 15,
  })),
  revertRate: months.map((month, i) => ({
    month,
    rate: [12, 9, 14, 8, 7, 6][i],
  })),
  bgPassRate: weeks.map((week, i) => ({
    week,
    rate: [82, 84, 86, 85, 87, 88, 89, 90, 88, 91, 90, 91][i],
    target: 90,
  })),
  onTimeDelivery: weeks.map((week, i) => ({
    week,
    rate: [80, 82, 83, 81, 84, 85, 86, 87, 86, 88, 88, 88][i],
    target: 85,
  })),
  dtpCorrections: months.map((month, i) => ({
    month,
    count: [28, 22, 31, 19, 16, 14][i],
  })),
  tierDistributionTrend: months.map((month, i) => ({
    month,
    Platinum: [2, 2, 3, 3, 3, 3][i],
    Gold:     [3, 3, 3, 3, 3, 3][i],
    Silver:   [3, 4, 3, 3, 3, 2][i],
    Bronze:   [4, 3, 3, 3, 2, 2][i],
  })),
  phaseDwellTime: [
    { phase: 'Rollout',          days: 2.1 },
    { phase: 'Distribution',     days: 3.8 },
    { phase: 'Version Control',  days: 4.2 },
    { phase: 'Creative',         days: 5.9 },
    { phase: 'Brief QA',         days: 1.4 },
  ],
  revertReasons: [
    { name: 'Brand Compliance',   value: 34, color: '#003B73' },
    { name: 'Copy Error',         value: 28, color: '#0077C8' },
    { name: 'Pricing Change',     value: 18, color: '#00B140' },
    { name: 'Image Quality',      value: 12, color: '#4A4A4A' },
    { name: 'Other',              value: 8,  color: '#E0E4E8' },
  ],
  briefQualityScore: weeks.map((week, i) => ({
    week,
    score: [71, 73, 75, 74, 76, 78, 79, 81, 82, 84, 85, 87][i],
  })),
  avgRevisions: months.map((month, i) => ({
    month,
    revisions: [3.8, 3.4, 4.1, 3.2, 2.9, 2.7][i],
  })),
  resourceUtilisation: weeks.map((week, i) => ({
    week,
    utilisation: [78, 82, 91, 88, 85, 87, 90, 86, 84, 83, 85, 82][i],
    capacity: 100,
  })),
  gatePassFail: [
    { gate: 'Brief QA',     pass: 94, fail: 6 },
    { gate: 'Creative',     pass: 88, fail: 12 },
    { gate: 'Version',      pass: 91, fail: 9 },
    { gate: 'Distribution', pass: 96, fail: 4 },
    { gate: 'Rollout',      pass: 98, fail: 2 },
  ],
  campaignHealth: [
    { metric: 'Velocity',    score: 82 },
    { metric: 'Quality',     score: 87 },
    { metric: 'Compliance',  score: 91 },
    { metric: 'Delivery',    score: 88 },
    { metric: 'Efficiency',  score: 84 },
    { metric: 'Team Load',   score: 76 },
  ],
}

// ─── QA GATES ──────────────────────────────────
export const qaGates = [
  { id: 'brief-qa',    name: 'Brief QA',          passCount: 47, failCount: 3,  avgHours: 1.2, icon: 'FileCheck' },
  { id: 'creative',    name: 'Creative Review',    passCount: 44, failCount: 6,  avgHours: 3.8, icon: 'Palette' },
  { id: 'version',     name: 'Version Control',    passCount: 45, failCount: 5,  avgHours: 2.1, icon: 'GitBranch' },
  { id: 'distribution',name: 'Distribution Check', passCount: 48, failCount: 2,  avgHours: 1.5, icon: 'Share2' },
  { id: 'rollout',     name: 'Rollout Sign-Off',   passCount: 49, failCount: 1,  avgHours: 0.8, icon: 'Rocket' },
]

export const qaMatrix: Record<string, Record<string, GateStatus>> = {
  'TLK-2026-0042': { 'brief-qa': 'pass', 'creative': 'in-progress', 'version': 'pending',     'distribution': 'pending',     'rollout': 'pending' },
  'TLK-2026-0039': { 'brief-qa': 'pass', 'creative': 'pass',        'version': 'pass',         'distribution': 'in-progress', 'rollout': 'pending' },
  'TLK-2026-0038': { 'brief-qa': 'in-progress','creative': 'pending','version': 'pending',     'distribution': 'pending',     'rollout': 'pending' },
  'TLK-2026-0036': { 'brief-qa': 'pass', 'creative': 'pass',        'version': 'fail',         'distribution': 'pending',     'rollout': 'pending' },
  'TLK-2026-0035': { 'brief-qa': 'pass', 'creative': 'pass',        'version': 'pass',         'distribution': 'pass',        'rollout': 'in-progress' },
  'TLK-2026-0034': { 'brief-qa': 'pass', 'creative': 'in-progress', 'version': 'pending',     'distribution': 'pending',     'rollout': 'pending' },
  'TLK-2026-0032': { 'brief-qa': 'in-progress','creative': 'pending','version': 'pending',     'distribution': 'pending',     'rollout': 'pending' },
  'TLK-2026-0031': { 'brief-qa': 'pass', 'creative': 'pass',        'version': 'pass',         'distribution': 'fail',        'rollout': 'pending' },
  'TLK-2026-0029': { 'brief-qa': 'pass', 'creative': 'in-progress', 'version': 'pending',     'distribution': 'pending',     'rollout': 'pending' },
  'TLK-2026-0027': { 'brief-qa': 'pass', 'creative': 'pass',        'version': 'in-progress', 'distribution': 'pending',     'rollout': 'pending' },
}

export const brandGuardianScan = {
  campaign: 'TLK-2026-0042',
  scannedAt: '2026-03-10 09:14',
  overallStatus: 'Warning',
  checks: [
    { rule: 'BG-01', name: 'Telkom T Logo Minimum Size',  status: 'pass',    detail: 'Logo at 38mm on A1 — above 32mm minimum' },
    { rule: 'BG-02', name: 'Primary Colour Accuracy',      status: 'pass',    detail: '#003B73 and #00B140 verified within tolerance' },
    { rule: 'BG-03', name: 'Typography — Telkom123 Only',  status: 'pass',    detail: 'All text using approved Telkom123 family' },
    { rule: 'BG-04', name: 'Tagline Present',              status: 'pass',    detail: '"Possible Begins Here" present on master artwork' },
    { rule: 'BG-05', name: 'Legal Disclaimer Font Size',   status: 'pass',    detail: 'Disclaimer at 9pt — above 8pt minimum' },
    { rule: 'BG-06', name: 'Safe Zone Compliance',         status: 'pass',    detail: 'All elements within defined safe zones' },
    { rule: 'BG-07', name: 'Pricing "From" Value Present', status: 'warning', detail: 'Price referenced as "competitive" — specific "from" value required' },
    { rule: 'BG-08', name: 'Samsung Partnership Lockup',   status: 'pass',    detail: 'Co-branding lockup present with correct proportions' },
  ],
}

// ─── TEAM MEMBERS ──────────────────────────────
export interface TeamMember {
  id: string
  name: string
  role: string
  department: 'Creative' | 'Strategy' | 'Production' | 'Account'
  capacity: { w1: number; w2: number; w3: number; w4: number }
  avatar: string
}

export const teamMembers: TeamMember[] = [
  { id: 't1', name: 'James Ferreira',   role: 'Creative Director',  department: 'Creative',    capacity: { w1: 95, w2: 88, w3: 75, w4: 60 }, avatar: 'JF' },
  { id: 't2', name: 'Zanele Khumalo',   role: 'Senior Art Director', department: 'Creative',   capacity: { w1: 110, w2: 90, w3: 85, w4: 70 }, avatar: 'ZK' },
  { id: 't3', name: 'Deon van Rooyen',  role: 'Copywriter',          department: 'Creative',   capacity: { w1: 80, w2: 95, w3: 100, w4: 75 }, avatar: 'DV' },
  { id: 't4', name: 'Nomsa Vilakazi',   role: 'Brand Strategist',    department: 'Strategy',   capacity: { w1: 70, w2: 75, w3: 80, w4: 65 }, avatar: 'NV' },
  { id: 't5', name: 'Ruan Jacobs',      role: 'Strategist',          department: 'Strategy',   capacity: { w1: 85, w2: 80, w3: 70, w4: 90 }, avatar: 'RJ' },
  { id: 't6', name: 'Sipho Nkosi',      role: 'DTP Operator',        department: 'Production', capacity: { w1: 120, w2: 110, w3: 95, w4: 85 }, avatar: 'SN' },
  { id: 't7', name: 'Priya Naidoo',     role: 'DTP Operator',        department: 'Production', capacity: { w1: 100, w2: 95, w3: 90, w4: 80 }, avatar: 'PN' },
  { id: 't8', name: 'Tshepo Mokoena',   role: 'Traffic Manager',     department: 'Production', capacity: { w1: 75, w2: 70, w3: 80, w4: 65 }, avatar: 'TM' },
  { id: 't9', name: 'Lerato Dlamini',   role: 'Account Manager',     department: 'Account',    capacity: { w1: 90, w2: 85, w3: 75, w4: 70 }, avatar: 'LD' },
  { id: 't10',name: 'Amahle Zulu',      role: 'Account Executive',   department: 'Account',    capacity: { w1: 80, w2: 75, w3: 85, w4: 70 }, avatar: 'AZ' },
  { id: 't11',name: 'Kyle Hendricks',   role: 'Project Manager',     department: 'Account',    capacity: { w1: 65, w2: 70, w3: 60, w4: 55 }, avatar: 'KH' },
]

// ─── BOX FILES ─────────────────────────────────
export type ApprovalStatus = 'Approved' | 'Pending Review' | 'Rejected' | 'Draft'

export interface BoxFile {
  id: string
  name: string
  type: 'pdf' | 'jpg' | 'ai' | 'indd' | 'mp4' | 'docx' | 'xlsx' | 'zip'
  size: string
  version: string
  status: ApprovalStatus
  modified: string
  modifiedBy: string
  path: string[]
}

export const boxFiles: BoxFile[] = [
  { id: 'f1',  name: 'S26_Hero_OOH_48Sheet_v4.pdf',    type: 'pdf',  size: '24.8 MB', version: 'v4', status: 'Approved',       modified: '2026-03-08 14:22', modifiedBy: 'Sipho Nkosi',    path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f2',  name: 'S26_Mall_Banner_6m_v3.pdf',       type: 'pdf',  size: '31.2 MB', version: 'v3', status: 'Pending Review',  modified: '2026-03-09 10:45', modifiedBy: 'Priya Naidoo',   path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f3',  name: 'S26_FB_IG_Static_1080_v2.jpg',    type: 'jpg',  size: '4.1 MB',  version: 'v2', status: 'Approved',       modified: '2026-03-07 16:30', modifiedBy: 'Zanele Khumalo', path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f4',  name: 'S26_Stories_MP4_v1.mp4',          type: 'mp4',  size: '88.4 MB', version: 'v1', status: 'Draft',          modified: '2026-03-09 09:00', modifiedBy: 'Deon van Rooyen',path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f5',  name: 'S26_Twitter_Banner_v2.jpg',        type: 'jpg',  size: '2.8 MB',  version: 'v2', status: 'Pending Review', modified: '2026-03-08 11:15', modifiedBy: 'Zanele Khumalo', path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f6',  name: 'S26_Email_Header_v3.pdf',         type: 'pdf',  size: '1.2 MB',  version: 'v3', status: 'Approved',       modified: '2026-03-08 15:00', modifiedBy: 'Priya Naidoo',   path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f7',  name: 'S26_MyTelkom_Banner_v1.jpg',      type: 'jpg',  size: '0.9 MB',  version: 'v1', status: 'Draft',          modified: '2026-03-09 08:30', modifiedBy: 'Sipho Nkosi',    path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f8',  name: 'S26_InStore_A2_v5.pdf',           type: 'pdf',  size: '18.6 MB', version: 'v5', status: 'Approved',       modified: '2026-03-05 12:00', modifiedBy: 'Sipho Nkosi',    path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f9',  name: 'S26_MasterArtwork.ai',            type: 'ai',   size: '142.0 MB','version': 'v4',status: 'Approved',      modified: '2026-03-07 17:45', modifiedBy: 'James Ferreira', path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f10', name: 'S26_BriefFinal_v2.docx',          type: 'docx', size: '0.4 MB',  version: 'v2', status: 'Approved',       modified: '2026-03-07 09:00', modifiedBy: 'Lerato Dlamini', path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f11', name: 'S26_MediaSchedule.xlsx',          type: 'xlsx', size: '0.2 MB',  version: 'v1', status: 'Approved',       modified: '2026-03-06 14:00', modifiedBy: 'Kyle Hendricks', path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
  { id: 'f12', name: 'S26_AllAssets_v4.zip',            type: 'zip',  size: '380.0 MB','version': 'v4',status: 'Pending Review', modified: '2026-03-09 11:30', modifiedBy: 'Tshepo Mokoena', path: ['Telkom', 'Campaign Files', 'Samsung S26 Ultra'] },
]

// ─── DISCOVER BRIEFS ─────────────────────────
export type BriefStatus = 'New' | 'In Review' | 'Approved' | 'Returned'
export type BriefPriority = 'High' | 'Medium' | 'Low'

export interface DiscoverBrief {
  id: string
  title: string
  client: string
  description: string
  tier: Tier
  status: BriefStatus
  submittedDate: string
  submittedBy: string
  category: string
  priority: BriefPriority
}

export const discoverBriefs: DiscoverBrief[] = [
  {
    id: 'TLK-2026-0042',
    title: 'Samsung Galaxy S26 Ultra Launch',
    client: 'Samsung / Telkom Mobile',
    description: 'Full-funnel launch campaign for Samsung S26 Ultra across OOH, social, digital & retail channels within the Telkom ecosystem.',
    tier: 'Platinum',
    status: 'In Review',
    submittedDate: '2026-03-01',
    submittedBy: 'Lerato Dlamini',
    category: 'Multi-Channel',
    priority: 'High',
  },
  {
    id: 'TLK-2026-0043',
    title: 'FreeMe Unlimited Summer Push',
    client: 'Telkom Mobile',
    description: 'Summer promotional campaign for FreeMe Unlimited data bundles targeting youth and young professionals.',
    tier: 'Platinum',
    status: 'Approved',
    submittedDate: '2026-02-28',
    submittedBy: 'Amahle Zulu',
    category: 'Digital',
    priority: 'High',
  },
  {
    id: 'TLK-2026-0044',
    title: 'Fibre to Home Q2 Rollout',
    client: 'Telkom Consumer',
    description: 'Awareness campaign for new fibre coverage areas in Gauteng and Western Cape, promoting speed tiers and installation offers.',
    tier: 'Gold',
    status: 'New',
    submittedDate: '2026-03-08',
    submittedBy: 'Sipho Nkosi',
    category: 'Print & Digital',
    priority: 'Medium',
  },
  {
    id: 'TLK-2026-0045',
    title: 'LTE Home Connect Autumn',
    client: 'Telkom Consumer',
    description: 'LTE fixed wireless broadband campaign for areas without fibre coverage. Focus on affordability and ease of setup.',
    tier: 'Gold',
    status: 'In Review',
    submittedDate: '2026-03-05',
    submittedBy: 'Tshepo Mokoena',
    category: 'Digital',
    priority: 'Medium',
  },
  {
    id: 'TLK-2026-0046',
    title: 'OpenServe B2B Enterprise',
    client: 'OpenServe',
    description: 'B2B thought leadership and demand generation for OpenServe enterprise connectivity solutions targeting CIOs and IT decision-makers.',
    tier: 'Platinum',
    status: 'New',
    submittedDate: '2026-03-09',
    submittedBy: 'Kyle Hendricks',
    category: 'Digital & Events',
    priority: 'High',
  },
  {
    id: 'TLK-2026-0047',
    title: 'Youth Connect Festival Sponsorship',
    client: 'Telkom Mobile',
    description: 'Brand activation and social campaign around Youth Connect Festival sponsorship. Includes live content, influencer partnerships, and on-ground activations.',
    tier: 'Gold',
    status: 'Approved',
    submittedDate: '2026-02-25',
    submittedBy: 'Amahle Zulu',
    category: 'Social & Events',
    priority: 'Medium',
  },
  {
    id: 'TLK-2026-0048',
    title: 'BCX Cloud Migration Campaign',
    client: 'BCX',
    description: 'Enterprise cloud migration awareness campaign targeting mid-to-large businesses currently on legacy infrastructure.',
    tier: 'Silver',
    status: 'New',
    submittedDate: '2026-03-10',
    submittedBy: 'Ruan Jacobs',
    category: 'Digital',
    priority: 'Low',
  },
  {
    id: 'TLK-2026-0049',
    title: 'SME Starter Pack Spring',
    client: 'Telkom Business',
    description: 'Bundled connectivity offer for small businesses: voice, data, and LTE backup in one simple package.',
    tier: 'Silver',
    status: 'Returned',
    submittedDate: '2026-03-02',
    submittedBy: 'Sipho Nkosi',
    category: 'Print & Digital',
    priority: 'Medium',
  },
  {
    id: 'TLK-2026-0050',
    title: 'Executive Lifestyle Bundle',
    client: 'Telkom Business',
    description: 'Premium connectivity bundle targeting C-suite executives. Includes dedicated fibre, mobile, and concierge support.',
    tier: 'Bronze',
    status: 'In Review',
    submittedDate: '2026-03-06',
    submittedBy: 'Lerato Dlamini',
    category: 'Digital',
    priority: 'Low',
  },
  {
    id: 'TLK-2026-0051',
    title: 'March Monthly Broadsheet',
    client: 'Telkom Consumer',
    description: 'Monthly promotional broadsheet for in-store and direct mail distribution. Features current deals across all product lines.',
    tier: 'Gold',
    status: 'Approved',
    submittedDate: '2026-02-20',
    submittedBy: 'Tshepo Mokoena',
    category: 'Print',
    priority: 'High',
  },
  {
    id: 'TLK-2026-0052',
    title: 'Seasonal Data Deals Winter',
    client: 'Telkom Mobile',
    description: 'Limited-time data deal promotions for the winter season. Social-first campaign with influencer amplification.',
    tier: 'Bronze',
    status: 'New',
    submittedDate: '2026-03-11',
    submittedBy: 'Amahle Zulu',
    category: 'Social',
    priority: 'Medium',
  },
  {
    id: 'TLK-2026-0053',
    title: 'Telkom ONE Streaming Launch',
    client: 'Telkom Consumer',
    description: 'Launch campaign for Telkom ONE streaming service bundled with fibre packages. Cross-platform awareness and sign-up drive.',
    tier: 'Platinum',
    status: 'New',
    submittedDate: '2026-03-11',
    submittedBy: 'Nomsa Vilakazi',
    category: 'Multi-Channel',
    priority: 'High',
  },
]

export const folderTree = [
  {
    name: 'Telkom',
    children: [
      {
        name: 'Campaign Files',
        children: [
          { name: 'Samsung S26 Ultra', children: [] },
          { name: 'FreeMe Unlimited',  children: [] },
          { name: 'March Broadsheet',  children: [] },
        ],
      },
      { name: 'Brand Assets', children: [] },
      { name: 'Templates',    children: [] },
    ],
  },
]
