import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import StatsBarSection from "@/components/StatsBarSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <LenisSmoothScroll>
      <Helmet>
        <title>Bless Kimbi: Best Web Designer &amp; Developer in Cameroon</title>
        <meta name="description" content="I design and build professional websites that rank on Google and convert visitors into clients. Based in Buea, serving businesses across Cameroon and Africa." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://blesskimbi.com/" />
        <meta property="og:title" content="Bless Kimbi: Best Web Designer &amp; Developer in Cameroon" />
        <meta property="og:description" content="I design and build professional websites that rank on Google and convert visitors into clients. Based in Buea, serving businesses across Cameroon and Africa." />
        <meta property="og:url" content="https://blesskimbi.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
        <meta name="twitter:title" content="Bless Kimbi: Best Web Designer &amp; Developer in Cameroon" />
        <meta name="twitter:description" content="I design and build professional websites that rank on Google and convert visitors into clients. Based in Buea, serving businesses across Cameroon and Africa." />
        <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
      </Helmet>
      <Navbar />
      <div className="relative min-h-screen bg-white overflow-x-clip">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ValuePropsSection />
        <StatsBarSection />
        <BlogPreviewSection />
        <TestimonialsSection />
        <FaqSection />
        <FloatingChat />
        <ScrollToTop />
      </div>
    </LenisSmoothScroll>
  );
};

export default Index;
