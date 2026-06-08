import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";

const ContactPage = () => (
    <LenisSmoothScroll>
        <Helmet>
            <title>Contact Blesskimbi | Let&apos;s Build Something Great</title>
            <meta name="description" content="Ready to start your project? Contact Blesskimbi for web design, SEO, and mobile app development services." />
            <link rel="canonical" href="https://everythx.com/contact" />
            <meta property="og:title" content="Contact Blesskimbi | Let's Build Something Great" />
            <meta property="og:description" content="Ready to start your project? Contact Blesskimbi for web design, SEO, and mobile app development services." />
            <meta property="og:url" content="https://everythx.com/contact" />
            <meta property="og:type" content="website" />
        </Helmet>

        <div className="relative min-h-screen bg-background overflow-x-hidden">
            <ParticleBackground />
            <Navbar />
            <div className="pt-20">
                <ContactSection />
            </div>
            <FloatingChat />
            <ScrollToTop />
        </div>
    </LenisSmoothScroll>
);

export default ContactPage;
