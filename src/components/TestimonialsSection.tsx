import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            Words that <span className="text-gradient-primary">inspire</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6 touch-pan-y">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex-none w-full md:w-[calc(50%-12px)] group relative bg-glass rounded-2xl p-8 md:p-10 transition-all duration-500 hover:glow-primary"
                >
                  {/* Quote mark */}
                  <div className="absolute top-6 right-8 font-display text-6xl text-primary/10 leading-none select-none">
                    "
                  </div>

                  <p className="text-foreground/90 font-body leading-relaxed text-base md:text-lg mb-8 relative z-10">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center font-display font-bold text-sm text-foreground shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-foreground text-sm">
                        {t.name}
                      </div>
                      <div className="text-muted-foreground text-xs font-body">
                        {t.role}
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-glass border border-white/10 flex items-center justify-center text-white hover:border-primary/40 hover:text-primary transition-all z-10 hidden sm:flex"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-glass border border-white/10 flex items-center justify-center text-white hover:border-primary/40 hover:text-primary transition-all z-10 hidden sm:flex"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Google Reviews link */}
        <div className="flex justify-center mt-10">
          <a
            href="https://www.google.com/maps/place/Bless+Kimbi+Web+Developer/@7.3493886,6.9938171,2861775m/data=!3m1!1e3!4m16!1m7!3m6!1s0x2bbd72378f7a550b:0xdddc2079f054ced9!2sBless+Kimbi+Web+Developer!8m2!3d7.3696175!4d12.2940041!16s%2Fg%2F11zck5qn46!3m7!1s0x2bbd72378f7a550b:0xdddc2079f054ced9!8m2!3d7.3696175!4d12.2940041!9m1!1b1!16s%2Fg%2F11zck5qn46!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 font-body text-sm group"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-primary shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="group-hover:underline underline-offset-4">See more reviews on Google</span>
          </a>
        </div>

        {/* Dots + mobile arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Mobile prev */}
          <button
            onClick={scrollPrev}
            className="sm:hidden w-9 h-9 rounded-full bg-glass border border-white/10 flex items-center justify-center text-white"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile next */}
          <button
            onClick={scrollNext}
            className="sm:hidden w-9 h-9 rounded-full bg-glass border border-white/10 flex items-center justify-center text-white"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
