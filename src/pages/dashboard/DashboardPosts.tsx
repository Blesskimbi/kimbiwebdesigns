import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Copy, Pencil, ExternalLink, FileText, RefreshCw } from "lucide-react";
import PostEditor from "./PostEditor";
import { PostRecord, listPosts, duplicatePost } from "@/lib/posts-admin";

const BASE = "https://blesskimbi.com";

const StatusPill = ({ status }: { status: PostRecord["status"] }) => (
    <span
        className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
            status === "published"
                ? "bg-green-500/15 text-green-400"
                : "bg-orange-500/15 text-orange-400"
        }`}
    >
        {status === "published" ? "Published" : "Draft"}
    </span>
);

const DashboardPosts = () => {
    const [posts, setPosts] = useState<PostRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
    const [editing, setEditing] = useState<PostRecord | null | undefined>(undefined);

    const load = async () => {
        setLoading(true);
        try {
            setPosts(await listPosts());
            setError("");
        } catch (err) {
            setError((err as Error).message);
        }
        setLoading(false);
    };

    useEffect(() => { void load(); }, []);

    const shown = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts
            .filter((p) => filter === "all" || p.status === filter)
            .filter(
                (p) =>
                    !q ||
                    p.title.toLowerCase().includes(q) ||
                    p.slug.includes(q) ||
                    (p.category ?? "").toLowerCase().includes(q) ||
                    (p.tags ?? []).some((t) => t.toLowerCase().includes(q)),
            );
    }, [posts, query, filter]);

    // `undefined` means the list; `null` means a new post; a record means edit.
    if (editing !== undefined) {
        return (
            <PostEditor
                post={editing}
                onClose={() => { setEditing(undefined); void load(); }}
            />
        );
    }

    const counts = {
        all: posts.length,
        published: posts.filter((p) => p.status === "published").length,
        draft: posts.filter((p) => p.status === "draft").length,
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                    <h1 className="font-display font-bold text-xl text-white">Posts</h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {counts.published} published · {counts.draft} draft{counts.draft === 1 ? "" : "s"}
                    </p>
                </div>
                <button
                    onClick={() => setEditing(null)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={15} /> New post
                </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search title, slug, category or tag…"
                        className="w-full bg-black border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 placeholder:text-gray-600"
                    />
                </div>
                {(["all", "published", "draft"] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`text-xs px-3 py-2 rounded-lg capitalize transition-colors ${
                            filter === f ? "bg-primary text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                    >
                        {f} ({counts[f]})
                    </button>
                ))}
                <button
                    onClick={load}
                    title="Refresh"
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center transition-colors"
                >
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</p>
            )}

            {loading ? (
                <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : shown.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                    <FileText size={28} className="mx-auto text-gray-600 mb-3" />
                    <p className="text-gray-400 text-sm">
                        {posts.length === 0 ? "No posts yet." : "No posts match that search."}
                    </p>
                </div>
            ) : (
                <div className="border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5">
                    {shown.map((p) => (
                        <div key={p.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors group">
                            <button onClick={() => setEditing(p)} className="flex-1 min-w-0 text-left">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-white truncate">{p.title}</span>
                                    <StatusPill status={p.status} />
                                </div>
                                <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                                    /{p.slug}
                                    {p.category && ` · ${p.category}`}
                                    {p.published_at && ` · ${new Date(p.published_at).toLocaleDateString()}`}
                                    {p.read_time && ` · ${p.read_time}`}
                                </p>
                            </button>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                {p.status === "published" && (
                                    <a
                                        href={`${BASE}/blog/${p.slug}/`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="View live"
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
                                    >
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                                <button
                                    title="Duplicate as draft"
                                    onClick={async () => { await duplicatePost(p); void load(); }}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
                                >
                                    <Copy size={14} />
                                </button>
                                <button
                                    title="Edit"
                                    onClick={() => setEditing(p)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
                                >
                                    <Pencil size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardPosts;
