import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsBarSection from "@/components/StatsBarSection";
import PricingSection from "@/components/PricingSection";
import CTABannerSection from "@/components/CTABannerSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import FaqSection from "@/components/FaqSection";
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
      "addressLocality": "Buea",
      "addressCountry": "CM"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 4.155,
      "longitude": 9.241
    },
    "areaServed": ["Cameroon", "Africa", "Worldwide"],
    "serviceType": ["Web Design", "Web Development", "SEO", "Mobile App Development"]
  };

  return (
    <LenisSmoothScroll>
      <Helmet>
        <title>Bless Kimbi — Best Web Designer &amp; Developer in Cameroon</title>
        <meta name="description" content="I design and build professional websites that rank on Google and convert visitors into clients. Based in Buea, serving businesses across Cameroon and Africa." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://everythx.com/" />
        <meta property="og:title" content="Bless Kimbi — Best Web Designer &amp; Developer in Cameroon" />
        <meta property="og:description" content="I design and build professional websites that rank on Google and convert visitors into clients. Based in Buea, serving businesses across Cameroon and Africa." />
        <meta property="og:url" content="https://everythx.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://everythx.com/og-image.png" />
        <meta name="twitter:title" content="Bless Kimbi — Best Web Designer &amp; Developer in Cameroon" />
        <meta name="twitter:description" content="I design and build professional websites that rank on Google and convert visitors into clients. Based in Buea, serving businesses across Cameroon and Africa." />
        <meta name="twitter:image" content="https://everythx.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      <Navbar />
      <div className="relative min-h-screen bg-white overflow-x-clip">
        <HeroSection />
        <ServicesSection />
        <ValuePropsSection />
        <StatsBarSection />
        <ProjectsSection />
        <PricingSection />
        <CTABannerSection />
        <BlogPreviewSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
        <FloatingChat />
        <ScrollToTop />
      </div>
    </LenisSmoothScroll>
  );
};

export default Index;
