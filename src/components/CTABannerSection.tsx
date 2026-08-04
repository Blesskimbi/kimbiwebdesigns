import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const WHATSAPP = "https://wa.me/237675126845";

const CTABannerSection = () => (
  <section className="section-cta border-t border-border text-center">
    <div className="max-w-2xl mx-auto px-6">
      <h2 className="heading-serif text-3xl md:text-4xl mb-4 heading-underline">
        Ready to grow your business?
      </h2>
      <p className="text-muted-foreground font-body mb-8">
        Let's work together to create a website that drives real results for your business.
        Get started with a free consultation today.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-green">
          Get a Free Quote <ArrowRight size={16} />
        </a>
        <Link to="/projects" className="btn-outline-navy">View Projects</Link>
      </div>
    </div>
  </section>
);

export default CTABannerSection;
