'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BadgeCheck, ExternalLink } from 'lucide-react'

const certs = [
  {
    name: 'Anthropic AI Fluency Framework',
    issuer: 'Anthropic',
    description: 'Comprehensive certification covering responsible AI development, prompt engineering, and practical applications of large language models.',
    color: '#7c6af7',
    icon: '🤖',
  },
  {
    name: 'Data Analytics Job Simulation',
    issuer: 'Deloitte',
    description: 'Hands-on simulation covering data analysis workflows, business intelligence reporting, and deriving insights from complex datasets using industry tools.',
    color: '#86c7f3',
    icon: '📊',
  },
  {
    name: 'Sales Strategy Job Simulation',
    issuer: 'Red Bull',
    description: 'Practical simulation of consumer goods sales strategy, market positioning, and growth tactics in a high-velocity consumer brand environment.',
    color: '#fbbf24',
    icon: '⚡',
  },
]

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certifications" className="section-spacing">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-accent/60" />
          <span className="text-xs font-semibold text-accent tracking-widest uppercase">Certifications</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-14 leading-tight"
        >
          Always{' '}
          <span className="gradient-text">learning something</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl glass border border-border card-lift group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.03] blur-2xl"
                style={{ background: cert.color, transform: 'translate(10px, -10px)' }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}25` }}
                  >
                    {cert.icon}
                  </div>
                  <BadgeCheck size={16} className="text-accent opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <p
                  className="text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: cert.color }}
                >
                  {cert.issuer}
                </p>
                <h3 className="font-bold text-text-primary text-sm mb-3 leading-snug">{cert.name}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{cert.description}</p>

                <button className="mt-4 inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                  <ExternalLink size={10} />
                  View Certificate
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
