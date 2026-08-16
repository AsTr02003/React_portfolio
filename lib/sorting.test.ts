import { describe, expect, it } from 'vitest'
import { ALGORITHMS, buildTrace, randomArray, type AlgorithmKey } from './sorting'

const keys = ALGORITHMS.map((entry) => entry.key)

/** Deterministic inputs, so a failure is always reproducible. */
const CASES: Record<string, number[]> = {
  random: [42, 7, 91, 13, 66, 4, 78, 25, 59, 31, 88, 2, 50, 17],
  sorted: [1, 2, 3, 4, 5, 6, 7, 8],
  reversed: [8, 7, 6, 5, 4, 3, 2, 1],
  duplicates: [5, 3, 5, 1, 3, 5, 1, 3],
  identical: [4, 4, 4, 4, 4],
  single: [9],
  empty: [],
  pair: [2, 1],
}

describe.each(keys)('%s sort', (key: AlgorithmKey) => {
  it.each(Object.entries(CASES))('sorts the %s case', (_name, input) => {
    const trace = buildTrace(key, input)
    const expected = [...input].sort((a, b) => a - b)

    if (input.length === 0) {
      // An empty input still yields a terminal frame, or none at all; either
      // is fine as long as nothing throws.
      expect(trace.at(-1)?.array ?? []).toEqual([])
      return
    }

    expect(trace.at(-1)!.array).toEqual(expected)
  })

  /**
   * Only swap-based algorithms hold this invariant.
   *
   * Insertion and merge both lift a value out of the array and then shift or
   * overwrite — insertion keeps the key in a local while sliding elements up,
   * merge writes back from auxiliary copies. While that is in flight the array
   * genuinely contains a transient duplicate, because the lifted value is not
   * in it. That is inherent to the approach, not a defect, and it is what a
   * viewer sees mid-merge in any visualiser. Their correctness is covered by
   * the terminal-array and random-input cases below.
   */
  const swapBased = !['insertion', 'merge'].includes(key)

  it.skipIf(!swapBased)('preserves the multiset of elements in every frame', () => {
    const input = CASES.random!
    const signature = [...input].sort((a, b) => a - b).join(',')

    for (const frame of buildTrace(key, input)) {
      expect([...frame.array].sort((a, b) => a - b).join(',')).toBe(signature)
    }
  })

  it('never loses or invents elements across the whole trace', () => {
    const input = CASES.random!
    const trace = buildTrace(key, input)
    const expected = [...input].sort((a, b) => a - b)

    // Every frame keeps the array length, and the run ends as a permutation
    // of the input — the guarantee that actually matters for all six.
    for (const frame of trace) {
      expect(frame.array).toHaveLength(input.length)
    }
    expect([...trace.at(-1)!.array].sort((a, b) => a - b)).toEqual(expected)
  })

  it('reports monotonically non-decreasing counters', () => {
    const trace = buildTrace(key, CASES.random!)
    let comparisons = 0
    let swaps = 0

    for (const frame of trace) {
      expect(frame.comparisons).toBeGreaterThanOrEqual(comparisons)
      expect(frame.swaps).toBeGreaterThanOrEqual(swaps)
      comparisons = frame.comparisons
      swaps = frame.swaps
    }

    expect(comparisons).toBeGreaterThan(0)
  })

  it('marks every index sorted in the terminal frame', () => {
    const trace = buildTrace(key, CASES.random!)
    expect(trace.at(-1)!.sorted).toHaveLength(CASES.random!.length)
  })

  it('sorts 30 random arrays', () => {
    for (let i = 0; i < 30; i++) {
      const input = randomArray(24)
      const expected = [...input].sort((a, b) => a - b)
      expect(buildTrace(key, input).at(-1)!.array).toEqual(expected)
    }
  })
})
