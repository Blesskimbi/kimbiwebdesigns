import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import imageminWebp from "imagemin-webp";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import fs from "fs";
import matter from "gray-matter";

// Dynamically collect blog post slugs from /posts/*.md
function getBlogSlugs(): string[] {
  const postsDir = path.resolve(__dirname, "posts");
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(postsDir, f), "utf-8");
      const { data } = matter(raw);
      return data.slug || f.replace(".md", "");
    });
}

const blogSlugs = getBlogSlugs();

const allRoutes = [
  { url: "/",         changefreq: "weekly"  as const, priority: 1.0 },
  { url: "/services", changefreq: "monthly" as const, priority: 0.9 },
  { url: "/projects", changefreq: "monthly" as const, priority: 0.8 },
  { url: "/blog",     changefreq: "daily"   as const, priority: 0.8 },
  { url: "/contact",  changefreq: "monthly" as const, priority: 0.7 },
  ...blogSlugs.map((slug) => ({
    url: `/blog/${slug}`,
    changefreq: "weekly" as const,
    priority: 0.7,
  })),
];

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemap({
      hostname: "https://everythx.com",
      dynamicRoutes: allRoutes.map((r) => r.url),
      generateRobotsTxt: false,
    }),
    // ── Image optimisation: auto-convert to WebP on every build ──────────
    // Only run during production builds to keep dev server fast
    mode === "production" && viteImagemin({
      plugins: {
        // Convert JPG/PNG → WebP (highest quality compression)
        jpg: imageminMozjpeg({ quality: 82 }),
        png: imageminPngquant({ quality: [0.7, 0.9], speed: 1 }),
        svg: imageminSvgo({ plugins: [{ name: "preset-default" }] }),
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp({ quality: 82 }),
          png: imageminWebp({ quality: 82 }),
        },
        // skipIfLarger: keep original if WebP is actually bigger
        skipIfLargerThan: "optimized",
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react":    ["react", "react-dom", "react-router-dom"],
          "vendor-ui":       ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tooltip"],
          "vendor-gsap":     ["gsap"],
          "vendor-md":       ["react-markdown", "remark-gfm", "rehype-raw", "gray-matter"],
          "vendor-embla":    ["embla-carousel-react"],
          "vendor-query":    ["@tanstack/react-query"],
          "vendor-supabase": ["@supabase/supabase-js"],
        },
      },
    },
    cssMinify: true,
    chunkSizeWarningLimit: 600,
  },
}));
