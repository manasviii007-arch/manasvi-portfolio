'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ArrowDown, Sparkles } from 'lucide-react'

const roles = [
  'Product Thinker',
  'AI Builder',
  'Future Founder',
  'Problem Solver',
  'Startup Minded',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedRole, setDisplayedRole] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentRole = roles[roleIndex]

    if (!isDeleting && charIndex <= currentRole.length) {
      const timeout = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, charIndex))
        setCharIndex(c => c + 1)
        if (charIndex === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800)
        }
      }, 60)
      return () => clearTimeout(timeout)
    } else if (isDeleting && charIndex >= 0) {
      const timeout = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, charIndex))
        setCharIndex(c => c - 1)
        if (charIndex === 0) {
          setIsDeleting(false)
          setRoleIndex(i => (i + 1) % roles.length)
        }
      }, 35)
      return () => clearTimeout(timeout)
    }
  }, [charIndex, isDeleting, roleIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="blob-1 absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #7c6af7 0%, transparent 70%)' }}
        />
        <div
          className="blob-2 absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
        />
        <div
          className="blob-3 absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #7c6af7 0%, transparent 70%)' }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10"
          style={{ background: 'radial-gradient(ellipse, #7c6af7 0%, transparent 70%)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom relative z-10 text-center"
      >
        {/* Status pill */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border text-xs font-medium text-text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            Open to Internships & Opportunities
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 leading-none">
          <span className="gradient-text-subtle">Manasvi</span>
          <br />
          <span className="text-text-primary">Chugh</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          variants={itemVariants}
          className="h-12 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-2xl font-medium text-accent">
            {displayedRole}
            <span className="typing-cursor ml-0.5 text-accent">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl mx-auto text-base md:text-lg text-text-secondary leading-relaxed mb-10"
        >
          B.Tech CS (AI & ML) + BS Management & Data Science at IIT Madras.{' '}
          Building at the intersection of technology and business.
        </motion.p>

        {/* Dual degree badge */}
        <motion.div variants={itemVariants} className="flex justify-center gap-3 mb-10 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border text-xs text-text-secondary">
            <Sparkles size={10} className="text-accent" />
            Delhi Technical Campus
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border text-xs text-text-secondary">
            <Sparkles size={10} className="text-accent" />
            IIT Madras
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            className="magnetic inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-glow-sm hover:-translate-y-0.5"
          >
            <Download size={14} />
            Download Resume
          </a>
          <a
            href="https://www.linkedin.com/in/manasvi-chugh-5b0729364"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            href="https://github.com/manasviii007-arch"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href="mailto:manasviii007@google.com"
            className="magnetic inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Mail size={14} />
            Email
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
