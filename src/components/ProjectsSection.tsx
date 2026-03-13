import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nebula OS",
    category: "Web Application",
    description: "A futuristic operating system interface built for the browser with real-time collaboration.",
    tags: ["React", "WebGL", "Three.js"],
    color: "from-primary/20 to-secondary/10",
  },
  {
    title: "Synthwave Studio",
    category: "Creative Tool",
    description: "An AI-powered music visualization platform that generates real-time reactive visuals.",
    tags: ["GSAP", "Web Audio", "Canvas"],
    color: "from-secondary/20 to-primary/10",
  },
  {
    title: "Quantum Dashboard",
    category: "Data Visualization",
    description: "Interactive data exploration tool with physics-based animations and 3D chart rendering.",
    tags: ["D3.js", "WebGL", "TypeScript"],
    color: "from-primary/15 to-accent/10",
  },
  {
    title: "Void Commerce",
    category: "E-Commerce",
    description: "A premium e-commerce experience with cinematic product reveals and immersive browsing.",
    tags: ["Next.js", "Stripe", "Framer"],
    color: "from-accent/10 to-secondary/15",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          opacity: 0,
          y: 80,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-20">
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            Selected Work
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl">
            Projects that
            <br />
            <span className="text-gradient-primary">push boundaries</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative rounded-2xl bg-glass overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Gradient top */}
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/20 blur-2xl" />
                </div>
              </div>

              <div className="p-8">
                <span className="text-xs font-body text-muted-foreground tracking-widest uppercase">
                  {project.category}
                </span>
                <h3 className="font-display font-bold text-2xl mt-2 mb-3 group-hover:text-gradient-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
