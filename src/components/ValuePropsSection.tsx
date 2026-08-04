import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  "Hands-on experience building modern, conversion-focused websites",
  "Trusted by businesses across Cameroon, Nigeria, and South Africa",
  "Transparent pricing. Tailored strategies. Real results.",
];

const ValuePropsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, x: -40, duration: 0.8, ease: "power3.out",
      });
      gsap.from(imageRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, x: 40, duration: 0.8, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-white border-t border-border">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div ref={textRef}>
          <span className="section-label">Why Work With Me</span>
          <h2 className="heading-serif text-3xl md:text-4xl mb-5 heading-underline">
            Why Work With <span className="text-gold">Bless Kimbi?</span>
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            I&apos;ll build you a comprehensive, conversion-focused website engineered to attract
            more qualified leads, convert more visitors into customers, and increase your
            revenue and profitability.
          </p>
          <ul className="space-y-3.5 mb-9">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check size={13} className="text-primary" />
                </span>
                <span className="font-body text-navy text-sm md:text-base">{reason}</span>
              </li>
            ))}
          </ul>
          <a href="/services/" className="btn-outline-primary inline-flex items-center gap-2">
            View All Services <ArrowRight size={14} />
          </a>
        </div>

        <div ref={imageRef} className="relative">
          <div className="absolute -inset-4 bg-gold/10 rounded-3xl -z-10 hidden md:block" />
          <img
            src="/bless-kimbi-websites-1.png"
            alt="Bless Kimbi web design work"
            className="w-full rounded-2xl shadow-pro border border-border object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
