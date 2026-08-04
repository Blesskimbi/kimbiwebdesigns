import { Link, useLocation } from "react-router-dom";
import {
  Phone, Mail, MapPin, ArrowRight, MessageCircle, ArrowUp,
  Instagram, Github, Linkedin,
} from "lucide-react";

const WHATSAPP = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20want%20to%20discuss%20my%20website%20project.";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

const communityLinks = [
  { label: "Community", href: "/community" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

const serviceLinksA = [
  { label: "Web Design & Development", href: "/services/" },
  { label: "SEO Services", href: "/seo-company-in-cameroon/" },
  { label: "Social Media Management", href: "/social-media-management/" },
];

const serviceLinksB = [
  { label: "Mobile App Development", href: "/mobile-app-development/" },
  { label: "UI/UX Design", href: "/ui-ux-design/" },
  { label: "E-commerce Solutions", href: "/ecommerce-website-design-in-cameroon/" },
];

const socialLinks = [
  { label: "Instagram", href: "https://ig.me/m/blesskimbi", icon: Instagram },
  { label: "WhatsApp", href: "https://wa.me/+237675126845", icon: MessageCircle },
  { label: "GitHub", href: "https://github.com/Blesskimbi", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bless-kimbi-09413936a/", icon: Linkedin },
];

const FooterColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-5 pb-2 border-b-2 border-gold inline-block">
    {children}
  </h3>
);

export const SiteFooter = () => (
  <footer className="mt-auto bg-navy">
    {/* Thin trust strip */}
    <div className="border-b border-white/10 px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <p className="text-white/70 font-body text-sm">
          Trusted by 50+ ambitious businesses across Cameroon, Nigeria &amp; beyond.
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:text-white font-body font-semibold text-sm transition-colors"
        >
          Need Help? &rarr;
        </a>
      </div>
    </div>

    {/* Main footer */}
    <section className="px-6 pt-14 pb-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Left: brand card */}
        <div className="bg-navy-light/40 border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col">
          <Link to="/" className="font-display font-bold text-2xl text-white tracking-tight inline-block mb-4">
            Bless<span className="text-gold">Kimbi</span>
          </Link>
          <p className="text-white/70 text-sm font-body leading-relaxed mb-8 max-w-md">
            I design and build fast, modern websites, web apps, and digital solutions that help
            businesses in Cameroon and across Africa attract customers and grow online.
          </p>

          <div className="flex items-start gap-3 mb-3 text-white/75">
            <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
            <p className="text-sm font-body">
              <b className="text-white">Based in:</b> Buea, South West Region, Cameroon
            </p>
          </div>
          <div className="flex items-start gap-3 mb-8 text-white/75">
            <ArrowRight size={18} className="text-gold shrink-0 mt-0.5" />
            <p className="text-sm font-body">
              <b className="text-white">Serving clients:</b> Remotely, worldwide
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-auto">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center text-white/85 transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: link columns + info box */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <FooterColumnTitle>Services</FooterColumnTitle>
              <ul className="space-y-2.5">
                {serviceLinksA.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} className="text-white/75 hover:text-gold text-sm font-body transition-colors">
                      - {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterColumnTitle>Solutions</FooterColumnTitle>
              <ul className="space-y-2.5">
                {serviceLinksB.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} className="text-white/75 hover:text-gold text-sm font-body transition-colors">
                      - {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterColumnTitle>Company</FooterColumnTitle>
              <ul className="space-y-2.5">
                {companyLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link to={href} className="text-white/75 hover:text-gold text-sm font-body transition-colors">
                      - {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterColumnTitle>Community</FooterColumnTitle>
              <ul className="space-y-2.5">
                {communityLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link to={href} className="text-white/75 hover:text-gold text-sm font-body transition-colors">
                      - {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Info box — echoing the reference's phone / email callouts */}
          <div className="grid sm:grid-cols-2 gap-4 border-t border-white/10 pt-8">
            <a href="tel:+237675126845" className="flex items-center gap-3 group">
              <span className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-gold flex items-center justify-center shrink-0 transition-colors">
                <Phone size={18} className="text-gold group-hover:text-navy transition-colors" />
              </span>
              <span>
                <span className="block text-white/55 text-xs font-body">Talk to an Expert</span>
                <span className="block text-white text-sm font-body font-semibold group-hover:text-gold transition-colors">
                  +237 675 126 845
                </span>
              </span>
            </a>
            <a href="mailto:blesskimbi10@gmail.com" className="flex items-center gap-3 group">
              <span className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-gold flex items-center justify-center shrink-0 transition-colors">
                <Mail size={18} className="text-gold group-hover:text-navy transition-colors" />
              </span>
              <span>
                <span className="block text-white/55 text-xs font-body">Have any Question</span>
                <span className="block text-white text-sm font-body font-semibold group-hover:text-gold transition-colors break-all">
                  blesskimbi10@gmail.com
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-white/60 hover:text-gold transition-colors"
          >
            <ArrowUp size={13} /> Go to Top
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-white/55">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <Link to="/" className="text-gold hover:text-white transition-colors">Bless Kimbi</Link>
            . Designed &amp; Developed by Bless Kimbi.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.slice(0, 3).map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-gold transition-colors">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  </footer>
);

/** Renders SiteFooter on all public routes; hidden on dashboard. */
const SiteFooterGate = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/dashboard")) return null;
  return <SiteFooter />;
};

export default SiteFooterGate;
