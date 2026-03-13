import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll("[data-animate]"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!emailRef.current) return;
    const rect = emailRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.1, y: y * 0.1 });
    gsap.to(emailRef.current, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!emailRef.current) return;
    gsap.to(emailRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-40 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span
          data-animate
          className="text-primary font-body text-sm tracking-widest uppercase mb-6 block"
        >
          Let's Connect
        </span>
        <h2
          data-animate
          className="font-display font-bold text-4xl md:text-6xl mb-6"
        >
          Have a project in mind?
        </h2>
        <p
          data-animate
          className="text-muted-foreground text-lg mb-16 max-w-xl mx-auto font-body"
        >
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of something amazing.
        </p>

        <div
          data-animate
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="inline-block"
        >
          <a
            ref={emailRef}
            href="mailto:hello@example.com"
            className="font-display font-bold text-3xl sm:text-5xl md:text-7xl text-gradient-primary inline-block transition-transform will-change-transform cursor-pointer hover:glow-text"
          >
            hello@example.com
          </a>
        </div>

        <div data-animate className="flex justify-center gap-8 mt-16">
          {["GitHub", "Twitter", "LinkedIn", "Dribbble"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-muted-foreground hover:text-foreground font-body text-sm tracking-wider transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-primary after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              {link}
            </a>
          ))}
        </div>

        <div data-animate className="mt-20 text-muted-foreground text-xs font-body tracking-widest uppercase">
          © 2026 — Designed & Built with passion
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
