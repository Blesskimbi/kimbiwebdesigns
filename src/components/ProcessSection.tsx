import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Palette, Code2, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discover",
    description: "Deep dive into your vision, goals, and audience. I research, ask questions, and map the full picture before a single line of code.",
    icon: Search,
  },
  {
    num: "02",
    title: "Design",
    description: "Crafting wireframes and high-fidelity mockups that balance aesthetics with function. Every pixel has purpose.",
    icon: Palette,
  },
  {
    num: "03",
    title: "Develop",
    description: "Building with modern tools, clean architecture, and performance-first thinking. Animations and interactions are baked in from day one.",
    icon: Code2,
  },
  {
    num: "04",
    title: "Deliver",
    description: "Rigorous testing, optimization, and seamless deployment. The result: a polished experience that exceeds expectations.",
    icon: Rocket,
  },
];

const ProcessSection = () => {
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

        // Staggered entrance
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 88%" },
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.8,
          delay: i * 0.12,
          ease: "power3.out",
        });

        // Continuous subtle float
        gsap.to(card, {
          y: -8,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 mesh-gradient opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            How I Work
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            My <span className="text-gradient-primary">Process</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative bg-glass rounded-2xl p-8 text-center transition-all duration-500 hover:glow-primary"
            >
              {/* Large number watermark */}
              <div className="absolute top-4 right-4 font-display font-bold text-5xl text-primary/5 select-none leading-none">
                {step.num}
              </div>

              <div className="flex justify-center mb-6">
                <step.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
              </div>

              <h3 className="font-display font-bold text-xl mb-3 text-foreground group-hover:text-gradient-primary transition-colors duration-300">
                {step.title}
              </h3>

              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {step.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
