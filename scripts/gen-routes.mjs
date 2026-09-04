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
    routes.push({ path, title, description: description ?? "", image, source: file });
  }

  return routes;
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
      .select("slug, title, seo_title, meta_description, excerpt, image_url")
      .eq("status", "published");

    if (!error && data?.length) {
      return data.map((p) => ({
        path: `/blog/${p.slug}/`,
        title: esc(p.seo_title || p.title || p.slug),
        description: esc(p.meta_description || p.excerpt || ""),
        image: p.image_url ? `${BASE}${p.image_url}` : OG_IMAGE,
        source: "supabase",
      }));
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
      const { data } = matter(readFileSync(join(postsDir, f), "utf-8"));
      const slug = data.slug || f.replace(".md", "");
      const title = data.seoTitle || data.title || slug;
      const description = data.metaDescription || data.description || data.excerpt || "";
      const image = data.imageUrl ? `${BASE}${data.imageUrl}` : OG_IMAGE;
      return {
        path: `/blog/${slug}/`,
        title: esc(title),
        description: esc(description),
        image,
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
    .select("slug, title, description, cover_image")
    .eq("hidden", false);

  if (error) {
    console.warn("[gen-routes] Supabase error:", error.message);
    return [];
  }

  return (data ?? []).map((p) => ({
    path: `/projects/${p.slug}/`,
    title: esc(`${p.title} | Web Design Project by Bless Kimbi`),
    description: esc(p.description ?? ""),
    image: p.cover_image?.startsWith("http") ? p.cover_image : OG_IMAGE,
    source: "supabase",
  }));
}

/* ── Head rewriting ─────────────────────────────────────────────────────── */

function buildHtml(template, { path, title, description, image }) {
  const url = `${BASE}${path}`;

  const swaps = [
    [/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`],
    [/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${description}$2`],
    [/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${url}$2`],
    [/(<meta\s+property="og:url"\s+content=")[^"]*(")/i, `$1${url}$2`],
    [/(<meta\s+property="og:title"\s+content=")[^"]*(")/i, `$1${title}$2`],
    [/(<meta\s+property="og:description"\s+content=")[^"]*(")/i, `$1${description}$2`],
    [/(<meta\s+property="og:image"\s+content=")[^"]*(")/i, `$1${image}$2`],
    [/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/i, `$1${title}$2`],
    [/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/i, `$1${description}$2`],
    [/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/i, `$1${image}$2`],
  ];

  return swaps.reduce((html, [re, to]) => html.replace(re, to), template);
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
