import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";

const ServicesPage = () => (
    <LenisSmoothScroll>
        <Helmet>
            <title>Web Design &amp; Development Services | Bless Kimbi — Cameroon</title>
            <meta name="description" content="Professional web design, SEO, social media management &amp; mobile app development. Based in Buea — helping businesses across Cameroon and Africa grow online." />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://blesskimbi.com/services/" />
            <meta property="og:title" content="Web Design &amp; Development Services | Bless Kimbi" />
            <meta property="og:description" content="Professional web design, SEO, social media management &amp; mobile app development. Based in Buea — helping businesses across Cameroon and Africa grow online." />
            <meta property="og:url" content="https://blesskimbi.com/services/" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Web Design &amp; Development Services | Bless Kimbi" />
            <meta name="twitter:description" content="Professional web design, SEO optimization, social media management, mobile app development and more. Based in Buea, serving businesses across Cameroon and Africa." />
            <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
        </Helmet>

        <Navbar />
        <div className="relative min-h-screen bg-background overflow-x-clip">
            <div className="pt-20">
                <div className="max-w-6xl mx-auto px-6 pt-12 pb-2 text-center">
                    <span className="section-label">Services</span>
                    <h1 className="heading-serif text-4xl md:text-6xl mb-4">
                        Web Design <span className="text-gradient-primary">Services</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Professional web design, development, SEO, and mobile apps for businesses in Cameroon and Africa.
                    </p>
                </div>
                <ServicesSection />
                <CaseStudiesSection />
                <PricingSection />
                <ContactSection />
            </div>
            <FloatingChat />
            <ScrollToTop />
        </div>
    </LenisSmoothScroll>
);

export default ServicesPage;
