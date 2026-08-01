import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React / TypeScript", level: 90 },
  { name: "Python / Node.js", level: 85 },
  { name: "WordPress / CMS", level: 80 },
  { name: "Flutter / Dart", level: 88 },
  { name: "Digital Strategy", level: 75 },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      barsRef.current.forEach((bar) => {
        if (!bar) return;
        const fill = bar.querySelector<HTMLDivElement>("[data-fill]");
        if (!fill) return;
        gsap.fromTo(fill, { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: bar, start: "top 85%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-white border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Expertise</span>
          <h2 className="heading-serif text-3xl md:text-5xl">
            Skills & <span className="text-primary">Technologies</span>
          </h2>
        </div>
        <div className="marsha-card p-8 space-y-6">
          {skills.map((skill, i) => (
            <div key={skill.name} ref={(el) => { barsRef.current[i] = el; }}>
              <div className="flex justify-between mb-2">
                <span className="font-body font-semibold text-sm text-navy">{skill.name}</span>
                <span className="text-muted-foreground text-sm">{skill.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div data-fill className="h-full rounded-full bg-primary origin-left" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
