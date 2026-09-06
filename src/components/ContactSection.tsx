import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import LocationMap from "@/components/LocationMap";

type ContactSectionProps = {
  /** Use h1 when rendered as the main content of /contact */
  isPage?: boolean;
};

/** Homepage / contact page section — site footer is rendered globally via SiteFooter. */
const ContactSection = ({ isPage = false }: ContactSectionProps) => {
  const Heading = isPage ? "h1" : "h2";

  return (
  <section id="contact" className="section-white border-t border-border">
    <div className="max-w-5xl mx-auto text-center">
      <span className="section-label">Contact</span>
      <Heading className="heading-serif text-3xl md:text-4xl mb-4 heading-underline">
        Let's work <span className="text-gold">together</span>
      </Heading>
      <p className="text-muted-foreground font-body max-w-xl mx-auto mb-12">
        Ready to build a professional website that ranks on Google? I'm always open to new projects.
      </p>

      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {[
          { icon: Mail, label: "Email", value: "blesskimbi10@gmail.com", href: "mailto:blesskimbi10@gmail.com" },
          { icon: Phone, label: "Phone", value: "+237 675 126 845", href: "tel:+237675126845" },
          { icon: MapPin, label: "Location", value: "Buea, Cameroon", href: "https://maps.app.goo.gl/bxES9weXquKY1dNq5" },
        ].map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="marsha-card p-6 flex flex-col items-center gap-3 hover:no-underline group"
          >
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Icon size={20} className="text-primary" />
            </div>
            <span className="text-muted-foreground text-xs font-body uppercase tracking-widest">{label}</span>
            <span className="font-body font-semibold text-navy text-sm">{value}</span>
          </a>
        ))}
      </div>

      <Link to="/contact/" className="btn-green inline-flex items-center gap-2">
        Send a Message <ArrowRight size={16} />
      </Link>

      {/* Full-size map — only on the dedicated /contact page; the homepage shows a compact
          version next to the Testimonials section instead. */}
      {isPage && (
        <div className="mt-12">
          <LocationMap heightClassName="h-[380px] md:h-[480px]" />
        </div>
      )}
    </div>
  </section>
  );
};

export default ContactSection;
