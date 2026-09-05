import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Quote, TrendingUp, Wrench, AlertCircle, CheckCircle2 } from "lucide-react";
import { caseStudyProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(caseStudyProjects[0]?.id ?? 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const active = caseStudyProjects.find((p) => p.id === activeId);

  return (
    <section ref={sectionRef} id="case-studies" className="relative section-muted overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-16 text-center">
          <span className="section-label">Case Studies</span>
          <h2 className="heading-serif text-3xl md:text-5xl heading-underline">
            Real clients.{" "}
            <span className="text-gold">Real results.</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body mt-6 max-w-2xl mx-auto">
            Every project has a story. Here's how I helped businesses across Cameroon
            and Africa build their online presence and grow with professional web design.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {caseStudyProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={activeId === p.id ? "filter-pill-active" : "filter-pill-inactive"}
            >
              {p.title}
            </button>
          ))}
        </div>

        {active?.caseStudy && (
          <div
            key={active.id}
            className="grid lg:grid-cols-[1fr_400px] gap-10 animate-in fade-in duration-500"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20 font-body">
                  {active.caseStudy.industry}
                </span>
                <span className="text-muted-foreground text-sm font-body">
                  Client: <span className="text-navy font-semibold">{active.caseStudy.client}</span>
                </span>
              </div>

              <div className="internal-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <AlertCircle size={16} className="text-red-600" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-base uppercase tracking-wider">
                    The Problem
                  </h3>
                </div>
                <p className="internal-card-text">{active.caseStudy.problem}</p>
              </div>

              <div className="internal-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Wrench size={16} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-base uppercase tracking-wider">
                    What I Built
                  </h3>
                </div>
                <p className="internal-card-text">{active.caseStudy.solution}</p>
              </div>

              <div className="internal-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp size={16} className="text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-base uppercase tracking-wider">
                    Results Achieved
                  </h3>
                </div>
                <ul className="space-y-3">
                  {active.caseStudy.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground font-body text-sm leading-relaxed">
                      <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="internal-card bg-primary/5 border-primary/15">
                <Quote size={24} className="text-primary/40 mb-4" />
                <blockquote className="text-navy text-base leading-relaxed font-body italic mb-4">
                  "{active.caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm font-display">
                    {active.caseStudy.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-navy font-semibold text-sm font-body">
                      {active.caseStudy.testimonial.author}
                    </div>
                    <div className="text-muted-foreground text-xs font-body">
                      {active.caseStudy.testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="relative rounded-2xl overflow-hidden border border-border aspect-[4/3] shadow-pro">
                <img
                  src={active.imageUrl}
                  alt={`${active.title}, web design by Bless Kimbi`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-navy/85 text-white text-xs font-semibold rounded-full font-body">
                  {active.category}
                </span>
              </div>

              <div className="internal-card">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body mb-3">
                  Built With
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-muted border border-border text-xs text-navy font-body"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {active.liveUrl && active.liveUrl !== "#" && (
                  <a
                    href={active.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-green inline-flex items-center justify-center gap-2 !py-3"
                  >
                    <ExternalLink size={18} />
                    View Live Site
                  </a>
                )}
                <a href="/contact" className="btn-outline-navy inline-flex items-center justify-center gap-2 !py-3">
                  Get a Similar Site
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
