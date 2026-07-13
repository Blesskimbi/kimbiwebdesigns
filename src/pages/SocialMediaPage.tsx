import { Helmet } from "react-helmet-async";
import { CheckCircle, Share2, Calendar, BarChart2, Users, PenTool, Megaphone, ChevronRight, Check, X, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";

const WHATSAPP = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20your%20Social%20Media%20Management%20service.%20Can%20we%20discuss%3F";

const WHATSAPP_STARTER = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Social%20Media%20Starter%20plan%20(%24150%2Fmo).%20Can%20we%20discuss%3F";
const WHATSAPP_GROWTH  = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Social%20Media%20Growth%20plan%20(%24280%2Fmo).%20Can%20we%20discuss%3F";
const WHATSAPP_PRO     = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Social%20Media%20Pro%20plan%20(%24450%2Fmo).%20Can%20we%20discuss%3F";

const services = [
  {
    icon: PenTool,
    title: "Content Strategy & Planning",
    desc: "We build a clear content calendar aligned with your brand goals — deciding what to post, when to post, and why each piece matters for your audience.",
  },
  {
    icon: Share2,
    title: "Post Design & Branding",
    desc: "Eye-catching graphics, carousels, and branded visuals created for each platform. Your feed stays consistent, professional, and instantly recognisable.",
  },
  {
    icon: Calendar,
    title: "Scheduling & Publishing",
    desc: "We handle the posting — at the right time, on the right platform, every week. No more missed days or inconsistent schedules holding back your growth.",
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
    desc: "We track performance metrics every month and adjust the strategy based on what the numbers tell us — not guesswork.",
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

const faqs = [
  {
    q: "What platforms do you manage?",
    a: "We manage Instagram, Facebook, LinkedIn, TikTok, X (Twitter), and Pinterest. The platforms we focus on depend on where your target audience spends their time — we'll recommend the best combination for your business during our initial consultation.",
  },
  {
    q: "How long before I see results?",
    a: "Organic social media growth takes time. Most clients start seeing consistent engagement improvements within 4–8 weeks, and meaningful follower growth within 3 months of a consistent strategy. Paid campaigns can produce faster visibility and traffic.",
  },
  {
    q: "Do you create the graphics too?",
    a: "Yes. Post design is included in all packages. We create branded graphics, carousels, story templates, and any other visual assets your accounts need — everything is aligned to your brand colours, fonts, and tone.",
  },
  {
    q: "Can I approve posts before they go live?",
    a: "Absolutely. We share the content calendar and all posts with you in advance for review and approval. Nothing goes live without your sign-off if that's your preference — we can also work with a delegated approval workflow if you'd prefer less back-and-forth.",
  },
  {
    q: "Do you run paid ads?",
    a: "Paid social campaigns are included in the Pro plan and can be added to any other plan. We handle ad creative, targeting, budgeting, and reporting. Ad spend is billed separately and managed transparently.",
  },
];

const SocialMediaPage = () => (
  <LenisSmoothScroll>
    <Helmet>
      <title>Social Media Management Services | Bless Kimbi</title>
      <meta
        name="description"
        content="Professional social media management services — content strategy, post design, community management, and paid campaigns. Grow your brand online with Bless Kimbi."
      />
      <link rel="canonical" href="https://everythx.com/social-media-management/" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Social Media Management Services | Bless Kimbi" />
      <meta property="og:description" content="Grow your brand with expert social media management — content strategy, graphic design, scheduling, community management, and analytics." />
      <meta property="og:url" content="https://everythx.com/social-media-management/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://everythx.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Social Media Management Services | Bless Kimbi" />
      <meta name="twitter:description" content="Expert social media management — strategy, design, scheduling, and analytics for your brand." />
      <meta name="twitter:image" content="https://everythx.com/og-image.png" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a },
        })),
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Social Media Management",
        "name": "Social Media Management Services",
        "provider": {
          "@type": "Person",
          "name": "Bless Kimbi",
          "url": "https://everythx.com",
        },
        "url": "https://everythx.com/social-media-management/",
        "description": "Professional social media management — content strategy, post design, scheduling, community management, analytics, and paid campaigns.",
      })}</script>
    </Helmet>

    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <ParticleBackground />
      <Navbar />

      <main className="pt-32 pb-20 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
            Social Media Services
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-tight mb-5">
            Social Media{" "}
            <span className="text-gradient-primary">Management Services</span>
          </h1>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            We build and manage your brand's presence across every major platform —
            consistent content, engaging visuals, and data-backed strategies that turn
            followers into loyal customers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(79,142,240,0.5)] transition-all duration-300"
            >
              Get Started Today
              <ChevronRight size={18} />
            </a>
            <a
              href="/services/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-display font-semibold text-base hover:border-primary/40 transition-all duration-300"
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
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
              Our Social Media Services
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
              Everything your brand needs to show up consistently and grow on social media — from strategy to execution.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-primary/30 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
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
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
              Why Choose Our Social Media Management?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Social media only works when it's consistent, creative, and strategic. Here's how we deliver all three.
            </p>
          </div>
          <div className="space-y-5">
            {reasons.map(({ title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-primary/20 transition-colors duration-300"
              >
                <CheckCircle size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-white text-base mb-1">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative text-center mb-16">
            <span className="text-orange-400 font-body text-sm tracking-widest uppercase mb-4 block">
              Pricing Plans
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-5">
              Transparent{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                Pricing
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Flexible monthly plans for every stage of your business. All prices are placeholders — contact us for your exact quote.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 items-stretch relative">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border transition-all duration-500 overflow-hidden
                  ${tier.featured
                    ? "bg-gradient-to-b from-orange-500/15 to-orange-900/10 border-orange-500/40 shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)] scale-[1.02] z-10"
                    : "bg-white/3 border-white/8 hover:border-white/20"
                  }`}
              >
                {tier.badge && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-b-xl flex items-center gap-1">
                      <Zap size={11} /> {tier.badge}
                    </span>
                  </div>
                )}
                <div className={`p-7 flex flex-col flex-1 ${tier.badge ? "pt-10" : ""}`}>
                  <p className={`font-display font-bold text-sm uppercase tracking-widest mb-3 ${tier.featured ? "text-orange-400" : "text-gray-400"}`}>
                    {tier.name}
                  </p>
                  <div className="mb-4">
                    <span className={`font-display font-bold text-4xl ${tier.featured ? "text-orange-400" : "text-white"}`}>
                      {tier.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">{tier.period}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{tier.description}</p>
                  <div className={`h-px mb-6 ${tier.featured ? "bg-orange-500/20" : "bg-white/8"}`} />
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((feat) => (
                      <li key={feat.text} className="flex items-start gap-2.5 text-sm">
                        {feat.included ? (
                          <Check size={15} className={`mt-0.5 shrink-0 ${tier.featured ? "text-orange-400" : "text-primary"}`} />
                        ) : (
                          <X size={15} className="mt-0.5 shrink-0 text-gray-600" />
                        )}
                        <span className={feat.included ? "text-gray-200" : "text-gray-600 line-through"}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={tier.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-300
                      ${tier.featured
                        ? "bg-orange-500 hover:bg-orange-400 text-white shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:shadow-[0_0_35px_rgba(249,115,22,0.5)]"
                        : "bg-white/8 hover:bg-white/15 text-white border border-white/10 hover:border-white/20"
                      }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-10">
            Prices shown are starting rates. Final cost depends on scope and platforms.{" "}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
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
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Social Media Management FAQs
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white/3 border border-white/8 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-white font-semibold hover:text-primary transition-colors">
                  {q}
                  <span className="shrink-0 text-gray-400 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                </summary>
                <p className="px-6 pb-5 text-gray-400 leading-relaxed text-sm border-t border-white/5 pt-4">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 text-center mb-10">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to grow on social media?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Let's build a social media presence that actually works for your business.
            Get in touch and we'll put together a strategy for your brand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(79,142,240,0.5)] transition-all duration-300"
            >
              Start Your Social Growth
              <ChevronRight size={18} />
            </a>
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-display font-semibold text-base hover:border-primary/40 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-gray-500">
            <a href="/services/" className="hover:text-primary transition-colors underline underline-offset-4">All Services</a>
            <span className="text-white/20 hidden sm:inline">·</span>
            <a href="/ui-ux-design/" className="hover:text-primary transition-colors underline underline-offset-4">UI/UX Design</a>
            <span className="text-white/20 hidden sm:inline">·</span>
            <a href="/mobile-app-development/" className="hover:text-primary transition-colors underline underline-offset-4">Mobile App Development</a>
            <span className="text-white/20 hidden sm:inline">·</span>
            <a href="/seo-company-in-cameroon/" className="hover:text-primary transition-colors underline underline-offset-4">SEO Services</a>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingChat />
      <ScrollToTop />
    </div>
  </LenisSmoothScroll>
);

export default SocialMediaPage;
