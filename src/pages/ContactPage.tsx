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
            <title>Contact Bless Kimbi | Web Designer in Cameroon</title>
            <meta name="description" content="Ready to start your project? Contact Bless Kimbi, web designer based in Yaoundé, Cameroon. Get a free quote for your website within 24 hours." />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://everythx.com/contact" />
            <meta property="og:title" content="Contact Bless Kimbi | Web Designer in Cameroon" />
            <meta property="og:description" content="Ready to start your project? Contact Bless Kimbi, web designer based in Yaoundé, Cameroon. Get a free quote within 24 hours." />
            <meta property="og:url" content="https://everythx.com/contact" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://everythx.com/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Contact Bless Kimbi | Web Designer in Cameroon" />
            <meta name="twitter:description" content="Ready to start your project? Contact Bless Kimbi, web designer based in Yaoundé, Cameroon. Get a free quote within 24 hours." />
            <meta name="twitter:image" content="https://everythx.com/og-image.png" />
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
