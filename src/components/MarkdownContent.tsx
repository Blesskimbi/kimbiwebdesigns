import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import BlogImageCarousel from "@/components/BlogImageCarousel";


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
        return <p>{children}</p>;
    },
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
