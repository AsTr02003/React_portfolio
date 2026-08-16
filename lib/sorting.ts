/**
 * Sorting algorithms as generators.
 *
 * Each yields a Frame per observable step and never touches the DOM. The
 * player replays the resulting trace, which is what lets speed, pause and
 * scrub be properties of the player rather than of the sort — and it means
 * these functions are directly unit-testable.
 *
 * Index assertions (`!`) are used inside the loops: tsconfig enables
 * noUncheckedIndexedAccess, and every access here is provably in range from
 * the surrounding loop bounds.
 */

export type Frame = {
  array: number[]
  /** Indices under comparison this step. */
  comparing: number[]
  /** Indices written this step. */
  writing: number[]
  /** Indices in their final position. */
  sorted: number[]
  comparisons: number
  swaps: number
}

export type AlgorithmKey = 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick' | 'heap'

export const ALGORITHMS: { key: AlgorithmKey; label: string; complexity: string }[] = [
  { key: 'bubble', label: 'Bubble', complexity: 'O(n²)' },
  { key: 'insertion', label: 'Insertion', complexity: 'O(n²)' },
  { key: 'selection', label: 'Selection', complexity: 'O(n²)' },
  { key: 'merge', label: 'Merge', complexity: 'O(n log n)' },
  { key: 'quick', label: 'Quick', complexity: 'O(n log n)' },
  { key: 'heap', label: 'Heap', complexity: 'O(n log n)' },
]

type State = { comparisons: number; swaps: number }

function frame(
  array: number[],
  state: State,
  comparing: number[] = [],
  writing: number[] = [],
  sorted: number[] = [],
): Frame {
  return {
    array: [...array],
    comparing,
    writing,
    sorted: [...sorted],
    comparisons: state.comparisons,
    swaps: state.swaps,
  }
}

const allIndices = (n: number) => Array.from({ length: n }, (_, i) => i)

function* bubble(input: number[]): Generator<Frame> {
  const a = [...input]
  const s: State = { comparisons: 0, swaps: 0 }
  const sorted: number[] = []

  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      s.comparisons++
      yield frame(a, s, [j, j + 1], [], sorted)

      if (a[j]! > a[j + 1]!) {
        ;[a[j], a[j + 1]] = [a[j + 1]!, a[j]!]
        s.swaps++
        yield frame(a, s, [], [j, j + 1], sorted)
      }
    }
    sorted.push(a.length - 1 - i)
  }

  yield frame(a, s, [], [], allIndices(a.length))
}

function* insertion(input: number[]): Generator<Frame> {
  const a = [...input]
  const s: State = { comparisons: 0, swaps: 0 }

  for (let i = 1; i < a.length; i++) {
    const value = a[i]!
    let j = i - 1

    while (j >= 0) {
      s.comparisons++
      yield frame(a, s, [j, i], [], allIndices(i))
      if (a[j]! <= value) break

      a[j + 1] = a[j]!
      s.swaps++
      yield frame(a, s, [], [j + 1], allIndices(i))
      j--
    }

    a[j + 1] = value
    yield frame(a, s, [], [j + 1], allIndices(i + 1))
  }

  yield frame(a, s, [], [], allIndices(a.length))
}

function* selection(input: number[]): Generator<Frame> {
  const a = [...input]
  const s: State = { comparisons: 0, swaps: 0 }
  const sorted: number[] = []

  for (let i = 0; i < a.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < a.length; j++) {
      s.comparisons++
      yield frame(a, s, [min, j], [], sorted)
      if (a[j]! < a[min]!) min = j
    }

    if (min !== i) {
      ;[a[i], a[min]] = [a[min]!, a[i]!]
      s.swaps++
      yield frame(a, s, [], [i, min], sorted)
    }
    sorted.push(i)
  }

  yield frame(a, s, [], [], allIndices(a.length))
}

