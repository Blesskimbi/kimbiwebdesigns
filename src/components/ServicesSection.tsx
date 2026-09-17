import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppWindow, Search, Share2, Smartphone, PenTool, ShoppingBag, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: AppWindow,
    title: "Web Design & Development",
    short: "Web Development",
    description:
      "Custom, responsive websites built for businesses worldwide. From landing pages to full web applications, every site is fast, mobile-first, and built to convert visitors into clients.",
    href: "/services/",
  },
  {
    icon: Search,
    title: "SEO Optimization: Rank #1 on Google",
    short: "SEO Strategy",
    description:
      "Get your business found on Google. I implement on-page SEO, technical SEO, and content strategies that drive real organic traffic, wherever your customers are searching.",
    href: "/seo-company-in-cameroon/",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    short: "Social Media",
    description:
      "Grow your brand online with consistent, engaging content. Strategy, design, scheduling, and analytics for all major platforms, tailored to your audience and market.",
    href: "/social-media-management/",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    short: "Mobile Apps",
    description:
      "Cross-platform mobile apps built with React Native. Smooth, native-feeling experiences for both iOS and Android, for startups and established businesses alike.",
    href: "/mobile-app-development/",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    short: "UI/UX Design",
    description:
      "User-centred interfaces that look stunning and work intuitively. Wireframes, prototypes, and pixel-perfect designs delivered in Figma, for startups and growing businesses.",
    href: "/ui-ux-design/",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Solutions",
    short: "E-commerce",
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
    <section ref={sectionRef} id="services" className="section-navy">
      <div className="max-w-6xl mx-auto">
        {/* Text-editor line + divider, echoing the reference's intro strip */}
        <div className="text-center mb-10">
          <p className="text-muted-foreground font-body text-sm md:text-base">
            I Serve My Clients&apos; Best Interests with the Best Digital Solutions.{" "}
            <a href="/services/" className="text-primary font-semibold hover:underline underline-offset-4">
              Find Out More
            </a>
          </p>
          <div className="h-px bg-border w-full max-w-4xl mx-auto mt-8" />
        </div>

        <div ref={headingRef} className="text-center mb-14">
          <span className="section-label">What I Do</span>
          <h2 className="heading-serif text-3xl md:text-5xl mb-4">
            I Believe in Building Strong Brands{" "}
            <span className="text-gold">and Integrated Strategies</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-2xl mx-auto">
            From web design and SEO to e-commerce and mobile apps, every service is
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
                className="marsha-card p-7 flex flex-col text-left group"
              >
                {/* Bare on the surface, at the top, in the ink colour and a
                    1.5 stroke. No tile, no fill, no hover scale — an icon
                    sealed inside a coloured badge reads as a sticker, which is
                    the one thing none of the reference sites do. */}
                <Icon size={24} strokeWidth={1.5} className="text-navy mb-5" aria-hidden="true" />
                <h3 className="font-display text-lg text-navy mb-2.5 min-h-[2.75rem]">{service.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed line-clamp-4 mb-6">
                  {service.description}
                </p>
                <a
                  href={service.href}
                  className="mt-auto font-body text-sm font-medium text-gold inline-flex items-center gap-1.5 self-start group-hover:gap-2.5 transition-[gap] duration-300 hover:no-underline"
                >
                  Talk {service.short} <ArrowRight size={15} />
                </a>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a href="/services/" className="btn-outline-primary inline-flex items-center gap-2">
            View All Services <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
