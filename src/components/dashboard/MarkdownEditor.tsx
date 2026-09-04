import { useRef, useState } from "react";
import {
    Bold, Italic, Heading2, Heading3, List, ListOrdered, Link2,
    Code, Quote, Image as ImageIcon, Table, Eye, Columns2, PenLine,
} from "lucide-react";
import MarkdownContent from "@/components/MarkdownContent";
import { wordCount, readingTime } from "@/lib/posts-admin";

/**
 * Markdown editor with a formatting toolbar and live preview.
 *
 * The preview renders through the same MarkdownContent component the public
 * blog uses, so what is on the right is exactly what publishes — including
 * syntax-highlighted code blocks.
 */

type Mode = "write" | "split" | "preview";

interface Props {
    value: string;
    onChange: (v: string) => void;
    onUploadImage?: (file: File) => Promise<string>;
}

const MarkdownEditor = ({ value, onChange, onUploadImage }: Props) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [mode, setMode] = useState<Mode>("split");
    const [uploading, setUploading] = useState(false);

    /** Wraps the selection, or inserts a placeholder when nothing is selected. */
    const surround = (before: string, after = before, placeholder = "text") => {
        const el = ref.current;
        if (!el) return;
        const { selectionStart: s, selectionEnd: e } = el;
        const selected = value.slice(s, e) || placeholder;
        const next = value.slice(0, s) + before + selected + after + value.slice(e);
        onChange(next);
        requestAnimationFrame(() => {
            el.focus();
            el.setSelectionRange(s + before.length, s + before.length + selected.length);
        });
    };

    /** Prefixes each line of the selection — for lists, quotes and headings. */
    const prefixLines = (prefix: string | ((i: number) => string)) => {
        const el = ref.current;
        if (!el) return;
        const { selectionStart: s, selectionEnd: e } = el;
        const start = value.lastIndexOf("\n", s - 1) + 1;
        const block = value.slice(start, e) || "text";
        const next =
            value.slice(0, start) +
            block.split("\n").map((l, i) => (typeof prefix === "string" ? prefix : prefix(i)) + l).join("\n") +
            value.slice(e);
        onChange(next);
        requestAnimationFrame(() => el.focus());
    };

    const insert = (text: string) => {
        const el = ref.current;
        if (!el) return;
        const { selectionStart: s } = el;
        onChange(value.slice(0, s) + text + value.slice(s));
        requestAnimationFrame(() => {
            el.focus();
            el.setSelectionRange(s + text.length, s + text.length);
        });
    };

    const handleImage = async (file: File) => {
        if (!onUploadImage) return;
        setUploading(true);
        try {
            insert(`\n![${file.name.replace(/\.[^.]+$/, "")}](${await onUploadImage(file)})\n`);
        } catch (err) {
            alert(`Upload failed: ${(err as Error).message}`);
        }
        setUploading(false);
    };

    /** Ctrl/Cmd+B and +I, plus Tab for indentation instead of losing focus. */
    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const mod = e.ctrlKey || e.metaKey;
        if (mod && e.key === "b") { e.preventDefault(); surround("**", "**", "bold"); }
        if (mod && e.key === "i") { e.preventDefault(); surround("*", "*", "italic"); }
        if (mod && e.key === "k") { e.preventDefault(); surround("[", "](https://)", "link text"); }
        if (e.key === "Tab") {
            e.preventDefault();
            insert("  ");
        }
    };

    const tools = [
        { icon: Bold, label: "Bold (Ctrl+B)", run: () => surround("**", "**", "bold") },
        { icon: Italic, label: "Italic (Ctrl+I)", run: () => surround("*", "*", "italic") },
        { icon: Heading2, label: "Heading 2", run: () => prefixLines("## ") },
        { icon: Heading3, label: "Heading 3", run: () => prefixLines("### ") },
        { icon: List, label: "Bullet list", run: () => prefixLines("- ") },
        { icon: ListOrdered, label: "Numbered list", run: () => prefixLines((i) => `${i + 1}. `) },
        { icon: Link2, label: "Link (Ctrl+K)", run: () => surround("[", "](https://)", "link text") },
        { icon: Code, label: "Code block", run: () => insert("\n```js\n\n```\n") },
        { icon: Quote, label: "Quote", run: () => prefixLines("> ") },
        { icon: Table, label: "Table", run: () => insert("\n| Column | Column |\n| --- | --- |\n| Cell | Cell |\n") },
    ];

    const words = wordCount(value);

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0A0C10]">
            {/* Toolbar */}
            <div className="flex items-center gap-0.5 flex-wrap px-2 py-2 border-b border-white/10 bg-white/[0.02]">
                {tools.map(({ icon: Icon, label, run }) => (
                    <button
                        key={label}
                        type="button"
                        title={label}
                        onClick={run}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <Icon size={15} />
                    </button>
                ))}

                {onUploadImage && (
                    <label
                        title="Insert image"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <ImageIcon size={15} />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploading}
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleImage(f);
                                e.target.value = "";
                            }}
                        />
                    </label>
                )}

                <div className="ml-auto flex items-center gap-1">
                    {([
                        ["write", PenLine, "Write"],
                        ["split", Columns2, "Split"],
                        ["preview", Eye, "Preview"],
                    ] as const).map(([m, Icon, label]) => (
                        <button
                            key={m}
                            type="button"
                            title={label}
                            onClick={() => setMode(m)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                mode === m ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            <Icon size={15} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Panes */}
            <div className={mode === "split" ? "grid lg:grid-cols-2 divide-x divide-white/10" : ""}>
                {mode !== "preview" && (
                    <textarea
                        ref={ref}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={onKeyDown}
                        spellCheck
                        placeholder={"Write your post in markdown…\n\n## A heading\n\nSome text, then a code block:\n\n```js\nconsole.log('hi')\n```"}
                        className="w-full min-h-[520px] bg-transparent px-4 py-4 text-sm text-gray-100 font-mono leading-relaxed resize-y focus:outline-none placeholder:text-gray-600"
                    />
                )}

                {mode !== "write" && (
                    <div className="min-h-[520px] max-h-[70vh] overflow-y-auto px-5 py-4 bg-white">
                        {value.trim() ? (
                            <MarkdownContent>{value}</MarkdownContent>
                        ) : (
                            <p className="text-muted-foreground text-sm font-body">
                                Nothing to preview yet.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 text-xs text-gray-500 bg-white/[0.02]">
                <span>
                    {words.toLocaleString()} words · {readingTime(value)}
                    {uploading && <span className="ml-3 text-primary">Uploading image…</span>}
                </span>
                <span className="hidden sm:inline">Markdown · Ctrl+B bold · Ctrl+K link</span>
            </div>
        </div>
    );
};

export default MarkdownEditor;
