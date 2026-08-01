import { Link, useLocation } from "react-router-dom";
import {
  Phone, Mail, MapPin, ArrowRight, MessageCircle,
  Instagram, Github, Linkedin,
} from "lucide-react";

const WHATSAPP = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20want%20to%20discuss%20my%20website%20project.";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Web Design & Development", href: "/services/" },
  { label: "SEO Services", href: "/seo-company-in-cameroon/" },
  { label: "Social Media Management", href: "/social-media-management/" },
  { label: "Mobile App Development", href: "/mobile-app-development/" },
  { label: "UI/UX Design", href: "/ui-ux-design/" },
  { label: "E-commerce Solutions", href: "/ecommerce-website-design-in-cameroon/" },
];

const socialLinks = [
  { label: "Instagram", href: "https://ig.me/m/blesskimbi", icon: Instagram },
  { label: "WhatsApp", href: "https://wa.me/+237675126845", icon: MessageCircle },
  { label: "GitHub", href: "https://github.com/Blesskimbi", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bless-kimbi-09413936a/", icon: Linkedin },
  { label: "TikTok", href: "https://www.tiktok.com/@blesskimbi", icon: null },
];

const FooterColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-5 pb-2 border-b-2 border-gold inline-block">
    {children}
  </h3>
);

export const SiteFooter = () => (
  <footer className="mt-auto">
    {/* CTA band */}
    <section className="bg-gold px-6 py-10 md:py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy mb-2">
            Looking to Create a Website?
          </h2>
          <p className="text-navy/80 font-body text-sm md:text-base leading-relaxed">
            Contact Bless Kimbi — professional web designer &amp; developer in Cameroon.
            I build fast, modern websites that rank on Google and convert visitors into clients.
          </p>
        </div>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 shrink-0 bg-white text-navy font-display font-bold text-sm md:text-base px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <MessageCircle size={20} />
          Get Started Now
          <ArrowRight size={18} />
        </a>
      </div>
    </section>

    {/* Main footer */}
    <section className="bg-navy text-white px-6 pt-14 pb-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link to="/" className="font-display font-bold text-xl text-white tracking-tight inline-block mb-4">
            Bless<span className="text-gold">Kimbi</span>
          </Link>
          <p className="text-white/75 text-sm font-body leading-relaxed mb-6 max-w-sm">
            Professional web designer and developer based in Buea, Cameroon. I design and build
            websites, web apps, and digital solutions for businesses across Africa and worldwide.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center text-white/85 transition-all duration-200"
              >
                {Icon ? <Icon size={16} /> : <span className="text-[10px] font-bold">TT</span>}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2">
          <FooterColumnTitle>Quick Links</FooterColumnTitle>
          <ul className="space-y-2.5">
            {quickLinks.map(({ label, href }) => (
              <li key={href}>
                <Link to={href} className="text-white/75 hover:text-gold text-sm font-body transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <FooterColumnTitle>Our Services</FooterColumnTitle>
          <ul className="space-y-2.5">
            {serviceLinks.map(({ label, href }) => (
              <li key={href}>
                <Link to={href} className="text-white/75 hover:text-gold text-sm font-body transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <FooterColumnTitle>Contact Info</FooterColumnTitle>
          <ul className="space-y-4 mb-8">
            <li>
              <a href="tel:+237675126845" className="flex items-start gap-3 text-white/75 hover:text-gold transition-colors group">
                <Phone size={18} className="text-gold shrink-0 mt-0.5" />
                <span className="text-sm font-body">+237 675 126 845</span>
              </a>
            </li>
            <li>
              <a href="mailto:blesskimbi10@gmail.com" className="flex items-start gap-3 text-white/75 hover:text-gold transition-colors group">
                <Mail size={18} className="text-gold shrink-0 mt-0.5" />
                <span className="text-sm font-body break-all">blesskimbi10@gmail.com</span>
              </a>
            </li>
          </ul>
          <FooterColumnTitle>Location</FooterColumnTitle>
          <div className="flex items-start gap-3 text-white/75">
            <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
            <p className="text-sm font-body leading-relaxed">
              Buea, South West Region<br />
              Cameroon
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-white/55">
        <p>
          © {new Date().getFullYear()}{" "}
          <Link to="/" className="text-gold hover:text-white transition-colors">Bless Kimbi</Link>
          {" "}· Web Designer &amp; Developer
        </p>
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
          <span className="text-white/25">|</span>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            WhatsApp
          </a>
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
