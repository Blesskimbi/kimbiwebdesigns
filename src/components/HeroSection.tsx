import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const words = ["Modern", "Unique", "Functional"];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const staticText1Ref = useRef<HTMLSpanElement>(null);
  const staticText2Ref = useRef<HTMLSpanElement>(null);
  const dynamicTextRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);

  // Setup the word cycling animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Animate out
      gsap.to(dynamicTextRef.current, {
        y: -15,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % words.length);
          // Set start position for animate in
          gsap.set(dynamicTextRef.current, { y: 15 });
          // Animate in
          gsap.to(dynamicTextRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Setup the initial entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Helper function to split text and animate chars
      const animateText = (element: HTMLElement | null, delayOffset: number) => {
        if (!element) return;
        const text = element.textContent || "";
        element.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? `<span class="inline-block">&nbsp;</span>`
              : `<span class="inline-block opacity-0 translate-y-4">${char}</span>`
          )
          .join("");

        gsap.to(element.querySelectorAll("span"), {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "power3.out",
          delay: delayOffset,
        });
      };

      animateText(staticText1Ref.current, 0.2);
      animateText(staticText2Ref.current, 1.0);

      // Entrance for the dynamic word
      gsap.fromTo(
        dynamicTextRef.current,
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: 0.6, ease: "back.out(1.5)" }
      );

      gsap.from(subRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.4,
        ease: "power3.out",
      });

      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.6,
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
          Web Designer &amp; Developer | Yaoundé, Cameroon
        </div>

        <h1 className="font-display font-800 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-8 glow-text flex flex-col items-center justify-center gap-1 md:gap-2">
          {/* Line 1 */}
          <span ref={staticText1Ref} className="block w-full text-center">
            Hi, I'm Bless Kimbi
          </span>
          {/* Line 2: cycling adjective + "Web Designer" side by side, always on one line */}
          <span className="flex items-baseline justify-center gap-3 md:gap-5 w-full flex-nowrap">
            <span
              ref={dynamicTextRef}
              className="text-gradient-primary whitespace-nowrap shrink-0"
            >
              {words[index]}
            </span>
            <span ref={staticText2Ref} className="whitespace-nowrap shrink-0">
              Web Designer
            </span>
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body leading-relaxed md:px-0 px-4"
        >
          Cameroon's leading web designer &amp; developer, based in Yaoundé. I build
          fast, professional websites and web apps that rank on Google and convert
          visitors into paying clients, serving businesses across Cameroon and Africa.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <a
            href="/contact"
            className="group relative px-8 py-4 rounded-full bg-primary glow-primary font-display font-semibold tracking-wide text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(79,142,240,0.5)]"
          >
            <span className="relative z-10">Get a Free Quote</span>
          </a>
          <a
            href="#projects"
            className="px-8 py-4 rounded-full border border-border font-display font-semibold tracking-wide text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            View Projects
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
