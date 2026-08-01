import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const words = ["Modern", "Unique", "Functional"];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dynamicTextRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(dynamicTextRef.current, {
        y: -12, opacity: 0, duration: 0.3, ease: "power2.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % words.length);
          gsap.set(dynamicTextRef.current, { y: 12 });
          gsap.to(dynamicTextRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        },
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, { opacity: 0, y: 40, duration: 1, ease: "power3.out", delay: 0.2 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative hero-marsha min-h-[85vh] flex items-center justify-center overflow-hidden pt-[72px]">
      {/* subtle cityscape overlay */}
      <div className="absolute inset-0 opacity-[0.07] bg-[url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80')] bg-cover bg-center mix-blend-overlay" />

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
        <p className="text-white/90 text-sm font-body tracking-widest uppercase mb-5">
          Web Designer &amp; Developer
        </p>

        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.15] mb-6">
          Hi, I'm Bless Kimbi
          <br />
          <span className="inline-flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 mt-2">
            <span ref={dynamicTextRef} className="text-gold">{words[index]}</span>
            <span>Web Designer</span>
          </span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl font-body font-normal text-white/90 mt-3 block">
            Based in Cameroon
          </span>
        </h1>

        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 font-body leading-relaxed">
          I build fast, professional websites and web apps that rank on Google and convert
          visitors into paying clients for businesses across Africa and worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/contact" className="btn-green min-w-[200px]">Get a Free Quote</a>
          <a href="#projects" className="btn-outline-white min-w-[200px]">View Projects</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
