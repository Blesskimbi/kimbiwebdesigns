import { Helmet } from "react-helmet-async";
import { CheckCircle, Smartphone, Monitor, Tablet, Palette, Server, Upload, ChevronRight, Check, X, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import { mobileAppFaqs as faqs } from "@/data/seo-faqs.mjs";

const WHATSAPP = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20Mobile%20App%20Development.%20Can%20we%20discuss%3F";

const WHATSAPP_BASIC    = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Basic%20App%20package%20(%24800).%20Can%20we%20discuss%3F";
const WHATSAPP_STANDARD = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Standard%20App%20package%20(%241%2C500).%20Can%20we%20discuss%3F";
const WHATSAPP_CUSTOM   = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20a%20Custom%20App%20project.%20Can%20we%20discuss%3F";

const services = [
  {
    icon: Monitor,
    title: "Cross-Platform Development (React Native)",
    desc: "One codebase, two platforms. We build apps with React Native so your product ships on both iOS and Android simultaneously — saving time and budget without sacrificing quality.",
  },
  {
    icon: Tablet,
    title: "iOS App Development",
    desc: "Native-feeling iOS applications built for iPhone and iPad. We follow Apple's Human Interface Guidelines to deliver polished experiences that pass App Store review the first time.",
  },
  {
    icon: Smartphone,
    title: "Android App Development",
    desc: "Smooth, performant Android apps built for the full range of devices your users carry. Optimised for the Google Play Store and real-world usage patterns.",
  },
  {
    icon: Palette,
    title: "App UI/UX Design",
    desc: "Great apps start with great design. We create intuitive, beautiful interfaces in Figma before a single line of code is written — so the build phase is fast and focused.",
  },
  {
    icon: Server,
    title: "API & Backend Integration",
    desc: "We connect your app to the backend systems, third-party APIs, and databases it needs — from authentication and payments to real-time data and push notifications.",
  },
  {
    icon: Upload,
    title: "App Store Publishing",
    desc: "We handle the full submission process for both the Apple App Store and Google Play Store, including screenshots, metadata, compliance review, and launch coordination.",
  },
];

const reasons = [
  {
    title: "One codebase, two platforms — saves time and budget",
    desc: "React Native lets us build once and deploy to both iOS and Android. That means roughly half the development time and cost compared to building two separate native apps.",
  },
  {
    title: "Native-feeling performance",
    desc: "React Native compiles to actual native components — not a web view. Your users get the smooth, responsive experience they expect from a premium app.",
  },
  {
    title: "Full-stack capability (frontend + backend)",
    desc: "We handle everything from the UI you see on screen to the server and database running behind it. No coordination overhead between separate frontend and backend teams.",
  },
  {
    title: "Post-launch support and updates",
    desc: "The work doesn't end at launch. We offer ongoing support packages to handle bug fixes, OS updates, new features, and App Store re-submissions as your product evolves.",
  },
];

const pricingTiers = [
  {
    name: "Basic App",
    price: "$800",
    period: "one-time",
    description: "For startups and small businesses needing a simple, functional app.",
    featured: false,
    badge: undefined,
    whatsapp: WHATSAPP_BASIC,
    features: [
      { text: "Up to 5 screens", included: true },
      { text: "React Native (iOS + Android)", included: true },
      { text: "Basic UI design", included: true },
      { text: "Firebase auth & database", included: true },
      { text: "App Store publishing", included: false },
      { text: "API integrations", included: false },
      { text: "Post-launch support", included: false },
    ],
  },
  {
    name: "Standard App",
    price: "$1,500",
    period: "one-time",
    description: "For businesses ready to ship a full-featured, polished product.",
    featured: true,
    badge: "Most Popular",
    whatsapp: WHATSAPP_STANDARD,
    features: [
      { text: "Up to 15 screens", included: true },
      { text: "React Native (iOS + Android)", included: true },
      { text: "Custom UI/UX design", included: true },
      { text: "Auth, database & push notifications", included: true },
      { text: "App Store publishing", included: true },
      { text: "API integrations", included: true },
      { text: "Post-launch support", included: false },
    ],
  },
  {
    name: "Custom App",
    price: "Custom Quote",
    period: "",
    description: "For complex products with custom backend, advanced features, or enterprise needs.",
    featured: false,
    badge: undefined,
    whatsapp: WHATSAPP_CUSTOM,
    features: [
      { text: "Unlimited screens", included: true },
      { text: "Custom architecture & backend", included: true },
      { text: "Premium UI/UX design", included: true },
      { text: "All integrations & APIs", included: true },
      { text: "App Store publishing", included: true },
      { text: "Post-launch support included", included: true },
      { text: "Priority delivery", included: true },
    ],
  },
];



const MobileAppPage = () => (
  <LenisSmoothScroll>
    <Helmet>
      <title>Mobile App Development Services | Bless Kimbi</title>
      <meta
        name="description"
        content="Professional mobile app development with React Native — iOS and Android apps built by Bless Kimbi. Cross-platform, fast, and ready for App Store launch."
      />
      <link rel="canonical" href="https://blesskimbi.com/mobile-app-development/" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Mobile App Development Services | Bless Kimbi" />
      <meta property="og:description" content="Cross-platform iOS and Android app development with React Native. Full-stack capability, App Store publishing, and post-launch support." />
      <meta property="og:url" content="https://blesskimbi.com/mobile-app-development/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Mobile App Development Services | Bless Kimbi" />
      <meta name="twitter:description" content="iOS and Android app development with React Native. Fast, native-feeling apps built to launch." />
      <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
    </Helmet>

    <Navbar />
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <main className="pt-32 pb-20 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
            App Development Services
          </span>
          <h1 className="heading-serif text-3xl sm:text-5xl md:text-6xl mb-5">
            Mobile App{" "}
            <span className="text-gradient-primary">Development</span>
          </h1>
          <p className="text-muted-foreground font-body text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            We build cross-platform iOS and Android apps with React Native — native-feeling
            performance, a single codebase, and full-stack delivery from design to App Store launch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
            >
              Start Your App Project
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
              Our Mobile App Services
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-base leading-relaxed">
              End-to-end mobile app development — from initial concept and UI design through to
              store submission and ongoing updates.
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
              Why Choose Our App Development?
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Building a mobile app is a significant investment. Here's why clients trust us to get it right.
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
              Project-based pricing to fit your scope. All figures are starting rates — contact us for an accurate quote.
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
                    <span className={`font-display font-bold text-3xl ${tier.featured ? "text-white" : "text-navy"}`}>
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className={`text-sm ml-1 ${tier.featured ? "text-white/70" : "text-muted-foreground font-body"}`}>{tier.period}</span>
                    )}
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
                    Get a Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground font-body text-sm mt-10">
            All prices are starting rates. Complex projects are scoped individually.{" "}
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
              Mobile App Development FAQs
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
            Ready to build your app?
          </h2>
          <p className="text-muted-foreground font-body mb-8 leading-relaxed">
            Tell us about your idea and we'll scope out the project, timeline, and cost.
            No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
            >
              Discuss Your App Idea
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
            <a href="/social-media-management/" className="hover:text-primary transition-colors underline underline-offset-4">Social Media Management</a>
            <span className="text-border hidden sm:inline">·</span>
            <a href="/ecommerce-website-design-in-cameroon/" className="hover:text-primary transition-colors underline underline-offset-4">E-commerce Solutions</a>
          </div>
        </section>

      </main>
      <FloatingChat />
      <ScrollToTop />
    </div>
  </LenisSmoothScroll>
);

export default MobileAppPage;
