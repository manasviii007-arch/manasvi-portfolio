'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Heart, Shield, TrendingUp, Bot, ArrowUpRight, Tag } from 'lucide-react'

const projects = [
  {
    id: 'mitrify',
    name: 'Mitrify',
    tagline: 'Teen Wellness Platform',
    status: 'In Development',
    role: 'Founder & Product Lead',
    icon: Heart,
    color: '#f472b6',
    gradient: 'from-pink-500/10 to-purple-500/5',
    overview:
      'Mitrify is a holistic platform designed for teenagers navigating the pressures of modern adolescence — combining mental wellness, career guidance, productivity tools, and peer support in one safe digital space.',
    problem:
      'Teens face an overwhelming mental health crisis with no unified, age-appropriate digital support system. Existing apps are either too clinical, too generic, or require adult supervision, creating a trust barrier.',
    solution:
      'A peer-first wellness ecosystem where teens can connect, track their emotional health, explore career paths, manage their productivity, and access curated mental health resources — all in a privacy-first, judgment-free environment.',
    impact: 'Addressing a $4.2B teen mental health market with validated demand from 200+ user interviews',
    keyLearnings: [
      'User trust is non-negotiable in mental health — every design decision must center safety',
      'Teens don\'t want apps that feel like therapy; they want community',
      'Market validation must precede any technical investment',
    ],
    skills: ['User Research', 'Market Validation', 'Business Model', 'Product Roadmap', 'UX Design'],
    stack: ['Next.js', 'React', 'Tailwind', 'Node.js', 'PostgreSQL'],
    tags: ['Mental Wellness', 'Career Guidance', 'Productivity', 'Peer Support'],
  },
  {
    id: 'trustnet',
    name: 'TrustNet AI',
    tagline: 'AI Due Diligence Platform',
    status: 'Prototype',
    role: 'Product Strategist & Developer',
    icon: Shield,
    color: '#7c6af7',
    gradient: 'from-violet-500/10 to-blue-500/5',
    overview:
      'TrustNet AI is a multi-agent verification and due diligence platform that helps investors, founders, and operators make faster, more confident decisions through AI-powered risk analysis and opportunity validation.',
    problem:
      'Due diligence is slow, expensive, and inconsistent. Investors spend weeks gathering information that AI could surface in minutes, while startups face opaque evaluation processes that create friction.',
    solution:
      'A platform where AI agents autonomously gather, cross-reference, and synthesize information across multiple data sources — delivering structured risk assessments, opportunity scores, and confidence indicators.',
    impact: 'Potential to reduce due diligence time from weeks to hours for early-stage investors',
    keyLearnings: [
      'Multi-agent coordination requires careful orchestration to avoid conflicting outputs',
      'Explainability in AI outputs is critical for trust in high-stakes decisions',
      'The best AI products augment expert judgment rather than replacing it',
    ],
    skills: ['Product Strategy', 'AI Architecture', 'Multi-agent Systems', 'Business Analysis'],
    stack: ['Python', 'LangChain', 'RAG', 'OpenAI API', 'React'],
    tags: ['Multi-agent AI', 'Risk Analysis', 'Due Diligence', 'VC Tools'],
  },
  {
    id: 'tradez',
    name: 'Tradez',
    tagline: 'AI Finance Intelligence Platform',
    status: 'MVP',
    role: 'Product & Growth Lead',
    icon: TrendingUp,
    color: '#34d399',
    gradient: 'from-emerald-500/10 to-teal-500/5',
    overview:
      'Tradez is an AI-powered finance platform that democratizes market intelligence — giving retail investors access to institutional-grade insights, sentiment analysis, and personalized research without needing a Bloomberg terminal.',
    problem:
      'Retail investors are at a systematic information disadvantage. They lack access to real-time market intelligence, expert synthesis, and pattern recognition that institutional players have by default.',
    solution:
      'An AI copilot for personal finance decisions — aggregating market data, synthesizing earnings reports, tracking sentiment signals, and surfacing actionable insights through a conversational interface.',
    impact: 'Targeting 47M+ retail investors in India who lack access to quality financial intelligence',
    keyLearnings: [
      'Financial information must be presented carefully to avoid misinterpretation',
      'Growth in fintech requires building trust before asking for financial data',
      'AI insights are only valuable when paired with clear confidence indicators',
    ],
    skills: ['AI Integration', 'Market Research', 'Growth Strategy', 'Product Thinking', 'Data Analysis'],
    stack: ['Python', 'LLMs', 'Next.js', 'Financial APIs', 'React'],
    tags: ['AI Insights', 'Market Research', 'Fintech', 'Growth'],
  },
  {
    id: 'suraksha',
    name: 'Suraksha Sarthi',
    tagline: "Women's Safety Platform",
    status: 'Active',
    role: 'Co-founder & Product Lead',
    icon: Bot,
    color: '#fb923c',
    gradient: 'from-orange-500/10 to-red-500/5',
    overview:
      "Suraksha Sarthi is an AI-powered safety companion for women — providing real-time emergency support, threat detection, community awareness networks, and accessibility-first design for users across all tech literacy levels.",
    problem:
      "Women's safety tools are reactive, not proactive. Most apps require significant interaction in high-stress moments, creating dangerous delays. Many also have accessibility barriers that exclude users who need them most.",
    solution:
      'A low-friction safety platform with one-tap SOS, AI-powered route safety scoring, community-driven hazard reporting, and voice-activated emergency protocols designed to work even in panic situations.',
    impact: 'Presented at Smart India Hackathon; addressing safety needs of 700M+ women in India',
    keyLearnings: [
      'Accessibility cannot be an afterthought in safety-critical applications',
      'Community trust and data privacy are co-equal with functionality',
      'The best safety feature is the one that works when nothing else does',
    ],
    skills: ['Accessibility Design', 'Emergency UX', 'AI Integration', 'Community Building'],
    stack: ['React Native', 'Python', 'AI/ML', 'Maps API', 'Node.js'],
    tags: ['Safety Tech', 'Accessibility', 'AI', 'Emergency Response'],
  },
]

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const Icon = project.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-border p-6 md:p-8 shadow-elevated"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${project.color}18`, border: `1px solid ${project.color}30` }}
            >
              <Icon size={18} style={{ color: project.color }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">{project.name}</h3>
              <p className="text-sm text-text-secondary">{project.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg glass border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}
          >
            {project.status}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium glass border border-border text-text-secondary">
            {project.role}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-5 text-sm">
          {[
            { label: 'Overview', content: project.overview },
            { label: 'Problem', content: project.problem },
            { label: 'Solution', content: project.solution },
            { label: 'Impact', content: project.impact },
          ].map(({ label, content }) => (
            <div key={label}>
              <h4 className="text-xs font-semibold text-text-muted tracking-widest uppercase mb-2">{label}</h4>
              <p className="text-text-secondary leading-relaxed">{content}</p>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-semibold text-text-muted tracking-widest uppercase mb-2">Key Learnings</h4>
            <ul className="space-y-2">
              {project.keyLearnings.map(l => (
                <li key={l} className="flex items-start gap-2 text-text-secondary">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-text-muted tracking-widest uppercase mb-2">Skills Used</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full glass border border-border text-text-secondary">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-text-muted tracking-widest uppercase mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full glass border border-border text-text-secondary">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass border border-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all duration-200 cursor-pointer">
            <Github size={14} />
            GitHub
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all duration-200 cursor-pointer">
            <ExternalLink size={14} />
            Live Demo
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="projects" className="section-spacing">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-accent/60" />
          <span className="text-xs font-semibold text-accent tracking-widest uppercase">Projects</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
        >
          Things I&apos;ve{' '}
          <span className="gradient-text">built from scratch</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-text-secondary mb-14 max-w-lg text-[15px]"
        >
          Four products built with real users in mind — each one a lesson in problem validation, user empathy, and execution.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group p-6 rounded-2xl glass border border-border card-lift cursor-pointer relative overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                {/* Gradient bg */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Image placeholder */}
                <div
                  className="relative h-36 rounded-xl mb-5 overflow-hidden flex items-center justify-center"
                  style={{ background: `${project.color}08`, border: `1px solid ${project.color}20` }}
                >
                  <div className="text-center">
                    <Icon size={32} style={{ color: project.color }} className="mx-auto mb-2 opacity-40" />
                    <span className="text-xs text-text-muted">Project Preview</span>
                  </div>
                  {/* Decorative grid */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: `linear-gradient(${project.color} 1px, transparent 1px), linear-gradient(90deg, ${project.color} 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${project.color}18`, border: `1px solid ${project.color}30` }}
                      >
                        <Icon size={15} style={{ color: project.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-text-primary text-base">{project.name}</h3>
                        <p className="text-xs text-text-muted">{project.tagline}</p>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.overview}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full glass border border-border text-text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-2 transition-colors"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Details
                      <ArrowUpRight size={13} />
                    </button>
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-lg glass border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                        <Github size={12} />
                      </button>
                      <button className="w-7 h-7 rounded-lg glass border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
