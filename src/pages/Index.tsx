import { Helmet } from "react-helmet-async";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <LenisSmoothScroll>
      <Helmet>
        <title>Blesskimbi | Web Designer &amp; Developer</title>
        <meta name="description" content="Blesskimbi builds fast, modern websites and mobile apps for businesses worldwide. Get a professional website that ranks on Google and converts visitors." />
        <link rel="canonical" href="https://everythx.com" />
        <meta property="og:title" content="Blesskimbi | Web Designer &amp; Developer" />
        <meta property="og:description" content="Blesskimbi builds fast, modern websites and mobile apps for businesses worldwide. Get a professional website that ranks on Google and converts visitors." />
        <meta property="og:url" content="https://everythx.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Blesskimbi | Web Designer &amp; Developer" />
        <meta name="twitter:description" content="Blesskimbi builds fast, modern websites and mobile apps for businesses worldwide. Get a professional website that ranks on Google and converts visitors." />
      </Helmet>
      <div className="relative min-h-screen bg-background overflow-x-hidden border-x border-transparent">
        <ParticleBackground />
        <Navbar />
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <div className="hidden sm:block"><ProcessSection /></div>
        <SkillsSection />
        <div className="hidden sm:block"><ExperienceSection /></div>
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
        <FloatingChat />
        <ScrollToTop />
      </div>
    </LenisSmoothScroll>
  );
};

export default Index;
