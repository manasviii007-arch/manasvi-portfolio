'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX - 4}px`
      dot.style.top = `${mouseY - 4}px`
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [data-cursor="hover"]')) {
        ring.classList.add('hovering')
      }
    }

    const handleMouseOut = () => {
      ring.classList.remove('hovering')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    const animate = () => {
      ringX += (mouseX - ringX - 18) * 0.12
      ringY += (mouseY - ringY - 18) * 0.12
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" />
      <div ref={ringRef} className="cursor-ring hidden lg:block" />
    </>
  )
}
