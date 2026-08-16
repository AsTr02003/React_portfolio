import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // A stray package-lock.json in the home directory makes Next guess the wrong
  // workspace root; pin it to this project.
  outputFileTracingRoot: path.join(import.meta.dirname, '.'),
}

export default nextConfig
