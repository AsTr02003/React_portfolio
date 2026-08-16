'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Shuffle } from 'lucide-react'
import {
  ALGORITHMS,
  buildTrace,
  randomArray,
  type AlgorithmKey,
  type Frame,
} from '@/lib/sorting'

const SIZE = 34
const SPEEDS = [
  { label: '0.5×', stepMs: 120 },
  { label: '1×', stepMs: 55 },
  { label: '2×', stepMs: 22 },
  { label: '4×', stepMs: 8 },
]

export function SortingVisualizer() {
  // Generated on the client only. Math.random() during SSR would produce
  // different markup on the server and client and break hydration.
  const [input, setInput] = useState<number[] | null>(null)
  const [algorithm, setAlgorithm] = useState<AlgorithmKey>('quick')
  const [speedIndex, setSpeedIndex] = useState(1)
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => setInput(randomArray(SIZE)), [])

  // The whole trace is computed once per (algorithm, input) pair, then
  // replayed. Sorting 34 items is far cheaper than re-running it per frame.
  const trace = useMemo<Frame[]>(
    () => (input ? buildTrace(algorithm, input) : []),
    [algorithm, input],
  )

  const stepMs = SPEEDS[speedIndex]!.stepMs
  const finished = trace.length > 0 && step >= trace.length - 1
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!playing || trace.length === 0) return

    timer.current = window.setInterval(() => {
      setStep((current) => {
        if (current >= trace.length - 1) {
          setPlaying(false)
          return trace.length - 1
        }
        return current + 1
      })
    }, stepMs)

    return () => {
      if (timer.current !== null) window.clearInterval(timer.current)
    }
  }, [playing, stepMs, trace.length])

  const reset = useCallback(() => {
    setPlaying(false)
    setStep(0)
  }, [])

  const shuffle = useCallback(() => {
    setPlaying(false)
    setStep(0)
    setInput(randomArray(SIZE))
  }, [])

  const selectAlgorithm = useCallback((key: AlgorithmKey) => {
    setPlaying(false)
    setStep(0)
    setAlgorithm(key)
  }, [])

  const current = trace[Math.min(step, Math.max(trace.length - 1, 0))]
  const bars = current?.array ?? input ?? []
  const max = Math.max(...bars, 1)
  const meta = ALGORITHMS.find((entry) => entry.key === algorithm)!

  function barColor(index: number): string {
    if (!current) return 'var(--border-strong)'
    if (current.writing.includes(index)) return 'var(--accent)'
    if (current.comparing.includes(index)) return '#f59e0b'
    if (current.sorted.includes(index)) return '#10b981'
    return 'var(--border-strong)'
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-bg-card">
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
        <div
          role="group"
          aria-label="Algorithm"
          className="flex flex-wrap gap-1"
        >
          {ALGORITHMS.map((entry) => (
            <button
              key={entry.key}
              type="button"
              onClick={() => selectAlgorithm(entry.key)}
              aria-pressed={algorithm === entry.key}
              className={[
                'rounded-md px-2.5 py-1.5 font-mono text-xs transition-colors',
                algorithm === entry.key
                  ? 'bg-accent text-accent-fg'
                  : 'text-fg-muted hover:bg-bg-inset hover:text-fg',
              ].join(' ')}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => (finished ? (reset(), setPlaying(true)) : setPlaying((p) => !p))}
            disabled={trace.length === 0}
            aria-label={playing ? 'Pause' : 'Play'}
            className="grid size-8 place-items-center rounded-md bg-accent text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-40"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset"
            className="grid size-8 place-items-center rounded-md text-fg-muted transition-colors hover:bg-bg-inset hover:text-fg"
          >
            <RotateCcw className="size-4" />
          </button>
          <button
            type="button"
            onClick={shuffle}
            aria-label="Shuffle input"
            className="grid size-8 place-items-center rounded-md text-fg-muted transition-colors hover:bg-bg-inset hover:text-fg"
          >
            <Shuffle className="size-4" />
          </button>
        </div>
      </div>

      {/* Bars are decorative; the live region below carries the state. */}
      <div className="flex h-56 items-end gap-[3px] bg-bg-subtle px-3 pb-3 pt-6" aria-hidden="true">
        {bars.map((value, index) => (
          <div
            key={index}
            className="sort-bar flex-1 rounded-t-sm"
            style={{ height: `${(value / max) * 100}%`, backgroundColor: barColor(index) }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-3 py-2.5 font-mono text-xs text-fg-subtle">
        <span className="text-fg-muted">{meta.complexity}</span>
        <span>
          comparisons <span className="tabular-nums text-fg">{current?.comparisons ?? 0}</span>
        </span>
        <span>
          swaps <span className="tabular-nums text-fg">{current?.swaps ?? 0}</span>
        </span>

        <div className="ml-auto flex items-center gap-1">
          {SPEEDS.map((speed, index) => (
            <button
              key={speed.label}
              type="button"
              onClick={() => setSpeedIndex(index)}
              aria-pressed={speedIndex === index}
              className={[
                'rounded px-1.5 py-0.5 transition-colors',
                speedIndex === index ? 'bg-bg-inset text-fg' : 'hover:text-fg',
              ].join(' ')}
            >
              {speed.label}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {meta.label} sort, {finished ? 'complete' : `step ${step + 1} of ${trace.length}`},{' '}
        {current?.comparisons ?? 0} comparisons and {current?.swaps ?? 0} swaps.
      </p>
    </div>
  )
}
