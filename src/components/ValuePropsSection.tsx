import { Zap, Search, Smartphone, Palette, Shield, Target } from "lucide-react";

const props = [
  { icon: Zap, label: "Fast & Reliable" },
  { icon: Search, label: "SEO Ready" },
  { icon: Smartphone, label: "Mobile First" },
  { icon: Palette, label: "Modern Design" },
  { icon: Shield, label: "Secure & Scalable" },
  { icon: Target, label: "Results Driven" },
];

const ValuePropsSection = () => (
  <section className="section-white border-t border-border py-16">
    <div className="max-w-4xl mx-auto text-center mb-10 px-6">
      <h2 className="heading-serif text-2xl md:text-3xl">
        I design with <span className="text-gold">purpose</span>
        {" "}and build for <span className="text-gold">performance</span>
      </h2>
    </div>
    <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      {props.map(({ icon: Icon, label }, i) => (
        <div key={label} className="flex flex-col items-center gap-2 text-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${i % 2 === 0 ? "bg-primary/10" : "bg-gold/10"}`}>
            <Icon size={20} className={i % 2 === 0 ? "text-primary" : "text-gold"} />
          </div>
          <span className="font-body text-xs font-semibold text-navy">{label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default ValuePropsSection;
