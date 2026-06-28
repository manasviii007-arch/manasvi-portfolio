'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Github, Twitter, ArrowUpRight, Download } from 'lucide-react'

const links = [
  {
    label: 'Email',
    value: 'manasviii007@google.com',
    href: 'mailto:manasviii007@google.com',
    icon: Mail,
    color: '#7c6af7',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/manasvi-chugh-5b0729364',
    href: 'https://www.linkedin.com/in/manasvi-chugh-5b0729364',
    icon: Linkedin,
    color: '#0077B5',
  },
  {
    label: 'GitHub',
    value: 'github.com/manasviii007-arch',
    href: 'https://github.com/manasviii007-arch',
    icon: Github,
    color: '#a78bfa',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="section-spacing">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-accent/60" />
          <span className="text-xs font-semibold text-accent tracking-widest uppercase">Contact</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-8 md:p-14 rounded-3xl overflow-hidden text-center"
          style={{ background: 'rgba(124,106,247,0.04)', border: '1px solid rgba(124,106,247,0.12)' }}
        >
          {/* Background orbs */}
          <div className="absolute -top-20 left-1/4 w-80 h-80 rounded-full opacity-[0.06] blur-3xl"
            style={{ background: '#7c6af7' }}
          />
          <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full opacity-[0.04] blur-3xl"
            style={{ background: '#a78bfa' }}
          />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Let&apos;s build something{' '}
              <span className="gradient-text">together</span>
            </h2>

            <p className="text-text-secondary text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              I&apos;m actively looking for internships in Product Management, AI Engineering, Founders&apos; Office, and Growth roles.
              If you&apos;re building something ambitious, I&apos;d love to talk.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="mailto:manasviii007@google.com"
                className="magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
              >
                <Mail size={16} />
                Get in Touch
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                className="magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-border text-text-secondary font-medium hover:text-text-primary hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {links.map(({ label, value, href, icon: Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3 rounded-xl glass border border-border hover:border-accent/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-text-muted">{label}</div>
                    <div className="text-xs text-text-secondary font-medium group-hover:text-text-primary transition-colors">{value}</div>
                  </div>
                  <ArrowUpRight size={12} className="text-text-muted group-hover:text-accent transition-colors ml-1" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
