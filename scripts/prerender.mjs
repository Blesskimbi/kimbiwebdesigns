/**
 * Post-build prerender script.
 * Serves dist/ locally, visits each public route with Playwright, and writes
 * fully rendered HTML (including react-helmet-async head tags) into dist/.
 *
 * Usage: node scripts/prerender.mjs   (runs after vite build)
 */
import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";
import { createServer } from "http";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  statSync,
  copyFileSync,
} from "fs";
import { join, resolve, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");
const distDir = resolve(rootDir, "dist");
const PORT = 4177;

const STATIC_ROUTES = ["/", "/services", "/projects", "/blog", "/contact", "/community"];

/** Internal-only path that renders NotFound.tsx — written to dist/404.html */
const NOT_FOUND_PROBE = "/__404_prerender__";

const mimeMap = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".json": "application/json",
  ".ico": "image/x-icon",
};

function serveStatic(req, res) {
  const urlPath = req.url.split("?")[0];
  let filePath = join(distDir, urlPath);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(distDir, "index.html");
  }

  try {
    const data = readFileSync(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { "Content-Type": mimeMap[ext] ?? "text/plain" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}

function getBlogRoutes() {
  const postsDir = join(rootDir, "posts");
  if (!existsSync(postsDir)) return [];

  return readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = readFileSync(join(postsDir, f), "utf-8");
      const { data } = matter(raw);
      const slug = data.slug || f.replace(".md", "");
      return `/blog/${slug}`;
    });
}

async function getProjectRoutes() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("[prerender] Supabase env not set — skipping /projects/{slug} routes");
    return [];
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("projects")
    .select("slug")
    .eq("hidden", false);

  if (error) {
    console.warn("[prerender] Failed to fetch project slugs:", error.message);
    return [];
  }

  return (data ?? []).map((p) => `/projects/${p.slug}`);
}

async function getRoutes() {
  const [projectRoutes] = await Promise.all([getProjectRoutes()]);
  const blogRoutes = getBlogRoutes();
  const routes = [...STATIC_ROUTES, ...projectRoutes, ...blogRoutes];
  return [...new Set(routes)];
}

function expectedCanonical(route) {
  if (route === "/") return "https://everythx.com";
  return `https://everythx.com${route}`;
}

function writeRouteHtml(route, html) {
  if (route === "/") {
    writeFileSync(join(distDir, "index.html"), html);
    return;
  }

  const outDir = join(distDir, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
}

function dedupeInlineStyles(html) {
  const seen = new Set();
  return html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, (block) => {
    if (seen.has(block)) return "";
    seen.add(block);
    return block;
  });
}

function cleanPrerenderedHtml(html) {
  if (!html.includes('data-rh="true"')) return dedupeInlineStyles(html);

  const withHead = html.replace(/<head([^>]*)>([\s\S]*?)<\/head>/i, (_, attrs, head) => {
    let cleaned = head
      .replace(/<meta(?![^>]*\bdata-rh)[^>]*(?:name="description"|name="robots"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*\/?>\s*/gi, "")
      .replace(/<link(?![^>]*\bdata-rh)[^>]*rel="canonical"[^>]*\/?>\s*/gi, "")
      .replace(/\s+data-rh="true"/g, "");
    return `<head${attrs}>${cleaned}</head>`;
  });

  return dedupeInlineStyles(withHead);
}

/** Move SEO-critical tags to the top of <head> so crawlers see them in the first few KB. */
function reorderHeadForSeo(html) {
  return html.replace(/<head([^>]*)>([\s\S]*?)<\/head>/i, (_, attrs, head) => {
    const extracted = [];
    const pull = (regex) => {
      head = head.replace(regex, (match) => {
        extracted.push(match.trim());
        return "";
      });
    };

    pull(/<title>[\s\S]*?<\/title>\s*/i);
    pull(/<meta[^>]*name="description"[^>]*\/?>\s*/gi);
    pull(/<meta[^>]*name="robots"[^>]*\/?>\s*/gi);
    pull(/<link[^>]*rel="canonical"[^>]*\/?>\s*/gi);
    pull(/<meta[^>]*property="og:[^"]+"[^>]*\/?>\s*/gi);
    pull(/<meta[^>]*name="twitter:[^"]+"[^>]*\/?>\s*/gi);
    pull(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi);

    const essentials = [];
    head = head.replace(
      /<(meta charset[^>]*\/?>|meta name="viewport"[^>]*\/?>|meta name="google-site-verification"[^>]*\/?>|link rel="icon"[^>]*\/?>|link rel="apple-touch-icon"[^>]*\/?>)\s*/gi,
      (match) => {
        essentials.push(match.trim());
        return "";
      },
    );

    const reordered = [...essentials, ...extracted, head.trim()].filter(Boolean).join("\n    ");
    return `<head${attrs}>\n    ${reordered}\n  </head>`;
  });
}

/** Ensure every indexable prerendered page has an explicit robots meta tag. */
function ensureRobotsMeta(html, route) {
  if (route === NOT_FOUND_PROBE) return html;

  const headEnd = html.indexOf("</head>");
  if (headEnd < 0) return html;

  const head = html.slice(0, headEnd);
  if (head.includes('name="robots"')) return html;

  return html.replace(
    /<head([^>]*)>/i,
    '<head$1>\n    <meta name="robots" content="index, follow">',
  );
}

function validateHtml(route, html) {
  const issues = [];

  if (route === NOT_FOUND_PROBE) {
    if (!html.includes('name="robots"') || !html.includes("noindex")) {
      issues.push("404 page missing noindex");
    }
    if (!html.includes("Page Not Found")) {
      issues.push("404 page missing heading");
    }
    return issues;
  }

  const canonical = expectedCanonical(route);

  if (!html.includes("<h1")) {
    issues.push("missing <h1>");
  }
  if (!html.includes('rel="canonical"')) {
    issues.push("missing canonical link");
  } else if (!html.includes(canonical)) {
    issues.push(`canonical mismatch (expected ${canonical})`);
  } else {
    const headEnd = html.indexOf("</head>");
    const headChunk = headEnd > 0 ? html.slice(0, headEnd) : html;
    const canonPos = headChunk.indexOf('rel="canonical"');
    if (canonPos < 0 || canonPos > 8192) {
      issues.push("canonical not in first 8KB of head");
    }
  }
  if (!html.includes('name="robots"')) {
    issues.push("missing robots meta");
  } else if (
    route !== NOT_FOUND_PROBE &&
    /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)
  ) {
    issues.push("unexpected noindex on indexable route");
  }
  if (!html.match(/<title>[^<]+<\/title>/)) {
    issues.push("missing <title>");
  }
  if (html.includes('<div id="root"></div>') && !html.includes('<div id="root" data-prerendered')) {
    // root should contain rendered markup, not be empty
    const rootMatch = html.match(/<div id="root"[^>]*>([\s\S]*?)<\/div>/);
    if (!rootMatch || rootMatch[1].trim().length < 50) {
      issues.push("root appears empty (no rendered content)");
    }
  }

  return issues;
}

