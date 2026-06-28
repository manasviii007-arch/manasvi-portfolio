'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-0">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md border border-accent/30 bg-accent-light flex items-center justify-center">
              <span className="text-accent font-bold text-xs">M</span>
            </div>
            <span className="text-text-muted text-sm">
              © 2024 Manasvi Chugh
            </span>
          </div>

          <p className="text-text-muted text-xs">
            Designed & Built with care
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/manasvi-chugh-5b0729364"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:manasviii007@google.com"
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
