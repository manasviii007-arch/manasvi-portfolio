'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Code, Cpu, Lightbulb, Mic, Star, Award } from 'lucide-react'

const achievements = [
  {
    title: 'Google TechSprint',
    category: 'Tech Competition',
    description: 'Competed in Google\'s flagship technology sprint challenge — developed an AI-powered solution addressing a real-world problem under tight constraints, demonstrating rapid prototyping and technical depth.',
    icon: Cpu,
    color: '#4285F4',
    highlight: true,
  },
  {
    title: 'Smart India Hackathon',
    category: 'National Hackathon',
    description: 'Participated in India\'s largest hackathon with 1M+ participants nationwide. Presented Suraksha Sarthi — a women\'s safety platform — to a panel of government and industry experts.',
    icon: Code,
    color: '#f97316',
    highlight: true,
  },
  {
    title: 'Hacknomics',
    category: 'Innovation Hackathon',
    description: 'Developed an economics-meets-technology solution combining market analysis, behavioral economics, and product thinking to address a systemic market inefficiency.',
    icon: Trophy,
    color: '#7c6af7',
    highlight: false,
  },
  {
    title: 'Manthan Kriti Innovation Challenge',
    category: 'Innovation Competition',
    description: 'Ideated and presented an innovative solution at this cross-disciplinary innovation challenge, competing against top engineering and management students.',
    icon: Lightbulb,
    color: '#a78bfa',
    highlight: false,
  },
  {
    title: 'Startup Pitching Competitions',
    category: 'Entrepreneurship',
    description: 'Pitched startup ideas across multiple competitions — honing the ability to communicate complex problems and solutions clearly to non-technical audiences including investors and mentors.',
    icon: Mic,
    color: '#34d399',
    highlight: false,
  },
  {
    title: 'College Innovation Events',
    category: 'Campus Leadership',
    description: 'Consistently placed among top performers in college-level innovation and entrepreneurship events, establishing a reputation as a builder and problem-solver on campus.',
    icon: Star,
    color: '#f59e0b',
    highlight: false,
  },
]

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="achievements" className="section-spacing">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-accent/60" />
          <span className="text-xs font-semibold text-accent tracking-widest uppercase">Achievements</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-14 leading-tight"
        >
          Competing, shipping,{' '}
          <span className="gradient-text">and learning</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[23px] top-8 bottom-8 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, rgba(124,106,247,0.4), rgba(124,106,247,0.05))' }}
          />

          <div className="space-y-5">
            {achievements.map((achievement, i) => {
              const Icon = achievement.icon
              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-5 md:pl-2"
                >
                  {/* Timeline node */}
                  <div className="relative flex-shrink-0 hidden md:flex">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center z-10 relative border"
                      style={{
                        background: `${achievement.color}15`,
                        borderColor: `${achievement.color}30`,
                      }}
                    >
                      <Icon size={18} style={{ color: achievement.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 p-5 rounded-xl border card-lift ${
                    achievement.highlight
                      ? 'glass-strong border-accent/15'
                      : 'glass border-border'
                  }`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1 md:hidden">
                          <Icon size={14} style={{ color: achievement.color }} />
                        </div>
                        <h3 className="font-bold text-text-primary text-base">{achievement.title}</h3>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
                          style={{
                            background: `${achievement.color}15`,
                            color: achievement.color,
                            border: `1px solid ${achievement.color}25`,
                          }}
                        >
                          {achievement.category}
                        </span>
                      </div>
                      {achievement.highlight && (
                        <Award size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed mt-2">{achievement.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
