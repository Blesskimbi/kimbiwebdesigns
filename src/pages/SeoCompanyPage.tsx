import { Helmet } from "react-helmet-async";
import { CheckCircle, Search, BarChart2, Globe, Link2, FileText, Star, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import { seoCompanyFaqs as faqs } from "@/data/seo-faqs.mjs";

const services = [
  {
    icon: Search,
    title: "Keyword Research & Strategy",
    desc: "We identify the exact keywords your target customers search for in Cameroon and across Africa, then build your entire SEO strategy around them.",
  },
  {
    icon: FileText,
    title: "On-Page SEO Optimisation",
    desc: "Title tags, meta descriptions, heading structure, internal linking, image alt text. Every page on your site is fully optimised to rank.",
  },
  {
    icon: Link2,
    title: "Link Building",
    desc: "We build high-quality backlinks from relevant, authoritative websites to increase your domain authority and push your rankings higher.",
  },
  {
    icon: Globe,
    title: "Local SEO for Cameroon",
    desc: "Dominate local search results in Yaoundé, Douala, Buea, and beyond. We optimise your Google Business Profile and local citations so customers find you first.",
  },
  {
    icon: BarChart2,
    title: "Technical SEO Audits",
    desc: "Site speed, Core Web Vitals, mobile-friendliness, crawlability. We fix the technical issues that stop Google from ranking your site.",
  },
  {
    icon: Star,
    title: "Content SEO",
    desc: "SEO-optimised blog posts and landing pages that attract organic traffic and convert visitors into paying clients.",
  },
];

const reasons = [
  {
    title: "We build the websites too",
    desc: "Unlike agencies that only do SEO, we also design and develop websites. This means your SEO and site performance are handled together, with no miscommunication between teams.",
  },
  {
    title: "Real results in Cameroon",
    desc: "We understand the Cameroonian and African digital market. We know which keywords your local audience actually searches and how to outrank competitors in your city.",
  },
  {
    title: "Transparent reporting",
    desc: "Monthly reports showing exactly where you rank, how much traffic you're getting, and what we're doing next. No jargon, no surprises.",
  },
  {
    title: "50+ projects delivered",
    desc: "From small businesses in Buea to e-commerce stores serving all of Africa, we've consistently delivered websites and SEO strategies that generate real results.",
  },
  {
    title: "Google-approved techniques only",
    desc: "We use only white-hat, Google-compliant SEO methods. No risky shortcuts that could get your site penalised, just sustainable growth.",
  },
];



const SeoCompanyPage = () => (
  <LenisSmoothScroll>
    <Helmet>
      <title>Best SEO Company in Cameroon | Bless Kimbi</title>
      <meta
        name="description"
        content="Looking for the best SEO company in Cameroon? Bless Kimbi offers expert SEO services in Yaoundé, Douala & Buea, helping businesses rank on Google and grow online."
      />
      <link rel="canonical" href="https://blesskimbi.com/seo-company-in-cameroon/" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Best SEO Company in Cameroon | Bless Kimbi" />
      <meta property="og:description" content="Expert SEO services in Cameroon: keyword research, on-page SEO, local SEO, link building and technical audits. Get found on Google." />
      <meta property="og:url" content="https://blesskimbi.com/seo-company-in-cameroon/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Best SEO Company in Cameroon | Bless Kimbi" />
      <meta name="twitter:description" content="Expert SEO services in Cameroon: keyword research, on-page SEO, local SEO, link building and technical audits." />
      <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
    </Helmet>

    <Navbar />
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <main className="pt-32 pb-20 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
            SEO Services in Cameroon
          </span>
          <h1 className="heading-serif text-3xl sm:text-5xl md:text-6xl mb-5">
            Best <span className="text-gradient-primary">SEO Company</span>{" "}
            in Cameroon
          </h1>
          <p className="text-muted-foreground font-body text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            We help businesses in Yaoundé, Douala, Buea, and across Africa rank
            higher on Google, attract more organic traffic, and convert visitors
            into paying clients, without relying on paid ads.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
            >
              Get a Free SEO Audit
              <ChevronRight size={18} />
            </a>
            <a
              href="/services/"
              className="btn-outline-navy inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-base"
            >
              View All Services
            </a>
          </div>
        </section>

        {/* ── What We Offer ─────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-24">
          <div className="text-center mb-14">
            <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
              What We Offer
            </span>
            <h2 className="heading-serif text-3xl md:text-5xl mb-4">
              Our SEO Services
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-base leading-relaxed">
              A complete SEO service tailored for businesses in Cameroon and Africa, from
              initial audit to ongoing monthly growth.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="internal-card hover:border-primary/30 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="internal-card-title">{title}</h3>
                <p className="internal-card-text">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Us ────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 mb-24">
          <div className="text-center mb-14">
            <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
              Why Us
            </span>
            <h2 className="heading-serif text-3xl md:text-5xl mb-4">
              Why Choose Our SEO Services?
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              There are many agencies claiming to do SEO in Cameroon. Here's what makes us different.
            </p>
          </div>
          <div className="space-y-5">
            {reasons.map(({ title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 internal-card hover:border-primary/20 transition-colors duration-300"
              >
                <CheckCircle size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="internal-card-title mb-1">{title}</h3>
                  <p className="internal-card-text">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── External context ────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <div className="bg-gradient-to-br from-primary/10 to-blue-900/10 border border-primary/15 rounded-2xl p-6 sm:p-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-navy mb-4">
              SEO in the African context
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              SEO for businesses in Cameroon requires a different approach than a generic
              global strategy. Internet usage is growing rapidly across Africa, with more
              people searching on mobile than desktop. Local search intent, language
              nuances (French and English), and competition levels vary significantly
              between Yaoundé, Douala, and smaller cities.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              We stay updated on how Google ranks content in the African market. Other
              respected voices in the African web industry, such as{" "}
              <a
                href="https://www.websitedesigner.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                WebsiteDesigner.ng
              </a>{" "}
              and{" "}
              <a
                href="https://cyprogram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Cyprogram
              </a>{", "}
              highlight the importance of mobile-first design and local SEO
              signals for businesses operating across the continent.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              Our SEO work is always paired with{" "}
              <a href="/services/" className="text-primary hover:underline">
                professional web design
              </a>{" "}
              and{" "}
              <a href="/ecommerce-website-design-in-cameroon/" className="text-primary hover:underline">
                e-commerce development
              </a>{" "}
              because a fast, well-structured website is the foundation every
              SEO strategy is built on.
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 mb-20">
          <div className="text-center mb-12">
            <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
              Frequently Asked Questions
            </span>
            <h2 className="heading-serif text-3xl md:text-4xl">
              SEO Services FAQs
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group internal-card !p-0 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-navy font-semibold font-body hover:text-primary transition-colors">
                  {q}
                  <span className="shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                </summary>
                <p className="px-6 pb-5 text-muted-foreground font-body leading-relaxed text-sm border-t border-border pt-4">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 text-center mb-10">
          <h2 className="heading-serif text-3xl md:text-4xl mb-4">
            Ready to rank on Google?
          </h2>
          <p className="text-muted-foreground font-body mb-8 leading-relaxed">
            Get a free SEO audit for your website. We'll identify exactly what's
            holding you back and show you how to fix it.
          </p>
          <a
            href="/contact/"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
          >
            Get Your Free SEO Audit
            <ChevronRight size={18} />
          </a>
        </section>

      </main>
      <FloatingChat />
      <ScrollToTop />
    </div>
  </LenisSmoothScroll>
);

export default SeoCompanyPage;
