/**
 * AdSense wiring, deliberately scoped to the blog.
 *
 * The loader script is NOT in index.html. Every route inherits that file, so a
 * tag there would put googlesyndication on the homepage, the service pages and
 * the dashboard — pages that sell work and have no business carrying ads, and
 * that would each pay for the script's connection and its ~80 KB. Instead the
 * first <AdSlot> to mount injects it, which by construction can only happen on
 * the two routes that render one.
 *
 * The account and unit IDs live in src/data/adsense.mjs, shared with the build
 * script that writes ads.txt. This file is only the browser-side behaviour.
 */
import { AD_CLIENT, AD_SLOTS } from "@/data/adsense.mjs";

export { AD_CLIENT };

export type AdPlacement = "article-top" | "article-mid" | "sidebar" | "feed";

interface PlacementConfig {
  slot: string;
  /** AdSense format. "fluid" + in-article layout for units inside prose. */
  format: string;
  layout?: string;
  /** Reserved height, so the ad does not shove the article down when it fills. */
  minHeight: number;
}

export const PLACEMENTS: Record<AdPlacement, PlacementConfig> = {
  "article-top": { slot: AD_SLOTS.articleTop, format: "fluid", layout: "in-article", minHeight: 280 },
  "article-mid": { slot: AD_SLOTS.articleMid, format: "fluid", layout: "in-article", minHeight: 280 },
  sidebar:       { slot: AD_SLOTS.sidebar,    format: "auto",  minHeight: 600 },
  feed:          { slot: AD_SLOTS.feed,       format: "auto",  minHeight: 280 },
};

/**
 * True while the build's headless Chromium is rendering the page.
 *
 * scripts/prerender.mjs writes #root's innerHTML straight into the static HTML,
 * so anything on screen at snapshot time ships to every visitor and every
 * crawler. An ad that had begun to fill would bake a stale iframe and a
 * data-adsbygoogle-status="done" attribute into the file — dead markup that
 * the live script then refuses to fill again, and impressions attributed to a
 * page nobody was looking at. Rendering nothing here keeps ads a client-only
 * concern, which is what Google's own guidance for prerendered pages asks for.
 */
export const isPrerender = () =>
  typeof navigator !== "undefined" &&
  (navigator.webdriver === true || / HeadlessChrome\//.test(navigator.userAgent));

/** A dev server or the prerender's local static server — never the live site. */
export const isLocal = () =>
  typeof location !== "undefined" &&
  (location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname.endsWith(".local"));

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

let loading = false;

/**
 * Adds the AdSense loader once per page load.
 *
 * Called from every slot's effect; the flag makes the second and third calls
 * free. Nothing awaits it: adsbygoogle is an array before the script arrives,
 * pushes queue onto it, and the script drains the queue on load.
 */
export function loadAdsense() {
  if (loading || typeof document === "undefined") return;
  loading = true;

  const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
  if (document.querySelector(`script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}
