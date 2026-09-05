import { Helmet } from "react-helmet-async";
import { CheckCircle, Share2, Calendar, BarChart2, Users, PenTool, Megaphone, ChevronRight, Check, X, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import { socialMediaFaqs as faqs } from "@/data/seo-faqs.mjs";

const WHATSAPP = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20your%20Social%20Media%20Management%20service.%20Can%20we%20discuss%3F";

const WHATSAPP_STARTER = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Social%20Media%20Starter%20plan%20(%24150%2Fmo).%20Can%20we%20discuss%3F";
const WHATSAPP_GROWTH  = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Social%20Media%20Growth%20plan%20(%24280%2Fmo).%20Can%20we%20discuss%3F";
const WHATSAPP_PRO     = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Social%20Media%20Pro%20plan%20(%24450%2Fmo).%20Can%20we%20discuss%3F";

const services = [
  {
    icon: PenTool,
    title: "Content Strategy & Planning",
    desc: "We build a clear content calendar aligned with your brand goals, deciding what to post, when to post, and why each piece matters for your audience.",
  },
  {
    icon: Share2,
    title: "Post Design & Branding",
    desc: "Eye-catching graphics, carousels, and branded visuals created for each platform. Your feed stays consistent, professional, and instantly recognisable.",
  },
  {
    icon: Calendar,
    title: "Scheduling & Publishing",
    desc: "We handle the posting, at the right time, on the right platform, every week. No more missed days or inconsistent schedules holding back your growth.",
  },
  {
    icon: Users,
    title: "Community Management",
    desc: "We respond to comments, DMs, and mentions to keep your audience engaged. Building real relationships with your followers is how organic growth happens.",
  },
  {
    icon: BarChart2,
    title: "Analytics & Reporting",
    desc: "Monthly reports showing reach, engagement, follower growth, and what's working. Data guides every decision we make for your accounts.",
  },
  {
    icon: Megaphone,
    title: "Paid Social Campaigns",
    desc: "Targeted ad campaigns on Facebook, Instagram, and TikTok to accelerate growth, drive traffic, and generate leads beyond your organic reach.",
  },
];

const reasons = [
  {
    title: "Consistent brand voice",
    desc: "Every caption, comment, and graphic reflects your brand personality. We develop a style guide for your accounts so nothing ever feels off-brand.",
  },
  {
    title: "Platform-specific strategies",
    desc: "What works on LinkedIn doesn't work on TikTok. We craft tailored strategies for each platform rather than copy-pasting the same content everywhere.",
  },
  {
    title: "Creative visuals that stop the scroll",
    desc: "Design is half the battle on social media. We produce high-quality visuals built for the fast-moving feeds your audience is scrolling through every day.",
  },
  {
    title: "Data-driven growth",
    desc: "We track performance metrics every month and adjust the strategy based on what the numbers tell us, not guesswork.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$150",
    period: "/mo",
    description: "For small businesses starting to build a social media presence.",
    featured: false,
    badge: undefined,
    whatsapp: WHATSAPP_STARTER,
    features: [
      { text: "2 platforms managed", included: true },
      { text: "8 posts per month", included: true },
      { text: "Basic graphic design", included: true },
      { text: "Content calendar", included: true },
      { text: "Community management", included: false },
      { text: "Monthly analytics report", included: false },
      { text: "Paid ad campaigns", included: false },
    ],
  },
  {
    name: "Growth",
    price: "$280",
    period: "/mo",
    description: "For growing brands that want consistent engagement and reporting.",
    featured: true,
    badge: "Most Popular",
    whatsapp: WHATSAPP_GROWTH,
    features: [
      { text: "3 platforms managed", included: true },
      { text: "16 posts per month", included: true },
      { text: "Custom graphic design", included: true },
      { text: "Content calendar", included: true },
      { text: "Community management", included: true },
      { text: "Monthly analytics report", included: true },
      { text: "Paid ad campaigns", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$450",
    period: "/mo",
    description: "Full-service social media management with paid campaigns included.",
    featured: false,
    badge: undefined,
    whatsapp: WHATSAPP_PRO,
    features: [
      { text: "4+ platforms managed", included: true },
      { text: "Unlimited posts", included: true },
      { text: "Premium graphic design", included: true },
      { text: "Content calendar", included: true },
      { text: "Community management", included: true },
      { text: "Monthly analytics report", included: true },
      { text: "Paid ad campaigns", included: true },
    ],
  },
];



const SocialMediaPage = () => (
  <LenisSmoothScroll>
    <Helmet>
      <title>Social Media Management Services | Bless Kimbi</title>
      <meta
        name="description"
        content="Professional social media management services: content strategy, post design, community management, and paid campaigns. Grow your brand online with Bless Kimbi."
      />
      <link rel="canonical" href="https://blesskimbi.com/social-media-management/" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Social Media Management Services | Bless Kimbi" />
      <meta property="og:description" content="Grow your brand with expert social media management: content strategy, graphic design, scheduling, community management, and analytics." />
      <meta property="og:url" content="https://blesskimbi.com/social-media-management/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Social Media Management Services | Bless Kimbi" />
      <meta name="twitter:description" content="Expert social media management: strategy, design, scheduling, and analytics for your brand." />
      <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
    </Helmet>

    <Navbar />
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <main className="pt-32 pb-20 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
            Social Media Services
          </span>
          <h1 className="heading-serif text-3xl sm:text-5xl md:text-6xl mb-5">
            Social Media{" "}
            <span className="text-gradient-primary">Management Services</span>
          </h1>
          <p className="text-muted-foreground font-body text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            We build and manage your brand's presence across every major platform, with
            consistent content, engaging visuals, and data-backed strategies that turn
            followers into loyal customers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
            >
              Get Started Today
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
              Our Social Media Services
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-base leading-relaxed">
              Everything your brand needs to show up consistently and grow on social media, from strategy to execution.
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
              Why Choose Our Social Media Management?
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Social media only works when it's consistent, creative, and strategic. Here's how we deliver all three.
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

        {/* ── Pricing ───────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-24">
          <div className="text-center mb-16">
            <span className="section-label">Pricing Plans</span>
            <h2 className="heading-serif text-3xl md:text-5xl mb-5 heading-underline">
              Transparent <span className="text-gold">Pricing</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Flexible monthly plans for every stage of your business. All prices are placeholders. Contact us for your exact quote.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 items-stretch">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`marsha-card flex flex-col overflow-hidden relative ${tier.featured ? "ring-2 ring-gold scale-[1.02]" : ""}`}
              >
                {tier.badge && (
                  <div className="bg-primary text-white text-xs font-bold text-center py-2 flex items-center justify-center gap-1">
                    <Zap size={11} /> {tier.badge}
                  </div>
                )}
                <div className={`p-7 flex flex-col flex-1 ${tier.featured ? "bg-primary text-white" : ""}`}>
                  <p className={`font-body font-bold text-sm uppercase tracking-widest mb-3 ${tier.featured ? "text-white/80" : "text-primary"}`}>
                    {tier.name}
                  </p>
                  <div className="mb-4">
                    <span className={`font-display font-bold text-4xl ${tier.featured ? "text-white" : "text-navy"}`}>
                      {tier.price}
                    </span>
                    <span className={`text-sm ml-1 ${tier.featured ? "text-white/70" : "text-muted-foreground font-body"}`}>{tier.period}</span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 font-body ${tier.featured ? "text-white/85" : "text-muted-foreground"}`}>{tier.description}</p>
                  <div className={`h-px mb-6 ${tier.featured ? "bg-white/20" : "bg-border"}`} />
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((feat) => (
                      <li key={feat.text} className="flex items-start gap-2.5 text-sm">
                        {feat.included ? (
                          <Check size={15} className={`mt-0.5 shrink-0 ${tier.featured ? "text-white" : "text-primary"}`} />
                        ) : (
                          <X size={15} className={`mt-0.5 shrink-0 ${tier.featured ? "text-white/55" : "text-muted-foreground/50"}`} />
                        )}
                        <span className={feat.included ? (tier.featured ? "text-white" : "text-navy font-body") : (tier.featured ? "text-white/55 line-through" : "text-muted-foreground/50 line-through font-body")}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={tier.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={tier.featured ? "btn-green w-full text-center !py-3.5" : "btn-outline-primary w-full text-center !py-3.5"}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground font-body text-sm mt-10">
            Prices shown are starting rates. Final cost depends on scope and platforms.{" "}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
              Message me for a custom quote.
            </a>
          </p>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 mb-20">
          <div className="text-center mb-12">
            <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
              Frequently Asked Questions
            </span>
            <h2 className="heading-serif text-3xl md:text-4xl">
              Social Media Management FAQs
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
            Ready to grow on social media?
          </h2>
          <p className="text-muted-foreground font-body mb-8 leading-relaxed">
            Let's build a social media presence that actually works for your business.
            Get in touch and we'll put together a strategy for your brand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
            >
              Start Your Social Growth
              <ChevronRight size={18} />
            </a>
            <a
              href="/contact/"
              className="btn-outline-navy inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-base"
            >
              Contact Us
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-muted-foreground font-body">
            <a href="/services/" className="hover:text-primary transition-colors underline underline-offset-4">All Services</a>
            <span className="text-border hidden sm:inline">·</span>
            <a href="/ui-ux-design/" className="hover:text-primary transition-colors underline underline-offset-4">UI/UX Design</a>
            <span className="text-border hidden sm:inline">·</span>
            <a href="/mobile-app-development/" className="hover:text-primary transition-colors underline underline-offset-4">Mobile App Development</a>
            <span className="text-border hidden sm:inline">·</span>
            <a href="/seo-company-in-cameroon/" className="hover:text-primary transition-colors underline underline-offset-4">SEO Services</a>
          </div>
        </section>

      </main>
      <FloatingChat />
      <ScrollToTop />
    </div>
  </LenisSmoothScroll>
);

export default SocialMediaPage;
