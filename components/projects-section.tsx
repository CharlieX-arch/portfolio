"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Github } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: "01",
    title: "InvisiInject",
    description: "A modular Python CLI tool for encoding and decoding SQL injection payloads to bypass WAF filters. Supports URL, Base64, Hex, CHAR() encoding with chaining capability. Zero external dependencies, pure Python.",
    tech: ["Python", "CLI", "WAF Bypass", "SQL Injection"],
    github: "https://github.com/CharlieX-arch/InvisiInject",
    gradient: "from-indigo-500 to-primary",
  },
  {
    id: "02",
    title: "CAST (Container Security Audit Toolkit)",
    description: "Automated Docker security assessment tool that inspects running containers for misconfigurations, excessive privileges, exposed secrets, and risky exposures. Generates findings aligned with CIS Docker Benchmark with risk scoring.",
    tech: ["Python", "Docker API", "Trivy", "CIS Benchmark"],
    github: "https://github.com/CharlieX-arch/CAST",
    gradient: "from-[hsl(187,92%,50%)] to-blue-500",
  },
  {
    id: "03",
    title: "CloudSential",
    description: "Cloud security posture management tool for detecting misconfigurations across cloud infrastructure. Automates security checks and generates actionable reports for cloud environments.",
    tech: ["Python", "AWS SDK", "Cloud Security", "CSPM"],
    github: "https://github.com/CharlieX-arch/CloudSential",
    gradient: "from-accent to-rose-500",
  }
];

export function ProjectsSection() {
  const { ref } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="text-primary font-mono text-sm tracking-wider uppercase">05. Work</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Featured <span className="gradient-text">Projects</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="glass-card rounded-2xl overflow-hidden relative group hover:-translate-y-2 transition-all duration-300 shimmer-on-hover flex flex-col h-full">
              <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`} />
              
              <div className="p-8 flex flex-col flex-grow relative">
                <div className="absolute top-4 right-6 text-6xl font-bold text-foreground/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                  {project.id}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span key={t} className="bg-primary/10 text-primary text-xs font-mono rounded-md px-3 py-1">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-auto">
                  <Link href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                    <Github className="w-5 h-5" />
                    <span>Repository</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
