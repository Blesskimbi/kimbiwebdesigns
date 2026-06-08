import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";

const ServicesPage = () => (
    <LenisSmoothScroll>
        <Helmet>
            <title>Web Design &amp; Development Services | Blesskimbi</title>
            <meta name="description" content="Professional web design, SEO optimization, social media management, mobile app development and more. Serving clients globally." />
            <link rel="canonical" href="https://everythx.com/services" />
            <meta property="og:title" content="Web Design &amp; Development Services | Blesskimbi" />
            <meta property="og:description" content="Professional web design, SEO optimization, social media management, mobile app development and more. Serving clients globally." />
            <meta property="og:url" content="https://everythx.com/services" />
            <meta property="og:type" content="website" />
        </Helmet>

        <div className="relative min-h-screen bg-background overflow-x-hidden">
            <ParticleBackground />
            <Navbar />
            <div className="pt-20">
                <ServicesSection />
                <PricingSection />
                <ContactSection />
            </div>
            <FloatingChat />
            <ScrollToTop />
        </div>
    </LenisSmoothScroll>
);

export default ServicesPage;
