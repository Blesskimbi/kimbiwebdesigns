import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Users, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";

const AboutPage = () => (
  <LenisSmoothScroll>
    <Helmet>
      <title>About Bless Kimbi | Web Designer & Developer in Cameroon</title>
      <meta
        name="description"
        content="Learn about Bless Kimbi — web designer and developer based in Cameroon. My process, skills, experience, and the free dev mentorship community I run."
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://blesskimbi.com/about/" />
      <meta property="og:title" content="About Bless Kimbi | Web Designer & Developer in Cameroon" />
      <meta
        property="og:description"
        content="Learn about Bless Kimbi — web designer and developer based in Cameroon. My process, skills, experience, and the free dev mentorship community I run."
      />
      <meta property="og:url" content="https://blesskimbi.com/about/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About Bless Kimbi | Web Designer & Developer in Cameroon" />
      <meta
        name="twitter:description"
        content="Learn about Bless Kimbi — web designer and developer based in Cameroon. My process, skills, experience, and the free dev mentorship community I run."
      />
      <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
    </Helmet>

    <Navbar />
    <div className="relative min-h-screen bg-white overflow-x-clip">

      <main>
        <AboutSection isPage />
        <ProcessSection />
        <SkillsSection />
        <ExperienceSection />

        <section className="section-cta border-t border-border">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="marsha-card p-8 md:p-12">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users size={24} className="text-primary" />
              </div>
              <span className="section-label">Give Back</span>
              <h2 className="heading-serif text-3xl md:text-4xl mb-4">
                Free Dev Mentorship <span className="text-primary">Community</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 font-body leading-relaxed">
                I run a free WhatsApp community for beginners and aspiring developers who want
                to learn web and mobile development, get code reviews, and grow together.
              </p>
              <Link to="/community" className="btn-green inline-flex items-center gap-2">
                Explore the Community <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FloatingChat />
      <ScrollToTop />
    </div>
  </LenisSmoothScroll>
);

export default AboutPage;
