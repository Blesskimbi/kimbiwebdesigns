import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, TrendingUp, Share2, Smartphone, Layers, ShoppingCart, ArrowUpRight } from "lucide-react";

type NavLink = { label: string; href: string; isPage: boolean };

const navLinks: NavLink[] = [
  { label: "Home", href: "/", isPage: true },
  { label: "Services", href: "/services/", isPage: true },
  { label: "Projects", href: "/projects", isPage: true },
  { label: "About Us", href: "/about", isPage: true },
  { label: "Blog", href: "/blog", isPage: true },
  { label: "Contact", href: "/contact", isPage: true },
];

const serviceDropdownItems = [
  { label: "Web Design & Development", href: "/services/", icon: Globe, desc: "Custom websites that convert" },
  { label: "SEO Services", href: "/seo-company-in-cameroon/", icon: TrendingUp, desc: "Rank higher on Google" },
  { label: "Social Media Management", href: "/social-media-management/", icon: Share2, desc: "Grow your brand online" },
  { label: "Mobile App Development", href: "/mobile-app-development/", icon: Smartphone, desc: "iOS & Android with React Native" },
  { label: "UI/UX Design", href: "/ui-ux-design/", icon: Layers, desc: "Figma design that converts" },
  { label: "E-commerce Solutions", href: "/ecommerce-website-design-in-cameroon/", icon: ShoppingCart, desc: "Online stores that sell" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); setServicesOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const servicesActive = location.pathname.startsWith("/services") ||
    serviceDropdownItems.some(s => location.pathname.startsWith(s.href.replace(/\/$/, "")));

  const linkClass = (href: string) => {
    const active = href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href.replace(/\/$/, ""));
    return `nav-link-pro ${active ? "text-primary active" : "text-navy hover:text-primary"}`;
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 overflow-visible bg-white/95 backdrop-blur-md border-b border-transparent transition-all duration-300 ${
          scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-border/50" : "shadow-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">
          <Link to="/" className="font-display font-bold text-xl text-navy tracking-tight shrink-0 z-10">
            Bless<span className="text-gold">Kimbi</span>
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => {
              if (link.label === "Services") {
                return (
                  <div
                    key="Services"
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 ${servicesActive ? "text-primary" : "text-navy hover:text-primary"}`}
                    >
                      <span className={`nav-link-pro ${servicesActive ? "active" : ""}`}>Services</span>
                      <ChevronDown size={14} className={`shrink-0 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px] transition-all duration-200 origin-top z-[60] ${
                        servicesOpen ? "opacity-100 visible pointer-events-auto translate-y-0" : "opacity-0 invisible pointer-events-none -translate-y-1"
                      }`}
                    >
                      <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-border p-3 grid grid-cols-2 gap-1">
                        {serviceDropdownItems.map(({ label, href, icon: Icon, desc }) => (
                          <Link key={href} to={href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors group">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Icon size={16} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-body text-sm font-semibold text-navy group-hover:text-primary leading-tight">{label}</p>
                              <p className="font-body text-xs text-muted-foreground mt-0.5">{desc}</p>
                            </div>
                          </Link>
                        ))}
                        <div className="col-span-2 border-t border-border pt-2 px-3">
                          <Link to="/services/" className="flex items-center justify-between text-xs font-semibold text-primary hover:underline">
                            View all services <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return <Link key={link.label} to={link.href} className={linkClass(link.href)}>{link.label}</Link>;
            })}
          </div>

          <Link to="/contact" className="hidden lg:inline-flex btn-nav-cta shrink-0">
            Let's Talk
          </Link>

          <button
            type="button"
            className="lg:hidden text-navy p-2 -mr-2 z-10"
            onClick={() => setIsMenuOpen(v => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-[48] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-navy/20 backdrop-blur-sm"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className="absolute top-[72px] left-0 right-0 bottom-0 bg-white overflow-y-auto">
          <div className="px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-body text-lg font-semibold text-navy py-3.5 border-b border-border hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-4 mb-2">Services</p>
            {serviceDropdownItems.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setIsMenuOpen(false)}
                className="font-body text-base text-navy py-2.5 pl-3 border-l-2 border-border hover:border-gold hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}

            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="btn-green mt-6 text-center">
              Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
