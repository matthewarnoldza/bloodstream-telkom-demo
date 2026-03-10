import { useState, useCallback } from 'react'

export type AIState = 'idle' | 'loading' | 'done'

interface UseAISimulationReturn<T> {
  state: AIState
  trigger: () => void
  reset: () => void
  result: T | null
  step: number
}

export function useAISimulation<T>(
  mockResult: T,
  totalDuration = 2500,
): UseAISimulationReturn<T> {
  const [state, setState] = useState<AIState>('idle')
  const [result, setResult] = useState<T | null>(null)
  const [step, setStep] = useState(0)

  const trigger = useCallback(() => {
    if (state !== 'idle') return
    setState('loading')
    setStep(0)

    const stepInterval = totalDuration / 3
    const t1 = setTimeout(() => setStep(1), stepInterval)
    const t2 = setTimeout(() => setStep(2), stepInterval * 2)
    const t3 = setTimeout(() => {
      setResult(mockResult)
      setState('done')
    }, totalDuration)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [state, mockResult, totalDuration])

  const reset = useCallback(() => {
    setState('idle')
    setResult(null)
    setStep(0)
  }, [])

  return { state, trigger, reset, result, step }
}
