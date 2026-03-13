import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Working with this developer was like witnessing magic. The animations and attention to detail were beyond anything I've ever seen.",
    name: "Sarah Chen",
    role: "CEO, NovaTech",
    avatar: "SC",
  },
  {
    quote: "They transformed our vision into a living, breathing digital experience. Every interaction feels intentional and beautiful.",
    name: "Marcus Rivera",
    role: "Creative Director, Flux Studio",
    avatar: "MR",
  },
  {
    quote: "The level of craft is extraordinary. Our conversion rate doubled after the redesign — users just can't stop exploring.",
    name: "Elena Volkov",
    role: "Head of Product, Orbit Labs",
    avatar: "EV",
  },
  {
    quote: "Pure artistry combined with technical excellence. This is what happens when a developer truly cares about the craft.",
    name: "James Okafor",
    role: "Founder, Prism Digital",
    avatar: "JO",
  },
];

const TestimonialsSection = () => {
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
          scrollTrigger: { trigger: card, start: "top 88%" },
          opacity: 0,
          y: 60,
          rotateX: 8,
          scale: 0.95,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            Words that <span className="text-gradient-primary">inspire</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative bg-glass rounded-2xl p-8 md:p-10 transition-all duration-500 hover:glow-primary"
              style={{ perspective: "800px" }}
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-8 font-display text-6xl text-primary/10 leading-none select-none">
                "
              </div>

              <p className="text-foreground/90 font-body leading-relaxed text-base md:text-lg mb-8 relative z-10">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center font-display font-bold text-sm text-foreground">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-muted-foreground text-xs font-body">
                    {t.role}
                  </div>
                </div>
              </div>

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
