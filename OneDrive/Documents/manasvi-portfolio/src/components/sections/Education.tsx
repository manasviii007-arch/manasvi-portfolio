'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, BookOpen, Star } from 'lucide-react'

const education = [
  {
    degree: 'BS Management & Data Science',
    institution: 'Indian Institute of Technology Madras',
    shortName: 'IIT Madras',
    period: '2023 – 2027',
    focus: ['Management', 'Data Science', 'Business Analytics', 'Quantitative Methods'],
    description: 'A rigorous dual-track program combining management fundamentals with data science — building the analytical and strategic toolkit to lead data-driven businesses.',
    color: '#7c6af7',
    badge: 'IIT',
    cgpa: null,
    icon: BookOpen,
  },
  {
    degree: 'B.Tech Computer Science Engineering (AI & ML)',
    institution: 'Delhi Technical Campus (GGSIPU)',
    shortName: 'DTC, GGSIPU',
    period: '2023 – 2027',
    focus: ['Artificial Intelligence', 'Machine Learning', 'Software Engineering', 'Data Structures'],
    description: 'Core engineering degree with specialization in AI & ML — providing deep technical foundations in algorithms, intelligent systems, and software development.',
    color: '#a78bfa',
    badge: 'B.Tech',
    cgpa: '8.3',
    icon: GraduationCap,
  },
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="section-spacing">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-accent/60" />
          <span className="text-xs font-semibold text-accent tracking-widest uppercase">Education</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-14 leading-tight"
        >
          Two degrees,{' '}
          <span className="gradient-text">one mission</span>
        </motion.h2>

        {/* Dual degree callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8 px-5 py-4 rounded-2xl flex items-center gap-3"
          style={{ background: 'rgba(124,106,247,0.06)', border: '1px solid rgba(124,106,247,0.15)' }}
        >
          <Star size={16} className="text-accent flex-shrink-0" />
          <p className="text-sm text-text-secondary">
            Simultaneously pursuing two degrees — merging technical depth in AI/ML with business acumen from IIT Madras.
            {' '}<span className="text-text-primary font-medium">A genuinely rare combination.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => {
            const Icon = edu.icon
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl glass border border-border card-lift relative overflow-hidden"
              >
                {/* Background accent */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 opacity-[0.04] rounded-full"
                  style={{ background: edu.color, transform: 'translate(20px, -20px)' }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${edu.color}15`, border: `1px solid ${edu.color}25` }}
                    >
                      <Icon size={22} style={{ color: edu.color }} />
                    </div>
                    <div className="flex items-center gap-2">
                      {edu.cgpa && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-text-primary">{edu.cgpa}</div>
                          <div className="text-xs text-text-muted">CGPA</div>
                        </div>
                      )}
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-lg"
                        style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}25` }}
                      >
                        {edu.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-text-primary text-base mb-1 leading-snug">{edu.degree}</h3>
                  <p style={{ color: edu.color }} className="text-sm font-semibold mb-0.5">{edu.shortName}</p>
                  <p className="text-xs text-text-muted mb-4">{edu.institution} · {edu.period}</p>

                  <p className="text-sm text-text-secondary leading-relaxed mb-5">{edu.description}</p>

                  {/* Focus areas */}
                  <div>
                    <p className="text-xs text-text-muted font-medium mb-2">Focus Areas</p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.focus.map(f => (
                        <span
                          key={f}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{ background: `${edu.color}10`, color: `${edu.color}cc`, border: `1px solid ${edu.color}20` }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
