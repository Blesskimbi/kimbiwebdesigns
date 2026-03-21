import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: "Junior Engineer",
    title: "Web App Developer",
    company: "Cyprogram",
    description: "Developed functional web applications, handling both frontend and backend tasks to deliver complete digital solutions.",
  },
  {
    year: "Junior Engineer",
    title: "Web Developer",
    company: "Otroli",
    description: "Built responsive websites and focused on improving user experience through clean code and intuitive design.",
  },
  {
    year: "Freelance & Personal",
    title: "Full-Stack Creator",
    company: "Independent Projects",
    description: "Hands-on experience in real-world projects, delivering custom websites, branding, and digital strategies for various clients.",
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });

      // Animate the timeline line growing
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 70%",
              scrub: 1,
            },
          }
        );
      }

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 85%" },
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          duration: 0.9,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center mb-20">
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            Journey
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            Experience & <span className="text-gradient-primary">Growth</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20 origin-top"
          />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <div
                key={exp.title}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-primary z-10 mt-2" />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <span className="text-primary font-body text-xs tracking-widest uppercase">
                    {exp.year}
                  </span>
                  <h3 className="font-display font-bold text-xl md:text-2xl mt-1 mb-1 text-foreground">
                    {exp.title}
                  </h3>
                  <span className="text-secondary font-body text-sm font-medium">
                    {exp.company}
                  </span>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed mt-3">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
