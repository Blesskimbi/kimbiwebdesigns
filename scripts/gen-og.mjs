/**
 * Generates a 1200×630 truecolor PNG og-image using sharp.
 * Usage:
 *   node scripts/gen-og.mjs              → public/og-image.png
 *   node scripts/gen-og.mjs dist/og-image.png  → post-build copy (skips pngquant)
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(
  __dirname,
  "..",
  process.argv[2] ?? "public/og-image.png",
);

// Build the SVG in memory and rasterise it with sharp
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#0a0c10"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#4f8ef0"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="250" width="6" height="130" rx="3" fill="url(#acc)"/>
  <text x="116" y="318" font-family="Arial,sans-serif" font-size="72" font-weight="800" fill="#ffffff" letter-spacing="-2">Bless Kimbi</text>
  <text x="116" y="368" font-family="Arial,sans-serif" font-size="30" font-weight="400" fill="#94a3b8">Web Designer &amp; Developer — Yaoundé, Cameroon</text>
  <text x="116" y="430" font-family="Arial,sans-serif" font-size="22" fill="#64748b">Fast · Modern · SEO-Optimised Websites for Businesses in Africa</text>
  <text x="116" y="540" font-family="Arial,sans-serif" font-size="22" font-weight="600" fill="#4f8ef0">everythx.com</text>
  <circle cx="1060" cy="315" r="190" fill="none" stroke="#4f8ef0" stroke-width="1" opacity="0.12"/>
  <circle cx="1060" cy="315" r="130" fill="none" stroke="#4f8ef0" stroke-width="1" opacity="0.08"/>
  <circle cx="1060" cy="315" r="70"  fill="none" stroke="#7c3aed" stroke-width="1" opacity="0.18"/>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 6, palette: false })
  .toFile(outPath);

const meta = await sharp(outPath).metadata();
console.log(`og-image.png written to ${outPath} (${meta.width}×${meta.height}, ${meta.format})`);
