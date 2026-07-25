"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Shield, Cloud, Code } from "lucide-react"

const highlights = [
  { icon: Shield, label: "App Security", desc: "Black-box pentesting of live applications", color: "text-primary" },
  { icon: Cloud, label: "Cloud Security", desc: "Cloud infrastructure security analysis", color: "text-[hsl(187,92%,50%)]" },
  { icon: Code, label: "Tool Development", desc: "Building custom tools for faster hunting", color: "text-accent" },
]

export function AboutSection() {
  const { ref } = useScrollAnimation()

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-6xl px-6 relative z-10">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-4xl md:text-5xl font-bold gradient-text opacity-50">01</span>
          <div className="section-line flex-1" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h2>
        </div>

        {/* Bio - single column, clean and professional */}
        <div className="max-w-3xl space-y-6 text-muted-foreground leading-relaxed text-lg mb-16">
          <p>
            I&apos;m <span className="text-foreground font-medium">Vishw Bhatt</span>, an
            Application Security Analyst and Cloud Security Analyst at{" "}
            <span className="text-accent font-medium">Petpooja</span>. With a deep passion
            for offensive security, I specialize in black-box penetration testing on live
            applications — hunting real vulnerabilities that automated scanners miss.
          </p>
          <p>
            My journey started with security competitions and evolved into professional
            pentesting. I build custom security tools that make vulnerability hunting faster
            and sharper, bridging the gap between manual testing and automation.
          </p>
          <p>
            When I&apos;m not breaking into systems ethically, you&apos;ll find me contributing
            to open-source security tools and exploring cloud security architectures.
          </p>
        </div>

        {/* Highlight cards - 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="glass-card shimmer-on-hover p-6 rounded-xl border border-border flex flex-col items-start gap-4"
            >
              <item.icon className={`w-10 h-10 ${item.color}`} strokeWidth={1.5} />
              <div>
                <h3 className="text-foreground font-semibold mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
