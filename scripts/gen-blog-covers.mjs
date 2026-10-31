/**
 * Renders a branded 1200×675 featured image for every post in /posts.
 *
 *   node scripts/gen-blog-covers.mjs            → write public/blog-cover-<slug>.png
 *   node scripts/gen-blog-covers.mjs --write    → also point each post's imageUrl at it
 *   node scripts/gen-blog-covers.mjs --only=<slug>
 *
 * ON THE BROWSER — the covers are typeset in Instrument Sans, the site's only
 * family. sharp rasterises SVG through librsvg, which can only reach fonts
 * fontconfig has registered, so a cover built that way renders in whatever
 * the machine happens to substitute — Arial here, DejaVu in a container. The
 * covers would then differ between the laptop that generated them and anyone
 * else's. A browser already has the font, so the page is laid out in headless
 * Chromium and photographed. The resolver is the same one scripts/prerender.mjs
 * uses, for the same reason documented there: @sparticuz/chromium on Linux,
 * Playwright's managed binary locally.
 *
 * This is deliberately NOT part of `npm run build`. The covers are committed
 * PNGs — regenerating 14 of them on every deploy would cost a browser launch
 * for files that only change when a post's title does.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import sharp from "sharp";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..");
const postsDir = join(root, "posts");
const publicDir = join(root, "public");

const WIDTH = 1200;
const HEIGHT = 675; // 16:9 — the ratio BlogPostPage and the blog cards both crop to.
const SCALE = 2; // Shot at 2400×1350 and resized down, so the type stays crisp.

const CONTAINER_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
];

/* ── Palette ────────────────────────────────────────────────────────────────
   The same HSL triples :root declares in src/index.css, converted here rather
   than copied as hex, so these provably describe the tokens they name instead
   of drifting into a second palette the way the old og-image did. */
const TOKENS = {
  cream: [45, 60, 96], // --background
  creamLift: [45, 55, 98], // --popover
  ink: [46, 81, 4], // --navy / --foreground
  inkLift: [46, 30, 14], // --navy-light
  orange: [18, 100, 52], // --gold
  orangeDark: [18, 92, 44], // --gold-dark
  muted: [44, 38, 93], // --muted
  border: [45, 22, 87], // --border
};

const hex = (name) => {
  const [h, s, l] = TOKENS[name];
  const S = s / 100;
  const L = l / 100;
  const c = (1 - Math.abs(2 * L - 1)) * S;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = L - c / 2;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  const to = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
};

/* ── Tones ──────────────────────────────────────────────────────────────────
   Three grounds rather than one, so the blog index reads as a set instead of
   fourteen identical cards. Each carries a different accent device — rings,
   a lattice, an arc — so two covers side by side are never the same picture
   with the words swapped. Which tone a post gets is hashed from its slug, so
   it is stable for the life of the post and does not shuffle when a new post
   is added above it. */
const TONES = {
  ink: {
    bg: hex("ink"),
    title: hex("cream"),
    eyebrow: hex("orange"),
    meta: "rgba(251,248,239,0.55)",
    rule: "rgba(251,248,239,0.16)",
    logo: "logo-cream.png",
    accent: "rings",
    accentColor: hex("orange"),
  },
  orange: {
    bg: hex("orange"),
    title: hex("cream"),
    eyebrow: "rgba(251,248,239,0.72)",
    meta: "rgba(251,248,239,0.7)",
    rule: "rgba(251,248,239,0.26)",
    logo: "logo-cream.png",
    logoFilter: "brightness(0) invert(1)",
    accent: "lattice",
    accentColor: "rgba(251,248,239,0.5)",
  },
  cream: {
    bg: hex("cream"),
    title: hex("ink"),
    eyebrow: hex("orange"),
    meta: "rgba(19,15,2,0.5)",
    rule: hex("border"),
    logo: "logo-ink.png",
    accent: "arc",
    accentColor: hex("orange"),
  },
};
const TONE_ORDER = ["ink", "cream", "orange"];

const hashSlug = (slug) => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
};

/* The frontmatter title is written for the article and runs past 85 characters
   on several posts, which is unreadable at cover size. seoTitle is the short
   form the author already wrote for exactly this kind of slot, so it is
   preferred; the "| Bless Kimbi" suffix some carry is the site name appended
   for the SERP and is redundant next to the logo in the corner. */
const coverTitle = (data) => {
  const raw = (data.seoTitle || data.title || "").trim();
  const noBrand = raw.replace(/\s*\|\s*Bless Kimbi\s*$/i, "").trim();
  if (noBrand.length <= 62) return noBrand;
  const beforeColon = noBrand.split(/:\s/)[0];
  return beforeColon.length >= 24 ? beforeColon : noBrand;
};

