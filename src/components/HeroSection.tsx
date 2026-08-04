import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowDown } from "lucide-react";

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
    <section ref={sectionRef} className="relative hero-marsha flex items-center overflow-hidden pt-[72px] min-h-[560px] md:min-h-[640px]">
      {/* Background photo — drop your image at public/hero-bg.jpg and it appears automatically.
          Falls back to the navy gradient below if the file isn't present yet. */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        {/* Darker over the text (left) side, lighter over the image detail (right) side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b1f]/95 via-[#050b1f]/70 to-[#0d1c4d]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b1f]/60 via-transparent to-transparent" />
      </div>

      {/* soft brand glow blobs for depth */}
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gold/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full bg-primary/30 blur-[100px] pointer-events-none" />

      {/* Bottom accent line, echoing the reference's orange strip */}
      <div className="absolute bottom-0 left-0 right-0 h-2 md:h-2.5 bg-gold z-20" />

      <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
        <div className="max-w-2xl text-left">
          {/* Badge row — two clean pills side by side */}
          <div className="flex items-center flex-wrap gap-2 mb-7">
            <span
              className="inline-flex items-center rounded-full bg-white text-[#0D0D2B] font-['Rubik'] font-semibold text-xs py-[6px] px-[14px] whitespace-nowrap"
            >
              Bless Kimbi
            </span>
            <span
              className="inline-flex items-center rounded-full bg-white/15 text-white font-['Rubik'] font-normal text-xs py-[6px] px-[14px] whitespace-nowrap"
            >
              Professional Web Design Services
            </span>
          </div>

          <h1 className="font-['Poppins'] font-semibold text-[34px] md:text-[54px] text-white leading-[1.15] mb-6">
            Hi, I&apos;m Bless Kimbi
            <br />
            <span ref={dynamicTextRef} className="text-[#FF6B0A] inline-block">{words[index]}</span>{" "}
            Web Designer
          </h1>

          <p className="font-['Poppins'] text-[#E2E6EC] text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            Based in Cameroon, I build fast, professional websites and web apps that rank on
            Google and convert visitors into paying clients for businesses across Africa and worldwide.
          </p>

          <div className="flex flex-wrap gap-4 justify-start items-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-[14px] rounded-[20px] bg-white text-[#020626] font-['Rubik'] font-bold text-sm px-[30px] py-[15px] hover:-translate-y-0.5 transition-transform duration-300"
            >
              Get a Free Quote <ArrowRight size={16} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-[14px] rounded-[20px] bg-transparent border border-white/30 text-white font-['Rubik'] font-bold text-sm px-[30px] py-[15px] hover:bg-white/10 transition-colors duration-300"
            >
              View Projects <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
