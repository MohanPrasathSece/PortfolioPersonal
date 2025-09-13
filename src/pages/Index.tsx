import HeroSection from "@/components/portfolio/HeroSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import DSASection from "@/components/portfolio/DSASection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import AchievementsSection from "@/components/portfolio/AchievementsSection";
import CertificationsSection from "@/components/portfolio/CertificationsSection";
import DesignSection from "@/components/portfolio/DesignSection";
import PhotographySection from "@/components/portfolio/PhotographySection";
import ContactSection from "@/components/portfolio/ContactSection";

const Index = () => {
  return (
    <main className="bg-background text-foreground relative">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* DSA & LeetCode Section */}
      <DSASection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Achievements Section */}
      <AchievementsSection />
      
      {/* Certifications Section */}
      <CertificationsSection />
      
      {/* Design Section */}
      <DesignSection />
      
      {/* Photography Section */}
      <PhotographySection />
      
      {/* Contact Section */}
      <ContactSection />

    </main>
  );
};

export default Index;