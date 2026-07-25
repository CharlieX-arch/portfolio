"use client"

import { useState, useEffect } from "react"
import { Shield, Menu, X, Download, ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map((l) => l.href.replace("#", ""))
      let current = ""
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) current = section
        }
      }
      setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5 group" aria-label="Home">
          <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground tracking-tight">
            vishw<span className="text-primary">.sec</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "")
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
          <li>
            <a
              href="https://medium.com/@Vishw04"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-secondary/50 inline-flex items-center gap-1.5"
            >
              Blogs
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
          <li>
            <a
              href="/resume.pdf"
              download="Vishw_Bhatt_Resume.pdf"
              className="ml-4 inline-flex items-center gap-2 px-5 py-2 text-[13px] font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-all glow-indigo"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </li>
          <li className="ml-2">
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground p-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-2xl border-b border-border/50 px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
            <li>
              <a
                href="https://medium.com/@Vishw04"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <span>Blogs</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
            <li>
              <a
                href="/resume.pdf"
                download="Vishw_Bhatt_Resume.pdf"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Resume
              </a>
            </li>
            <li className="mt-2 flex justify-center">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
