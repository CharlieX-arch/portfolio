import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { CertificationsSection } from "@/components/certifications-section"
import { EducationSection } from "@/components/education-section"
import { Footer } from "@/components/footer"
import { ParticleNetworkWrapper } from "@/components/particle-network-wrapper"
import { CursorTrailWrapper } from "@/components/cursor-trail-wrapper"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionNavigation } from "@/components/section-navigation"

export default function Page() {
  return (
    <main className="relative min-h-screen noise">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Ambient background effects */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0" aria-hidden="true" />
      <ParticleNetworkWrapper />
      <CursorTrailWrapper />

      {/* Overlay UI */}
      <Navbar />
      <SectionNavigation />

      {/* Content sections */}
      <HeroSection />

      <div className="section-line mx-auto max-w-4xl" />
      <ExperienceSection />

      <div className="section-line mx-auto max-w-4xl" />
      <EducationSection />

      <div className="section-line mx-auto max-w-4xl" />
      <SkillsSection />

      <div className="section-line mx-auto max-w-4xl" />
      <CertificationsSection />

      <div className="section-line mx-auto max-w-4xl" />
      <ProjectsSection />

      <div className="section-line mx-auto max-w-4xl" />
      <Footer />
    </main>
  )
}
