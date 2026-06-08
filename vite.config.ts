import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";
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

const staticRoutes = [
  { url: "/services" },
  { url: "/projects" },
  { url: "/blog"     },
  { url: "/contact"  },
];

const blogRoutes = blogSlugs.map((slug) => ({
  url: `/blog/${slug}`,
  changefreq: "weekly" as const,
  priority: 0.7,
}));

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
      dynamicRoutes: [...staticRoutes.map((r) => r.url), ...blogRoutes.map((r) => r.url)],
      generateRobotsTxt: false,
    }),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));
