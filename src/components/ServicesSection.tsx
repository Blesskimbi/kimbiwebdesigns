import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, TrendingUp, Share2, Smartphone, Layers, ShoppingCart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    description: "Custom, responsive websites built with modern technologies. From landing pages to full web applications, designed to convert visitors into customers.",
    features: ["Custom Design", "Responsive Layouts", "Fast Loading"],
  },
  {
    icon: TrendingUp,
    title: "SEO Optimization",
    description: "Get found on Google. I implement on-page SEO, technical SEO, and content strategies that drive real organic traffic to your business.",
    features: ["On-Page SEO", "Technical SEO", "Google Ranking"],
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Grow your brand online with consistent, engaging content. Strategy, design, scheduling, and analytics for all major platforms.",
    features: ["Content Strategy", "Post Design", "Analytics Reports"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform mobile apps built with React Native. Smooth, native-feeling experiences for both iOS and Android from a single codebase.",
    features: ["iOS & Android", "React Native", "App Store Launch"],
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description: "User-centred interfaces that look stunning and work intuitively. Wireframes, prototypes, and pixel-perfect designs delivered in Figma.",
    features: ["Figma Prototypes", "User Research", "Design Systems"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "Full online stores with product management, secure checkout, and payment integration. Built to sell 24/7 with minimal maintenance.",
    features: ["Stripe / MoMo Pay", "Product Management", "Order Dashboard"],
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
            Services & <span className="text-gradient-primary">Expertise</span>
          </h2>
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
                </div>

                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
