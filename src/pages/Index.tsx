import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";

const Index = () => {
  return (
    <LenisSmoothScroll>
      <div className="relative min-h-screen bg-background">
        <ParticleBackground />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </LenisSmoothScroll>
  );
};

export default Index;
