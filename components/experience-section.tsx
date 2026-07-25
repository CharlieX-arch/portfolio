"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    role: "Cloud & Application Security Analyst",
    company: "Petpooja",
    period: "June 2025 - Present",
    isCurrent: true,
    description:
      "Running black-box penetration tests on production web applications and APIs. Performing cloud security assessments and identifying misconfigurations. Building internal security tools and automating vulnerability detection workflows.",
    tech: ["Burp Suite", "Nessus", "AWS", "Python", "OWASP"],
  },
  {
    role: "Cybersecurity Intern",
    company: "TechD Cybersecurity Limited",
    period: "Jan 2025 - Jun 2025",
    isCurrent: false,
    description:
      "Conducted vulnerability assessments on client web applications, servers, and endpoints. Reviewed client network architecture and provided recommendations for improving security posture.",
    tech: ["Burp Suite", "Nmap", "Python", "OWASP ZAP"],
  },
]

export function ExperienceSection() {
  const { ref } = useScrollAnimation()

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="mx-auto max-w-6xl px-6 relative z-10">

        {/* Section header - same alignment as other sections */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-4xl md:text-5xl font-bold gradient-text opacity-50">01</span>
          <div className="section-line flex-1" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Experience</h2>
        </div>

        {/* Timeline - left aligned, not centered */}
        <div className="max-w-4xl">
          <div className="relative pl-8 border-l-2 border-primary/20 space-y-12">
            {experiences.map((exp) => (
              <div key={exp.role} className="relative">
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[25px] top-1 w-4 h-4 rounded-full border-4 border-background z-10 ${
                    exp.isCurrent
                      ? "bg-primary status-pulse"
                      : "bg-muted-foreground/40"
                  }`}
                />

                <div className="glass-card p-6 md:p-8 rounded-xl border border-border shimmer-on-hover">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-accent font-medium">
                        <Briefcase className="h-4 w-4" />
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-secondary/50 px-3 py-1.5 rounded-lg border border-border whitespace-nowrap">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-primary/10 text-primary border border-primary/20 rounded-lg px-3 py-1 font-mono text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
