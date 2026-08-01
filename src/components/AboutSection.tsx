import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileImage from "./ProfileImage";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      });
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: "power3.out",
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "50+", label: "Projects Completed" },
    { value: "8+", label: "Years Experience" },
    { value: "30+", label: "Happy Clients" },
    { value: "∞", label: "Curiosity" },
  ];

  return (
    <section ref={sectionRef} id="about" className="section-white pt-32 md:pt-40">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div ref={textRef}>
            <span className="section-label">About Me</span>
            <h2 className="heading-serif text-3xl md:text-5xl mb-6">
              Bless Kimbi{" "}
              <span className="text-primary">Web Designer</span>
              <br />&amp; Developer
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-body mb-5">
              I'm <strong className="text-navy">Bless Kimbi</strong>, a professional web designer and
              developer based in <strong className="text-navy">Cameroon</strong>. I help
              businesses build a strong online presence with fast, modern websites that rank on
              Google and turn visitors into paying clients.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              From small startups to established companies needing e-commerce or web apps,
              I handle the full stack: design, development, SEO, and launch — 50+ projects delivered
              across Africa and internationally. Every site is mobile-first and built to perform.
            </p>
          </div>
          <div className="order-first lg:order-last">
            <ProfileImage />
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div key={stat.label} className="marsha-card p-6 text-center">
              <div className="font-display font-bold text-3xl text-primary mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
