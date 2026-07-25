"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-40 flex flex-col items-center gap-1 transition-all duration-500 group ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-xl text-muted-foreground group-hover:text-primary group-hover:border-primary/40 group-hover:glow-indigo transition-all animate-float">
        <ChevronUp className="h-6 w-6" />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
      </span>
    </button>
  )
}
