import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";

const ContactPage = () => (
    <LenisSmoothScroll>
        <Helmet>
            <title>Contact Bless Kimbi | Web Designer in Cameroon</title>
            <meta name="description" content="Ready to start your project? Contact Bless Kimbi, web designer based in Yaoundé, Cameroon. Get a free quote for your website within 24 hours." />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://everythx.com/contact/" />
            <meta property="og:title" content="Contact Bless Kimbi | Web Designer in Cameroon" />
            <meta property="og:description" content="Ready to start your project? Contact Bless Kimbi, web designer based in Yaoundé, Cameroon. Get a free quote within 24 hours." />
            <meta property="og:url" content="https://everythx.com/contact/" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://everythx.com/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Contact Bless Kimbi | Web Designer in Cameroon" />
            <meta name="twitter:description" content="Ready to start your project? Contact Bless Kimbi, web designer based in Yaoundé, Cameroon. Get a free quote within 24 hours." />
            <meta name="twitter:image" content="https://everythx.com/og-image.png" />
        </Helmet>

        <Navbar />
        <div className="relative min-h-screen bg-white overflow-x-clip">
            <div className="pt-24">
                <ContactSection isPage />
            </div>
            <FloatingChat />
            <ScrollToTop />
        </div>
    </LenisSmoothScroll>
);

export default ContactPage;
