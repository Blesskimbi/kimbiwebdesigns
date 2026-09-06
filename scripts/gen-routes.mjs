/**
 * Post-build route HTML generator.
 *
 * Without this, every URL serves the same dist/index.html, so the raw HTML of
 * /blog/some-post carries the HOMEPAGE's canonical, title and description.
 * A canonical pointing every page at the homepage tells crawlers those pages
 * are duplicates and should not be indexed separately — react-helmet-async only
 * corrects it after JavaScript runs, which not every crawler does.
 *
 * This writes dist/<route>/index.html for every known route, copying the built
 * index.html and rewriting just the <head> tags. No browser required, unlike
 * the Playwright prerender this replaces — that could not run in Vercel's build
 * image (missing libnspr4).
 *
 * Body content is still client-rendered; this fixes the metadata only.
 *
 * Usage: node scripts/gen-routes.mjs   (runs after vite build)
 */
import { createClient } from "@supabase/supabase-js";
import { STATIC_SCHEMAS, blogSchemas, projectSchemas } from "./schema.mjs";
import { cities, cityPath } from "../src/data/cities.mjs";
import matter from "gray-matter";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");
const distDir = resolve(rootDir, "dist");
const BASE = "https://blesskimbi.com";
const OG_IMAGE = `${BASE}/og-image.png`;

/** Escape a raw string for use inside an HTML attribute or text node. */
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Real pixel dimensions of a built image, read from its header.
 *
 * index.html hardcodes og:image:width 1200 and height 630 for the site's own
 * card. Every blog post overrides og:image with its own artwork, which is not
 * 1200x630, so those tags were describing a different file. Scrapers that trust
 * the declared size lay the card out wrong. PNG and JPEG cover everything in
 * public/.
 */
function imageSize(url) {
  const local = url.startsWith(BASE) ? url.slice(BASE.length) : null;
  if (!local) return null;

  const path = join(distDir, local);
  if (!existsSync(path)) return null;

  const b = readFileSync(path);

  // PNG: IHDR width/height are big-endian at bytes 16 and 20.
  if (b.length > 24 && b.slice(1, 4).toString() === "PNG") {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }

  // JPEG: walk the segment markers to the frame header that carries the size.
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length - 9) {
      if (b[i] !== 0xff) { i += 1; continue; }
      const marker = b[i + 1];
      // SOF0..SOF15, excluding the non-frame markers in that range.
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }

  return null;
}

/** YYYY-MM-DD, which is what schema.org dates and <lastmod> both want. */
const isoDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().split("T")[0];
};

/** Approximate word count, used for BlogPosting wordCount / timeRequired. */
const wordCount = (text) => (text ? text.trim().split(/\s+/).length : 0);

/**
 * Posts store FAQs as [{ q, a }] in both Supabase (JSONB) and frontmatter, but
 * a hand-edited post can leave the field null or shaped wrong — drop anything
 * that is not a usable pair rather than emitting broken FAQ markup.
 */
const normaliseFaqs = (raw) =>
  Array.isArray(raw) ? raw.filter((f) => f && typeof f.q === "string" && typeof f.a === "string") : [];

/* ── Breadcrumbs ────────────────────────────────────────────────────────── */

/** Segments whose slug does not titleize into a presentable label. */
const CRUMB_LABELS = {
  "seo-company-in-cameroon": "SEO Company in Cameroon",
  "ecommerce-website-design-in-cameroon": "E-commerce Website Design in Cameroon",
  "social-media-management": "Social Media Management",
  "mobile-app-development": "Mobile App Development",
  "ui-ux-design": "UI/UX Design",
};

const titleize = (seg) =>
  CRUMB_LABELS[seg] ??
  seg.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

/**
 * BreadcrumbList JSON-LD for one route.
 *
 * Emitted into the raw HTML rather than through Helmet so crawlers that never
 * execute JavaScript still see the trail. `crumb` names the leaf where the slug
 * would not read well on its own — blog posts and projects pass their title.
 */
