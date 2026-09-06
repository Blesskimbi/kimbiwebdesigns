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
 * A failure here is deliberately not fatal. The pages remain valid and the
 * deploy still goes out with head metadata intact; it just goes out without the
 * body, which is what happened every build before this script existed.
 *
 * KNOWN LIMIT — this step does not run on Vercel. Vercel's build image has no
 * libnspr4, so Chromium cannot start there no matter which flags it is given;
 * a missing shared library is not something a launch argument can work around.
 * An earlier prerender in this repo was reverted for exactly this reason (see
 * "Drop prerendering so the site builds on Vercel"), which is why gen-routes
 * exists to write the <head> without a browser.
 *
 * So on a Vercel build this warns and skips, and the deploy is unaffected. To
 * actually ship prerendered bodies the build has to happen somewhere Chromium
 * runs — GitHub Actions, say — and the output deployed with
 * `vercel deploy --prebuilt`. Until then this step earns its keep locally, as
 * the way to check what a crawler would receive before shipping.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, resolve, relative, sep } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { readdir, stat } from "fs/promises";
import { execSync } from "child_process";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const distDir = resolve(__dirname, "..", "dist");

const PORT = Number(process.env.PRERENDER_PORT || 0);
const NAV_TIMEOUT = 30_000;
const SETTLE_TIMEOUT = 6_000;

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

const main = async () => {
  if (!existsSync(join(distDir, "index.html"))) {
    console.error("[prerender] dist/index.html not found — run vite build first.");
    process.exit(1);
  }

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.warn("[prerender] playwright not installed — skipping. Pages ship without body markup.");
    return;
  }

  const routes = await findRoutes();
  const server = await serveDist();
  const port = server.address().port;

  // A CI image installs node_modules but not the browser binaries Playwright
  // downloads on demand, so the first launch there fails on a missing
  // executable. Fetch it once and retry rather than making every deploy depend
  // on someone remembering an extra build step.
  // The sandbox and /dev/shm flags are what let Chromium start inside a build
  // container at all. Carried over from the earlier prerender in this repo.
  const launchOptions = {
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  };

  let browser;
  try {
    browser = await chromium.launch(launchOptions);
  } catch (first) {
    console.log("[prerender] chromium not present, installing it...");
    try {
      execSync("npx --yes playwright install chromium", { stdio: "inherit" });
      browser = await chromium.launch(launchOptions);
    } catch (second) {
      console.warn(`[prerender] could not launch chromium (${second.message.split("\n")[0]}) — skipping.`);
      console.warn("[prerender] pages will ship with head metadata but no body markup.");
      server.close();
      return;
    }
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.setDefaultTimeout(NAV_TIMEOUT);

  let done = 0;
  const issues = [];

  for (const route of routes) {
    try {
      await page.goto(`http://127.0.0.1:${port}${route.path}`, {
        waitUntil: "domcontentloaded",
        timeout: NAV_TIMEOUT,
      });
      // "attached", not the default "visible". The first child of #root is the
      // toast notification region, which is permanently invisible until a toast
      // fires, so waiting for visibility waits for something that never happens.
      await page.waitForSelector("#root > *", { state: "attached", timeout: 15_000 });

      // The real signal that the page rendered rather than merely mounted.
      await page.waitForSelector("#root h1", { state: "attached", timeout: 10_000 }).catch(() => {});

      // Best effort only. Waiting on networkidle as the navigation condition
      // stalls every page for the full timeout, because the Supabase client
      // holds a connection open and the network therefore never goes quiet.
      // Give the data fetches a window to land, then carry on regardless.
      await page.waitForLoadState("networkidle", { timeout: SETTLE_TIMEOUT }).catch(() => {});

      await revealAll(page);

      const html = await page.evaluate(() => document.getElementById("root").innerHTML);

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
