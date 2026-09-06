import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { Heading } from "@/components/MarkdownContent";

/**
 * Sticky table of contents for a blog post.
 *
 * Headings come from extractHeadings, which reads the markdown rather than the
 * DOM, so the list is right on the first render instead of appearing once the
 * article has mounted.
 *
 * The active item is worked out by reading heading positions rather than with
 * an IntersectionObserver: a long section can fill the whole screen, leaving no
 * heading inside the observer band and the highlight blank. Reads are throttled
 * to one per animation frame, since Lenis drives scrolling here and layout reads
 * on every scroll event are how a page starts to feel heavy.
 */

/** Sits below the fixed navbar so a jumped-to heading is not hidden behind it. */
const SCROLL_OFFSET = 100;

interface Props {
  headings: Heading[];
  /** Rendered as a collapsed panel above the article on small screens. */
  collapsible?: boolean;
}

const TableOfContents = ({ headings, collapsible = false }: Props) => {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(!collapsible);

  useEffect(() => {
    if (headings.length === 0) return;

    // An IntersectionObserver only reports headings inside its band, so when
    // a long section fills the screen no heading qualifies and the highlight
    // drops out. Reading positions directly always has an answer: the last
    // heading that has passed the reading line.
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = SCROLL_OFFSET + 20;
      let current = headings[0].id;

      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top > line) break;
        current = id;
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    // Throttled to one read per frame, so a smooth scroll does not queue
    // hundreds of layout reads behind it.
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [headings]);

  if (headings.length < 3) return null; // a two item list is just clutter

  const jumpTo = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);

    // Update the address bar without triggering the browser's own jump, so the
    // link is shareable and lands in the right place.
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav className="internal-card" aria-label="Table of contents">
      <button
        type="button"
        onClick={() => collapsible && setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2 text-navy ${collapsible ? "cursor-pointer" : "cursor-default"}`}
        aria-expanded={open}
      >
        <span className="font-display font-bold text-lg flex items-center gap-2">
          <List size={18} className="text-primary" />
          Table of Contents
        </span>
        {collapsible && (
          <span className="text-muted-foreground text-xl leading-none">{open ? "−" : "+"}</span>
        )}
      </button>

      {open && (
        <ol className="mt-4 space-y-1 border-t border-border pt-4">
          {headings.map(({ id, text, level }) => {
            const active = id === activeId;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={jumpTo(id)}
                  className={[
                    "block text-sm font-body leading-snug py-1.5 border-l-2 transition-colors",
                    level === 3 ? "pl-6" : "pl-3",
                    active
                      ? "border-primary text-primary font-semibold"
                      : "border-transparent text-muted-foreground hover:text-navy hover:border-border",
                  ].join(" ")}
                  aria-current={active ? "location" : undefined}
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </nav>
  );
};

export default TableOfContents;
