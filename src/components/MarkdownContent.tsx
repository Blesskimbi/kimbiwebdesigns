import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import BlogImageCarousel from "@/components/BlogImageCarousel";
import { Flag, X, Check, AlertTriangle, Info } from "lucide-react";


/**
 * The single markdown renderer for the site.
 *
 * The dashboard editor's live preview uses this same component, so what you
 * see while writing is what publishes — a preview that renders differently
 * from the real page is worse than no preview.
 *
 * rehypeHighlight adds syntax highlighting to fenced code blocks. It runs
 * after rehypeRaw so inline HTML in older posts still works.
 */

/** Stable id for a heading, used for anchor links and the table of contents. */
export const slugifyHeading = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

const textOf = (children: React.ReactNode): string =>
    React.Children.toArray(children)
        .map((c) => {
            if (typeof c === "string" || typeof c === "number") return String(c);
            if (React.isValidElement(c)) return textOf((c.props as { children?: React.ReactNode }).children);
            return "";
        })
        .join("");

/** Extracts h2/h3 headings so a post can render a table of contents. */
export interface Heading { level: 2 | 3; text: string; id: string; }

export const extractHeadings = (markdown: string): Heading[] => {
    const out: Heading[] = [];
    let inFence = false;

    for (const line of markdown.split("\n")) {
        // Headings inside fenced code are comments, not headings.
        if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
        if (inFence) continue;

        const m = line.match(/^(#{1,3})\s+(.*)$/);
        if (!m) continue;

        const text = m[2].replace(/[*_`]/g, "").trim();
        // A markdown # is demoted to h2 on the page, so it counts as a top-level heading.
        const level = m[1].length === 3 ? 3 : 2;
        out.push({ level: level as 2 | 3, text, id: slugifyHeading(text) });
    }
    return out;
};

/**
 * Splits a post in two at the h2 nearest its middle, so a call to action can
 * sit in the flow of the article rather than only in a sidebar a phone never
 * shows.
 *
 * Returns the whole post and an empty tail when there is no sensible break:
 * short posts, or posts whose only headings are bunched at one end. A CTA
 * wedged two paragraphs from the end is worse than none.
 */
export const splitAtMidHeading = (markdown: string): [string, string] => {
    const MIN_LENGTH = 3000;
    if (markdown.length < MIN_LENGTH) return [markdown, ""];

    const lines = markdown.split("\n");
    const total = markdown.length;
    let inFence = false;
    let chars = 0;
    let bestLine = -1;
    let bestDistance = Infinity;

    lines.forEach((line, i) => {
        if (/^\s*```/.test(line)) inFence = !inFence;

        if (!inFence && /^##\s+/.test(line)) {
            const distance = Math.abs(chars - total / 2);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestLine = i;
            }
        }
        chars += line.length + 1;
    });

    // Refuse a break that lands in the first or last quarter of the post.
    if (bestLine <= 0 || bestDistance > total * 0.25) return [markdown, ""];

    return [lines.slice(0, bestLine).join("\n").trimEnd(), lines.slice(bestLine).join("\n")];
};

type MdProps = { children?: React.ReactNode };

const heading = (Tag: "h2" | "h3", className: string) =>
    function Heading({ children }: MdProps) {
        const id = slugifyHeading(textOf(children));
        return (
            <Tag id={id} className={`scroll-mt-24 group ${className}`}>
                {children}
                <a
                    href={`#${id}`}
                    aria-label="Link to this section"
                    className="ml-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity no-underline"
                >
                    #
                </a>
            </Tag>
        );
    };

/**
 * Emoji that older posts use as bullets, and the icon each becomes.
 *
 * Posts were written with characters like a red flag or a cross at the start of
 * a line. They render as whatever emoji font the reader's device happens to
 * ship, which is a sticker on one phone and a flat glyph on another, and they
 * never match the rest of the page. Swapping them for the icon set the site
 * already uses keeps a line looking the same everywhere.
 *
 * Done at render rather than by rewriting the posts, so it covers anything
 * written later without another pass over the database.
 */
const EMOJI_ICONS: Record<string, { Icon: typeof Flag; className: string; label: string }> = {
    "🚩": { Icon: Flag, className: "text-red-500", label: "Warning sign" },
    "❌": { Icon: X, className: "text-red-500", label: "Not this" },
    "✅": { Icon: Check, className: "text-green-600", label: "Yes" },
    "⚠️": { Icon: AlertTriangle, className: "text-amber-500", label: "Caution" },
    "ℹ️": { Icon: Info, className: "text-primary", label: "Note" },
};

/**
 * Replaces a leading emoji marker with the matching icon.
 *
 * Only the first text node is examined, and only its start, so an emoji used
 * mid-sentence is left alone. Returns the children unchanged when there is no
 * marker, which is the common case.
 */
const withLeadingIcon = (children: React.ReactNode): React.ReactNode => {
    const nodes = React.Children.toArray(children);
    const first = nodes[0];
    if (typeof first !== "string") return children;

    const trimmed = first.trimStart();
    const key = Object.keys(EMOJI_ICONS).find((emoji) => trimmed.startsWith(emoji));
    if (!key) return children;

    const { Icon, className, label } = EMOJI_ICONS[key];
    const remainder = trimmed.slice(key.length).trimStart();

    return [
        <Icon
            key="marker"
            size={16}
            className={`inline-block shrink-0 mr-2 -mt-0.5 align-text-bottom ${className}`}
            aria-label={label}
        />,
        remainder,
        ...nodes.slice(1),
    ];
};

const components = {
    // Markdown # is demoted to h2 — the page title is already the only h1.
    h1: heading("h2", "font-display font-bold text-xl md:text-2xl lg:text-3xl text-navy mt-8 mb-4 border-b border-border pb-2"),
    h2: heading("h2", "font-display font-bold text-xl md:text-2xl text-navy mt-8 mb-4"),
    h3: heading("h3", "font-display font-bold text-lg md:text-xl text-navy mt-6 mb-3"),

    table: ({ children }: MdProps) => (
        <div className="overflow-x-auto my-4 md:my-6">
            <table className="w-full text-sm border-collapse border border-border rounded-xl overflow-hidden">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }: MdProps) => <thead className="bg-muted">{children}</thead>,
    th: ({ children }: MdProps) => (
        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-navy font-semibold border-b border-border bg-muted">
            {children}
        </th>
    ),
    td: ({ children }: MdProps) => (
        <td className="px-2 md:px-4 py-2 md:py-3 text-muted-foreground whitespace-nowrap font-body">{children}</td>
    ),

    /* Image-only paragraphs become a carousel; everything else stays a paragraph. */
    p: ({ children }: MdProps) => {
        const arr = React.Children.toArray(children);
        const imgs = arr.filter(
            (c): c is React.ReactElement => React.isValidElement(c) && c.type === "img",
        );
        const rest = arr.filter(
            (c) =>
                !(React.isValidElement(c) && c.type === "img") &&
                !(typeof c === "string" && c.trim() === ""),
        );
        if (imgs.length > 0 && rest.length === 0) {
            return (
                <BlogImageCarousel
                    images={imgs.map((img) => ({
                        src: (img.props as { src: string }).src,
                        alt: (img.props as { alt?: string }).alt || "",
                    }))}
                />
            );
        }
        return <p>{withLeadingIcon(children)}</p>;
    },

    li: ({ children }: MdProps) => <li>{withLeadingIcon(children)}</li>,
};

interface MarkdownContentProps {
    children: string;
    className?: string;
}

const MarkdownContent = ({ children, className = "prose-blog" }: MarkdownContentProps) => {
    // react-markdown re-parses on every render; the plugin arrays shouldn't churn too.
    const remarkPlugins = useMemo(() => [remarkGfm], []);
    const rehypePlugins = useMemo(
        () => [rehypeRaw, [rehypeHighlight, { detect: false, ignoreMissing: true }]],
        [],
    );

    return (
        <div className={className}>
            <ReactMarkdown
                remarkPlugins={remarkPlugins}
                rehypePlugins={rehypePlugins as never}
                components={components as object}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownContent;
