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
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });

      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
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
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div ref={textRef}>
            <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
              About Me
            </span>
            <h2 className="font-display font-bold text-3xl xs:text-4xl md:text-6xl mb-8">
              Full-Stack <span className="text-gradient-primary">Creator</span>
              <br />
              with Design Skills
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-body mb-6">
              I’m a software engineer and creative developer who builds websites, web apps, and digital content. 
              By combining coding skills with design, I turn complex ideas into real, functional, and 
              visually appealing projects.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              Whether it's frontend development with React, backend systems with Node.js/Python, 
              or creative branding with Canva, I handle both the technical and visual sides of a 
              project from concept to finished product.
            </p>
          </div>

          <div className="order-first lg:order-last">
            <ProfileImage />
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-glass rounded-2xl p-8 text-center group hover:glow-primary transition-shadow duration-500"
            >
              <div className="font-display font-bold text-3xl md:text-4xl text-gradient-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
