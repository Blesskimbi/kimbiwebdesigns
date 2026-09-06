import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import NotFound from "./NotFound";
import { cities, cityBySlug, cityPath } from "@/data/cities.mjs";

/**
 * One component behind every /web-designer-in-<city>/ page.
 *
 * The copy lives in src/data/cities.mjs because three build scripts need the
 * same words: gen-routes.mjs writes the <head>, gen-sitemap.mjs lists the URL,
 * and schema.mjs builds the Service and FAQPage markup. The pages are only
 * worth having if each one says something true and specific about that city,
 * so the data file carries real per-city copy rather than a template.
 */

const whatsappFor = (city: string) =>
  `https://wa.me/237675126845?text=${encodeURIComponent(
    `Hi Bless, I am looking for a web designer in ${city}. Can we discuss my project?`,
  )}`;

const CityPage = ({ slug }: { slug: string }) => {
  const city = cityBySlug(slug);

  // An unknown city is a genuine 404. Rendering NotFound rather than
  // redirecting keeps the bad URL in the address bar, which is what a crawler
  // needs to see to treat it as missing.
  if (!city) return <NotFound />;

  const whatsapp = whatsappFor(city.name);
  const others = cities.filter((c) => c.slug !== city.slug);

  return (
    <LenisSmoothScroll>
      <Navbar />
      <div className="relative min-h-screen bg-background overflow-x-clip">
        <main className="pt-32 pb-20 relative z-10">

          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="max-w-4xl mx-auto px-6 text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <MapPin className="w-3.5 h-3.5" />
              {city.name}, {city.region}
            </span>
            <h1 className="heading-serif text-3xl sm:text-5xl md:text-6xl mb-5">
              {city.heading.replace(city.name, "")}
              <span className="text-gradient-primary">{city.name}</span>
            </h1>
            <p className="text-muted-foreground font-body text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              {city.lead}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary/90 hover:shadow-pro transition-all duration-300"
              >
                Get a free quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/projects/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-navy font-display font-bold text-base hover:border-primary hover:text-primary transition-all duration-300"
              >
                See recent work
              </Link>
            </div>
          </section>

          {/* ── Body copy ────────────────────────────────────────────────── */}
          <section className="max-w-3xl mx-auto px-6 mb-20">
            <h2 className="heading-serif text-2xl md:text-3xl mb-6">
              Building websites for {city.name} businesses
            </h2>
            {city.body.map((paragraph: string) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-muted-foreground font-body leading-relaxed mb-5"
              >
                {paragraph}
              </p>
            ))}
          </section>

          {/* ── Why this city ────────────────────────────────────────────── */}
          <section className="max-w-5xl mx-auto px-6 mb-20">
            <div className="text-center mb-12">
              <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
                What you get
              </span>
              <h2 className="heading-serif text-3xl md:text-4xl">
                Why work with me in {city.name}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {city.highlights.map(({ title, text }: { title: string; text: string }) => (
                <div key={title} className="internal-card h-full">
                  <Check className="w-6 h-6 text-primary mb-4" />
                  <h3 className="font-display font-bold text-navy text-lg mb-3">{title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Services, linking out to the detail pages ────────────────── */}
          <section className="max-w-3xl mx-auto px-6 mb-20">
            <h2 className="heading-serif text-2xl md:text-3xl mb-6">
              Services available in {city.name}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Web design and development", to: "/services/" },
                { label: "SEO services", to: "/seo-company-in-cameroon/" },
                { label: "E-commerce websites", to: "/ecommerce-website-design-in-cameroon/" },
                { label: "Mobile app development", to: "/mobile-app-development/" },
                { label: "UI/UX design", to: "/ui-ux-design/" },
                { label: "Social media management", to: "/social-media-management/" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center justify-between gap-3 internal-card !py-4 hover:border-primary transition-colors"
                  >
                    <span className="font-body text-navy text-sm font-medium">{label}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────── */}
          <section className="max-w-3xl mx-auto px-6 mb-20">
            <div className="text-center mb-12">
              <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
                Frequently Asked Questions
              </span>
              <h2 className="heading-serif text-3xl md:text-4xl">
                Web design in {city.name}
              </h2>
            </div>
            <div className="space-y-4">
              {city.faqs.map(({ q, a }: { q: string; a: string }) => (
                <details key={q} className="group internal-card !p-0 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-navy font-semibold font-body hover:text-primary transition-colors">
                    {q}
                    <span className="shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-5 text-muted-foreground font-body leading-relaxed text-sm border-t border-border pt-4">
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ── Other cities: keeps these pages linked to each other ─────── */}
          <section className="max-w-3xl mx-auto px-6">
            <h2 className="heading-serif text-2xl md:text-3xl mb-6">Other areas I work in</h2>
            <div className="flex flex-wrap gap-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  to={cityPath(other.slug)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-navy font-body text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {other.name}
                </Link>
              ))}
            </div>
          </section>
        </main>

        <Footer />
        <FloatingChat />
        <ScrollToTop />
      </div>
    </LenisSmoothScroll>
  );
};

export default CityPage;
