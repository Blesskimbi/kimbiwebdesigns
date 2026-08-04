import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { staticProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", ...Array.from(new Set(staticProjects.map(p => p.category)))];

const ProjectCard = ({ project }: { project: (typeof staticProjects)[0] }) => (
  <Link to={`/projects/${project.slug}`} className="marsha-card overflow-hidden group block hover:no-underline">
    <div className="h-48 overflow-hidden relative">
      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover object-top pan-on-hover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm text-primary text-[11px] font-semibold uppercase tracking-wide rounded-full">
        {project.category}
      </span>
      <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-gold flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <ArrowUpRight size={16} />
      </span>
    </div>
    <div className="p-5">
      <h3 className="font-display font-bold text-lg text-navy mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
      <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-4">{project.shortDescription}</p>
      <span className="text-sm font-semibold text-primary group-hover:underline underline-offset-4">
        View Project →
      </span>
    </div>
  </Link>
);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? staticProjects.slice(0, 6)
    : staticProjects.filter(p => p.category === activeFilter).slice(0, 6);

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
    <section ref={sectionRef} id="projects" className="section-white border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-10">
          <span className="section-label">Selected Work</span>
          <h2 className="heading-serif text-3xl md:text-5xl heading-underline">
            Projects that <span className="text-gold">push boundaries</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={activeFilter === cat ? "filter-pill-active" : "filter-pill-inactive"}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filtered.length > 0 ? filtered : staticProjects.slice(0, 6)).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/projects" className="btn-outline-primary inline-flex items-center gap-2">
            View All {staticProjects.length} Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
