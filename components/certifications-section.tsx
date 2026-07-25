"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Award, ExternalLink } from "lucide-react"
import certifications from "@/data/certifications.json"

export function CertificationsSection() {
  const { ref } = useScrollAnimation()

  return (
    <section id="certifications" className="py-24 relative" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">

        {/* Section header - consistent with other sections */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-4xl md:text-5xl font-bold gradient-text opacity-50">04</span>
          <div className="section-line flex-1" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Certifications</h2>
        </div>

        {/* Certifications grid - directly, no stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {certifications.map((cert) => {
            const isOngoing = cert.status === "On-going"
            return (
              <div
                key={cert.name}
                className="glass-card rounded-xl p-6 flex items-start gap-4 shimmer-on-hover border border-border group"
              >
                <div className="bg-secondary/50 p-3 rounded-lg group-hover:bg-primary/10 transition-colors flex-shrink-0">
                  <Award className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1 leading-tight">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-mono text-muted-foreground">{cert.date}</span>
                    <div className="flex items-center gap-2">
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                          title="Verify certification"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <span className={`text-xs uppercase tracking-wider font-medium ${isOngoing ? "text-[hsl(45,93%,58%)]" : "text-primary"}`}>
                        {cert.status}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isOngoing
                            ? "bg-[hsl(45,93%,58%)] status-pulse"
                            : "bg-primary shadow-[0_0_6px_hsl(239_84%_67%_/_0.6)]"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
