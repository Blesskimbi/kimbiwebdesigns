import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, TrendingUp, Share2, Smartphone, Layers, ShoppingCart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const headerGradients = ["service-header-navy", "service-header-teal", "service-header-gold"] as const;
const btnStyles = ["btn-outline-primary", "btn-outline-gold", "btn-outline-primary"] as const;

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    description:
      "Custom, responsive websites built for businesses worldwide. From landing pages to full web applications, every site is fast, mobile-first, and built to convert visitors into clients.",
    href: "/services/",
  },
  {
    icon: TrendingUp,
    title: "SEO Optimization: Rank #1 on Google",
    description:
      "Get your business found on Google. I implement on-page SEO, technical SEO, and content strategies that drive real organic traffic — wherever your customers are searching.",
    href: "/seo-company-in-cameroon/",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "Grow your brand online with consistent, engaging content. Strategy, design, scheduling, and analytics for all major platforms, tailored to your audience and market.",
    href: "/social-media-management/",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps built with React Native. Smooth, native-feeling experiences for both iOS and Android — for startups and established businesses alike.",
    href: "/mobile-app-development/",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description:
      "User-centred interfaces that look stunning and work intuitively. Wireframes, prototypes, and pixel-perfect designs delivered in Figma — for startups and growing businesses.",
    href: "/ui-ux-design/",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description:
      "Full online stores with product management, secure checkout, and flexible payment integration. Built for businesses ready to sell online 24/7 and scale globally.",
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
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 88%" },
          opacity: 0, y: 40, duration: 0.7, delay: (i % 3) * 0.1, ease: "power3.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-white">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-14">
          <span className="section-label">What I Do</span>
          <h2 className="heading-serif text-3xl md:text-5xl mb-4 heading-underline">
            Web Design &amp;{" "}
            <span className="text-gold">Development Services</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-2xl mx-auto">
            From web design and SEO to e-commerce and mobile apps — every service is
            built to help your business grow online, wherever you are.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            const grad = headerGradients[i % 3];
            const btn = btnStyles[i % 3];
            return (
              <div key={service.title} ref={(el) => { cardsRef.current[i] = el; }} className="marsha-card overflow-hidden flex flex-col group">
                <div className={`${grad} h-44 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]`}>
                  <Icon size={64} className="text-white/90" strokeWidth={1.2} />
                </div>
                <div className="p-6 flex flex-col flex-1 text-center">
                  <h3 className="font-display font-bold text-lg text-navy mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6 flex-1">{service.description}</p>
                  <a href={service.href} className={`${btn} mx-auto`}>Learn more →</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
