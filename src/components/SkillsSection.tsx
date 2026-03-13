import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "GSAP / Animation", level: 88 },
  { name: "Three.js / WebGL", level: 80 },
  { name: "UI/UX Design", level: 85 },
  { name: "Node.js / APIs", level: 78 },
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

        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            Skills &{" "}
            <span className="text-gradient-primary">Technologies</span>
          </h2>
        </div>

        <div className="space-y-8">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              ref={(el) => { barsRef.current[i] = el; }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-display font-semibold text-sm">
                  {skill.name}
                </span>
                <span className="text-muted-foreground text-sm font-body">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  data-fill
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary origin-left"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
