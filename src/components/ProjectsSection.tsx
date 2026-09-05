import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { staticProjects } from "@/data/projects";
import OptimisedImage from "@/components/OptimisedImage";

gsap.registerPlugin(ScrollTrigger);

const featured = staticProjects.slice(0, 4);

const FeaturedCard = ({
  project,
  className = "",
  imageClassName = "h-56",
}: {
  project: (typeof staticProjects)[0];
  className?: string;
  imageClassName?: string;
}) => (
  <Link
    to={`/projects/${project.slug}`}
    className={`marsha-card overflow-hidden group flex flex-col hover:no-underline ${className}`}
  >
    <div className={`relative overflow-hidden ${imageClassName}`}>
      <OptimisedImage
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover object-top pan-on-hover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-gold flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <ArrowUpRight size={16} />
      </span>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <span className="text-primary text-xs font-semibold uppercase tracking-wide mb-2">{project.category}</span>
      <h3 className="font-display font-bold text-lg text-navy mb-2 group-hover:text-primary transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-4">{project.shortDescription}</p>
      <span className="text-sm font-semibold text-primary group-hover:underline underline-offset-4 mt-auto">
        View Project →
      </span>
    </div>
  </Link>
);

const ProjectsSection = () => {
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
    <section ref={sectionRef} id="projects" className="section-white border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <span className="section-label">Selected Work</span>
          <h2 className="heading-serif text-3xl md:text-5xl mb-4 heading-underline">
            A Collection of <span className="text-gold">My Work</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-2xl mx-auto">
            A few case studies that show the type of solutions and services I provide across my client base.
          </p>
        </div>

        {/* Asymmetric portfolio grid — one tall featured project + a big one and two small ones */}
        {featured.length >= 4 && (
          <div className="grid md:grid-cols-2 gap-6">
            <FeaturedCard project={featured[0]} className="h-full" imageClassName="h-full min-h-[280px] md:min-h-[520px]" />
            <div className="grid gap-6">
              <FeaturedCard project={featured[1]} imageClassName="h-48 md:h-60" />
              <div className="grid grid-cols-2 gap-6">
                <FeaturedCard project={featured[2]} imageClassName="h-40 md:h-48" />
                <FeaturedCard project={featured[3]} imageClassName="h-40 md:h-48" />
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/projects" className="btn-outline-primary inline-flex items-center gap-2">
            View All My Work
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Trusted-by strip, echoing the reference's brand bar */}
        <div className="mt-16 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="font-body text-sm font-semibold text-navy uppercase tracking-wide">
            Trusted by businesses across:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Cameroon", "Nigeria", "South Africa", "Worldwide"].map((place) => (
              <span
                key={place}
                className="px-4 py-1.5 rounded-full bg-muted text-navy text-xs font-body font-semibold"
              >
                {place}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
