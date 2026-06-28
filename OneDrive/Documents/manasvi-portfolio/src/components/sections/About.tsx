'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Rocket, Users, TrendingUp, Cpu, Building } from 'lucide-react'

const passions = [
  { icon: Cpu, label: 'Artificial Intelligence', color: '#7c6af7' },
  { icon: Building, label: 'Product Management', color: '#a78bfa' },
  { icon: TrendingUp, label: 'Entrepreneurship', color: '#7c6af7' },
  { icon: Brain, label: 'User Psychology', color: '#a78bfa' },
  { icon: Rocket, label: 'Startups & Growth', color: '#7c6af7' },
  { icon: Users, label: 'Business Strategy', color: '#a78bfa' },
]

const stats = [
  { value: '2', label: 'Degrees in Progress', suffix: '' },
  { value: '4', label: 'Products Built', suffix: '+' },
  { value: '8.3', label: 'CGPA', suffix: '' },
  { value: '6', label: 'Hackathons', suffix: '+' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="about" className="section-spacing">
      <div className="container-custom" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent/60" />
            <span className="text-xs font-semibold text-accent tracking-widest uppercase">About</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left col */}
            <div>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                I love building{' '}
                <span className="gradient-text">products that</span>
                <br />
                matter to people
              </motion.h2>

              <motion.div variants={itemVariants} className="space-y-4 text-text-secondary text-[15px] leading-relaxed">
                <p>
                  I&apos;m Manasvi — a builder at heart who sits at the crossroads of technology and business. Currently pursuing a dual degree in{' '}
                  <span className="text-text-primary font-medium">B.Tech CS (AI & ML)</span> and{' '}
                  <span className="text-text-primary font-medium">BS Management & Data Science</span> at IIT Madras, I spend most of my time thinking about products, users, and ideas.
                </p>
                <p>
                  I believe the best products come from deeply understanding people — their frustrations, motivations, and mental models. That belief drives everything I build: talking to users, validating hypotheses, iterating fast.
                </p>
                <p>
                  Whether I&apos;m engineering an AI workflow, designing a product strategy, or pitching at a startup competition, I bring the same energy: curious, ambitious, and outcome-obsessed.
                </p>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
                {stats.map(stat => (
                  <div key={stat.label} className="p-4 rounded-xl glass border border-border">
                    <div className="text-2xl font-bold text-text-primary">
                      {stat.value}<span className="text-accent">{stat.suffix}</span>
                    </div>
                    <div className="text-xs text-text-muted mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right col — passions */}
            <div>
              <motion.p variants={itemVariants} className="text-xs font-semibold text-text-muted tracking-widest uppercase mb-6">
                What I&apos;m Passionate About
              </motion.p>

              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {passions.map(({ icon: Icon, label, color }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="flex items-center gap-3 p-4 rounded-xl glass border border-border card-lift cursor-default"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span className="text-sm font-medium text-text-secondary">{label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Philosophy card */}
              <motion.div
                variants={itemVariants}
                className="mt-4 p-5 rounded-xl gradient-border"
              >
                <p className="text-sm text-text-secondary italic leading-relaxed">
                  &ldquo;Good products aren&apos;t built in isolation. They&apos;re built by obsessing over the user, moving fast, and caring deeply about the details.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <span className="text-accent text-[9px] font-bold">M</span>
                  </div>
                  <span className="text-xs text-text-muted">Manasvi Chugh</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
