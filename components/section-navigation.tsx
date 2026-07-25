"use client"

import { ChevronUp, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"

const sections = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects" },
]

export function SectionNavigation() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      let current = 0

      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i].id)
        if (element && element.offsetTop <= scrollPosition) {
          current = i
        }
      }
      setCurrentSectionIndex(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const section = sections[index]
    const element = document.getElementById(section.id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const goToPrevious = () => {
    if (currentSectionIndex > 0) {
      scrollToSection(currentSectionIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      scrollToSection(currentSectionIndex + 1)
    }
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
      {/* Up Button */}
      <button
        onClick={goToPrevious}
        disabled={currentSectionIndex === 0}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-xl text-muted-foreground hover:text-primary hover:border-primary/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:disabled:text-muted-foreground"
        title={currentSectionIndex > 0 ? `Go to ${sections[currentSectionIndex - 1].label}` : "First section"}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Section Indicator */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card/30 backdrop-blur-xl text-xs font-mono text-muted-foreground">
        {currentSectionIndex + 1}/{sections.length}
      </div>

      {/* Down Button */}
      <button
        onClick={goToNext}
        disabled={currentSectionIndex === sections.length - 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-xl text-muted-foreground hover:text-primary hover:border-primary/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:disabled:text-muted-foreground"
        title={currentSectionIndex < sections.length - 1 ? `Go to ${sections[currentSectionIndex + 1].label}` : "Last section"}
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  )
}
