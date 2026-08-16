import { Github, Linkedin, Mail } from 'lucide-react'
import type { Social } from '@/lib/types'

const icons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const

export function SocialIcon({
  name,
  className,
}: {
  name: Social['icon']
  className?: string
}) {
  const Component = icons[name]
  return <Component className={className} aria-hidden="true" />
}
