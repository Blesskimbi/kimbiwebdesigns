/**
 * Structured data for every route, emitted into the static HTML by
 * scripts/gen-routes.mjs.
 *
 * Why it lives here and not in the page components: `react-helmet-async` is
 * inert in this app — nothing a <Helmet> declares ever reaches the document —
 * so JSON-LD written in the pages was never served to anyone. Building it here
 * puts it in the raw HTML instead, which is what crawlers read first and what
 * bots that never execute JavaScript read at all.
 *
 * FAQ content is imported from the same module the pages render from, so the
 * markup and the visible page can never disagree.
 */

import {
  communityFaqs,
  ecommerceFaqs,
  mobileAppFaqs,
  seoCompanyFaqs,
  socialMediaFaqs,
  uiUxFaqs,
} from "../src/data/seo-faqs.mjs";
import { cities, cityPath } from "../src/data/cities.mjs";

const BASE = "https://blesskimbi.com";

/** The site-wide entities, defined once in index.html and referenced by @id. */
const PERSON_ID = `${BASE}/#person`;
const BUSINESS_ID = `${BASE}/#localbusiness`;

const provider = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Bless Kimbi",
  url: BASE,
};

const CM_AREAS = ["Cameroon", "Yaoundé", "Douala", "Buea", "Africa", "Europe"];

const faqPage = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

const service = ({ serviceType, name, path, description, areaServed = CM_AREAS, extra = {} }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType,
  name,
  provider,
  areaServed,
  url: `${BASE}${path}`,
  description,
  ...extra,
});

/**
 * Location pages. Each one gets a Service scoped to that city plus the FAQs
 * the page actually renders, both built from src/data/cities.mjs so the markup
 * and the visible page cannot disagree.
 */
const CITY_SCHEMAS = Object.fromEntries(
  cities.map((city) => [
    cityPath(city.slug),
    [
      faqPage(city.faqs),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Web Design and Development",
        name: `Web Design in ${city.name}`,
        provider,
        areaServed: {
          "@type": "City",
          name: city.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: city.name,
            addressRegion: city.region,
            addressCountry: "CM",
          },
        },
        url: `${BASE}${cityPath(city.slug)}`,
        description: city.description,
      },
    ],
  ]),
);

/* ── Per-route schemas ──────────────────────────────────────────────────── */

/**
 * The homepage is deliberately absent: index.html already carries a richer
 * LocalBusiness, Person and WebSite block, and repeating them here would give
 * the page two competing definitions of the same entity.
 */
