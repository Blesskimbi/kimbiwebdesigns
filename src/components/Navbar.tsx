import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  isPage: boolean;
};

const navLinks: NavLink[] = [
  { label: "Home",     href: "/",          isPage: true  },
  { label: "Services", href: "/services",  isPage: true  },
  { label: "Projects", href: "/projects",  isPage: true  },
  { label: "Pricing",  href: "/#pricing",  isPage: false },
  { label: "Blog",     href: "/blog",      isPage: true  },
  { label: "Contact",  href: "/contact",   isPage: true  },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const location = useLocation();

  // Track scroll position for bg + active hash section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection for hash links
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

  // Close mobile menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [location]);

  // Mobile menu animation
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

  // Entrance animation
  useEffect(() => {
    gsap.from(navRef.current, { opacity: 0, y: -24, duration: 0.8, delay: 0.1, ease: "power3.out" });
  }, []);

  const isActive = useCallback((link: NavLink): boolean => {
    if (link.isPage) {
      if (link.href === "/") return location.pathname === "/" && !activeHash;
      return location.pathname.startsWith(link.href);
    }
    const hash = link.href.split("#")[1];
    return activeHash === `#${hash}` && location.pathname === "/";
  }, [location, activeHash]);

  const linkClass = (link: NavLink, mobile = false) => {
    const active = isActive(link);
    if (mobile) {
      return `text-3xl font-display font-bold transition-colors duration-200 ${active ? "text-primary" : "text-white hover:text-primary"}`;
    }
    return `relative font-body text-sm font-semibold tracking-wide transition-colors duration-200 py-1
      ${active ? "text-white" : "text-gray-300 hover:text-white"}
      after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full after:bg-primary after:transition-all after:duration-300
      ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}`;
  };

  const renderLink = (link: NavLink, mobile = false) => {
    const cls = linkClass(link, mobile);
    const onClick = mobile ? () => setIsMenuOpen(false) : undefined;

    if (link.isPage) {
      return (
        <Link key={link.label} to={link.href} className={cls} onClick={onClick}>
          {link.label}
        </Link>
      );
    }
    return (
      <a key={link.label} href={link.href} className={cls} onClick={onClick}>
        {link.label}
      </a>
    );
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400
          ${scrolled
            ? "py-3 bg-[#080B0F]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "py-5 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display font-bold text-lg sm:text-xl tracking-tighter text-white whitespace-nowrap z-50 flex-shrink-0"
          >
            <span className="text-primary">&lt;/</span>BlessKimbi<span className="text-primary">&gt;</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => renderLink(link))}
          </div>

          {/* Desktop CTA */}
          <a
            href="/contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-white text-sm font-display font-bold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(79,142,240,0.4)] transition-all duration-300 whitespace-nowrap flex-shrink-0"
          >
            Let's Talk
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-white hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#080B0F]/98 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center opacity-0 invisible"
      >
        <div className="flex flex-col items-center gap-8 w-full px-8">
          {navLinks.map((link) => renderLink(link, true))}
          <a
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 w-full max-w-[260px] text-center px-8 py-4 rounded-full bg-primary text-white font-display font-bold tracking-widest hover:bg-primary/90 transition-all duration-300 shadow-[0_0_25px_rgba(79,142,240,0.3)]"
          >
            LET'S TALK
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
