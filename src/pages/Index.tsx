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
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Bless Kimbi",
    "url": "https://everythx.com",
    "telephone": "+237675126845",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Yaoundé",
      "addressCountry": "CM"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 3.848,
      "longitude": 11.502
    },
    "areaServed": ["Cameroon", "Africa", "Worldwide"],
    "serviceType": ["Web Design", "Web Development", "SEO", "Mobile App Development"]
  };

  return (
    <LenisSmoothScroll>
      <Helmet>
        <title>Bless Kimbi — Best Web Designer &amp; Developer in Cameroon</title>
        <meta name="description" content="I design and build professional websites that rank on Google and convert visitors into clients. Based in Yaoundé, serving businesses across Cameroon and Africa." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://everythx.com/" />
        <meta property="og:title" content="Bless Kimbi — Best Web Designer &amp; Developer in Cameroon" />
        <meta property="og:description" content="I design and build professional websites that rank on Google and convert visitors into clients. Based in Yaoundé, serving businesses across Cameroon and Africa." />
        <meta property="og:url" content="https://everythx.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://everythx.com/og-image.png" />
        <meta name="twitter:title" content="Bless Kimbi — Best Web Designer &amp; Developer in Cameroon" />
        <meta name="twitter:description" content="I design and build professional websites that rank on Google and convert visitors into clients. Based in Yaoundé, serving businesses across Cameroon and Africa." />
        <meta name="twitter:image" content="https://everythx.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
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