function buildBreadcrumbs(path, crumb) {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return null; // homepage: a one-item trail says nothing

  const crumbs = [{ name: "Home", item: `${BASE}/` }];
  segments.forEach((seg, i) => {
    const isLeaf = i === segments.length - 1;
    crumbs.push({
      name: isLeaf && crumb ? crumb : titleize(seg),
      item: `${BASE}/${segments.slice(0, i + 1).join("/")}/`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };
}

/* ── Route sources ──────────────────────────────────────────────────────── */

/**
 * Static pages: read each page's own Helmet block. The canonical href in the
 * source IS the route, so the page file stays the single source of truth and
 * this never drifts from what the app renders.
 * Values here are already HTML-escaped in the JSX, so they are not re-escaped.
 */
function getStaticRoutes() {
  const pagesDir = join(rootDir, "src", "pages");
  const routes = [];

  for (const file of readdirSync(pagesDir).filter((f) => f.endsWith(".tsx"))) {
    const src = readFileSync(join(pagesDir, file), "utf-8");

    const canonical = src.match(/rel="canonical"\s+href="([^"]+)"/)?.[1];
    const title = src.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const description = src.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1];
    if (!canonical || !title) continue;

    const path = canonical.replace(BASE, "") || "/";
    // Detail pages build their canonical from a slug at runtime; skip them here.
    if (path.includes("${") || path.includes("{")) continue;

    const image = src.match(/property="og:image"\s+content="([^"]+)"/)?.[1] ?? OG_IMAGE;
    routes.push({
      path,
      title,
      description: description ?? "",
      image,
      schemas: STATIC_SCHEMAS[path] ?? [],
      source: file,
    });
  }

  return routes;
}

/**
 * Location pages share one React component, so there is no per-city .tsx file
 * for getStaticRoutes to read a canonical out of. They are enumerated here from
 * the same data the pages render.
 */
function getCityRoutes() {
  return cities.map((city) => {
    const path = cityPath(city.slug);
    return {
      path,
      title: esc(city.title),
      description: esc(city.description),
      image: OG_IMAGE,
      crumb: `Web Designer in ${city.name}`,
      schemas: STATIC_SCHEMAS[path] ?? [],
      source: "cities.mjs",
    };
  });
}

/**
 * Posts come from the database. The posts/*.md files are kept as a fallback
 * so a Supabase outage during a build degrades to the last committed content
 * rather than dropping every blog URL out of the site.
 */
async function getBlogRoutes() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (url && key) {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("posts")
      .select(
        "slug, title, seo_title, meta_description, excerpt, image_url, tags, faqs, content, published_at, updated_at",
      )
      .eq("status", "published");

    if (!error && data?.length) {
      return data.map((p) => {
        const path = `/blog/${p.slug}/`;
        const image = p.image_url ? `${BASE}${p.image_url}` : OG_IMAGE;
        const date = p.published_at ? isoDate(p.published_at) : null;

        return {
          path,
          title: esc(p.seo_title || p.title || p.slug),
          description: esc(p.meta_description || p.excerpt || ""),
          image,
          // Raw, not esc()'d: these go into JSON-LD, not an HTML attribute.
          crumb: p.title || p.slug,
          schemas: blogSchemas({
            path,
            title: p.title || p.slug,
            description: p.meta_description || p.excerpt || "",
            image,
            date,
            modified: p.updated_at ? isoDate(p.updated_at) : date,
            tags: p.tags ?? [],
            wordCount: wordCount(p.content),
            faqs: normaliseFaqs(p.faqs),
          }),
          source: "supabase",
        };
      });
    }
    console.warn(
      `[gen-routes] Falling back to posts/*.md — ${error ? error.message : "no published posts returned"}`,
    );
  } else {
    console.warn("[gen-routes] Supabase env not set — falling back to posts/*.md");
  }

  const postsDir = join(rootDir, "posts");
  if (!existsSync(postsDir)) return [];

  return readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(readFileSync(join(postsDir, f), "utf-8"));
      const slug = data.slug || f.replace(".md", "");
      const title = data.seoTitle || data.title || slug;
      const description = data.metaDescription || data.description || data.excerpt || "";
      const image = data.imageUrl ? `${BASE}${data.imageUrl}` : OG_IMAGE;
      const path = `/blog/${slug}/`;
      const date = data.date ? isoDate(data.date) : null;

      return {
        path,
        title: esc(title),
        description: esc(description),
        image,
        crumb: data.title || slug,
        schemas: blogSchemas({
          path,
          title: data.title || slug,
          description,
          image,
          date,
          modified: date,
          tags: data.tags ?? [],
          wordCount: wordCount(content),
          faqs: normaliseFaqs(data.faqs),
        }),
        source: f,
      };
    });
}

