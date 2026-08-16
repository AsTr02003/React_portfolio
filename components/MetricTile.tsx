import { BentoCard } from './BentoCard'
import { Counter } from './Counter'
import { ProgressRing } from './ProgressRing'
import type { Metric } from '@/lib/types'

export function MetricTile({ metric }: { metric: Metric }) {
  return (
    <BentoCard className="flex flex-col justify-between gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <Counter
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          className="font-mono text-2xl font-semibold tracking-tight text-fg tabular-nums sm:text-3xl"
        />
        {metric.progress !== undefined && <ProgressRing value={metric.progress} />}
      </div>

      <div>
        <p className="text-sm font-medium leading-snug text-fg">{metric.label}</p>
        {metric.detail && (
          <p className="mt-1 text-xs leading-snug text-fg-subtle">{metric.detail}</p>
        )}
      </div>
    </BentoCard>
  )
}
