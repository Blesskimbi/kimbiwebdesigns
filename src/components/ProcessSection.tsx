import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Palette, Code2, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Discover", description: "I get to know your vision, goals, and audience. I research, ask questions, and map the full picture before a single line of code.", icon: Search },
  { num: "02", title: "Design", description: "Crafting wireframes and high-fidelity mockups that balance aesthetics with function. Every pixel has purpose.", icon: Palette },
  { num: "03", title: "Develop", description: "Building with modern tools, clean architecture, and performance-first thinking. Animations and interactions are baked in from day one.", icon: Code2 },
  { num: "04", title: "Deliver", description: "Rigorous testing, optimization, and a clean deployment. You get a polished site that works properly from day one.", icon: Rocket },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-muted border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <span className="section-label">How I Work</span>
          <h2 className="heading-serif text-3xl md:text-5xl">
            My <span className="text-primary">Process</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div key={step.num} className="marsha-card p-6 text-center relative">
              <div className="font-display font-bold text-3xl text-primary/15 absolute top-4 right-4">{step.num}</div>
              <step.icon className="w-9 h-9 text-primary mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg text-navy mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
