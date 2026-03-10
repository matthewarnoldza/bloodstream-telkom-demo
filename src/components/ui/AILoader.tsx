import { Loader2, CheckCircle2 } from 'lucide-react'

interface AILoaderProps {
  step: number
  steps?: string[]
}

const DEFAULT_STEPS = [
  'Reading brief parameters...',
  'Checking against brand guidelines...',
  'Generating recommendations...',
]

export function AILoader({ step, steps = DEFAULT_STEPS }: AILoaderProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-8 px-6">
      {/* Animated pulse ring */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 rounded-full bg-tk-green/10 animate-ping" />
        <div className="absolute w-14 h-14 rounded-full bg-tk-green/20 animate-pulse-slow" />
        <div className="w-10 h-10 rounded-full bg-tk-green/30 flex items-center justify-center">
          <Loader2 size={20} className="text-tk-green animate-spin" />
        </div>
      </div>

      {/* Step labels */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {steps.map((label, i) => (
          <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${i <= step ? 'opacity-100' : 'opacity-30'}`}>
            {i < step ? (
              <CheckCircle2 size={16} className="text-tk-green shrink-0" />
            ) : i === step ? (
              <Loader2 size={16} className="text-tk-blue2 animate-spin shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-tk-border shrink-0" />
            )}
            <span className={`text-sm ${i <= step ? 'text-tk-grey font-medium' : 'text-tk-grey/40'}`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs bg-tk-border rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-tk-blue2 to-tk-green rounded-full transition-all duration-700"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <p className="text-xs text-tk-grey/50 font-medium">AI analysis in progress</p>
    </div>
  )
}
