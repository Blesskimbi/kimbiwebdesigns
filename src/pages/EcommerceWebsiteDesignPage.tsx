import { Helmet } from "react-helmet-async";
import { CheckCircle, ShoppingCart, CreditCard, Smartphone, BarChart2, Shield, Zap, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";

const services = [
  {
    icon: ShoppingCart,
    title: "Custom E-commerce Design",
    desc: "Fully custom storefronts built to match your brand — not generic templates. Every element is designed to guide visitors toward buying.",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    desc: "We integrate local and international payment gateways including Mobile Money (MTN, Orange), PayPal, Stripe, and bank transfer options for Cameroon and Africa.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Shopping Experience",
    desc: "Over 80% of shoppers in Cameroon browse on mobile. Your store is built mobile-first — fast, thumb-friendly, and optimised for small screens.",
  },
  {
    icon: Zap,
    title: "Performance Optimisation",
    desc: "Slow stores lose customers. We optimise every page for speed — fast load times mean more sales and better Google rankings.",
  },
  {
    icon: BarChart2,
    title: "E-commerce SEO",
    desc: "Product pages, category pages, and site structure all optimised so your store ranks for the keywords your customers are searching. Paired with our full SEO services for maximum reach.",
  },
  {
    icon: Shield,
    title: "Secure & Scalable",
    desc: "SSL certificates, secure checkout, and scalable infrastructure so your store stays safe and performs well as your business grows.",
  },
];

const reasons = [
  {
    title: "We handle design, development, and SEO",
    desc: "Most agencies hand you a store and leave. We deliver a complete package — design, development, product setup, and SEO — so you launch with everything ready.",
  },
  {
    title: "Real e-commerce experience",
    desc: "We've rebuilt e-commerce stores for real businesses including Shopfluxx, turning basic pages into branded, high-converting online stores.",
  },
  {
    title: "Ongoing support after launch",
    desc: "Launching is just the beginning. We offer post-launch support, training on how to manage your store, and ongoing optimisation to keep growing your revenue.",
  },
  {
    title: "No lock-in, you own everything",
    desc: "Your store, your code, your data. We don't lock you into proprietary systems — you own everything and can move or expand freely.",
  },
];

const faqs = [
  {
    q: "How much does an e-commerce website cost in Cameroon?",
    a: "E-commerce website costs in Cameroon vary based on the number of products, required features, and payment integrations needed. A basic store starts from a few hundred dollars, while a fully custom solution with Mobile Money integration and SEO can be more. Contact us for a free quote tailored to your business.",
  },
  {
    q: "Can you integrate Mobile Money payments (MTN & Orange)?",
    a: "Yes. We integrate MTN Mobile Money and Orange Money alongside international options like PayPal and Stripe, so you can accept payments from customers across Cameroon and beyond.",
  },
  {
    q: "How long does it take to build an e-commerce website?",
    a: "A standard e-commerce store typically takes 3–6 weeks from brief to launch, depending on complexity. We work efficiently and keep you updated at every stage.",
  },
  {
    q: "Do I need technical knowledge to manage my store after launch?",
    a: "No. We build your store with a user-friendly admin panel and provide training so you can add products, manage orders, and update content yourself — no coding required.",
  },
  {
    q: "Will my e-commerce store rank on Google?",
    a: "Yes, if SEO is included in your project. We structure every store with SEO best practices — optimised product pages, fast load times, and proper schema markup. For deeper SEO work, see our dedicated SEO services in Cameroon.",
  },
  {
    q: "Can you redesign my existing online store?",
    a: "Absolutely. We regularly take over existing stores that aren't converting and rebuild them into professional, high-performing e-commerce sites. We can migrate your products and existing data.",
  },
];

const EcommerceWebsiteDesignPage = () => (
  <LenisSmoothScroll>
    <Helmet>
      <title>E-commerce Website Design in Cameroon | Bless Kimbi</title>
      <meta
        name="description"
        content="Professional e-commerce website design in Cameroon. Mobile Money integration, custom design & SEO built-in. Serving businesses in Yaoundé, Douala & Buea."
      />
      <link rel="canonical" href="https://blesskimbi.com/ecommerce-website-design-in-cameroon/" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="E-commerce Website Design in Cameroon | Bless Kimbi" />
      <meta property="og:description" content="Custom e-commerce websites for businesses in Cameroon — Mobile Money, PayPal, Stripe integration, mobile-first design and built-in SEO." />
      <meta property="og:url" content="https://blesskimbi.com/ecommerce-website-design-in-cameroon/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="E-commerce Website Design in Cameroon | Bless Kimbi" />
      <meta name="twitter:description" content="Custom e-commerce websites for businesses in Cameroon — Mobile Money integration, mobile-first design and built-in SEO." />
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
        "serviceType": "E-commerce Website Design",
        "name": "E-commerce Website Design in Cameroon",
        "provider": {
          "@type": "Person",
          "name": "Bless Kimbi",
          "url": "https://blesskimbi.com"
        },
        "areaServed": ["Cameroon", "Yaoundé", "Douala", "Buea", "Africa"],
        "url": "https://blesskimbi.com/ecommerce-website-design-in-cameroon/",
        "description": "Custom e-commerce website design for businesses in Cameroon. Mobile Money integration, SEO, and mobile-first development."
      })}</script>
    </Helmet>

    <Navbar />
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <main className="pt-32 pb-20 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
            E-commerce — Cameroon
          </span>
          <h1 className="heading-serif text-3xl sm:text-5xl md:text-6xl mb-5">
            E-commerce Website Design{" "}
            <span className="text-gradient-primary">in Cameroon</span>
          </h1>
          <p className="text-muted-foreground font-body text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            We build fast, beautiful online stores for businesses in Yaoundé, Douala, Buea,
            and across Africa — with Mobile Money, PayPal, and Stripe integration built in
            from day one.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
            >
              Get a Free Quote
              <ChevronRight size={18} />
            </a>
            <a
              href="/projects/"
              className="btn-outline-navy inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-base"
            >
              View Our Work
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
              Our E-commerce Services
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-base leading-relaxed">
              Everything you need to launch and grow a profitable online store in Cameroon —
              from design and development to payments and SEO.
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
              Why Choose Our E-commerce Services?
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Selling online in Cameroon has unique challenges. We've solved them before.
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
              E-commerce is growing fast in Africa
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              Online shopping in Cameroon and across Africa is growing at a significant pace.
              Mobile internet penetration, the rise of Mobile Money, and increasing consumer
              trust in online payments are creating real opportunities for businesses to sell
              online. The businesses that invest in a professional e-commerce presence now
              will have a significant head start.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Leading web professionals across the continent — including{" "}
              <a
                href="https://www.websitedesigner.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                WebsiteDesigner.ng
              </a>{" "}
              and local technology companies like{" "}
              <a
                href="https://cyprogram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Cyprogram
              </a>{" "}
              — consistently emphasise that mobile-first, fast-loading stores are non-negotiable
              for capturing the African market.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              Your e-commerce store also needs strong SEO to be found. That's why we pair every
              store build with our{" "}
              <a href="/seo-company-in-cameroon/" className="text-primary hover:underline">
                SEO services for Cameroon
              </a>{" "}
              and{" "}
              <a href="/services/" className="text-primary hover:underline">
                full web design services
              </a>{" "}
              — so your store ranks, loads fast, and converts visitors into customers.
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
              E-commerce Services FAQs
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
            Ready to sell online in Cameroon?
          </h2>
          <p className="text-muted-foreground font-body mb-8 leading-relaxed">
            Let's build you an e-commerce store that looks professional, loads fast,
            and actually makes sales. Get in touch for a free quote.
          </p>
          <a
            href="/contact/"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
          >
            Get a Free Quote
            <ChevronRight size={18} />
          </a>
        </section>

      </main>
      <FloatingChat />
      <ScrollToTop />
    </div>
  </LenisSmoothScroll>
);

export default EcommerceWebsiteDesignPage;
