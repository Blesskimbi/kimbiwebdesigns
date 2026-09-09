import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";

interface Props {
  /** The <h1>. Kept separate from the <title>, which carries the brand suffix. */
  heading: string;
  /** One or two sentences under the heading, in plain language. */
  intro: string;
  /** ISO date. Rendered readably, and the thing reviewers check first. */
  updated: string;
  children: ReactNode;
}

/**
 * The shell shared by the privacy policy, terms and disclaimer.
 *
 * These three pages differ only in their prose, so the chrome lives here. What
 * does NOT live here is the <head>: scripts/gen-routes.mjs builds each route's
 * static metadata by reading the <title> and canonical straight out of the page
 * file, so a Helmet block hoisted into this component would be invisible to it
 * and every legal page would ship with the homepage's canonical. Each page
 * keeps its own.
 */
const LegalLayout = ({ heading, intro, updated, children }: Props) => {
  const updatedLabel = new Date(updated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <LenisSmoothScroll>
      <Navbar />
      <div className="relative min-h-screen bg-background overflow-x-clip">
        <main className="pt-28 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <nav
              className="flex items-center gap-2 text-xs font-medium mb-6 md:mb-8 font-body"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="breadcrumb-link flex items-center gap-1">
                <Home size={14} />
                <span>Home</span>
              </Link>
              <ChevronRight size={14} className="text-muted-foreground/50" />
              <span className="breadcrumb-current">{heading}</span>
            </nav>

            <header className="mb-8 md:mb-10">
              <span className="section-label">Legal</span>
              <h1 className="heading-serif text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight">
                {heading}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body mb-5">
                {intro}
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground/70 font-body">
                Last updated{" "}
                <time dateTime={updated} className="text-navy font-semibold">
                  {updatedLabel}
                </time>
              </p>
            </header>

            <div className="internal-card !p-5 sm:!p-8 lg:!p-10">
              <div className="prose-blog">{children}</div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-body">
              <Link to="/privacy-policy/" className="text-primary hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service/" className="text-primary hover:text-gold transition-colors">
                Terms of Service
              </Link>
              <Link to="/disclaimer/" className="text-primary hover:text-gold transition-colors">
                Disclaimer
              </Link>
              <Link to="/contact/" className="text-primary hover:text-gold transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </main>
        <FloatingChat />
        <ScrollToTop />
      </div>
    </LenisSmoothScroll>
  );
};

export default LegalLayout;
