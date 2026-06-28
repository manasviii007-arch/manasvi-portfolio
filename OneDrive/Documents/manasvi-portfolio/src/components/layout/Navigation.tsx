'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      // Track active section
      const sections = navLinks.map(l => l.href.slice(1))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className={`container-custom flex items-center justify-between transition-all duration-500`}>
          {/* Logo */}
          <motion.a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-2.5 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg border border-accent/30 bg-accent-light flex items-center justify-center group-hover:border-accent/60 transition-colors duration-300">
              <span className="text-accent font-bold text-sm">M</span>
            </div>
            <span className="text-sm font-semibold text-text-primary hidden sm:block">Manasvi Chugh</span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            <div className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500 ${
              scrolled ? 'glass border border-border' : ''
            }`}>
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                    activeSection === link.href.slice(1)
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-surface-3 rounded-full border border-border"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium rounded-full bg-accent text-white hover:bg-accent/90 transition-all duration-300 hover:shadow-glow-sm"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 rounded-lg glass border border-border flex items-center justify-center text-text-secondary cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 mx-4 rounded-2xl glass-strong border border-border p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-3 text-left text-sm font-medium text-text-secondary hover:text-text-primary rounded-xl hover:bg-surface-3 transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-border mt-2 pt-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="block w-full px-4 py-3 text-center text-sm font-medium rounded-xl bg-accent text-white hover:bg-accent/90 transition-all duration-200"
                >
                  Download Resume
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
