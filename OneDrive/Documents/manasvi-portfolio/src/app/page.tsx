'use client'

import LoadingScreen from '@/components/ui/LoadingScreen'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ScrollToTop from '@/components/ui/ScrollToTop'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Leadership from '@/components/sections/Leadership'
import Achievements from '@/components/sections/Achievements'
import Skills from '@/components/sections/Skills'
import Education from '@/components/sections/Education'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Leadership />
        <Achievements />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  )
}
