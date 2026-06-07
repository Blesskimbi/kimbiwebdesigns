import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Working with Bless was like witnessing magic. The animations and attention to detail were beyond anything I've ever seen.",
    name: "Sarah Chen",
    role: "CEO, NovaTech",
    avatar: "SC",
  },
  {
    quote: "They transformed our vision into a living, breathing digital experience. Every interaction feels intentional and beautiful.",
    name: "Marcus Rivera",
    role: "Creative Director, Flux Studio",
    avatar: "MR",
  },
  {
    quote: "The level of craft is extraordinary. Our conversion rate doubled after the redesign — users just can't stop exploring.",
    name: "Elena Volkov",
    role: "Head of Product, Orbit Labs",
    avatar: "EV",
  },
  {
    quote: "Pure artistry combined with technical excellence. This is what happens when a developer truly cares about the craft.",
    name: "James Okafor",
    role: "Founder, Prism Digital",
    avatar: "JO",
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
