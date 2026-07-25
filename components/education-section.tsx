"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function EducationSection() {
  const { ref } = useScrollAnimation();

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-4xl md:text-5xl font-bold gradient-text opacity-50">02</span>
          <div className="section-line flex-1" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Education</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl overflow-hidden relative group shimmer-on-hover">
            <div className="h-1 w-full bg-gradient-to-r from-primary to-[hsl(187,92%,50%)]" />
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-primary/10 p-4 rounded-xl text-primary">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <span className="bg-primary/10 text-primary text-xs font-mono rounded-full px-3 py-1">
                  7.4/10 CGPA
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2">B.Tech in Cybersecurity</h3>
              <h4 className="text-lg text-muted-foreground mb-6">Parul University</h4>
              
              <div className="flex flex-col gap-3 mb-8 text-sm text-muted-foreground font-mono">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>2023 - 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[hsl(187,92%,50%)]" />
                  <span>Vadodara, Gujarat</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-primary rotate-45 mt-1.5 shrink-0" />
                  <p className="text-sm">Network Security specialization</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-primary rotate-45 mt-1.5 shrink-0" />
                  <p className="text-sm">Multiple conferences</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden relative group shimmer-on-hover">
            <div className="h-1 w-full bg-gradient-to-r from-[hsl(187,92%,50%)] to-accent" />
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-primary/10 p-4 rounded-xl text-[hsl(187,92%,50%)]">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <span className="bg-primary/10 text-primary text-xs font-mono rounded-full px-3 py-1">
                  7.04/10 CGPA
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2">Diploma in I.T</h3>
              <h4 className="text-lg text-muted-foreground mb-6">L.E College</h4>
              
              <div className="flex flex-col gap-3 mb-8 text-sm text-muted-foreground font-mono">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>2020 - 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[hsl(187,92%,50%)]" />
                  <span>Morbi, Gujarat</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-primary rotate-45 mt-1.5 shrink-0" />
                  <p className="text-sm">College level tech quiz champion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
