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
} from "fs";
import { join, resolve, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");
const distDir = resolve(rootDir, "dist");
const PORT = 4177;

const STATIC_ROUTES = ["/", "/services", "/projects", "/blog", "/contact"];

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
      .replace(/<meta(?![^>]*\bdata-rh)[^>]*(?:name="description"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*\/?>\s*/gi, "")
      .replace(/<link(?![^>]*\bdata-rh)[^>]*rel="canonical"[^>]*\/?>\s*/gi, "")
      .replace(/\s+data-rh="true"/g, "");
    return `<head${attrs}>${cleaned}</head>`;
  });

  return dedupeInlineStyles(withHead);
}

function validateHtml(route, html) {
  const issues = [];
  const canonical = expectedCanonical(route);

  if (!html.includes("<h1")) {
    issues.push("missing <h1>");
  }
  if (!html.includes('rel="canonical"')) {
    issues.push("missing canonical link");
  } else if (!html.includes(canonical)) {
    issues.push(`canonical mismatch (expected ${canonical})`);
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

    const html = cleanPrerenderedHtml(await page.content());
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

await browser.close();
server.close();

if (failed > 0) {
  console.warn(`[prerender] Done with ${failed} failed route(s).`);
  process.exitCode = 1;
} else {
  console.log("[prerender] Done.");
}
