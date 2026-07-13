/**
 * Generates dist/sitemap.xml after the Vite build.
 *
 * Sources:
 *   - Static routes: hardcoded list
 *   - Blog posts:    posts/*.md frontmatter (slug + date)
 *   - Projects:      Supabase `projects` table (slug only, hidden=false)
 *
 * Priorities:
 *   homepage          1.0  weekly
 *   /services /blog /projects /contact  0.8  monthly
 *   /blog/{slug}      0.6  monthly
 *   /projects/{slug}  0.6  monthly
 */

import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { resolve, join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir   = resolve(__dirname, "..");
const outFile   = resolve(rootDir, "dist", "sitemap.xml");
const BASE      = "https://everythx.com";

// ── Route definitions ──────────────────────────────────────────────────────

const STATIC_ROUTES = [
  { url: "/",                                        changefreq: "weekly",  priority: 1.0 },
  { url: "/services/",                               changefreq: "monthly", priority: 0.8 },
  { url: "/projects/",                               changefreq: "monthly", priority: 0.8 },
  { url: "/blog/",                                   changefreq: "weekly",  priority: 0.8 },
  { url: "/contact/",                                changefreq: "monthly", priority: 0.7 },
  { url: "/community/",                              changefreq: "monthly", priority: 0.6 },
  { url: "/seo-company-in-cameroon/",                changefreq: "monthly", priority: 0.8 },
  { url: "/ecommerce-website-design-in-cameroon/",   changefreq: "monthly", priority: 0.8 },
  { url: "/social-media-management/",               changefreq: "monthly", priority: 0.8 },
  { url: "/mobile-app-development/",                changefreq: "monthly", priority: 0.8 },
  { url: "/ui-ux-design/",                          changefreq: "monthly", priority: 0.8 },
];

function getBlogEntries() {
  const postsDir = join(rootDir, "posts");
  if (!existsSync(postsDir)) return [];

  return readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw  = readFileSync(join(postsDir, f), "utf-8");
      const { data } = matter(raw);
      const slug = data.slug || f.replace(".md", "");
      const date = data.date ? new Date(data.date).toISOString().split("T")[0] : null;
      return { url: `/blog/${slug}/`, changefreq: "monthly", priority: 0.6, lastmod: date };
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}

async function getProjectEntries() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("[gen-sitemap] Supabase env not set — skipping /projects/{slug} entries");
    return [];
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("projects")
    .select("slug, created_at")
    .eq("hidden", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[gen-sitemap] Supabase error:", error.message);
    return [];
  }

  return (data ?? []).map((p) => ({
    url:        `/projects/${p.slug}/`,
    changefreq: "monthly",
    priority:   0.6,
    lastmod:    p.created_at ? new Date(p.created_at).toISOString().split("T")[0] : null,
  }));
}

// ── XML builder ────────────────────────────────────────────────────────────

function buildXml(entries) {
  const today = new Date().toISOString().split("T")[0];
  const urls  = entries.map(({ url, changefreq, priority, lastmod }) => {
    const loc  = `${BASE}${url}`;
    const lm   = lastmod ?? today;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lm}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority.toFixed(1)}</priority>`,
      "  </url>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

// ── Main ───────────────────────────────────────────────────────────────────

const blogEntries    = getBlogEntries();
const projectEntries = await getProjectEntries();

const allEntries = [...STATIC_ROUTES, ...blogEntries, ...projectEntries];

// Deduplicate by URL (keeps first occurrence)
const seen    = new Set();
const deduped = allEntries.filter(({ url }) => {
  if (seen.has(url)) return false;
  seen.add(url);
  return true;
});

const xml = buildXml(deduped);
writeFileSync(outFile, xml, "utf-8");

console.log(`[gen-sitemap] Written ${deduped.length} URLs to dist/sitemap.xml`);
deduped.forEach(({ url, priority }) =>
  console.log(`  ${priority.toFixed(1)}  ${url === "/" ? BASE : BASE + url}`),
);
