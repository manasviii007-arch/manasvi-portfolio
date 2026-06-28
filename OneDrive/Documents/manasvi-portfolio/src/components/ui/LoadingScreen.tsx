'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 300)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <div className="w-12 h-12 rounded-xl border border-accent/30 flex items-center justify-center bg-accent-light">
              <span className="text-accent font-bold text-lg tracking-tight">M</span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-border relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-accent-2"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-text-muted text-xs font-medium tracking-widest uppercase"
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
