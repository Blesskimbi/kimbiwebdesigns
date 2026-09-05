/**
 * Rewrites posts/*.md from the published rows in Supabase.
 *
 * The markdown files are the build-time fallback: gen-sitemap.mjs and
 * gen-routes.mjs read them when Supabase cannot be reached, so a database
 * outage degrades to the last committed copy instead of dropping every blog
 * URL. That only works while the two agree, and editing posts in the dashboard
 * silently drifts them apart.
 *
 * Run this after editing posts in the database, then commit the result.
 *
 * Usage: node scripts/sync-posts-from-db.mjs [--check]
 *   --check  report drift and exit non-zero without writing (for CI)
 */
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");
const postsDir = join(rootDir, "posts");
const checkOnly = process.argv.includes("--check");

/** Read VITE_* credentials from the environment, falling back to .env.local. */
function credentials() {
  let { VITE_SUPABASE_URL: url, VITE_SUPABASE_ANON_KEY: key } = process.env;
  const envFile = join(rootDir, ".env.local");

  if ((!url || !key) && existsSync(envFile)) {
    for (const line of readFileSync(envFile, "utf-8").split("\n")) {
      const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
      if (!match) continue;
      const value = match[2].replace(/^["']|["']$/g, "");
      if (match[1] === "VITE_SUPABASE_URL") url ??= value;
      if (match[1] === "VITE_SUPABASE_ANON_KEY") key ??= value;
    }
  }

  if (!url || !key) {
    console.error("[sync-posts] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not found.");
    process.exit(1);
  }
  return { url, key };
}

/** Frontmatter keys, in the order the existing files use them. */
function frontmatter(post) {
  const data = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    category: post.category ?? "",
    author: post.author ?? "Bless Kimbi",
    date: post.published_at ? new Date(post.published_at).toISOString().split("T")[0] : "",
    imageUrl: post.image_url ?? "",
  };

  // Optional fields are only written when the row actually has them, so a post
  // without a focus keyword does not gain an empty one.
  if (post.read_time) data.readTime = post.read_time;
  if (post.focus_keyword) data.focusKeyword = post.focus_keyword;
  if (post.seo_title) data.seoTitle = post.seo_title;
  if (post.meta_description) data.metaDescription = post.meta_description;
  if (post.tags?.length) data.tags = post.tags;
  if (Array.isArray(post.faqs) && post.faqs.length) data.faqs = post.faqs;

  return data;
}

const { url, key } = credentials();
const supabase = createClient(url, key);

const { data: posts, error } = await supabase
  .from("posts")
  .select("*")
  .eq("status", "published");

if (error) {
  console.error("[sync-posts] Supabase error:", error.message);
  process.exit(1);
}
if (!posts?.length) {
  console.error("[sync-posts] No published posts returned; refusing to empty posts/.");
  process.exit(1);
}

let written = 0;
const drifted = [];

for (const post of posts) {
  const file = join(postsDir, `${post.slug}.md`);
  // Normalise CRLF so the comparison reflects real content, not line endings.
  const body = `\n${(post.content ?? "").replace(/\r\n/g, "\n").trim()}\n`;
  const next = matter.stringify(body, frontmatter(post));

  const current = existsSync(file) ? readFileSync(file, "utf-8").replace(/\r\n/g, "\n") : null;
  if (current === next) continue;

  drifted.push(post.slug);
  if (!checkOnly) {
    writeFileSync(file, next, "utf-8");
    written += 1;
  }
}

const orphans = readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""))
  .filter((slug) => !posts.some((p) => p.slug === slug));

if (checkOnly) {
  if (drifted.length) {
    console.error(`[sync-posts] ${drifted.length} post(s) differ from the database:`);
    drifted.forEach((s) => console.error(`  ${s}`));
    console.error("Run: node scripts/sync-posts-from-db.mjs");
    process.exit(1);
  }
  console.log(`[sync-posts] ${posts.length} post(s) match the database.`);
} else {
  console.log(`[sync-posts] Rewrote ${written} of ${posts.length} post(s).`);
  drifted.forEach((s) => console.log(`  updated ${s}`));
}

if (orphans.length) {
  console.warn(
    `[sync-posts] ${orphans.length} markdown file(s) have no published row and were left alone:`,
  );
  orphans.forEach((s) => console.warn(`  ${s}`));
}
