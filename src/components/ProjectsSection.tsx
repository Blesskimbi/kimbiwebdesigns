import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useDashboard } from "./dashboard/DashboardContext";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const { projects } = useDashboard();
  // Filter for only published projects and take top 4
  const displayProjects = projects.filter(p => p.status === "Published").slice(0, 4);

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
        <div ref={headingRef} className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
              Selected Work
            </span>
            <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl">
              Projects that
              <br />
              <span className="text-gradient-primary">push boundaries</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="px-6 py-3 rounded-full bg-glass text-sm font-body text-foreground border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 flex items-center gap-2 group"
          >
            Explore All Projects
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {displayProjects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative rounded-2xl bg-glass overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Gradient top / Image */}
              <div className={`h-48 relative overflow-hidden ${!project.imageUrl ? `bg-gradient-to-br ${project.imageColor}` : ''}`}>
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>
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
