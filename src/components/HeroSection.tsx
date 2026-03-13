import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading chars
      const heading = headingRef.current;
      if (heading) {
        const text = heading.textContent || "";
        heading.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? `<span class="inline-block">&nbsp;</span>`
              : `<span class="inline-block opacity-0">${char}</span>`
          )
          .join("");

        gsap.to(heading.querySelectorAll("span"), {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      gsap.from(subRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      });

      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.5,
        ease: "power3.out",
      });

      gsap.to(orbRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Mesh gradient bg */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Orb */}
      <div ref={orbRef} className="absolute w-[500px] h-[500px] opacity-20">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 blur-3xl" />
        <div className="absolute inset-12 rounded-full border border-primary/20" />
        <div className="absolute inset-24 rounded-full border border-secondary/15" />
        <div className="absolute inset-36 rounded-full border border-primary/10" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-glass text-muted-foreground text-sm font-body tracking-wider uppercase">
          Creative Developer & Designer
        </div>

        <h1
          ref={headingRef}
          className="font-display font-800 text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8 glow-text"
        >
          Crafting Digital Experiences
        </h1>

        <p
          ref={subRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body leading-relaxed"
        >
          I build immersive, boundary-pushing web experiences that blend art,
          technology, and human emotion into something unforgettable.
        </p>

        <div ref={ctaRef} className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="group relative px-8 py-4 rounded-full bg-glass glow-primary font-display font-semibold tracking-wide text-foreground transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-border font-display font-semibold tracking-wide text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-pulse-glow" />
      </div>
    </section>
  );
};

export default HeroSection;
