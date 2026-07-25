"use client"

import { useEffect, useState, useCallback, useRef } from "react"

interface GlitchTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "span" | "p"
  glitchOnHover?: boolean
}

const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEF"

export function GlitchText({
  text,
  className = "",
  as: Tag = "span",
  glitchOnHover = false,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startGlitch = useCallback(() => {
    if (isGlitching) return
    setIsGlitching(true)

    let iterations = 0
    const maxIterations = text.length * 2

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iterations / 2) return text[index]
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          .join("")
      )

      iterations++
      if (iterations > maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsGlitching(false)
      }
    }, 30)
  }, [text, isGlitching])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Auto glitch on mount if not hover-only
  useEffect(() => {
    if (!glitchOnHover) {
      const timer = setTimeout(startGlitch, 500)
      return () => clearTimeout(timer)
    }
  }, [glitchOnHover, startGlitch])

  return (
    <Tag
      className={`${className} inline-block`}
      onMouseEnter={glitchOnHover ? startGlitch : undefined}
      data-text={text}
    >
      {displayText}
    </Tag>
  )
}
