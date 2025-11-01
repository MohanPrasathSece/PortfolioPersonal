import { Suspense, lazy } from "react";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import DSASection from "@/components/portfolio/DSASection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import OpenSourceSection from "@/components/portfolio/OpenSourceSection";
import ZyraDigitalsSection from "@/components/portfolio/ZyraDigitalsSection";
import ContactSection from "@/components/portfolio/ContactSection";

// Lazy-load lower-priority sections to reduce initial JS for mobile
const AchievementsSection = lazy(() => import("@/components/portfolio/AchievementsSection"));
const CertificationsSection = lazy(() => import("@/components/portfolio/CertificationsSection"));
const DesignSection = lazy(() => import("@/components/portfolio/DesignSection"));
const PhotographySection = lazy(() => import("@/components/portfolio/PhotographySection"));

const Index = () => {
  return (
    <main className="bg-background text-foreground relative text-[10px] md:text-base pt-8 md:pt-12">
      <Navbar />
      {/* Hero Section */}
      <HeroSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* Projects Section */}
      <ProjectsSection />

      {/* Achievements Section */}
      <Suspense fallback={<div className="py-10 text-center text-sm text-gray-text">Loading achievements…</div>}>
        <AchievementsSection />
      </Suspense>

      {/* Zyra Digitals Section (placed next to achievements and open source) */}
      <ZyraDigitalsSection />

      {/* Open Source Contributions */}
      <OpenSourceSection />

      {/* DSA & LeetCode Section */}
      <DSASection />
      
      {/* Certifications Section */}
      <Suspense fallback={<div className="py-10 text-center text-sm text-gray-text">Loading certifications…</div>}>
        <CertificationsSection />
      </Suspense>
      
      {/* Design Section */}
      <Suspense fallback={<div className="py-10 text-center text-sm text-gray-text">Loading design showcase…</div>}>
        <DesignSection />
      </Suspense>
      
      {/* Photography Section */}
      <Suspense fallback={<div className="py-10 text-center text-sm text-gray-text">Loading photography…</div>}>
        <PhotographySection />
      </Suspense>

      {/* Contact Section */}
      <ContactSection />

    </main>
  );
};

export default Index;