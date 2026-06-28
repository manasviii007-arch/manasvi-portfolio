'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lightbulb, Users, Rocket, Globe } from 'lucide-react'

const activities = [
  {
    icon: Lightbulb,
    label: 'Startup Ideation',
    desc: 'Led ideation sessions to surface viable startup concepts, guided teams from raw problem statements to structured pitch decks.',
    color: '#7c6af7',
  },
  {
    icon: Rocket,
    label: 'Innovation Sprints',
    desc: 'Organized time-boxed innovation challenges for club members — simulating early-stage startup conditions to stress-test ideas.',
    color: '#a78bfa',
  },
  {
    icon: Users,
    label: 'Community Building',
    desc: 'Built and maintained an active community of student entrepreneurs through events, workshops, and cross-college collaborations.',
    color: '#7c6af7',
  },
  {
    icon: Globe,
    label: 'Entrepreneurship Ecosystem',
    desc: 'Connected students with mentors, investors, and resources; fostered a culture of building-first thinking across the campus.',
    color: '#a78bfa',
  },
]

export default function Leadership() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="leadership" className="section-spacing">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-accent/60" />
          <span className="text-xs font-semibold text-accent tracking-widest uppercase">Leadership</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-14 leading-tight"
        >
          Building the next{' '}
          <span className="gradient-text">generation of founders</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-6 md:p-10 rounded-2xl glass border border-border overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5"
            style={{ background: 'radial-gradient(circle, #7c6af7, transparent)' }}
          />

          {/* Club identity */}
          <div className="flex items-start gap-5 mb-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(124,106,247,0.12)', border: '1px solid rgba(124,106,247,0.25)' }}
            >
              <Rocket size={24} className="text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-accent px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(124,106,247,0.1)', border: '1px solid rgba(124,106,247,0.2)' }}>
                  Club Role
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary">Startup Ideator</h3>
              <p className="text-text-secondary font-medium">Indus Rise Club</p>
              <p className="text-text-secondary text-sm mt-2 max-w-xl leading-relaxed">
                As Startup Ideator at Indus Rise, I create the conditions for students to think like founders — running structured ideation frameworks, facilitating user research workshops, and mentoring teams through the messy early stages of building something new.
              </p>
            </div>
          </div>

          {/* Activity grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {activities.map(({ icon: Icon, label, desc, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                className="p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={12} style={{ color }} />
                  </div>
                  <span className="text-sm font-semibold text-text-primary">{label}</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