export const STATIC_SCHEMAS = {
  ...CITY_SCHEMAS,

  "/services/": [
    service({
      serviceType: "Web Design & Development",
      name: "Web Design & Development Services",
      path: "/services/",
      description:
        "Professional web design, SEO, social media management and mobile app development for businesses across Cameroon and Africa.",
      areaServed: ["Cameroon", "Africa", "Europe", "Worldwide"],
      extra: {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Design Services",
          itemListElement: [
            "Custom Web Design",
            "SEO Optimisation",
            "E-commerce Development",
            "Mobile App Development",
            "Social Media Management",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
    }),
  ],

  "/projects/": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Web Design Portfolio by Bless Kimbi",
      description:
        "Portfolio of web design and development projects by Bless Kimbi for businesses across Cameroon and Africa.",
      url: `${BASE}/projects/`,
      author: provider,
    },
  ],

  "/blog/": [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${BASE}/blog/#blog`,
      name: "Bless Kimbi Blog",
      description:
        "Practical guides on web design, SEO and digital marketing for businesses in Cameroon and Africa.",
      url: `${BASE}/blog/`,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
  ],

  "/about/": [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Bless Kimbi",
      url: `${BASE}/about/`,
      description:
        "The process, skills and experience behind Bless Kimbi, web designer and developer based in Buea, Cameroon.",
      inLanguage: "en",
      mainEntity: {
        ...provider,
        jobTitle: "Web Designer & Developer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Buea",
          addressRegion: "South West",
          addressCountry: "CM",
        },
      },
    },
  ],

  "/contact/": [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Bless Kimbi",
      url: `${BASE}/contact/`,
      description:
        "Get a free quote for your website from Bless Kimbi, web designer based in Buea, Cameroon.",
      inLanguage: "en",
      mainEntity: {
        "@type": "LocalBusiness",
        "@id": BUSINESS_ID,
        name: "Bless Kimbi",
        url: BASE,
        telephone: "+237675126845",
        email: "blesskimbi10@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Buea",
          addressLocality: "Buea",
          addressRegion: "South West",
          addressCountry: "CM",
        },
        areaServed: [
          { "@type": "Country", name: "Cameroon" },
          { "@type": "Continent", name: "Africa" },
        ],
      },
    },
  ],

  "/community/": [faqPage(communityFaqs)],

  "/seo-company-in-cameroon/": [
    faqPage(seoCompanyFaqs),
    service({
      serviceType: "SEO Services",
      name: "SEO Company in Cameroon",
      path: "/seo-company-in-cameroon/",
      description:
        "Professional SEO services for businesses in Cameroon and across Africa. Keyword research, on-page SEO, local SEO, and technical audits.",
    }),
  ],

  "/ecommerce-website-design-in-cameroon/": [
    faqPage(ecommerceFaqs),
    service({
      serviceType: "E-commerce Website Design",
      name: "E-commerce Website Design in Cameroon",
      path: "/ecommerce-website-design-in-cameroon/",
      description:
        "Custom e-commerce website design for businesses in Cameroon. Mobile Money integration, SEO, and mobile-first development.",
    }),
  ],

  "/social-media-management/": [
    faqPage(socialMediaFaqs),
    service({
      serviceType: "Social Media Management",
      name: "Social Media Management Services",
      path: "/social-media-management/",
      description:
        "Professional social media management: content strategy, post design, scheduling, community management, analytics, and paid campaigns.",
    }),
  ],

  "/mobile-app-development/": [
    faqPage(mobileAppFaqs),
    service({
      serviceType: "Mobile App Development",
      name: "Mobile App Development",
      path: "/mobile-app-development/",
      description:
        "Cross-platform mobile app development with React Native for iOS and Android. UI/UX design, backend integration, and App Store publishing.",
    }),
  ],

  "/ui-ux-design/": [
    faqPage(uiUxFaqs),
    service({
      serviceType: "UI/UX Design",
      name: "UI/UX Design Services",
      path: "/ui-ux-design/",
      description:
        "Professional UI/UX design services: user research, wireframing, visual UI design, design systems, and Figma developer handoff.",
    }),
  ],
};

/* ── Detail pages ───────────────────────────────────────────────────────── */

/** BlogPosting, plus a FAQPage when the post defines FAQs, for one blog route. */
export function blogSchemas({ path, title, description, image, date, modified, tags, wordCount, faqs }) {
  const url = `${BASE}${path}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    image: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      ...provider,
      sameAs: [
        "https://instagram.com/blesskimbi",
        "https://www.linkedin.com/in/bless-kimbi-09413936a/",
      ],
    },
    publisher: {
      "@type": "Organization",
      "@id": BUSINESS_ID,
      name: "Bless Kimbi",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/blesskimbi.png`, width: 400, height: 400 },
    },
    inLanguage: "en",
    ...(date ? { datePublished: date } : {}),
    ...(date || modified ? { dateModified: modified || date } : {}),
    ...(tags?.length ? { keywords: tags.join(", ") } : {}),
    ...(wordCount
      ? { wordCount, timeRequired: `PT${Math.max(1, Math.round(wordCount / 200))}M` }
      : {}),
  };

  return faqs?.length ? [article, faqPage(faqs)] : [article];
}

/** CreativeWork for one project route. */
export function projectSchemas({ path, title, description, image, tags }) {
  const url = `${BASE}${path}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: title,
      headline: title,
      description,
      url,
      inLanguage: "en",
      ...(image ? { image } : {}),
      ...(tags?.length ? { keywords: tags.join(", ") } : {}),
      creator: provider,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
  ];
}
