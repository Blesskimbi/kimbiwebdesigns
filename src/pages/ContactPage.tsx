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
                <div className="max-w-5xl mx-auto px-6 pt-12 pb-2 text-center">
                    <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-4">
                        Get In <span className="text-gradient-primary">Touch</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Ready to build your professional website? Let's talk about your project.
                    </p>
                </div>
                <ContactSection />
            </div>
            <FloatingChat />
            <ScrollToTop />
        </div>
    </LenisSmoothScroll>
);

export default ContactPage;
