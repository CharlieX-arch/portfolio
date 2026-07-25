"use client"

import React from "react"
import { useState } from "react"
import { Mail, Github, Linkedin, Send, ArrowUpRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/CharlieX-arch", handle: "@CharlieX-arch" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vishw-bhatt/", handle: "Vishw Bhatt" },
  { icon: Mail, label: "Email", href: "#", handle: "Coming soon" },
]

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div
          ref={sectionRef}
          className={`scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-primary text-sm">07.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Get In Touch</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <div>
              <p className="text-card-foreground leading-relaxed mb-6">
                I&apos;m always interested in hearing about new opportunities in application security
                and cloud security. Whether you have a question, want to collaborate on a security
                project, or just want to connect — feel free to reach out.
              </p>

              {/* Terminal contact card */}
              <div className="glass-card rounded-xl p-5 font-mono text-sm mb-8">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <div className="h-3 w-3 rounded-full bg-chart-3" />
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="ml-2 text-muted-foreground text-xs">contact.sh</span>
                </div>
                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> echo $AVAILABILITY
                </p>
                <p className="text-primary mt-1">
                  Open to: Full-time roles, Freelance, Security Consulting
                </p>
                <p className="text-muted-foreground mt-3">
                  <span className="text-primary">$</span> echo $RESPONSE_TIME
                </p>
                <p className="text-accent mt-1">Usually within 24 hours</p>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 glass-card rounded-xl p-4"
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{social.label}</p>
                      <p className="font-mono text-xs text-muted-foreground">{social.handle}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Contact form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-muted-foreground mb-2">
                    <span className="text-primary">const</span> name <span className="text-primary">=</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-border bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-muted-foreground mb-2">
                    <span className="text-primary">const</span> email <span className="text-primary">=</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-border bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-muted-foreground mb-2">
                    <span className="text-primary">const</span> message <span className="text-primary">=</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hey, I'd like to talk about..."
                    className="w-full rounded-xl border border-border bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 font-mono text-sm hover:bg-primary/90 transition-all disabled:opacity-60 pulse-glow"
                >
                  {submitted ? (
                    "Message Sent Successfully! ✓"
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
                You can also connect with me via LinkedIn or GitHub.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
