import { Nav } from '@/components/Nav'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Hero } from '@/components/Hero'
import { Work } from '@/components/Work'
import { Experience } from '@/components/Experience'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main" className="mx-auto max-w-5xl px-6">
        <Hero />
        {/*
          Work sits directly under the hero, ahead of experience and about.
          A reviewer skims for maybe fifteen seconds; what you have built
          should be the first thing they hit, not the last.
        */}
        <Work />
        <Experience />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
