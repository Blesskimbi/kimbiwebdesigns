import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
          </div>
          <span className="section-label">Testimonials</span>
          <h2 className="heading-serif text-3xl md:text-5xl heading-underline">
            Words that <span className="text-gold">inspire</span>
          </h2>
        </div>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-5">
              {testimonials.map((t) => (
                <div key={t.name} className="flex-none w-full md:w-[calc(50%-10px)] marsha-card p-8 relative">
                  <div className="absolute top-5 right-5 opacity-60">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-navy font-body leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-display font-bold text-sm text-primary">{t.avatar}</div>
                    <div>
                      <div className="font-body font-semibold text-navy text-sm">{t.name}</div>
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

        <div className="flex justify-center mt-8">
          <a href="https://www.google.com/maps/place/Bless+Kimbi+Web+Developer/@7.3493886,6.9938171,2861775m/data=!3m1!1e3!4m16!1m7!3m6!1s0x2bbd72378f7a550b:0xdddc2079f054ced9!2sBless+Kimbi+Web+Developer!8m2!3d7.3696175!4d12.2940041!16s%2Fg%2F11zck5qn46!3m7!1s0x2bbd72378f7a550b:0xdddc2079f054ced9!8m2!3d7.3696175!4d12.2940041!9m1!1b1!16s%2Fg%2F11zck5qn46!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold hover:underline">
            See more reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
