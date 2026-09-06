/**
 * Writes the rendered DOM of every route into its static HTML file.
 *
 * Without this the site ships `<div id="root"></div>` and nothing else. Google
 * can execute JavaScript, but it does so in a second pass that is queued
 * separately and can lag the first crawl by days, and every other crawler that
 * matters here — Bing, the social scrapers, the AI answer engines, the
 * directory bots — mostly does not execute it at all. Until the markup is in
 * the response, a page has no headings, no copy and no outgoing links to
 * follow, so nothing on the site discovers anything else on the site.
 *
 * Runs last in the build, after gen-routes has written the per route <head>,
 * and only ever replaces the contents of #root. The head that gen-routes
 * produced is left exactly as it is.
 *
 * ON THE BROWSER — Vercel's build image is missing the shared libraries a
 * stock Chromium links against (libnspr4 among them), so Playwright's download
 * fetches 110 MB and then dies the instant it launches. That is why the earlier
 * prerender here was reverted in "Drop prerendering so the site builds on
 * Vercel", and why gen-routes exists to write the <head> without a browser.
 *
 * A launch flag cannot supply a missing library, but a differently built binary
 * can: @sparticuz/chromium ships a Chromium compiled for exactly this image
 * with those libraries carried alongside it. So the browser is resolved rather
 * than assumed — that build on Linux, and the one Playwright already manages
 * when developing locally. Both are driven through puppeteer-core, which is
 * what the Lambda build is built to pair with.
 *
 * If neither resolves, this warns and skips. The deploy still goes out with its
 * head metadata intact; it just goes out without the body, which is what
 * happened on every build before this script existed.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, resolve, relative, sep } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { readdir, stat } from "fs/promises";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const distDir = resolve(__dirname, "..", "dist");

const PORT = Number(process.env.PRERENDER_PORT || 0);
const NAV_TIMEOUT = 30_000;
const SETTLE_TIMEOUT = 6_000;

// What lets Chromium start inside a build container at all. Carried over from
// the earlier prerender in this repo.
const CONTAINER_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
];

const ROOT_OPEN = '<div id="root">';
const ROOT_CLOSE = "</div>";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

/** Every route gen-routes wrote, discovered from the files themselves. */
async function findRoutes(dir = distDir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "assets") continue;
      out.push(...(await findRoutes(full)));
    } else if (entry.name === "index.html") {
      const rel = relative(distDir, dir).split(sep).filter(Boolean).join("/");
      out.push({ path: rel ? `/${rel}/` : "/", file: full });
    }
  }
  return out;
}

function serveDist() {
  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let file = join(distDir, urlPath);

    try {
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    } catch {
      // Unknown path: fall back to the SPA shell so client routing still works.
      file = join(distDir, "index.html");
    }

    if (!file.startsWith(distDir) || !existsSync(file)) {
      res.writeHead(404).end("not found");
      return;
    }

    const ext = file.slice(file.lastIndexOf("."));
    res.writeHead(200, { "content-type": MIME[ext] || "application/octet-stream" });
    res.end(readFileSync(file));
  });

  // Port 0 lets the OS pick a free one. A fixed port strands the build when a
  // previous run died without releasing it, which is the normal outcome of an
  // interrupted build.
  return new Promise((ok) => server.listen(PORT, "127.0.0.1", () => ok(server)));
}

/**
 * Scrolls the whole page, then clears the inline styles the scroll animations
 * leave behind.
 *
 * Sections animate in on scroll, which means anything below the fold is sitting
 * at `opacity: 0` when the page first settles. Snapshotting at that moment
 * captures the copy as invisible. Walking the page fires each trigger, and the
 * sweep afterwards catches whatever was still mid-tween. Over-revealing is
 * safe: the browser re-renders from scratch on mount, so only crawlers ever see
 * this version of the DOM.
 */
async function revealAll(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));

    for (const el of document.querySelectorAll("[style]")) {
      const s = el.style;
      if (s.opacity !== "" && Number(s.opacity) < 1) s.opacity = "";
      if (s.visibility === "hidden") s.visibility = "";
      if (s.transform && s.transform !== "none") s.transform = "";
      if (s.clipPath) s.clipPath = "";
    }
  });
}

/**
 * Finds a Chromium this machine can actually start, and the flags it needs.
 *
 * Order matters: the Lambda build is tried first because it is the one that
 * works in a build container, and it only exists for Linux. Locally that import
 * is skipped and Playwright's managed browser is borrowed instead, which avoids
 * a second 110 MB download for a binary already on disk.
 */
