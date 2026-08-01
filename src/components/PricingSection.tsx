import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20am%20interested%20in%20your%20web%20design%20services.";

interface PricingFeature { text: string; included: boolean; }
interface Tier {
  name: string; price: string; description: string;
  features: PricingFeature[]; featured: boolean; badge?: string;
}

const tiers: Tier[] = [
  {
    name: "Basic", price: "$320",
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
    name: "Silver", price: "$440",
    description: "Great for growing businesses that need more pages and engagement.",
    featured: true, badge: "Most Popular",
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
    name: "Gold", price: "$620",
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
    name: "Diamond", price: "$885",
    description: "The complete package, everything you need to lead your market online.",
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
    <section ref={sectionRef} id="pricing" className="section-white border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-14">
          <span className="section-label">Pricing Plans</span>
          <h2 className="heading-serif text-3xl md:text-5xl mb-4 heading-underline">
            Transparent <span className="text-gold">Pricing</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            We prioritise working within our clients' budget.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {tiers.map((tier) => (
            <div key={tier.name} className={`marsha-card flex flex-col overflow-hidden relative ${tier.featured ? "ring-2 ring-gold scale-[1.02]" : ""}`}>
              {tier.badge && (
                <div className="bg-primary text-white text-xs font-bold text-center py-2 flex items-center justify-center gap-1">
                  <Zap size={12} /> {tier.badge}
                </div>
              )}
              <div className={`p-6 flex flex-col flex-1 ${tier.featured ? "bg-primary text-white" : ""}`}>
                <p className={`font-body font-bold text-xs uppercase tracking-widest mb-2 ${tier.featured ? "text-white/80" : "text-primary"}`}>{tier.name}</p>
                <div className="mb-3">
                  <span className={`font-display font-bold text-4xl ${tier.featured ? "text-white" : "text-navy"}`}>{tier.price}</span>
                  <span className={`text-sm ml-1 ${tier.featured ? "text-white/70" : "text-muted-foreground"}`}>one-time</span>
                </div>
                <p className={`text-sm mb-5 ${tier.featured ? "text-white/85" : "text-muted-foreground"}`}>{tier.description}</p>
                <div className={`h-px mb-5 ${tier.featured ? "bg-white/20" : "bg-border"}`} />
                <ul className="space-y-2.5 flex-1 mb-6">
                  {tier.features.map((feat) => (
                    <li key={feat.text} className="flex items-start gap-2 text-sm">
                      {feat.included
                        ? <Check size={14} className={`mt-0.5 shrink-0 ${tier.featured ? "text-white" : "text-primary"}`} />
                        : <X size={14} className={`mt-0.5 shrink-0 ${tier.featured ? "text-white/55" : "text-muted-foreground/50"}`} />
                      }
                      <span className={feat.included ? (tier.featured ? "text-white" : "text-navy") : (tier.featured ? "text-white/55 line-through" : "text-muted-foreground/50 line-through")}>{feat.text}</span>
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={tier.featured ? "btn-green w-full text-center !py-3" : "btn-outline-primary w-full text-center !py-3"}>
                  Buy Now
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10 font-body">
          All prices are starting rates. Final cost depends on project complexity.{" "}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Message me for a custom quote.</a>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
