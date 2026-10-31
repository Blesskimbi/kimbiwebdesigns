import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

const words = ["Modern", "Unique", "Functional"];

const promoCards = [
  {
    panel: "services" as const,
    title: "How I Can Help?",
    subtitle: "My Services",
    href: "#services",
    cta: "View All Services",
  },
  {
    panel: "promise" as const,
    title: "Why Choose Me?",
    subtitle: "My Expertise",
    href: "/about/",
    cta: "What Makes Me Different",
  },
  {
    panel: "proof" as const,
    title: "Bring Innovative Thinking",
    subtitle: "For My Clients",
    href: "/projects/",
    cta: "View My Work",
  },
];

/* The six real service names, in the order the navbar lists them. */
const panelServices = [
  "Web Design",
  "SEO",
  "Social Media",
  "Mobile Apps",
  "UI/UX Design",
  "E-commerce",
];

/* The opacity ramp makes the list read as continuing past the frame; hovering
   the card flattens it to full, so the panel has something to give back.
   The floor is 55% rather than lower because a phone never gets that hover —
   whatever the ramp bottoms out at is what a touch visitor reads permanently,
   and cream below about half opacity stops being legible on the accent. */
const serviceFade = [
  "opacity-100",
  "opacity-90",
  "opacity-80",
  "opacity-70",
  "opacity-[0.62]",
  "opacity-55",
];

const panelPromises = ["Fast by default", "Mobile-first", "SEO built in", "Built to convert"];

/* Three typographic panels in place of the stock promo photographs. Each is
   built from the brand's own three colours and states what its card is about
   in words, so the card carries its own meaning rather than borrowing it from
   an unrelated image. They alternate ground — orange field, ink field, then
   orange type on cream — so the row reads as one system seen three ways, and
   each uses a different device (a list, a quartered grid, a single numeral)
   so they are not three variations of the same block. */
