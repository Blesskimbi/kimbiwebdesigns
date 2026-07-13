import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, TrendingUp, Share2, Smartphone, Layers, ShoppingCart, ArrowUpRight } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  isPage: boolean;
};

const navLinks: NavLink[] = [
  { label: "Home",      href: "/",          isPage: true  },
  { label: "Services",  href: "/services/", isPage: true  },
  { label: "Projects",  href: "/projects",  isPage: true  },
  { label: "Pricing",   href: "/#pricing",  isPage: false },
  { label: "Blog",      href: "/blog",      isPage: true  },
  { label: "Community", href: "/community", isPage: true  },
  { label: "Contact",   href: "/contact",   isPage: true  },
];

const serviceDropdownItems = [
  { label: "Web Design & Development", href: "/services/",                              icon: Globe,        desc: "Custom websites that convert" },
  { label: "SEO Services",             href: "/seo-company-in-cameroon/",               icon: TrendingUp,   desc: "Rank higher on Google"        },
  { label: "Social Media Management",  href: "/social-media-management/",              icon: Share2,       desc: "Grow your brand online"       },
  { label: "Mobile App Development",   href: "/mobile-app-development/",               icon: Smartphone,   desc: "iOS & Android with React Native" },
  { label: "UI/UX Design",             href: "/ui-ux-design/",                         icon: Layers,       desc: "Figma design that converts"   },
  { label: "E-commerce Solutions",     href: "/ecommerce-website-design-in-cameroon/", icon: ShoppingCart, desc: "Online stores that sell"       },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["services", "pricing", "contact", "skills", "projects"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const { top } = el.getBoundingClientRect();
          if (top <= 120 && top > -el.offsetHeight + 120) {
            setActiveHash(`#${id}`);
            return;
          }
        }
      }
      setActiveHash("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location]);

  useEffect(() => {
    if (!menuRef.current) return;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, { autoAlpha: 0, y: -16, duration: 0.25, ease: "power3.in" });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    gsap.from(navRef.current, { opacity: 0, y: -24, duration: 0.8, delay: 0.1, ease: "power3.out" });
  }, []);

  const isActive = useCallback((link: NavLink): boolean => {
    if (link.isPage) {
      if (link.href === "/") return location.pathname === "/" && !activeHash;
      return location.pathname.startsWith(link.href.replace(/\/$/, ""));
    }
    const hash = link.href.split("#")[1];
    return activeHash === `#${hash}` && location.pathname === "/";
  }, [location, activeHash]);

  const linkClass = (link: NavLink, mobile = false) => {
    const active = isActive(link);
    if (mobile) {
      return `font-display font-bold text-2xl transition-colors duration-200 ${active ? "text-primary" : "text-white/90 hover:text-primary"}`;
    }
    return `relative font-body text-sm font-medium tracking-wide transition-colors duration-200 py-1
      ${active ? "text-white" : "text-white/60 hover:text-white"}`;
  };

  const renderLink = (link: NavLink, mobile = false) => {
    const cls = linkClass(link, mobile);
    const onClick = mobile ? () => setIsMenuOpen(false) : undefined;
    if (link.isPage) {
      return <Link key={link.label} to={link.href} className={cls} onClick={onClick}>{link.label}</Link>;
    }
    return <a key={link.label} href={link.href} className={cls} onClick={onClick}>{link.label}</a>;
  };

  const servicesActive = location.pathname.startsWith("/services") ||
    serviceDropdownItems.some(s => location.pathname.startsWith(s.href.replace(/\/$/, "")));

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? "py-3 bg-[#05080d]/90 backdrop-blur-3xl border-b border-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
            : "py-5 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/" className="font-display font-bold text-xl tracking-tighter text-white whitespace-nowrap flex-shrink-0 group">
            <span className="text-primary group-hover:opacity-80 transition-opacity">&lt;/</span>
            <span className="group-hover:opacity-80 transition-opacity">BlessKimbi</span>
            <span className="text-primary group-hover:opacity-80 transition-opacity">&gt;</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.label === "Services") {
                return (
                  <div
                    key="Services"
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {/* Trigger */}
                    <button
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-body text-base font-medium tracking-wide transition-all duration-200
                        ${servicesActive ? "text-white underline underline-offset-4" : "text-white/60 hover:text-white hover:underline hover:underline-offset-4"}`}
                    >
                      Services
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 opacity-60 ${servicesOpen ? "rotate-180 opacity-100" : ""}`}
                      />
                    </button>

                    {/* Dropdown panel */}
                    <div
                      className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[520px] transition-all duration-200 origin-top
                        ${servicesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
                    >
                      {/* Arrow */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0d1219] border-l border-t border-white/10 rotate-45" />

                      <div className="bg-[#0d1219] border border-white/10 rounded-2xl p-3 shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]">
                        {/* Header */}
                        <div className="px-3 pb-2 mb-1 border-b border-white/6">
                          <p className="text-[11px] font-body font-semibold uppercase tracking-widest text-white/30">Services</p>
                        </div>

                        {/* Grid of service items */}
                        <div className="grid grid-cols-2 gap-1">
                          {serviceDropdownItems.map(({ label, href, icon: Icon, desc }) => (
                            <Link
                              key={href}
                              to={href}
                              className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/6 transition-all duration-150 group"
                            >
                              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                                <Icon size={16} className="text-primary" />
                              </div>
                              <div>
                                <p className="font-body text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-tight mb-0.5">
                                  {label}
                                </p>
                                <p className="font-body text-xs text-white/35 group-hover:text-white/50 transition-colors leading-tight">
                                  {desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-2 pt-2 border-t border-white/6 px-3">
                          <Link
                            to="/services/"
                            className="flex items-center justify-between text-xs font-body font-semibold text-white/40 hover:text-primary transition-colors py-1 group"
                          >
                            <span>View all services</span>
                            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Regular nav link with pill hover
              const active = isActive(link);
              if (link.isPage) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-3 py-2 rounded-lg font-body text-base font-medium tracking-wide transition-all duration-200
                      ${active ? "text-white underline underline-offset-4" : "text-white/60 hover:text-white hover:underline hover:underline-offset-4"}`}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg font-body text-base font-medium tracking-wide transition-all duration-200
                    ${active ? "text-white underline underline-offset-4" : "text-white/60 hover:text-white hover:underline hover:underline-offset-4"}`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-display font-bold hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(79,142,240,0.45)] transition-all duration-300 whitespace-nowrap flex-shrink-0"
          >
            Let's Talk
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative z-50 w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#05080d]/98 backdrop-blur-3xl md:hidden flex flex-col justify-center opacity-0 invisible"
      >
        {/* Mobile nav links */}
        <div className="flex flex-col gap-1 px-6 mb-10">
          {navLinks.map((link) => {
            if (link.label === "Services") {
              return (
                <div key="Services" className="flex flex-col gap-1">
                  <Link
                    to="/services/"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-display font-bold text-white/90 hover:text-primary transition-colors py-2"
                  >
                    Services
                  </Link>
                  <div className="ml-4 flex flex-col gap-1 border-l border-white/10 pl-4 mb-2">
                    {serviceDropdownItems.map(({ label, href, icon: Icon }) => (
                      <Link
                        key={href}
                        to={href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2.5 py-2 text-white/50 hover:text-primary transition-colors"
                      >
                        <Icon size={14} className="text-primary/60 shrink-0" />
                        <span className="font-body text-sm font-medium">{label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            const active = isActive(link);
            if (link.isPage) {
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-display font-bold py-2 transition-colors ${active ? "text-primary" : "text-white/90 hover:text-primary"}`}
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-display font-bold py-2 transition-colors ${active ? "text-primary" : "text-white/90 hover:text-primary"}`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="px-6">
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-center px-8 py-4 rounded-full bg-primary text-white font-display font-bold tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(79,142,240,0.3)]"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
