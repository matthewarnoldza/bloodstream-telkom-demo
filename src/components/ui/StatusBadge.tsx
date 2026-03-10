interface StatusBadgeProps {
  label: string
  variant?: 'tier' | 'status' | 'gate' | 'phase' | 'file' | 'change'
  size?: 'sm' | 'md'
}

const TIER_COLORS: Record<string, string> = {
  Platinum: 'bg-purple-100 text-purple-800 border border-purple-200',
  Gold:     'bg-amber-100 text-amber-800 border border-amber-200',
  Silver:   'bg-gray-100 text-gray-700 border border-gray-200',
  Bronze:   'bg-orange-100 text-orange-800 border border-orange-200',
}

const STATUS_COLORS: Record<string, string> = {
  'On Track':  'bg-green-100 text-green-800',
  'At Risk':   'bg-amber-100 text-amber-800',
  'Delayed':   'bg-red-100 text-red-800',
  'Complete':  'bg-blue-100 text-blue-800',
  'Current':   'bg-tk-blue2/10 text-tk-blue2 border border-tk-blue2/30',
  'Approved':  'bg-green-100 text-green-800',
  'Reverted':  'bg-orange-100 text-orange-800',
  'Rejected':  'bg-red-100 text-red-800',
  'Flagged':   'bg-amber-100 text-amber-800',
}

const GATE_COLORS: Record<string, string> = {
  'pass':        'bg-green-100 text-green-800',
  'fail':        'bg-red-100 text-red-800',
  'pending':     'bg-gray-100 text-gray-500',
  'in-progress': 'bg-blue-100 text-blue-800',
}

const FILE_COLORS: Record<string, string> = {
  'Approved':       'bg-green-100 text-green-800',
  'Pending Review': 'bg-amber-100 text-amber-800',
  'Rejected':       'bg-red-100 text-red-800',
  'Draft':          'bg-gray-100 text-gray-600',
}

const CHANGE_COLORS: Record<string, string> = {
  'Major': 'bg-tk-blue/10 text-tk-blue border border-tk-blue/20',
  'Minor': 'bg-tk-blue2/10 text-tk-blue2',
  'Patch': 'bg-gray-100 text-gray-600',
}

export function StatusBadge({ label, variant = 'status', size = 'sm' }: StatusBadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'

  let colorClass = 'bg-gray-100 text-gray-600'
  if (variant === 'tier')   colorClass = TIER_COLORS[label]   || colorClass
  if (variant === 'status') colorClass = STATUS_COLORS[label]  || colorClass
  if (variant === 'gate')   colorClass = GATE_COLORS[label]    || colorClass
  if (variant === 'file')   colorClass = FILE_COLORS[label]    || colorClass
  if (variant === 'change') colorClass = CHANGE_COLORS[label]  || colorClass
  if (variant === 'phase')  colorClass = 'bg-tk-blue2/10 text-tk-blue2'

  const gateLabels: Record<string, string> = {
    'pass': '✓ Pass',
    'fail': '✗ Fail',
    'pending': '— Pending',
    'in-progress': '● Active',
  }
  const displayLabel = variant === 'gate' ? (gateLabels[label] || label) : label

  return (
    <span className={`inline-flex items-center rounded-full font-semibold whitespace-nowrap ${sizeClass} ${colorClass}`}>
      {displayLabel}
    </span>
  )
}
