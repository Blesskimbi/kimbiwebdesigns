import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";

const ServicesPage = () => (
    <LenisSmoothScroll>
        <Helmet>
            <title>Web Design &amp; Development Services | Bless Kimbi — Cameroon</title>
            <meta name="description" content="Professional web design, SEO, social media management &amp; mobile app development. Based in Yaoundé — helping businesses across Cameroon and Africa grow online." />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://everythx.com/services" />
            <meta property="og:title" content="Web Design &amp; Development Services | Bless Kimbi" />
            <meta property="og:description" content="Professional web design, SEO, social media management &amp; mobile app development. Based in Yaoundé — helping businesses across Cameroon and Africa grow online." />
            <meta property="og:url" content="https://everythx.com/services" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://everythx.com/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Web Design &amp; Development Services | Bless Kimbi" />
            <meta name="twitter:description" content="Professional web design, SEO optimization, social media management, mobile app development and more. Based in Yaoundé, serving businesses across Cameroon and Africa." />
            <meta name="twitter:image" content="https://everythx.com/og-image.png" />
            <script type="application/ld+json">{JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Web Design & Development",
                "provider": {
                    "@type": "Person",
                    "name": "Bless Kimbi",
                    "url": "https://everythx.com"
                },
                "areaServed": ["Cameroon", "Africa", "Worldwide"],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Web Design Services",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Design" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Optimisation" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce Development" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Management" } }
                    ]
                }
            })}</script>
        </Helmet>

        <div className="relative min-h-screen bg-background overflow-x-hidden">
            <ParticleBackground />
            <Navbar />
            <div className="pt-20">
                <div className="max-w-6xl mx-auto px-6 pt-12 pb-2 text-center">
                    <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-4">
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
