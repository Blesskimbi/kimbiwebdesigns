import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star, BadgeCheck, ArrowUpRight } from "lucide-react";
import LocationMap from "@/components/LocationMap";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Super impressed with the design quality. Everything feels modern, responsive, and user-friendly. They also helped me understand how to manage my site after delivery.",
    name: "FiHof",
    role: "CEO, FiHof Foundation",
    avatar: "FH",
  },
  {
    quote: "I've worked with a few designers before, but this was by far the smoothest experience. Great communication and even better results.",
    name: "Vibecraftstudios",
    role: "MC & Event Host",
    avatar: "VC",
  },
  {
    quote: "My online presence completely changed after they re-built my E-commerce store. It now looks like a real brand, not just a small business page.",
    name: "Shopfluxx",
    role: "Owner, Shopfluxx",
    avatar: "SF",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", containScroll: "trimSnaps" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

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
    <section ref={sectionRef} className="section-muted border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <span className="section-label">Testimonials</span>
          <h2 className="heading-serif text-3xl md:text-5xl mb-4 heading-underline">
            Words that <span className="text-gold">inspire</span>
          </h2>
          <div className="inline-flex items-center gap-2.5 bg-white rounded-full border border-border px-5 py-2 shadow-pro">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={15} className="fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-sm font-body font-semibold text-navy">5.0</span>
            <span className="text-sm font-body text-muted-foreground">from happy clients across Africa</span>
          </div>
        </div>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-5">
              {testimonials.map((t) => (
                <div key={t.name} className="flex-none w-full md:w-[calc(50%-10px)] marsha-card p-8 relative">
                  <span className="absolute top-4 right-6 font-display text-6xl leading-none text-primary/10 select-none" aria-hidden="true">
                    &rdquo;
                  </span>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-navy font-body leading-relaxed mb-6 italic relative z-10">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center font-display font-bold text-sm text-white shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-body font-semibold text-navy text-sm">{t.name}</span>
                        <BadgeCheck size={14} className="text-primary" />
                      </div>
                      <div className="text-muted-foreground text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={scrollPrev} className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full marsha-card flex items-center justify-center text-navy hidden sm:flex" aria-label="Previous"><ChevronLeft size={18} /></button>
          <button onClick={scrollNext} className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full marsha-card flex items-center justify-center text-navy hidden sm:flex" aria-label="Next"><ChevronRight size={18} /></button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <a href="https://www.google.com/maps/place/Bless+Kimbi+Web+Developer/@7.3493886,6.9938171,2861775m/data=!3m1!1e3!4m16!1m7!3m6!1s0x2bbd72378f7a550b:0xdddc2079f054ced9!2sBless+Kimbi+Web+Developer!8m2!3d7.3696175!4d12.2940041!16s%2Fg%2F11zck5qn46!3m7!1s0x2bbd72378f7a550b:0xdddc2079f054ced9!8m2!3d7.3696175!4d12.2940041!9m1!1b1!16s%2Fg%2F11zck5qn46!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            See more reviews on Google
          </a>
        </div>

        {/* Compact map beside a short blurb — full-size version lives on the /contact page */}
        <div className="mt-14 grid md:grid-cols-2 gap-6 items-center">
          <div className="marsha-card p-6 md:p-8 order-2 md:order-1">
            <span className="section-label">Find us</span>
            <h3 className="font-display font-bold text-navy text-xl mb-2">Based in Cameroon, serving clients worldwide</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              Bless Kimbi Web Developer is based in Cameroon and partners with businesses across Africa and beyond.
            </p>
            <a
              href="https://www.google.com/maps/place/Bless+Kimbi+Web+Developer/@7.3493886,6.9938171,2861775m/data=!3m1!1e3!4m16!1m7!3m6!1s0x2bbd72378f7a550b:0xdddc2079f054ced9!2sBless+Kimbi+Web+Developer!8m2!3d7.3696175!4d12.2940041!16s%2Fg%2F11zck5qn46!3m7!1s0x2bbd72378f7a550b:0xdddc2079f054ced9!8m2!3d7.3696175!4d12.2940041!9m1!1b1!16s%2Fg%2F11zck5qn46!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
            >
              Get directions <ArrowUpRight size={16} />
            </a>
          </div>
          <LocationMap heightClassName="h-[220px] md:h-[260px]" className="order-1 md:order-2" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
