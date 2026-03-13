import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = [
  "CREATIVE",
  "✦",
  "DEVELOPER",
  "✦",
  "DESIGNER",
  "✦",
  "ANIMATOR",
  "✦",
  "INNOVATOR",
  "✦",
  "DREAMER",
  "✦",
];

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Velocity-based scroll marquee
      if (track1Ref.current) {
        gsap.to(track1Ref.current, {
          xPercent: -50,
          ease: "none",
          duration: 25,
          repeat: -1,
        });
      }

      if (track2Ref.current) {
        gsap.to(track2Ref.current, {
          xPercent: 50,
          ease: "none",
          duration: 30,
          repeat: -1,
        });
      }

      // Parallax speed modifier on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity() / 1000;
          if (track1Ref.current) {
            gsap.to(track1Ref.current, {
              skewX: velocity * 0.5,
              duration: 0.5,
              ease: "power2.out",
            });
          }
          if (track2Ref.current) {
            gsap.to(track2Ref.current, {
              skewX: -velocity * 0.5,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderWords = (outlined: boolean) =>
    [...words, ...words].map((word, i) => (
      <span
        key={i}
        className={`inline-block mx-4 md:mx-8 font-display font-bold text-5xl md:text-7xl lg:text-8xl whitespace-nowrap select-none ${
          outlined
            ? "text-transparent [-webkit-text-stroke:1px_hsl(var(--primary)/0.3)]"
            : "text-foreground/5"
        }`}
      >
        {word}
      </span>
    ));

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Track 1 — right to left */}
      <div className="mb-4">
        <div ref={track1Ref} className="flex w-max will-change-transform">
          {renderWords(false)}
        </div>
      </div>

      {/* Track 2 — left to right (outlined) */}
      <div>
        <div ref={track2Ref} className="flex w-max will-change-transform" style={{ transform: "translateX(-50%)" }}>
          {renderWords(true)}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