async function getProjectRoutes() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("[gen-routes] Supabase env not set — skipping /projects/{slug}");
    return [];
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("projects")
    .select("slug, title, description, cover_image, tags")
    .eq("hidden", false);

  if (error) {
    console.warn("[gen-routes] Supabase error:", error.message);
    return [];
  }

  return (data ?? []).map((p) => {
    const path = `/projects/${p.slug}/`;
    const image = p.cover_image?.startsWith("http") ? p.cover_image : OG_IMAGE;

    return {
      path,
      title: esc(`${p.title} | Web Design Project by Bless Kimbi`),
      description: esc(p.description ?? ""),
      image,
      crumb: p.title,
      schemas: projectSchemas({
        path,
        title: p.title,
        description: p.description ?? "",
        image,
        tags: p.tags ?? [],
      }),
      source: "supabase",
    };
  });
}

/* ── Head rewriting ─────────────────────────────────────────────────────── */

function buildHtml(template, { path, title, description, image, crumb, schemas }) {
  const url = `${BASE}${path}`;
  const size = imageSize(image);

  const swaps = [
    [/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`],
    [/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${description}$2`],
    [/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${url}$2`],
    [/(<meta\s+property="og:url"\s+content=")[^"]*(")/i, `$1${url}$2`],
    [/(<meta\s+property="og:title"\s+content=")[^"]*(")/i, `$1${title}$2`],
    [/(<meta\s+property="og:description"\s+content=")[^"]*(")/i, `$1${description}$2`],
    [/(<meta\s+property="og:image"\s+content=")[^"]*(")/i, `$1${image}$2`],
    ...(size
      ? [
          [/(<meta\s+property="og:image:width"\s+content=")[^"]*(")/i, `$1${size.width}$2`],
          [/(<meta\s+property="og:image:height"\s+content=")[^"]*(")/i, `$1${size.height}$2`],
        ]
      : []),
    [/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/i, `$1${title}$2`],
    [/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/i, `$1${description}$2`],
    [/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/i, `$1${image}$2`],
  ];

  const html = swaps.reduce((acc, [re, to]) => acc.replace(re, to), template);

  const breadcrumbs = buildBreadcrumbs(path, crumb);
  const blocks = [...(schemas ?? []), ...(breadcrumbs ? [breadcrumbs] : [])];
  if (blocks.length === 0) return html;

  // Escaping "<" stops a stray angle bracket in a title or answer from closing
  // the script element early.
  const tags = blocks
    .map((block) => {
      const json = JSON.stringify(block, null, 2).replace(/</g, "\\u003c");
      return `  <script type="application/ld+json">\n${json}\n    </script>`;
    })
    .join("\n");

  return html.replace("</head>", `${tags}\n  </head>`);
}

function writeRoute(path, html) {
  const outDir = join(distDir, path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
}

/* ── Main ───────────────────────────────────────────────────────────────── */

const templatePath = join(distDir, "index.html");
if (!existsSync(templatePath)) {
  console.error("[gen-routes] dist/index.html not found — run vite build first.");
  process.exit(1);
}

const template = readFileSync(templatePath, "utf-8");

const routes = [
  ...getStaticRoutes(),
  ...getCityRoutes(),
  ...(await getBlogRoutes()),
  ...(await getProjectRoutes()),
].filter((r) => r.path !== "/"); // the homepage template is already correct

const seen = new Set();
let written = 0;
const issues = [];

for (const route of routes) {
  if (seen.has(route.path)) continue;
  seen.add(route.path);

  const html = buildHtml(template, route);

  if (!html.includes(`href="${BASE}${route.path}"`)) {
    issues.push(`${route.path} — canonical not rewritten`);
  }
  if (!route.description) {
    issues.push(`${route.path} — no description (from ${route.source})`);
  }

  writeRoute(route.path, html);
  written += 1;
  console.log(`  ✓ ${route.path}`);
}

console.log(`[gen-routes] Wrote ${written} route pages (+ homepage from vite).`);

if (issues.length > 0) {
  console.warn(`[gen-routes] ${issues.length} issue(s):`);
  issues.forEach((i) => console.warn(`  ⚠ ${i}`));
}
