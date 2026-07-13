import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, TrendingUp, Share2, Smartphone, Layers, ShoppingCart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    description:
      "Custom, responsive websites built for businesses worldwide. From landing pages to full web applications, every site is fast, mobile-first, and built to convert visitors into clients.",
    features: ["Custom Design", "Responsive Layouts", "Fast Loading"],
    href: "/services/",
  },
  {
    icon: TrendingUp,
    title: "SEO Optimization: Rank #1 on Google",
    description:
      "Get your business found on Google. I implement on-page SEO, technical SEO, and content strategies that drive real organic traffic — wherever your customers are searching.",
    features: ["On-Page SEO", "Technical SEO", "Google Ranking"],
    href: "/seo-company-in-cameroon/",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "Grow your brand online with consistent, engaging content. Strategy, design, scheduling, and analytics for all major platforms, tailored to your audience and market.",
    features: ["Content Strategy", "Post Design", "Analytics Reports"],
    href: "/social-media-management/",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps built with React Native. Smooth, native-feeling experiences for both iOS and Android — for startups and established businesses alike.",
    features: ["iOS & Android", "React Native", "App Store Launch"],
    href: "/mobile-app-development/",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description:
      "User-centred interfaces that look stunning and work intuitively. Wireframes, prototypes, and pixel-perfect designs delivered in Figma — for startups and growing businesses.",
    features: ["Figma Prototypes", "User Research", "Design Systems"],
    href: "/ui-ux-design/",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description:
      "Full online stores with product management, secure checkout, and flexible payment integration. Built for businesses ready to sell online 24/7 and scale globally.",
    features: ["Stripe / MoMo Pay", "Product Management", "Order Dashboard"],
    href: "/ecommerce-website-design-in-cameroon/",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          opacity: 0,
          y: 60,
          duration: 0.9,
          delay: (i % 3) * 0.12,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-20">
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            What I Do
          </span>
          <h2 className="font-display font-bold text-3xl xs:text-4xl md:text-6xl">
            Web Design &amp;{" "}
            <span className="text-gradient-primary">Development Services</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body mt-6 max-w-2xl">
            From web design and SEO to e-commerce and mobile apps — every service is
            built to help your business grow online, wherever you are.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group relative bg-glass rounded-2xl p-8 transition-all duration-500 hover:glow-primary overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon size={22} className="text-primary" />
                  </div>

                  <h3 className="font-display font-bold text-lg md:text-xl mb-3 text-white">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 text-sm font-body leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm font-body text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <a
                    href={service.href}
                    className="inline-flex items-center gap-1 mt-5 text-sm text-primary font-semibold hover:underline underline-offset-4 transition-colors"
                  >
                    Learn more →
                  </a>
                </div>

                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* CTA below services */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground font-body mb-6">
            Ready to start your project? Let's talk.
          </p>
          <a
            href="/contact/"
            className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-white font-display font-bold hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(79,142,240,0.4)] transition-all duration-300"
          >
            Get a Free Quote
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm font-body text-muted-foreground">
            <a href="/seo-company-in-cameroon/" className="hover:text-primary transition-colors underline underline-offset-4">
              SEO company in Cameroon
            </a>
            <span className="text-white/20 hidden sm:inline">·</span>
            <a href="/ecommerce-website-design-in-cameroon/" className="hover:text-primary transition-colors underline underline-offset-4">
              E-commerce website design in Cameroon
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
