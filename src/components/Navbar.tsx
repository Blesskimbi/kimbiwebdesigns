import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-glass-strong py-4" : "py-6"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-bold text-lg tracking-wider text-foreground"
        >
          BlessKimbi<span className="text-primary">.</span>
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          <Link
            to="/projects"
            className="text-muted-foreground hover:text-foreground font-body text-sm tracking-wider transition-colors duration-300"
          >
            Projects
          </Link>
          <Link
            to="/blog"
            className="text-muted-foreground hover:text-foreground font-body text-sm tracking-wider transition-colors duration-300"
          >
            Blog
          </Link>
          <a
            href="/#skills"
            className="text-muted-foreground hover:text-foreground font-body text-sm tracking-wider transition-colors duration-300"
          >
            Skills
          </a>
          <a
            href="/#contact"
            className="text-muted-foreground hover:text-foreground font-body text-sm tracking-wider transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        <a
          href="/#contact"
          className="px-5 py-2 rounded-full bg-glass text-sm font-body text-foreground hover:glow-primary transition-shadow duration-300"
        >
          Let's Talk
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
