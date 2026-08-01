import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { year: "Junior Engineer", title: "Web App Developer", company: "Cyprogram", description: "Developed functional web applications, handling both frontend and backend tasks to deliver complete digital solutions." },
  { year: "Junior Engineer", title: "Web Developer", company: "Otroli", description: "Built responsive websites and focused on improving user experience through clean code and intuitive design." },
  { year: "Freelance & Personal", title: "Full-Stack Creator", company: "Independent Projects", description: "Hands-on experience in real-world projects, delivering custom websites, branding, and digital strategies for various clients." },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      });
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          scaleY: 0, duration: 1.2, ease: "power3.out",
        });
      }
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 88%" },
          opacity: 0, x: i % 2 === 0 ? -30 : 30, duration: 0.7, ease: "power3.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-muted border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center mb-14">
          <span className="section-label">Journey</span>
          <h2 className="heading-serif text-3xl md:text-5xl">
            Experience & <span className="text-primary">Growth</span>
          </h2>
        </div>
        <div className="relative">
          <div ref={lineRef} className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/30 origin-top" />
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={exp.title} ref={(el) => { itemsRef.current[i] = el; }} className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary z-10 mt-2" />
                <div className={`ml-14 md:ml-0 md:w-1/2 marsha-card p-6 ${i % 2 === 0 ? "md:mr-auto md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}>
                  <span className="text-primary font-body text-xs font-semibold uppercase tracking-widest">{exp.year}</span>
                  <h3 className="font-display font-bold text-xl text-navy mt-1 mb-1">{exp.title}</h3>
                  <span className="text-primary font-body text-sm font-semibold">{exp.company}</span>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed mt-3">{exp.description}</p>
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
