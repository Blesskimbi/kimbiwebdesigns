import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { staticProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }: { project: (typeof staticProjects)[0] }) => (
  <div className="group relative rounded-2xl bg-glass overflow-hidden border border-white/5 hover:border-primary/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
    {/* Image with pan-on-hover */}
    <div className="h-52 overflow-hidden relative shrink-0">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover object-top pan-on-hover"
      loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080B0F] via-transparent to-transparent opacity-80" />
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider border border-white/10">
        {project.category}
      </span>
    </div>

    <div className="flex flex-col flex-1 p-5">
      <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
        {project.shortDescription}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded text-[11px] bg-white/5 text-gray-300 border border-white/[0.08]">
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={`/projects/${project.slug}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors group/btn"
      >
        View Project
        <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
      </Link>
    </div>

    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
  </div>
);

const ProjectsSection = () => {
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
          y: 50,
          duration: 0.7,
          delay: (i % 3) * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
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
        </div>

        {/* ── Mobile: single featured card + View More button ── */}
        <div className="sm:hidden">
          <ProjectCard project={staticProjects[0]} />
          <Link
            to="/projects"
            className="mt-6 flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-white font-display font-bold text-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          >
            View All {staticProjects.length} Projects
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* ── Desktop: first 6 projects + View All button ── */}
        <div className="hidden sm:block">
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticProjects.slice(0, 6).map((project, i) => (
              <div
                key={project.id}
                ref={(el) => { cardsRef.current[i] = el; }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-white font-display font-bold text-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
            >
              View All {staticProjects.length} Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