async function waitForRouteReady(page, route) {
  if (route === NOT_FOUND_PROBE) {
    await page.waitForSelector("h1", { timeout: 25000 });
    await new Promise((r) => setTimeout(r, 400));
    return;
  }

  await page.waitForSelector("h1", { timeout: 25000 });

  await page
    .waitForFunction(
      () =>
        !document.querySelector(".animate-pulse") &&
        !document.querySelector(".animate-spin"),
      { timeout: 25000 },
    )
    .catch(() => {});

  const canonical = expectedCanonical(route);
  await page
    .waitForFunction(
      (expected) => {
        const link = document.querySelector('link[rel="canonical"]');
        if (!link) return false;
        const href = link.getAttribute("href") ?? "";
        return href === expected || href === `${expected}/`;
      },
      canonical,
      { timeout: 15000 },
    )
    .catch(() => {});

  await new Promise((r) => setTimeout(r, 400));
}

const server = createServer(serveStatic);
await new Promise((r) => server.listen(PORT, r));
console.log(`[prerender] Static server on http://localhost:${PORT}`);

const routes = await getRoutes();
console.log(`[prerender] Rendering ${routes.length} routes…`);

const browser = await chromium.launch();
const context = await browser.newContext();
let failed = 0;

for (const route of routes) {
  const url = `http://localhost:${PORT}${route}`;
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await waitForRouteReady(page, route);

    const html = ensureRobotsMeta(reorderHeadForSeo(cleanPrerenderedHtml(await page.content())), route);
    const issues = validateHtml(route, html);

    if (issues.length > 0) {
      console.warn(`  ⚠ ${route} — ${issues.join(", ")}`);
    } else {
      console.log(`  ✓ ${route}`);
    }

    writeRouteHtml(route, html);
  } catch (err) {
    failed += 1;
    console.warn(`  ✗ ${route} — ${err.message}`);
  } finally {
    await page.close();
  }
}

// Prerender NotFound.tsx → dist/404.html for Apache ErrorDocument
{
  const page = await context.newPage();
  try {
    await page.goto(`http://localhost:${PORT}${NOT_FOUND_PROBE}`, {
      waitUntil: "networkidle",
      timeout: 45000,
    });
    await waitForRouteReady(page, NOT_FOUND_PROBE);
    const html = ensureRobotsMeta(reorderHeadForSeo(cleanPrerenderedHtml(await page.content())), route);
    const issues = validateHtml(NOT_FOUND_PROBE, html);
    if (issues.length > 0) {
      console.warn(`  ⚠ 404.html — ${issues.join(", ")}`);
    } else {
      console.log("  ✓ 404.html (NotFound)");
    }
    writeFileSync(join(distDir, "404.html"), html);
  } catch (err) {
    failed += 1;
    console.warn(`  ✗ 404.html — ${err.message}`);
  } finally {
    await page.close();
  }
}

// Dashboard SPA shell — physical file so Hostinger CDN doesn't 404 before rewrite
{
  const dashboardDir = join(distDir, "dashboard");
  mkdirSync(dashboardDir, { recursive: true });
  copyFileSync(join(distDir, "index.html"), join(dashboardDir, "index.html"));
  console.log("  ✓ dashboard/index.html (SPA shell copy)");
}

await browser.close();
server.close();

if (failed > 0) {
  console.warn(`[prerender] Done with ${failed} failed route(s).`);
  process.exitCode = 1;
} else {
  console.log("[prerender] Done.");
}