async function resolveBrowser() {
  if (process.platform === "linux") {
    try {
      const sparticuz = (await import("@sparticuz/chromium")).default;
      const executablePath = await sparticuz.executablePath();
      if (executablePath && existsSync(executablePath)) {
        return { executablePath, args: sparticuz.args, source: "@sparticuz/chromium" };
      }
    } catch {
      // Not installed, or could not unpack. Fall through to the local browser.
    }
  }

  try {
    const { chromium } = await import("playwright");
    const executablePath = chromium.executablePath();
    if (executablePath && existsSync(executablePath)) {
      return { executablePath, args: CONTAINER_ARGS, source: "playwright chromium" };
    }
  } catch {
    // Playwright absent. Nothing left to try.
  }

  return null;
}

const main = async () => {
  if (!existsSync(join(distDir, "index.html"))) {
    console.error("[prerender] dist/index.html not found — run vite build first.");
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = (await import("puppeteer-core")).default;
  } catch {
    console.warn("[prerender] puppeteer-core not installed — skipping. Pages ship without body markup.");
    return;
  }

  const resolved = await resolveBrowser();
  if (!resolved) {
    console.warn("[prerender] no runnable chromium found — skipping.");
    console.warn("[prerender] pages will ship with head metadata but no body markup.");
    return;
  }
  console.log(`[prerender] using ${resolved.source}`);

  const routes = await findRoutes();
  const server = await serveDist();
  const port = server.address().port;

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: resolved.executablePath,
      args: resolved.args,
      headless: true,
    });
  } catch (err) {
    console.warn(`[prerender] could not launch chromium (${err.message.split("\n")[0]}) — skipping.`);
    console.warn("[prerender] pages will ship with head metadata but no body markup.");
    server.close();
    return;
  }

  let done = 0;
  const issues = [];

  /**
   * Renders one route in its own page.
   *
   * A page per route rather than one shared across all of them. Chromium can
   * drop a page under load, and with a single shared page every route after
   * that point failed with the same "detached Frame" id: one crash 28 routes in
   * silently cost the remaining 8 their body markup.
   */
  const renderRoute = async (route) => {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 900 });
      page.setDefaultTimeout(NAV_TIMEOUT);

      await page.goto(`http://127.0.0.1:${port}${route.path}`, {
        waitUntil: "domcontentloaded",
        timeout: NAV_TIMEOUT,
      });
      // Presence, not visibility: the first child of #root is the toast
      // region, which stays invisible until a toast fires, so a visibility wait
      // would wait for something that never happens. puppeteer waits for
      // presence by default, which is what is wanted here.
      await page.waitForSelector("#root > *", { timeout: 15_000 });

      // The real signal that the page rendered rather than merely mounted.
      await page.waitForSelector("#root h1", { timeout: 10_000 }).catch(() => {});

      // The data fetches are not covered by any load event, and waiting for the
      // network to fall quiet never returns because the Supabase client holds a
      // connection open. Give them a fixed window instead.
      await new Promise((r) => setTimeout(r, SETTLE_TIMEOUT));

      await revealAll(page);

      return await page.evaluate(() => document.getElementById("root").innerHTML);
    } finally {
      await page.close().catch(() => {});
    }
  };

  for (const route of routes) {
    try {
      let html;
      try {
        html = await renderRoute(route);
      } catch (first) {
        // One retry on a fresh page. A crash is usually transient, and the cost
        // of retrying is far below the cost of shipping a page with no body.
        html = await renderRoute(route);
      }

      if (!html || html.length < 500) {
        issues.push(`${route.path} — rendered only ${html ? html.length : 0} chars`);
        continue;
      }
      if (!/<h1[\s>]/i.test(html)) {
        issues.push(`${route.path} — rendered without an <h1>`);
      }

      const source = readFileSync(route.file, "utf-8");

      // Sliced rather than regex-replaced. A lazy match would stop at the first
      // </div> inside the markup we just injected, and a greedy one depends on
      // #root holding the document's last </div>; both quietly mangle the file
      // if this ever runs on an already-filled page.
      const open = source.indexOf(ROOT_OPEN);
      const close = source.lastIndexOf(ROOT_CLOSE);

      if (open === -1 || close <= open) {
        issues.push(`${route.path} — could not find #root to fill`);
        continue;
      }

      const replaced = source.slice(0, open + ROOT_OPEN.length) + html + source.slice(close);

      writeFileSync(route.file, replaced);
      done += 1;
      console.log(`  ✓ ${route.path.padEnd(52)} ${(html.length / 1024).toFixed(0)} KB`);
    } catch (err) {
      issues.push(`${route.path} — ${err.message.split("\n")[0]}`);
    }
  }

  await browser.close();
  server.close();

  console.log(`[prerender] Filled ${done}/${routes.length} routes.`);
  if (issues.length) {
    console.warn(`[prerender] ${issues.length} issue(s):`);
    issues.forEach((i) => console.warn(`  ⚠ ${i}`));
  }
};

main();
