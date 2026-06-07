import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20your%20web%20design%20services.";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface Tier {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  featured: boolean;
  badge?: string;
}

const tiers: Tier[] = [
  {
    name: "Basic",
    price: "$320",
    description: "Perfect for small businesses needing a clean online presence.",
    featured: false,
    features: [
      { text: "4-Page Landing Page", included: true },
      { text: "Responsive Design", included: true },
      { text: "Contact Form", included: true },
      { text: "Basic SEO Setup", included: true },
      { text: "Ongoing Support", included: false },
      { text: "Logo Design", included: false },
      { text: "Live Chat Integration", included: false },
      { text: "Google Business Creation", included: false },
    ],
  },
  {
    name: "Silver",
    price: "$440",
    description: "Great for growing businesses that need more pages and engagement.",
    featured: true,
    badge: "Most Popular",
    features: [
      { text: "5+ Pages", included: true },
      { text: "Responsive Design", included: true },
      { text: "Contact Form", included: true },
      { text: "Basic SEO Setup", included: true },
      { text: "Live Chat Integration", included: true },
      { text: "Ongoing Support", included: false },
      { text: "Logo Design", included: false },
      { text: "Google Business Creation", included: false },
    ],
  },
  {
    name: "Gold",
    price: "$620",
    description: "For businesses ready to dominate local search and build a full brand.",
    featured: false,
    features: [
      { text: "6+ Pages", included: true },
      { text: "Full SEO Setup", included: true },
      { text: "Logo Design", included: true },
      { text: "Live Chat Integration", included: true },
      { text: "Google Business Creation", included: true },
      { text: "Social Media Integration", included: true },
      { text: "Ongoing Support", included: false },
      { text: "Unlimited Pages", included: false },
    ],
  },
  {
    name: "Diamond",
    price: "$885",
    description: "The complete package — everything you need to lead your market online.",
    featured: false,
    features: [
      { text: "Unlimited Pages", included: true },
      { text: "Full SEO Setup", included: true },
      { text: "Logo Design", included: true },
      { text: "Live Chat Integration", included: true },
      { text: "Google Business Profile", included: true },
      { text: "Social Media Integration", included: true },
      { text: "1 Month Free Support", included: true },
      { text: "Priority Delivery", included: true },
    ],
  },
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 88%" },
          opacity: 0,
          y: 60,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-orange-400 font-body text-sm tracking-widest uppercase mb-4 block">
            Pricing Plans
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-5">
            Transparent <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            No hidden fees. Pick the package that fits your business and let's get started.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative flex flex-col rounded-2xl border transition-all duration-500 overflow-hidden
                ${tier.featured
                  ? "bg-gradient-to-b from-orange-500/15 to-orange-900/10 border-orange-500/40 shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)] scale-[1.02] z-10"
                  : "bg-glass border-white/8 hover:border-white/20"
                }`}
            >
              {/* Featured badge */}
              {tier.badge && (
                <div className="absolute top-0 left-0 right-0 flex justify-center">
                  <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-b-xl flex items-center gap-1">
                    <Zap size={11} /> {tier.badge}
                  </span>
                </div>
              )}

              <div className={`p-7 flex flex-col flex-1 ${tier.badge ? 'pt-10' : ''}`}>
                {/* Tier name */}
                <p className={`font-display font-bold text-sm uppercase tracking-widest mb-3 ${tier.featured ? 'text-orange-400' : 'text-gray-400'}`}>
                  {tier.name}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <span className={`font-display font-bold text-4xl ${tier.featured ? 'text-orange-400' : 'text-white'}`}>
                    {tier.price}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">one-time</span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">{tier.description}</p>

                {/* Divider */}
                <div className={`h-px mb-6 ${tier.featured ? 'bg-orange-500/20' : 'bg-white/8'}`} />

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat.text} className="flex items-start gap-2.5 text-sm">
                      {feat.included ? (
                        <Check size={15} className={`mt-0.5 shrink-0 ${tier.featured ? 'text-orange-400' : 'text-primary'}`} />
                      ) : (
                        <X size={15} className="mt-0.5 shrink-0 text-gray-600" />
                      )}
                      <span className={feat.included ? 'text-gray-200' : 'text-gray-600 line-through'}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-300
                    ${tier.featured
                      ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:shadow-[0_0_35px_rgba(249,115,22,0.5)]'
                      : 'bg-white/8 hover:bg-white/15 text-white border border-white/10 hover:border-white/20'
                    }`}
                >
                  Buy Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-10">
          All prices are starting rates. Final cost depends on project complexity.{" "}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
            Message me for a custom quote.
          </a>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
