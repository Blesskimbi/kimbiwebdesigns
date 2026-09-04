import { useEffect, useRef, useState } from "react";
import {
    ArrowLeft, Save, Globe, Trash2, Plus, X, AlertTriangle,
    ChevronDown, Upload, ExternalLink, Check,
} from "lucide-react";
import MarkdownEditor from "@/components/dashboard/MarkdownEditor";
import {
    PostRecord, PostDraft, emptyPost, slugify, slugTaken, readingTime,
    createPost, updatePost, deletePost, uploadImage, REBUILD_ESTIMATE,
} from "@/lib/posts-admin";

const BASE = "https://blesskimbi.com";
const AUTOSAVE_MS = 30_000;

/* ── Small building blocks ──────────────────────────────────────────────── */

const Panel = ({ title, children, defaultOpen = true }: {
    title: string; children: React.ReactNode; defaultOpen?: boolean;
}) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border border-white/10 rounded-xl bg-[#0A0C10] overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white hover:bg-white/[0.03] transition-colors"
            >
                {title}
                <ChevronDown size={15} className={`text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
        </div>
    );
};

const field = "w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600";
const labelCls = "block text-xs font-medium text-gray-400 mb-1.5";

/** Character counter that turns amber outside the range search engines display. */
const Counter = ({ n, min, max }: { n: number; min: number; max: number }) => (
    <span className={`text-[11px] ${n === 0 ? "text-gray-600" : n < min || n > max ? "text-orange-400" : "text-green-400"}`}>
        {n}/{max}
    </span>
);

/* ── Editor ─────────────────────────────────────────────────────────────── */

interface Props {
    post: PostRecord | null;
    onClose: (changed: boolean) => void;
}

const PostEditor = ({ post, onClose }: Props) => {
    const [draft, setDraft] = useState<PostDraft>(post ?? emptyPost());
    const [id, setId] = useState<string | null>(post?.id ?? null);
    const [slugEdited, setSlugEdited] = useState(Boolean(post));
    const [saving, setSaving] = useState(false);
    const [savedAt, setSavedAt] = useState<Date | null>(null);
    const [error, setError] = useState("");
    const [dirty, setDirty] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [uploadingCover, setUploadingCover] = useState(false);
    const [notice, setNotice] = useState("");

    const originalSlug = useRef(post?.slug ?? "");
    const set = <K extends keyof PostDraft>(k: K, v: PostDraft[K]) => {
        setDraft((d) => ({ ...d, [k]: v }));
        setDirty(true);
    };

    /* Title drives the slug until the slug is edited by hand. */
    const onTitle = (title: string) => {
        setDraft((d) => ({ ...d, title, ...(slugEdited ? {} : { slug: slugify(title) }) }));
        setDirty(true);
    };

    /* Warn before losing work to a refresh or a closed tab. */
    useEffect(() => {
        const handler = (e: BeforeUnloadEvent) => {
            if (dirty) { e.preventDefault(); e.returnValue = ""; }
        };
        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [dirty]);

    /* Autosave drafts only — never republish a live post behind the author's back. */
    useEffect(() => {
        if (!dirty || draft.status === "published" || !draft.title.trim()) return;
        const t = setTimeout(() => { void save({ silent: true }); }, AUTOSAVE_MS);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dirty, draft]);

    async function save({ publish = false, silent = false } = {}): Promise<boolean> {
        if (!draft.title.trim()) { setError("A title is required."); return false; }
        if (!draft.content.trim()) { setError("The post has no content."); return false; }

        const slug = (draft.slug || slugify(draft.title)).trim();
        if (!slug) { setError("Could not derive a slug from the title."); return false; }

        setSaving(true);
        setError("");

        try {
            if (await slugTaken(slug, id ?? undefined)) {
                setError(`The slug "${slug}" is already used by another post.`);
                setSaving(false);
                return false;
            }

            const payload: PostDraft = {
                ...draft,
                slug,
                read_time: readingTime(draft.content),
                status: publish ? "published" : draft.status,
                published_at:
                    publish && !draft.published_at ? new Date().toISOString() : draft.published_at,
            };

            const saved = id ? await updatePost(id, payload) : await createPost(payload);
            setId(saved.id);
            setDraft(saved);
            setSavedAt(new Date());
            setDirty(false);
            originalSlug.current = saved.slug;

            if (publish) {
                setNotice(
                    `Published. Readers see it now; it becomes crawlable in ${REBUILD_ESTIMATE} once the site finishes rebuilding.`,
                );
                setTimeout(() => setNotice(""), 12_000);
            }

            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        } finally {
            if (!silent) setSaving(false); else setSaving(false);
        }
    }

    const remove = async () => {
        if (!id) return onClose(false);
        if (!confirm(`Delete "${draft.title}"? This cannot be undone.`)) return;
        await deletePost(id);
        onClose(true);
    };

    const addTag = () => {
        const t = tagInput.trim();
        if (!t) return;
        if (!(draft.tags ?? []).includes(t)) set("tags", [...(draft.tags ?? []), t]);
        setTagInput("");
    };

    const slugChangedOnLive =
        post?.status === "published" && draft.slug !== originalSlug.current && originalSlug.current;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                    onClick={() => {
                        if (dirty && !confirm("You have unsaved changes. Discard them?")) return;
                        onClose(false);
                    }}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} /> All posts
                </button>

                <div className="flex items-center gap-2">
                    {savedAt && !dirty && (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                            <Check size={13} /> Saved {savedAt.toLocaleTimeString()}
                        </span>
                    )}
                    {dirty && <span className="text-xs text-orange-400">Unsaved changes</span>}

                    {id && draft.status === "published" && (
                        <a
                            href={`${BASE}/blog/${draft.slug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            View <ExternalLink size={13} />
                        </a>
                    )}
                    <button
                        onClick={() => save()}
                        disabled={saving}
                        className="flex items-center gap-1.5 text-sm text-white bg-white/10 hover:bg-white/15 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Save size={14} /> {saving ? "Saving…" : "Save draft"}
                    </button>
                    <button
                        onClick={() => save({ publish: true })}
                        disabled={saving}
                        className="flex items-center gap-1.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Globe size={14} /> {draft.status === "published" ? "Update" : "Publish"}
                    </button>
                </div>
            </div>

            {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {error}
                </p>
            )}

            {notice && (
                <p className="text-green-300 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
                    {notice}
                </p>
            )}

            {slugChangedOnLive && (
                <p className="text-orange-300 text-sm bg-orange-500/10 border border-orange-500/20 rounded-lg px-4 py-3 flex gap-2">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <span>
                        You changed the URL of a published post. <b>{BASE}/blog/{originalSlug.current}/</b> will
                        start returning 404 and loses its Google ranking. Only do this if the post has no traffic yet.
                    </span>
                </p>
            )}

            <div className="grid lg:grid-cols-[1fr_320px] gap-5 items-start">
                {/* ── Main column ── */}
                <div className="space-y-4 min-w-0">
                    <input
                        value={draft.title}
                        onChange={(e) => onTitle(e.target.value)}
                        placeholder="Post title"
                        className="w-full bg-transparent text-2xl md:text-3xl font-display font-bold text-white placeholder:text-gray-700 focus:outline-none"
                    />

                    <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                        <span className="shrink-0">{BASE}/blog/</span>
                        <input
                            value={draft.slug}
                            onChange={(e) => { setSlugEdited(true); set("slug", slugify(e.target.value)); }}
                            placeholder="post-slug"
                            className="flex-1 min-w-[160px] bg-black border border-white/10 rounded px-2 py-1 text-gray-300 focus:outline-none focus:border-primary/50"
                        />
                        <span className="shrink-0">/</span>
                    </div>

                    <MarkdownEditor
                        value={draft.content}
                        onChange={(v) => set("content", v)}
                        onUploadImage={(f) => uploadImage(f, "blog")}
                    />
                </div>

                {/* ── Sidebar ── */}
                <div className="space-y-4">
                    <Panel title="Publish">
                        <div>
                            <label className={labelCls}>Status</label>
                            <select
                                value={draft.status}
                                onChange={(e) => set("status", e.target.value as PostDraft["status"])}
                                className={field}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Publish date</label>
                            <input
                                type="date"
                                value={(draft.published_at ?? "").slice(0, 10)}
                                onChange={(e) =>
                                    set("published_at", e.target.value ? new Date(e.target.value).toISOString() : null)
                                }
                                className={field}
                            />
                        </div>
                        {id && (
                            <button
                                onClick={remove}
                                className="w-full flex items-center justify-center gap-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 py-2 rounded-lg transition-colors"
                            >
                                <Trash2 size={14} /> Delete post
                            </button>
                        )}
                    </Panel>

                    <Panel title="Featured image">
                        {draft.image_url ? (
                            <div className="relative group">
                                <img src={draft.image_url} alt="" className="w-full rounded-lg border border-white/10" />
                                <button
                                    onClick={() => set("image_url", null)}
                                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-white/15 rounded-lg py-7 text-gray-500 hover:text-gray-300 hover:border-white/30 cursor-pointer transition-colors">
                                <Upload size={18} />
                                <span className="text-xs">{uploadingCover ? "Uploading…" : "Upload image"}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const f = e.target.files?.[0];
                                        if (!f) return;
                                        setUploadingCover(true);
                                        try { set("image_url", await uploadImage(f, "blog")); }
                                        catch (err) { setError((err as Error).message); }
                                        setUploadingCover(false);
                                    }}
                                />
                            </label>
                        )}
                        <input
                            value={draft.image_url ?? ""}
                            onChange={(e) => set("image_url", e.target.value || null)}
                            placeholder="or paste an image URL"
                            className={field}
                        />
                    </Panel>

                    <Panel title="Organisation">
                        <div>
                            <label className={labelCls}>Category</label>
                            <input
                                value={draft.category ?? ""}
                                onChange={(e) => set("category", e.target.value)}
                                placeholder="e.g. Tech News, Tutorials"
                                className={field}
                                list="post-categories"
                            />
                            <datalist id="post-categories">
                                {["Tech News", "Tutorials", "Web Design", "SEO", "Business", "My Process"].map((c) => (
                                    <option key={c} value={c} />
                                ))}
                            </datalist>
                        </div>
                        <div>
                            <label className={labelCls}>Tags</label>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {(draft.tags ?? []).map((t) => (
                                    <span key={t} className="inline-flex items-center gap-1 bg-white/10 text-gray-200 text-xs px-2 py-1 rounded">
                                        {t}
                                        <button onClick={() => set("tags", (draft.tags ?? []).filter((x) => x !== t))}>
                                            <X size={11} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-1.5">
                                <input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                                    placeholder="Add a tag and press Enter"
                                    className={field}
                                />
                                <button onClick={addTag} className="px-2 rounded-lg bg-white/10 hover:bg-white/15 text-gray-300">
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className={labelCls}>Excerpt</label>
                            <textarea
                                value={draft.excerpt ?? ""}
                                onChange={(e) => set("excerpt", e.target.value)}
                                rows={3}
                                placeholder="One or two sentences shown in the blog list."
                                className={field + " resize-y"}
                            />
                        </div>
                    </Panel>

                    <Panel title="SEO" defaultOpen={false}>
                        {/* How the post will actually look in Google. */}
                        <div className="bg-white rounded-lg p-3 mb-1">
                            <p className="text-[#1a0dab] text-sm leading-snug truncate">
                                {draft.seo_title || draft.title || "Post title"}
                            </p>
                            <p className="text-[#006621] text-[11px] truncate">{BASE}/blog/{draft.slug || "post-slug"}/</p>
                            <p className="text-[#545454] text-[11px] leading-snug line-clamp-2">
                                {draft.meta_description || draft.excerpt || "Meta description appears here."}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className={labelCls}>SEO title</label>
                                <Counter n={(draft.seo_title ?? "").length} min={30} max={60} />
                            </div>
                            <input
                                value={draft.seo_title ?? ""}
                                onChange={(e) => set("seo_title", e.target.value)}
                                placeholder={draft.title || "Defaults to the post title"}
                                className={field}
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className={labelCls}>Meta description</label>
                                <Counter n={(draft.meta_description ?? "").length} min={70} max={160} />
                            </div>
                            <textarea
                                value={draft.meta_description ?? ""}
                                onChange={(e) => set("meta_description", e.target.value)}
                                rows={3}
                                placeholder="Defaults to the excerpt"
                                className={field + " resize-y"}
                            />
                        </div>
                        <div>
                            <label className={labelCls}>Focus keyword</label>
                            <input
                                value={draft.focus_keyword ?? ""}
                                onChange={(e) => set("focus_keyword", e.target.value)}
                                placeholder="e.g. web design cameroon"
                                className={field}
                            />
                            {draft.focus_keyword && (
                                <p className="text-[11px] mt-1.5 text-gray-500">
                                    In title: {draft.title.toLowerCase().includes(draft.focus_keyword.toLowerCase()) ? "✅" : "❌"}
                                    {"  ·  "}
                                    In content: {draft.content.toLowerCase().includes(draft.focus_keyword.toLowerCase()) ? "✅" : "❌"}
                                </p>
                            )}
                        </div>
                    </Panel>

                    <Panel title={`FAQs (${(draft.faqs ?? []).length})`} defaultOpen={false}>
                        <p className="text-[11px] text-gray-500 -mt-1">
                            Rendered on the post and emitted as FAQ schema, which can win rich results.
                        </p>
                        {(draft.faqs ?? []).map((f, i) => (
                            <div key={i} className="space-y-1.5 border border-white/10 rounded-lg p-2.5">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-gray-500">Question {i + 1}</span>
                                    <button onClick={() => set("faqs", (draft.faqs ?? []).filter((_, j) => j !== i))}>
                                        <X size={12} className="text-gray-500 hover:text-red-400" />
                                    </button>
                                </div>
                                <input
                                    value={f.q}
                                    onChange={(e) => set("faqs", (draft.faqs ?? []).map((x, j) => j === i ? { ...x, q: e.target.value } : x))}
                                    placeholder="Question"
                                    className={field}
                                />
                                <textarea
                                    value={f.a}
                                    onChange={(e) => set("faqs", (draft.faqs ?? []).map((x, j) => j === i ? { ...x, a: e.target.value } : x))}
                                    placeholder="Answer"
                                    rows={3}
                                    className={field + " resize-y"}
                                />
                            </div>
                        ))}
                        <button
                            onClick={() => set("faqs", [...(draft.faqs ?? []), { q: "", a: "" }])}
                            className="w-full flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-white border border-dashed border-white/15 hover:border-white/30 py-2 rounded-lg transition-colors"
                        >
                            <Plus size={14} /> Add FAQ
                        </button>
                    </Panel>
                </div>
            </div>
        </div>
    );
};

export default PostEditor;
