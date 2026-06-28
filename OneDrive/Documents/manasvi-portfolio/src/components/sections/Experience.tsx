'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Zap, Users, Code2, TrendingUp, Bot, Database, Network, Settings } from 'lucide-react'

const experiences = [
  {
    role: 'Agentic AI Intern',
    company: 'Octro Inc.',
    period: '2024',
    type: 'Internship',
    description:
      'Worked on cutting-edge AI infrastructure at one of India\'s largest gaming companies. Designed and implemented autonomous AI workflows, LLM-powered applications, and retrieval-augmented generation systems that optimized internal processes.',
    responsibilities: [
      { icon: Bot, text: 'AI Workflow Automation — Designed multi-step agentic pipelines for business process optimization' },
      { icon: Code2, text: 'LLM Applications — Built production-grade language model integrations and prompt engineering systems' },
      { icon: Database, text: 'RAG Systems — Implemented retrieval-augmented generation for enterprise knowledge management' },
      { icon: Network, text: 'MCP Concepts — Explored and applied Model Context Protocol patterns for AI orchestration' },
      { icon: Settings, text: 'AI Process Optimization — Identified and eliminated workflow bottlenecks using AI-driven solutions' },
    ],
    color: '#7c6af7',
    dot: '●',
  },
  {
    role: 'Founding Team Member',
    company: 'SERO',
    period: '2023 – Present',
    type: 'Startup',
    description:
      'Joined as a core founding team member at SERO, a startup tackling a critical market gap. Wore multiple hats across product, growth, and operations — the full founder experience at zero-to-one stage.',
    responsibilities: [
      { icon: TrendingUp, text: 'Product Strategy — Defined roadmap, feature prioritization, and go-to-market playbooks' },
      { icon: Users, text: 'User Research — Conducted 50+ user interviews to validate problems and shape product decisions' },
      { icon: Code2, text: 'Platform Development — Contributed to core product development and technical architecture decisions' },
      { icon: Zap, text: 'Growth — Owned growth experiments, channel testing, and acquisition funnel optimization' },
      { icon: Briefcase, text: 'Startup Operations — Managed cross-functional execution, stakeholder communication, and team coordination' },
    ],
    color: '#a78bfa',
    dot: '●',
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="section-spacing">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-accent/60" />
            <span className="text-xs font-semibold text-accent tracking-widest uppercase">Experience</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-16 leading-tight"
          >
            Where I&apos;ve{' '}
            <span className="gradient-text">built & shipped</span>
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block" style={{ left: '15px' }} />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 32 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="md:pl-12 relative"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[8px] top-6 w-4 h-4 rounded-full border-2 bg-background hidden md:flex items-center justify-center"
                    style={{ borderColor: exp.color }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: exp.color }} />
                  </div>

                  <div className="p-6 md:p-8 rounded-2xl glass border border-border card-lift group">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}30` }}
                          >
                            {exp.type}
                          </span>
                          <span className="text-xs text-text-muted">{exp.period}</span>
                        </div>
                        <h3 className="text-xl font-bold text-text-primary">{exp.role}</h3>
                        <p className="text-text-secondary font-medium mt-0.5">{exp.company}</p>
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${exp.color}18`, border: `1px solid ${exp.color}30` }}
                      >
                        <Briefcase size={16} style={{ color: exp.color }} />
                      </div>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed mb-6">{exp.description}</p>

                    {/* Responsibilities */}
                    <div className="space-y-3">
                      {exp.responsibilities.map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${exp.color}15` }}
                          >
                            <Icon size={11} style={{ color: exp.color }} />
                          </div>
                          <span className="text-sm text-text-secondary leading-snug">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