function* merge(input: number[]): Generator<Frame> {
  const a = [...input]
  const s: State = { comparisons: 0, swaps: 0 }

  function* mergeRange(lo: number, mid: number, hi: number): Generator<Frame> {
    const left = a.slice(lo, mid + 1)
    const right = a.slice(mid + 1, hi + 1)
    let i = 0
    let j = 0
    let k = lo

    while (i < left.length && j < right.length) {
      s.comparisons++
      yield frame(a, s, [lo + i, mid + 1 + j])

      if (left[i]! <= right[j]!) {
        a[k] = left[i]!
        i++
      } else {
        a[k] = right[j]!
        j++
      }
      s.swaps++
      yield frame(a, s, [], [k])
      k++
    }

    while (i < left.length) {
      a[k] = left[i]!
      s.swaps++
      yield frame(a, s, [], [k])
      i++
      k++
    }

    while (j < right.length) {
      a[k] = right[j]!
      s.swaps++
      yield frame(a, s, [], [k])
      j++
      k++
    }
  }

  function* sortRange(lo: number, hi: number): Generator<Frame> {
    if (lo >= hi) return
    const mid = Math.floor((lo + hi) / 2)
    yield* sortRange(lo, mid)
    yield* sortRange(mid + 1, hi)
    yield* mergeRange(lo, mid, hi)
  }

  yield* sortRange(0, a.length - 1)
  yield frame(a, s, [], [], allIndices(a.length))
}

function* quick(input: number[]): Generator<Frame> {
  const a = [...input]
  const s: State = { comparisons: 0, swaps: 0 }
  const sorted: number[] = []

  function* partition(lo: number, hi: number): Generator<Frame, number> {
    const pivot = a[hi]!
    let i = lo - 1

    for (let j = lo; j < hi; j++) {
      s.comparisons++
      yield frame(a, s, [j, hi], [], sorted)

      if (a[j]! < pivot) {
        i++
        ;[a[i], a[j]] = [a[j]!, a[i]!]
        s.swaps++
        yield frame(a, s, [], [i, j], sorted)
      }
    }

    ;[a[i + 1], a[hi]] = [a[hi]!, a[i + 1]!]
    s.swaps++
    yield frame(a, s, [], [i + 1, hi], sorted)
    return i + 1
  }

  function* sortRange(lo: number, hi: number): Generator<Frame> {
    if (lo >= hi) {
      if (lo === hi) sorted.push(lo)
      return
    }
    const p = yield* partition(lo, hi)
    sorted.push(p)
    yield* sortRange(lo, p - 1)
    yield* sortRange(p + 1, hi)
  }

  yield* sortRange(0, a.length - 1)
  yield frame(a, s, [], [], allIndices(a.length))
}

function* heap(input: number[]): Generator<Frame> {
  const a = [...input]
  const s: State = { comparisons: 0, swaps: 0 }
  const sorted: number[] = []

  function* siftDown(root: number, end: number): Generator<Frame> {
    while (true) {
      const left = 2 * root + 1
      const right = left + 1
      let largest = root

      if (left < end) {
        s.comparisons++
        yield frame(a, s, [largest, left], [], sorted)
        if (a[left]! > a[largest]!) largest = left
      }

      if (right < end) {
        s.comparisons++
        yield frame(a, s, [largest, right], [], sorted)
        if (a[right]! > a[largest]!) largest = right
      }

      if (largest === root) return

      ;[a[root], a[largest]] = [a[largest]!, a[root]!]
      s.swaps++
      yield frame(a, s, [], [root, largest], sorted)
      root = largest
    }
  }

  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
    yield* siftDown(i, a.length)
  }

  for (let end = a.length - 1; end > 0; end--) {
    ;[a[0], a[end]] = [a[end]!, a[0]!]
    s.swaps++
    sorted.push(end)
    yield frame(a, s, [], [0, end], sorted)
    yield* siftDown(0, end)
  }

  yield frame(a, s, [], [], allIndices(a.length))
}

const GENERATORS: Record<AlgorithmKey, (input: number[]) => Generator<Frame>> = {
  bubble,
  insertion,
  selection,
  merge,
  quick,
  heap,
}

/** Runs an algorithm to completion and returns the full trace. */
export function buildTrace(key: AlgorithmKey, input: number[]): Frame[] {
  return Array.from(GENERATORS[key](input))
}

export function randomArray(size: number, max = 100): number[] {
  return Array.from({ length: size }, () => 8 + Math.floor(Math.random() * max))
}
