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
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        visibility: "visible",
      });
    } else {
      document.body.style.overflow = "unset";
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.visibility = "hidden";
        },
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            to="/"
            className="font-display font-bold text-base sm:text-lg tracking-wider text-foreground whitespace-nowrap"
          >
            <span className="text-primary">&lt;/</span>BlessKimbi<span className="text-primary">&gt;</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground font-body text-sm tracking-wider transition-colors duration-300"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground font-body text-sm tracking-wider transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/#contact"
              className="hidden sm:block px-5 py-2 rounded-full bg-glass text-sm font-body text-foreground hover:glow-primary transition-shadow duration-300 whitespace-nowrap"
            >
              Let's Talk
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="sm:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl sm:hidden flex flex-col items-center justify-center invisible opacity-0"
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-display font-bold text-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-display font-bold text-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            )
          ))}
          <a
            href="/#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 px-8 py-3 rounded-full bg-primary text-primary-foreground font-display font-bold tracking-widest hover:scale-105 transition-transform duration-300"
          >
            LET'S TALK
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
