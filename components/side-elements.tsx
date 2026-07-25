"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/CharlieX-arch", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/vishw-bhatt-208796276/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:vishw.sec@gmail.com", label: "Email" },
]

export function SideElements() {
  return (
    <>
      {/* Left - Social icons */}
      <div className="fixed left-6 bottom-0 z-30 hidden lg:flex flex-col items-center gap-5">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-muted-foreground hover:text-primary hover:-translate-y-0.5 transition-all"
          >
            <social.icon className="h-5 w-5" />
          </a>
        ))}
        <div className="w-px h-24 bg-border" />
      </div>

      {/* Right - Email */}
      <div className="fixed right-6 bottom-0 z-30 hidden lg:flex flex-col items-center gap-5">
        <a
          href="mailto:vishw.sec@gmail.com"
          className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          style={{ writingMode: "vertical-rl" }}
        >
        </a>
        <div className="w-px h-24 bg-border" />
      </div>
    </>
  )
}
