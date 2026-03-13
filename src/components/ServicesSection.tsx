import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Interactive Websites",
    description: "Bespoke websites with cinematic animations, scroll-driven storytelling, and immersive interactions that captivate visitors.",
    features: ["GSAP Animations", "Scroll Experiences", "Responsive Design"],
  },
  {
    title: "Web Applications",
    description: "Scalable, performant applications built with modern frameworks. Clean architecture meets beautiful interface design.",
    features: ["React / Next.js", "TypeScript", "API Integration"],
  },
  {
    title: "Creative Development",
    description: "Experimental digital experiences — generative art, WebGL visualizations, and interactive installations for brands.",
    features: ["WebGL / Three.js", "Canvas API", "Generative Art"],
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
          delay: i * 0.15,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-20">
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            What I Do
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            Services & <span className="text-gradient-primary">Expertise</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative bg-glass rounded-2xl p-8 md:p-10 transition-all duration-500 hover:glow-primary overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Number */}
                <span className="font-display font-bold text-4xl text-gradient-primary mb-6 block">
                  0{i + 1}
                </span>

                <h3 className="font-display font-bold text-xl md:text-2xl mb-4 text-foreground">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm font-body leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