const PromoPanel = ({ panel }: { panel: (typeof promoCards)[number]["panel"] }) => {
  if (panel === "services") {
    return (
      <div className="h-full bg-gold px-6 py-4 flex flex-col justify-center">
        <ul className="space-y-0.5">
          {panelServices.map((service, i) => (
            <li
              key={service}
              className={`font-display text-background text-[14px] md:text-[16px] leading-[1.2] ${serviceFade[i]} group-hover:opacity-100 transition-opacity duration-300`}
            >
              {service}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (panel === "promise") {
    return (
      <div className="h-full bg-navy grid grid-cols-2">
        {panelPromises.map((promise, i) => (
          <div
            key={promise}
            className={`flex items-center px-5 font-display text-background/90 text-[13px] md:text-sm leading-[1.25] border-background/15 transition-colors duration-300 group-hover:border-background/30 ${
              i % 2 === 0 ? "border-r" : ""
            } ${i < 2 ? "border-b" : ""}`}
          >
            {promise}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full bg-muted border-b border-border px-6 flex flex-col justify-center">
      <span className="font-display text-gold text-[58px] md:text-[66px] leading-[0.85] tracking-[-0.045em]">
        50+
      </span>
      <span className="font-body text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-navy mt-3">
        Projects delivered
      </span>
      <span className="font-body text-xs text-muted-foreground mt-1">
        Across Africa &amp; worldwide
      </span>
    </div>
  );
};

const HeroSection = () => {
  const dynamicTextRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(dynamicTextRef.current, {
        y: -12, opacity: 0, duration: 0.3, ease: "power2.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % words.length);
          gsap.set(dynamicTextRef.current, { y: 12 });
          gsap.to(dynamicTextRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        },
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero — a split: type on the left, one image on the right, both sitting
          on the page's own cream. The previous version stacked a photo, two
          gradient scrims, two blurred glow blobs and an orange strip to create
          depth; none of that is here, and the headline carries the page on
          size and restraint instead. */}
      <section className="relative pt-[72px]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          {/* The text column takes the larger share. Instrument Sans sets
              noticeably wider than a serif at the same size, and the longest
              state of the headline — "Functional Web Designer" — needs ~604px
              at 52px. An even split left it at 518px, which forced the line to
              break after "Web". */}
          <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-10 lg:gap-14 items-center py-14 md:py-20">
            <div className="max-w-[640px]">
              {/* 48px, not larger: the second line has to hold its longest
                  rotation state, "Functional Web Designer", which measures
                  558px here against a 585px column. At 52px it was 604px and
                  the line reflowed to three every time that word came round. */}
              <h1 className="font-display text-[34px] sm:text-[42px] lg:text-[48px] text-navy leading-[1.08] tracking-[-0.028em] mb-6">
                Hi, I&apos;m Bless Kimbi
                <br />
                <span ref={dynamicTextRef} className="text-gold inline-block">{words[index]}</span>{" "}
                Web Designer
              </h1>

              <p className="font-body text-navy text-base md:text-[17px] font-medium mb-3">
                Websites that rank on Google and convert.
              </p>

              <p className="font-body text-muted-foreground text-[15px] md:text-base leading-relaxed mb-9 max-w-lg">
                Based in Cameroon, I build fast, professional websites and web apps that turn
                visitors into paying clients for businesses across Africa and worldwide.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <a href="/contact/" className="btn-green">
                  Get a Free Quote <ArrowRight size={16} />
                </a>
                <a href="#projects" className="btn-outline-navy">
                  View Projects
                </a>
              </div>
            </div>

            {/* The LCP element. A cut-out portrait has no background of its
                own, so the frame has to supply one: a warm panel at the card
                radius, and a single flat disc sitting behind the head to give
                the figure something to stand against. Both are tonal — no new
                hue — because the sweater is already almost the accent orange
                and a second orange here would fight it. */}
            <div className="relative rounded-[2rem] overflow-hidden bg-muted aspect-square">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[9%] -translate-x-1/2 w-[78%] aspect-square rounded-full bg-navy/[0.055]"
              />
              <picture className="contents">
                {/* The WebP twin is written by the imagemin plugin during the
                    build, so it does not exist under `vite dev`. A <source>
                    that 404s is not retried against the <img> below it —
                    <picture> commits to the first matching source — which left
                    the hero blank locally. Production keeps the WebP. */}
                {import.meta.env.PROD && <source srcSet="/bless-kimbi-portrait.png.webp" type="image/webp" />}
                <img
                  src="/bless-kimbi-portrait.png"
                  alt="Bless Kimbi, web designer and developer based in Buea, Cameroon"
                  width={500}
                  height={500}
                  // Lowercase, and spread, on purpose. React 18.3 has no
                  // fetchPriority in its prop list, so the camelCase form trips
                  // "React does not recognize the prop" — a console.error, which
                  // Lighthouse counts against Best Practices. Spreading the
                  // lowercase attribute renders it verbatim and says nothing.
                  {...({ fetchpriority: "high" } as Record<string, string>)}
                  decoding="async"
                  // Bottom-anchored: the cut-out ends in a hard edge at the
                  // chest, so it has to sit flush with the panel's base or it
                  // reads as floating. Scaled slightly past the frame so the
                  // shoulders reach the sides rather than stranding the figure
                  // in the middle.
                  className="absolute inset-x-0 bottom-0 w-[106%] left-1/2 -translate-x-1/2 object-contain object-bottom"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Promo cards — flat, on the same cream, separated by a hairline rather
          than by the old blue-to-peach gradient band. */}
      <section className="border-t border-border/70 py-14 md:py-20">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="grid sm:grid-cols-3 gap-5 md:gap-6">
            {promoCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="marsha-card group flex flex-col hover:no-underline"
              >
                <div className="h-40 md:h-44 overflow-hidden">
                  <PromoPanel panel={card.panel} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h5 className="font-display text-navy text-xl mb-1">{card.title}</h5>
                  <p className="text-muted-foreground text-sm font-body mb-6">{card.subtitle}</p>
                  <span className="font-body text-sm font-medium text-gold inline-flex items-center gap-1.5 mt-auto group-hover:gap-2.5 transition-[gap] duration-300">
                    {card.cta} <ArrowRight size={15} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
