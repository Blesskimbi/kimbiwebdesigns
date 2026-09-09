import { useEffect, useRef } from "react";

import {
  AD_CLIENT,
  AdPlacement,
  PLACEMENTS,
  isLocal,
  isPrerender,
  loadAdsense,
} from "@/lib/ads";

interface Props {
  placement: AdPlacement;
  /** Extra spacing/width classes for the wrapper, per position. */
  className?: string;
}

/**
 * One AdSense unit.
 *
 * Only ever rendered from BlogPage and BlogPostPage — see src/lib/ads.ts for
 * why the loader script is not in index.html.
 *
 * Four outcomes, in order:
 *   prerendering  → nothing, so no ad markup is frozen into the static HTML
 *   no slot ID    → nothing, so a position whose unit has not been created
 *                   in AdSense yet leaves the page exactly as it was
 *   dev server    → a labelled outline, so the layout can be judged without
 *                   requesting ads on a site AdSense has not approved
 *   localhost     → nothing (`npm run preview`, and the prerender's own static
 *                   server): a production build must not request ads off the
 *                   live domain, and must not have a placeholder to snapshot
 *   live          → the real unit
 */
const AdSlot = ({ placement, className = "" }: Props) => {
  const ref = useRef<HTMLModElement>(null);
  // React can run an effect twice for one mount. A second push against an <ins>
  // that already has an ad throws and, worse, leaves the unit blank.
  const pushed = useRef(false);

  const { slot, format, layout, minHeight } = PLACEMENTS[placement];
  const configured = Boolean(AD_CLIENT && slot);
  // The dev-only outline. Keyed off DEV rather than isLocal() because the
  // prerender serves the production build from 127.0.0.1 — a placeholder
  // reachable there would be snapshotted straight into the shipped HTML.
  const preview = import.meta.env.DEV;
  const live = configured && !preview && !isPrerender() && !isLocal();

  useEffect(() => {
    if (!live || pushed.current) return;
    // Set by the AdSense script itself once it has claimed the element.
    if (ref.current?.dataset.adsbygoogleStatus) return;

    loadAdsense();
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // A blocked or failed loader is not worth breaking the article over.
    }
  }, [live]);

  if (!configured || isPrerender()) return null;
  if (!live && !preview) return null;

  return (
    <div
      className={`not-prose my-8 md:my-10 ${className}`}
      // Reserving the height up front keeps the ad from pushing the text it
      // sits between down the page when it fills a second or two later.
      style={{ minHeight }}
    >
      <span className="block mb-2 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-body">
        Advertisement
      </span>

      {live ? (
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          {...(layout ? { "data-ad-layout": layout } : {})}
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground/70 font-body"
          style={{ minHeight }}
        >
          Ad slot &middot; {placement}
        </div>
      )}
    </div>
  );
};

export default AdSlot;