const readingTime = (data, content) => {
  if (data.readTime) return data.readTime;
  const words = content.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

const titleSize = (text) => {
  const n = text.length;
  if (n <= 30) return 78;
  if (n <= 42) return 70;
  if (n <= 54) return 62;
  return 54;
};

const accentMarkup = (tone) => {
  if (tone.accent === "rings") {
    // Concentric rings bleeding off the right edge — the hero's tonal disc,
    // drawn as outline so it reads as structure rather than a second subject.
    return `<svg class="accent" viewBox="0 0 520 675" width="520" height="675" fill="none" aria-hidden="true">
      ${[330, 258, 186, 114]
        .map(
          (r, i) =>
            `<circle cx="400" cy="337" r="${r}" stroke="${tone.accentColor}" stroke-width="1.5" opacity="${0.3 - i * 0.055}"/>`,
        )
        .join("")}
      <circle cx="400" cy="337" r="52" fill="${tone.accentColor}" opacity="0.14"/>
    </svg>`;
  }
  if (tone.accent === "lattice") {
    // A ruled lattice — flat, no blur, nothing that reads as a gradient.
    const lines = [];
    for (let i = 0; i <= 8; i++) lines.push(`<line x1="${i * 62}" y1="0" x2="${i * 62}" y2="675" stroke="${tone.accentColor}" stroke-width="1" opacity="0.22"/>`);
    for (let i = 0; i <= 10; i++) lines.push(`<line x1="0" y1="${i * 62}" x2="520" y2="${i * 62}" stroke="${tone.accentColor}" stroke-width="1" opacity="0.14"/>`);
    return `<svg class="accent" viewBox="0 0 520 675" width="520" height="675" fill="none" aria-hidden="true">${lines.join("")}</svg>`;
  }
  // arc — one quarter-round at the card radius, the shape the whole site is cut to.
  return `<svg class="accent" viewBox="0 0 520 675" width="520" height="675" fill="none" aria-hidden="true">
    <path d="M520 77 A260 260 0 0 0 260 337 A260 260 0 0 0 520 597" stroke="${tone.accentColor}" stroke-width="2" opacity="0.5"/>
    <path d="M520 157 A180 180 0 0 0 340 337 A180 180 0 0 0 520 517" stroke="${tone.accentColor}" stroke-width="2" opacity="0.3"/>
    <path d="M520 237 A100 100 0 0 0 420 337 A100 100 0 0 0 520 437" stroke="${tone.accentColor}" stroke-width="2" opacity="0.18"/>
  </svg>`;
};

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const buildHtml = ({ title, category, readTime, tone, logoDataUri }) => `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..700&display=block">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;
    font-family:'Instrument Sans',system-ui,sans-serif;background:${tone.bg};
    -webkit-font-smoothing:antialiased}
  .frame{position:relative;width:100%;height:100%;display:flex;flex-direction:column;
    justify-content:space-between;padding:60px 64px}
  .accent{position:absolute;top:0;right:-60px;pointer-events:none;
    -webkit-mask-image:linear-gradient(to right,transparent,#000 42%);
    mask-image:linear-gradient(to right,transparent,#000 42%)}
  .row{position:relative;display:flex;align-items:center;justify-content:space-between;gap:24px}
  .logo{height:34px;width:auto;display:block;filter:${tone.logoFilter || "none"}}
  .eyebrow{font-size:16px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;
    color:${tone.eyebrow}}
  .body{position:relative;max-width:840px}
  /* Headings on the site are never bold — 400 at display size, tight tracking.
     Matching that is the whole point of rendering these in a browser. */
  h1{font-size:${titleSize(title)}px;font-weight:400;line-height:1.06;letter-spacing:-.032em;
    color:${tone.title};margin-top:22px}
  .foot{position:relative;padding-top:22px;border-top:1px solid ${tone.rule};
    display:flex;align-items:center;justify-content:space-between}
  .domain{font-size:17px;font-weight:600;letter-spacing:-.01em;color:${tone.title}}
  .meta{font-size:15px;font-weight:500;color:${tone.meta}}
</style></head>
<body><div class="frame">
  ${accentMarkup(tone)}
  <div class="row"><img class="logo" src="${logoDataUri}" alt=""></div>
  <div class="body">
    <div class="eyebrow">${escapeHtml(category)}</div>
    <h1>${escapeHtml(title)}</h1>
  </div>
  <div class="foot">
    <span class="domain">blesskimbi.com</span>
    <span class="meta">${escapeHtml(readTime)}</span>
  </div>
</div></body></html>`;

async function resolveBrowser() {
  if (process.platform === "linux") {
    try {
      const sparticuz = (await import("@sparticuz/chromium")).default;
      const executablePath = await sparticuz.executablePath();
      if (executablePath && existsSync(executablePath)) {
        return { executablePath, args: sparticuz.args, source: "@sparticuz/chromium" };
      }
    } catch {
      /* fall through */
    }
  }
  try {
    const { chromium } = await import("playwright");
    const executablePath = chromium.executablePath();
    if (executablePath && existsSync(executablePath)) {
      return { executablePath, args: CONTAINER_ARGS, source: "playwright chromium" };
    }
  } catch {
    /* nothing left to try */
  }
  return null;
}

const main = async () => {
  const args = process.argv.slice(2);
  const writeFrontmatter = args.includes("--write");
  const only = args.find((a) => a.startsWith("--only="))?.slice("--only=".length);

  const posts = readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const full = join(postsDir, file);
      const { data, content } = matter(readFileSync(full, "utf8"));
      return { file, full, slug: data.slug || file.replace(/\.md$/, ""), data, content };
    })
    .filter((p) => !only || p.slug === only);

  if (!posts.length) {
    console.error(only ? `[covers] no post matching --only=${only}` : "[covers] no posts found");
    process.exit(1);
  }

  const puppeteer = (await import("puppeteer-core")).default;
  const resolved = await resolveBrowser();
  if (!resolved) {
    console.error("[covers] no chromium found. Run `npx playwright install chromium`.");
    process.exit(1);
  }
  console.log(`[covers] browser: ${resolved.source}`);

  const logos = Object.fromEntries(
    ["logo-cream.png", "logo-ink.png"].map((f) => [
      f,
      `data:image/png;base64,${readFileSync(join(publicDir, f)).toString("base64")}`,
    ]),
  );

  const browser = await puppeteer.launch({
    executablePath: resolved.executablePath,
    args: resolved.args,
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: SCALE });

  const written = [];
  for (const post of posts) {
    const tone = TONES[TONE_ORDER[hashSlug(post.slug) % TONE_ORDER.length]];
    const title = coverTitle(post.data);
    const html = buildHtml({
      title,
      category: post.data.category || "Article",
      readTime: readingTime(post.data, post.content),
      tone,
      logoDataUri: logos[tone.logo],
    });

    // "load", not "networkidle0": after the first page the font CSS and woff2
    // come from cache, so the idle heuristic sits waiting for requests that
    // were never going to be made and times out on post two. What that wait
    // was actually for is the font being ready, which is checked directly.
    await page.setContent(html, { waitUntil: "load", timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready);

    // Fail loudly rather than silently shipping a cover set in a fallback face.
    const gotFont = await page.evaluate(() => document.fonts.check("400 70px 'Instrument Sans'"));
    if (!gotFont) {
      await browser.close();
      console.error("[covers] Instrument Sans did not load — covers would render in a fallback face. Check network access to fonts.googleapis.com.");
      process.exit(1);
    }

    const shot = await page.screenshot({ type: "png" });
    const outName = `blog-cover-${post.slug}.png`;
    await sharp(shot)
      .resize(WIDTH, HEIGHT, { fit: "fill" })
      .png({ compressionLevel: 9 })
      .toFile(join(publicDir, outName));

    written.push({ post, outName, title });
    console.log(`  ${outName.padEnd(62)} ${TONE_ORDER[hashSlug(post.slug) % 3].padEnd(7)} "${title}"`);
  }

  await browser.close();

  if (writeFrontmatter) {
    for (const { post, outName } of written) {
      const src = readFileSync(post.full, "utf8");
      // Line-level replacement, not a gray-matter round trip: re-stringifying
      // would reflow every folded scalar in these files and produce a diff
      // across frontmatter that was never touched.
      const next = src.replace(
        /^imageUrl:[ \t]*(?:>-?[ \t]*\r?\n(?:[ \t]+\S.*\r?\n)+|.*\r?\n)/m,
        `imageUrl: /${outName}\n`,
      );
      if (next === src) {
        console.warn(`  ! could not rewrite imageUrl in ${post.file}`);
        continue;
      }
      writeFileSync(post.full, next);
    }
    console.log(`[covers] imageUrl updated in ${written.length} post(s)`);
  }

  console.log(`[covers] ${written.length} cover(s) written to public/`);
  if (!writeFrontmatter) console.log("[covers] re-run with --write to point each post at its new cover");
};

main().catch((err) => {
  console.error("[covers]", err);
  process.exit(1);
});
