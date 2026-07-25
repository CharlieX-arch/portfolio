"use client"

import { useEffect, useRef, useState } from "react"

interface TrailPoint {
  x: number
  y: number
  life: number
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<TrailPoint[]>([])
  const mouseRef = useRef({ x: -100, y: -100 })
  const animRef = useRef<number>(0)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Detect theme
    const checkTheme = () => {
      const htmlElement = document.documentElement
      const isDarkMode = htmlElement.classList.contains('dark')
      setIsDark(isDarkMode)
    }

    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Check if touch device - skip trail on mobile
    const isTouchDevice = "ontouchstart" in window
    if (isTouchDevice) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
      })
      // Limit trail length
      if (trailRef.current.length > 50) {
        trailRef.current.shift()
      }
    }

    window.addEventListener("mousemove", handleMouse, { passive: true })
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const trail = trailRef.current

      // Use different colors for dark/light theme
      const darkColors = {
        line: (life: number) => `rgba(0, 230, 138, ${life * 0.3})`,
        dot: (life: number) => `rgba(0, 204, 204, ${life * 0.5})`,
        glow: (x: number, y: number) => {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30)
          gradient.addColorStop(0, "rgba(0, 230, 138, 0.15)")
          gradient.addColorStop(1, "rgba(0, 230, 138, 0)")
          return gradient
        }
      }

      const lightColors = {
        line: (life: number) => `rgba(99, 102, 241, ${life * 0.4})`,
        dot: (life: number) => `rgba(79, 70, 229, ${life * 0.6})`,
        glow: (x: number, y: number) => {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30)
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.2)")
          gradient.addColorStop(1, "rgba(99, 102, 241, 0)")
          return gradient
        }
      }

      const colors = isDark ? darkColors : lightColors

      // Draw trail connections
      for (let i = 1; i < trail.length; i++) {
        const p = trail[i]
        const prev = trail[i - 1]
        p.life -= 0.02

        if (p.life <= 0) continue

        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = colors.line(p.life)
        ctx.lineWidth = p.life * 2
        ctx.stroke()

        // Small dot at each point
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.life * 2, 0, Math.PI * 2)
        ctx.fillStyle = colors.dot(p.life)
        ctx.fill()
      }

      // Remove dead points
      trailRef.current = trail.filter((p) => p.life > 0)

      // Draw cursor glow
      const { x, y } = mouseRef.current
      const gradient = colors.glow(x, y)
      ctx.beginPath()
      ctx.arc(x, y, 30, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("resize", resize)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[45] pointer-events-none"
      aria-hidden="true"
    />
  )
}
