"use client"

import { useEffect, useState } from "react"
import { CyberGlobeWrapper } from "@/components/cyber-globe-wrapper"
import { ChevronDown, Download } from "lucide-react"

export function HeroSection() {
  const roles = [
    "Application Security Analyst",
    "Cloud Security Analyst",
    "Penetration Tester",
  ]
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = 2000

    const timeout = setTimeout(() => {
      const fullText = roles[currentRoleIndex]

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        if (currentText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        if (currentText.length === 0) {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentRoleIndex, roles])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden mesh-gradient">
      <div className="absolute inset-0 z-0 opacity-40">
        <CyberGlobeWrapper />
      </div>

      <div className="mx-auto max-w-6xl relative z-10 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="flex-1 space-y-6 text-center md:text-left order-2 md:order-1">
            <p className="text-xs md:text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Security Analyst & Pentester
            </p>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              <span className="gradient-text">Vishw Bhatt</span>
            </h1>

            <div className="h-8 md:h-10">
              <span className="text-xl md:text-2xl font-mono text-primary text-glow-indigo">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="max-w-[600px] text-lg text-muted-foreground leading-relaxed">
              Offensive security specialist who finds what others miss. I run black-box penetration tests on live applications — hunting real vulnerabilities, not just checking boxes.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="bg-primary text-white rounded-xl px-8 py-3.5 font-medium glow-indigo transition-all hover:scale-105 inline-block text-center w-full sm:w-auto"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                download="Vishw_Bhatt_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 border border-border rounded-xl px-8 py-3.5 font-medium text-foreground hover:bg-secondary/50 transition-all w-full sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </div>

          <div className="flex-shrink-0 order-1 md:order-2">
            <div className="profile-ring rounded-full p-2 relative">
              <img
                src="/profile-photo.png"
                alt="Vishw Bhatt"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-float group">
        <a href="#about" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-[10px] font-mono">SCROLL</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-xl group-hover:border-primary/40 transition-all">
            <ChevronDown className="w-5 h-5" />
          </div>
        </a>
      </div>
    </section>
  )
}
