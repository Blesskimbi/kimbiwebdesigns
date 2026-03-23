import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.1,
      ease: "power3.out",
    });

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      document.body.style.overflow = "unset";
      gsap.to(menuRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Projects", href: "/projects", isExternal: false },
    { label: "Blog", href: "/blog", isExternal: false },
    { label: "Skills", href: "/#skills", isExternal: true },
    { label: "Contact", href: "/#contact", isExternal: true },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-glass-strong py-4" : "py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          <Link
            to="/"
            className="font-display font-bold text-lg sm:text-xl tracking-tighter text-foreground whitespace-nowrap z-50"
          >
            <span className="text-primary">&lt;/</span>BlessKimbi<span className="text-primary">&gt;</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-10">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground font-body text-sm font-medium tracking-wide transition-colors duration-300"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground font-body text-sm font-medium tracking-wide transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/#contact"
              className="hidden sm:block px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-display font-bold hover:glow-primary transition-all duration-300 whitespace-nowrap"
            >
              Let's Talk
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="sm:hidden relative z-50 p-2 text-foreground hover:text-primary transition-colors duration-300 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl sm:hidden flex flex-col items-center justify-start opacity-0 invisible overflow-y-auto pt-32 pb-16"
      >
        <div className="flex flex-col items-center gap-10 w-full px-10">
          {navLinks.map((link) => (
            link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-display font-bold text-foreground hover:text-primary transition-colors duration-300 text-center"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-display font-bold text-foreground hover:text-primary transition-colors duration-300 text-center"
              >
                {link.label}
              </Link>
            )
          ))}
          <a
            href="/#contact"
            onClick={() => setIsMenuOpen(false)}
            className="w-full max-w-[280px] text-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-bold tracking-widest hover:scale-105 transition-transform duration-300"
          >
            LET'S TALK
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
