"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const skillsData = {
  appsec: ["Burp Suite Pro", "OWASP Top 10", "API Security Testing", "Web App Pentesting", "Manual Code Review", "Authentication Bypass"],
  cloud: ["AWS Security", "Cloud Misconfiguration Detection", "IAM Analysis", "Container Security", "Cloud Compliance Auditing"],
  tools: ["Burp Suite", "Nessus", "Metasploit", "SQLMap", "Nmap", "Wireshark", "OWASP ZAP", "Nikto", "Hydra", "Hashcat"],
  dev: ["Python", "Bash Scripting", "Tool Development", "Automation", "Docker", "Git"],
};

const toolkit = [
  "Kali Linux", "Burp Suite", "Nessus", "Wireshark", "Nmap", "Metasploit", "SQLMap", 
  "OWASP ZAP", "Nikto", "Hydra", "Python", "Docker", "AWS CLI", "Hashcat", "Volatility"
];

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof skillsData>("appsec");
  const { ref } = useScrollAnimation();

  const tabs = [
    { id: "appsec", label: "Application Security" },
    { id: "cloud", label: "Cloud Security" },
    { id: "tools", label: "Offensive Tools" },
    { id: "dev", label: "Development" },
  ] as const;

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="text-primary font-mono text-sm tracking-wider uppercase">03. Arsenal</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Skills & <span className="gradient-text">Arsenal</span></h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                  : "text-muted-foreground border border-transparent hover:border-border hover:bg-secondary/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-20 max-w-4xl mx-auto min-h-[200px] content-start">
          {skillsData[activeTab].map((skill, index) => (
            <div
              key={skill}
              className="bg-secondary border border-border text-secondary-foreground rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-primary hover:text-primary hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] cursor-default animate-in fade-in zoom-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {skill}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6 text-center">Primary Toolkit</h3>
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              {toolkit.map((tool) => (
                <span
                  key={tool}
                  className="text-xs font-mono bg-secondary/50 border border-border px-3 py-1.5 rounded-md text-foreground/80 hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
