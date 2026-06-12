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
    <section ref={sectionRef} id="case-studies" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            Case Studies
          </span>
          <h2 className="font-display font-bold text-3xl xs:text-4xl md:text-6xl">
            Real clients.{" "}
            <span className="text-gradient-primary">Real results.</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body mt-6 max-w-2xl">
            Every project has a story. Here's how I helped businesses across Cameroon
            and Africa build their online presence and grow with professional web design.
          </p>
        </div>

        {/* Project Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {caseStudyProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold font-body transition-all duration-300 ${
                activeId === p.id
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(79,142,240,0.3)]"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Active Case Study */}
        {active?.caseStudy && (
          <div
            key={active.id}
            className="grid lg:grid-cols-[1fr_400px] gap-10 animate-in fade-in duration-500"
          >
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Client + industry */}
              <div className="flex flex-wrap gap-3 items-center">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">
                  {active.caseStudy.industry}
                </span>
                <span className="text-gray-400 text-sm font-body">
                  Client: <span className="text-white font-semibold">{active.caseStudy.client}</span>
                </span>
              </div>

              {/* Problem */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <AlertCircle size={16} className="text-red-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base uppercase tracking-wider">
                    The Problem
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed font-body">
                  {active.caseStudy.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Wrench size={16} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base uppercase tracking-wider">
                    What I Built
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed font-body">
                  {active.caseStudy.solution}
                </p>
              </div>

              {/* Results */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp size={16} className="text-green-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base uppercase tracking-wider">
                    Results Achieved
                  </h3>
                </div>
                <ul className="space-y-3">
                  {active.caseStudy.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 font-body text-sm leading-relaxed">
                      <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20 rounded-2xl p-6">
                <Quote size={24} className="text-primary/40 mb-4" />
                <blockquote className="text-gray-200 text-base leading-relaxed font-body italic mb-4">
                  "{active.caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm font-display">
                    {active.caseStudy.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {active.caseStudy.testimonial.author}
                    </div>
                    <div className="text-gray-400 text-xs font-body">
                      {active.caseStudy.testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Image + CTA */}
            <div className="flex flex-col gap-6">
              {/* Site screenshot */}
              <div className="relative rounded-2xl overflow-hidden border border-white/8 aspect-[4/3] shadow-2xl">
                <img
                  src={active.imageUrl}
                  alt={`${active.title} — web design by Bless Kimbi`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/10">
                  {active.category}
                </span>
              </div>

              {/* Technologies */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-body mb-3">
                  Built With
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 font-body"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3">
                {active.liveUrl && active.liveUrl !== "#" && (
                  <a
                    href={active.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-display font-bold transition-all shadow-[0_0_20px_rgba(79,142,240,0.3)] hover:shadow-[0_0_30px_rgba(79,142,240,0.5)]"
                  >
                    <ExternalLink size={18} />
                    View Live Site
                  </a>
                )}
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-bold transition-all"
                >
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
