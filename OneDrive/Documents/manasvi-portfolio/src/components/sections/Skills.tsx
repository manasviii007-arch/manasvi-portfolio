'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillGroups = [
  {
    label: 'Technical',
    color: '#7c6af7',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'JavaScript', level: 78 },
      { name: 'React / Next.js', level: 75 },
      { name: 'HTML & CSS', level: 82 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Git / GitHub', level: 85 },
      { name: 'LLMs', level: 80 },
      { name: 'RAG Systems', level: 75 },
      { name: 'MCP', level: 70 },
    ],
  },
  {
    label: 'Business & Product',
    color: '#a78bfa',
    skills: [
      { name: 'Product Management', level: 88 },
      { name: 'Market Research', level: 85 },
      { name: 'Business Analysis', level: 82 },
      { name: 'User Research', level: 87 },
      { name: 'Growth Strategy', level: 80 },
      { name: 'Go-to-Market', level: 78 },
      { name: 'Communication', level: 90 },
      { name: 'Public Speaking', level: 85 },
      { name: 'Leadership', level: 82 },
      { name: 'Presentation', level: 87 },
    ],
  },
]

const tools = [
  'Figma', 'Notion', 'Linear', 'Slack', 'Vercel', 'Supabase',
  'OpenAI API', 'LangChain', 'Postman', 'VS Code', 'Jupyter',
]

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{name}</span>
        <span className="text-xs text-text-muted">{level}%</span>
      </div>
      <div className="h-1 bg-surface-3 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section-spacing">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-accent/60" />
          <span className="text-xs font-semibold text-accent tracking-widest uppercase">Skills</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-14 leading-tight"
        >
          What I bring to{' '}
          <span className="gradient-text">every team</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + gi * 0.1 }}
              className="p-6 rounded-2xl glass border border-border"
            >
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-1 h-4 rounded-full"
                  style={{ background: group.color }}
                />
                <h3 className="font-semibold text-text-primary">{group.label}</h3>
              </div>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={group.color}
                    delay={0.1 + si * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools / badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <p className="text-xs font-semibold text-text-muted tracking-widest uppercase mb-4">Tools & Platforms</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.04 }}
                whileHover={{ y: -2, borderColor: 'rgba(124,106,247,0.4)' }}
                className="text-xs px-3 py-1.5 rounded-full glass border border-border text-text-secondary cursor-default transition-all duration-200"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
