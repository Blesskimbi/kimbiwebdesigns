import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";
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
            BK@gmail.com
          </a>
        </div>

        <div data-animate className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 mb-8">
          <a
            href={`https://ig.me/m/blesskimbi`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-pink-500/20 transition-all duration-300"
          >
            <Instagram size={20} />
            <span className="font-medium tracking-wide">Instagram</span>
          </a>

          <a
            href={`https://wa.me/+237675126845`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-[#25D366]/20 transition-all duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="font-medium tracking-wide">WhatsApp</span>
          </a>
        </div>

        <div data-animate className="flex justify-center gap-8 mt-10">
          {[
            { label: "GitHub", href: "https://github.com/Blesskimbi" },
            { label: "TikTok", href: "https://www.tiktok.com/@blesskimbi" },
            { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582208347827" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/bless-kimbi-09413936a/" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground font-body text-sm tracking-wider transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-primary after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              {label}
            </a>
          ))}
        </div>

        <div data-animate className="mt-20 text-muted-foreground text-xs font-body tracking-widest uppercase">
          © 2026 — Designed By Blesskimbi
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
