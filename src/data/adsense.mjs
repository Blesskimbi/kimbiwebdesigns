/**
 * AdSense account and ad unit IDs.
 *
 * Two things read this file: src/lib/ads.ts, which the blog components use,
 * and scripts/gen-routes.mjs, which writes dist/ads.txt from the publisher ID.
 * Plain .mjs so the Node build script can import it directly, same as
 * cities.mjs.
 *
 * These are committed rather than kept in environment variables. None of them
 * is a secret: the publisher ID is published in /ads.txt and in Google's
 * public sellers.json by design, and every slot ID is visible in the page
 * source of any site running the unit. Putting them here means adding an ad
 * unit is one edit in one file, with no chance of a Vercel variable being set
 * on Production but forgotten on Preview — which would silently ship a build
 * with no ads and no ads.txt.
 *
 * TO ADD A UNIT: create it in AdSense (Ads → By ad unit), then paste the
 * data-ad-slot number from the generated snippet below. An empty string means
 * that position renders nothing, so half-configured is a safe state.
 */

/** Account publisher ID, including the "ca-" prefix the ad tags expect. */
export const AD_CLIENT = "ca-pub-1560258804655026";

export const AD_SLOTS = {
  /** In-article unit. Above the article body, under the cover image. */
  articleTop: "",
  /** In-article unit. After the mid-post call to action. */
  articleMid: "",
  /** Display unit, vertical. Sticky sidebar rail — desktop only. */
  sidebar: "",
  /** Display unit, responsive. On /blog/, after the third card. */
  feed: "",
};
