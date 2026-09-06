import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 97, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "h", label: "Average Response Time" },
];

const Counter = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            if (el) el.textContent = Math.round(obj.val).toString();
          },
        });
      },
    });
    return () => trigger.kill();
  }, [value]);

  return (
    <div className="text-center">
      <div className="font-display font-bold text-3xl md:text-4xl text-white mb-1">
        <span ref={numRef}>0</span>{suffix}
      </div>
      <div className="font-body text-xs md:text-sm text-[#A69CAA]">{label}</div>
    </div>
  );
};

/** "Ready to grow your brand?" — dark CTA band with counters, echoing the reference's combined section. */
const StatsBarSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-navy relative overflow-hidden text-center py-20 md:py-28">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />

      <div ref={headingRef} className="max-w-2xl mx-auto px-6 relative z-10">
        <h2 className="font-accent font-bold text-4xl md:text-6xl text-white mb-6 leading-[1.1]">
          Ready to grow your brand?
        </h2>
        <p className="text-[#E2E6EC] font-body mb-10 leading-relaxed">
          Let&apos;s work together to create digital solutions that drive real results for your
          business. Get started with a free consultation today.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <Link to="/about/" className="btn-green">Get to Know Me Better</Link>
          <a href="tel:+237675126845" className="btn-outline-white">Call: +237 675 126 845</a>
        </div>

        <div className="h-px bg-white/15 max-w-md mx-auto mb-14" />

        <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-xl mx-auto">
          {stats.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBarSection;
