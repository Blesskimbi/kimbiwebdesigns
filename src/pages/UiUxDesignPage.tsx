import { Helmet } from "react-helmet-async";
import { CheckCircle, Search, Layout, Paintbrush, Grid, TestTube, FileCode, ChevronRight, Check, X, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";

const WHATSAPP = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20your%20UI%2FAUX%20Design%20service.%20Can%20we%20discuss%3F";

const WHATSAPP_LANDING = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Landing%20Page%20Design%20package%20(%24200).%20Can%20we%20discuss%3F";
const WHATSAPP_FULL    = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Full%20Website%20Design%20package%20(%24450).%20Can%20we%20discuss%3F";
const WHATSAPP_SYSTEM  = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20the%20Design%20System%20package%20(%24800).%20Can%20we%20discuss%3F";

const services = [
  {
    icon: Search,
    title: "User Research & Discovery",
    desc: "We start by understanding your users — their goals, frustrations, and behaviours. Interviews, competitor analysis, and user journey mapping inform every design decision.",
  },
  {
    icon: Layout,
    title: "Wireframing & Prototyping",
    desc: "Low and high-fidelity wireframes that map out the structure and flow before any visual design begins. Interactive prototypes let you test the experience early and iterate fast.",
  },
  {
    icon: Paintbrush,
    title: "Visual UI Design",
    desc: "Polished, pixel-perfect screens that bring your brand to life. Every detail — typography, colour, spacing, micro-interactions — is designed to feel intentional and cohesive.",
  },
  {
    icon: Grid,
    title: "Design Systems",
    desc: "Scalable component libraries and style guides that keep your product visually consistent as it grows. Built in Figma for easy handoff and long-term maintenance.",
  },
  {
    icon: TestTube,
    title: "Usability Testing",
    desc: "We test designs with real users to identify friction points before development begins. Findings are fed directly back into the design to improve conversion and satisfaction.",
  },
  {
    icon: FileCode,
    title: "Figma Handoff for Developers",
    desc: "Detailed Figma files with documented components, spacing specs, interaction notes, and assets — everything developers need to build with precision and confidence.",
  },
];

const reasons = [
  {
    title: "Design that's grounded in user behaviour",
    desc: "We don't design based on trends or personal taste. Every decision is backed by research, user goals, and conversion principles — so the product actually works for the people using it.",
  },
  {
    title: "Pixel-perfect Figma files",
    desc: "Our deliverables are production-ready. Clean, organised Figma files with auto-layout, named layers, and fully documented components that developers can use without guesswork.",
  },
  {
    title: "Designs that developers can actually build",
    desc: "Good design and feasible design aren't mutually exclusive. We design with implementation in mind, so there are no surprises in the handoff phase and no design compromises in the final product.",
  },
  {
    title: "Fast turnaround without sacrificing quality",
    desc: "We move quickly. Most projects ship initial designs within 1–2 weeks. We achieve speed through clear scoping, structured processes, and focused communication — not by cutting corners.",
  },
];

const pricingTiers = [
  {
    name: "Landing Page",
    price: "$200",
    period: "one-time",
    description: "For businesses that need a single, high-converting landing page design.",
    featured: false,
    badge: undefined,
    whatsapp: WHATSAPP_LANDING,
    features: [
      { text: "1-page Figma design", included: true },
      { text: "Desktop + mobile versions", included: true },
      { text: "2 revision rounds", included: true },
      { text: "Basic component library", included: false },
      { text: "Usability testing", included: false },
      { text: "Developer handoff notes", included: false },
      { text: "Design system", included: false },
    ],
  },
  {
    name: "Full Website",
    price: "$450",
    period: "one-time",
    description: "Complete website UI design for businesses that need a full online presence.",
    featured: true,
    badge: "Most Popular",
    whatsapp: WHATSAPP_FULL,
    features: [
      { text: "Up to 8 page designs", included: true },
      { text: "Desktop + mobile versions", included: true },
      { text: "3 revision rounds", included: true },
      { text: "Component library", included: true },
      { text: "Usability testing", included: true },
      { text: "Developer handoff notes", included: true },
      { text: "Design system", included: false },
    ],
  },
  {
    name: "Design System",
    price: "$800",
    period: "one-time",
    description: "For products that need a scalable, reusable design foundation to grow with.",
    featured: false,
    badge: undefined,
    whatsapp: WHATSAPP_SYSTEM,
    features: [
      { text: "Full component library", included: true },
      { text: "Typography & colour system", included: true },
      { text: "Icon & spacing tokens", included: true },
      { text: "Interaction documentation", included: true },
      { text: "Usability testing", included: true },
      { text: "Developer handoff notes", included: true },
      { text: "Unlimited revision rounds", included: true },
    ],
  },
];

const faqs = [
  {
    q: "What tools do you use?",
    a: "Figma is our primary design tool for everything — wireframes, visual UI, prototypes, and design systems. We also use FigJam for user flows and collaborative workshops. All deliverables are shared as Figma files so you and your team have full access.",
  },
  {
    q: "Do you do development too or just design?",
    a: "Both. We offer standalone UI/UX design, but we also build what we design. If you need a full website or app built after the design is finalised, we can handle the development too — which means zero friction between design and implementation.",
  },
  {
    q: "What's included in a design handoff?",
    a: "A complete Figma file with organised layers, named components, documented spacing and typography, interaction notes, and exported assets. We also write a brief handoff guide summarising key decisions and any edge cases developers should be aware of.",
  },
  {
    q: "How many revisions are included?",
    a: "The number of revision rounds depends on the package — typically 2–3 rounds for most projects. A revision round means a full review cycle where you share feedback and we incorporate all changes. We find that 2–3 well-structured rounds is enough to get any project to a great place.",
  },
  {
    q: "Can you redesign an existing product?",
    a: "Yes. Redesigns are a big part of what we do. We start with a review of your current product to identify usability problems, conversion gaps, and visual inconsistencies — then redesign with clear improvements backed by user-centred principles rather than just aesthetic preferences.",
  },
];

const UiUxDesignPage = () => (
  <LenisSmoothScroll>
    <Helmet>
      <title>UI/UX Design Services | Bless Kimbi</title>
      <meta
        name="description"
        content="Professional UI/UX design services — user research, wireframing, visual design, design systems, and Figma handoff. Designs that convert and developers can build."
      />
      <link rel="canonical" href="https://blesskimbi.com/ui-ux-design/" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="UI/UX Design Services | Bless Kimbi" />
      <meta property="og:description" content="User-centred UI/UX design — wireframes, prototypes, visual design, and scalable design systems delivered in Figma." />
      <meta property="og:url" content="https://blesskimbi.com/ui-ux-design/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="UI/UX Design Services | Bless Kimbi" />
      <meta name="twitter:description" content="User-centred UI/UX design — wireframes, visual design, and Figma handoff for web and mobile products." />
      <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
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
        "serviceType": "UI/UX Design",
        "name": "UI/UX Design Services",
        "provider": {
          "@type": "Person",
          "name": "Bless Kimbi",
          "url": "https://blesskimbi.com",
        },
        "url": "https://blesskimbi.com/ui-ux-design/",
        "description": "Professional UI/UX design services — user research, wireframing, visual UI design, design systems, and Figma developer handoff.",
      })}</script>
    </Helmet>

    <Navbar />
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <main className="pt-32 pb-20 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
            Design Services
          </span>
          <h1 className="heading-serif text-3xl sm:text-5xl md:text-6xl mb-5">
            UI/UX{" "}
            <span className="text-gradient-primary">Design Services</span>
          </h1>
          <p className="text-muted-foreground font-body text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            User-centred design that looks stunning and works intuitively. From research
            and wireframes to pixel-perfect Figma files — we design products that people
            actually enjoy using.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
            >
              Start Your Design Project
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
              Our UI/UX Design Services
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-base leading-relaxed">
              From the first user interview to the final handoff file — a complete design
              process that bridges the gap between user needs and great products.
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
              Why Choose Our UI/UX Design?
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Good design is more than aesthetics. Here's what makes our design work actually move the needle.
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
              Clear, project-based pricing for every stage of design. All figures are starting rates.
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
            All prices are starting rates. Final cost depends on project scope and complexity.{" "}
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
              UI/UX Design FAQs
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
            Ready to level up your design?
          </h2>
          <p className="text-muted-foreground font-body mb-8 leading-relaxed">
            Whether you're starting from scratch or redesigning an existing product,
            let's create something your users will love.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
            >
              Start Your Design
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
            <a href="/mobile-app-development/" className="hover:text-primary transition-colors underline underline-offset-4">Mobile App Development</a>
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

export default UiUxDesignPage;
