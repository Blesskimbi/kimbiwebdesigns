import { useEffect, useState, useCallback, useRef } from "react";
import {
    Plus, Search, Edit2, Trash2, X, Star, EyeOff, Eye,
    ExternalLink, RefreshCw, AlertCircle, ChevronDown, Upload
} from "lucide-react";
import { supabase, SupabaseProject, ProjectInsert } from "@/lib/supabase";

/* ── Helpers ─────────────────────────────────────────────────────────── */
const slugify = (str: string) =>
    str.toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const emptyForm = (): ProjectInsert => ({
    title: "", slug: "", description: "", full_description: "",
    cover_image: "", images: [], tags: [], live_url: "", github_url: "",
    client_name: "", completed_date: "", featured: false, hidden: false,
});

/* ── Delete Confirmation ─────────────────────────────────────────────── */
const DeleteConfirm = ({ title, onConfirm, onCancel, loading }: {
    title: string; onConfirm: () => void; onCancel: () => void; loading: boolean;
}) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
        <div className="bg-[#0A0C10] border border-red-500/20 rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <AlertCircle size={20} className="text-red-400" />
                </div>
                <div>
                    <h3 className="font-display font-bold text-white text-base">Delete Project</h3>
                    <p className="text-gray-400 text-xs mt-0.5">This action cannot be undone.</p>
                </div>
            </div>
            <p className="text-gray-300 text-sm mb-6">
                Are you sure you want to delete <span className="text-white font-semibold">"{title}"</span>?
            </p>
            <div className="flex gap-3">
                <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white text-sm font-medium transition-colors">
                    Cancel
                </button>
                <button onClick={onConfirm} disabled={loading} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-bold transition-colors">
                    {loading ? "Deleting…" : "Delete"}
                </button>
            </div>
        </div>
    </div>
);

/* ── Tag Input ───────────────────────────────────────────────────────── */
const TagInput = ({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) => {
    const [input, setInput] = useState("");
    const add = () => {
        const v = input.trim();
        if (v && !tags.includes(v)) onChange([...tags, v]);
        setInput("");
    };
    return (
        <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                        {tag}
                        <button type="button" onClick={() => onChange(tags.filter(t => t !== tag))} className="hover:text-red-400 transition-colors"><X size={11} /></button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text" value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
                    placeholder="Type tag and press Enter"
                    className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button type="button" onClick={add} className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white transition-colors">
                    Add
                </button>
            </div>
        </div>
    );
};

/* ── Cover Image Upload ──────────────────────────────────────────────── */
const CoverImageUpload = ({ value, onChange }: { value: string; onChange: (url: string) => void }) => {
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const fieldClass = "w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600";

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const ext = file.name.split(".").pop();
        const path = `covers/${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("project-images").upload(path, file, { upsert: true });
        if (error) { alert(error.message); setUploading(false); return; }
        const { data } = supabase.storage.from("project-images").getPublicUrl(path);
        onChange(data.publicUrl);
        setUploading(false);
        e.target.value = "";
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className={fieldClass + " flex-1"}
                    placeholder="Paste URL or upload from PC"
                />
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white transition-colors shrink-0 disabled:opacity-60 flex items-center gap-1.5"
                >
                    {uploading ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />}
                    {uploading ? "Uploading…" : "Upload"}
                </button>
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>
            {value && (
                <img src={value} alt="Cover preview"
                    className="h-28 w-full object-cover rounded-lg border border-white/10"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            )}
        </div>
    );
};

/* ── Images Input ────────────────────────────────────────────────────── */
const ImagesInput = ({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) => {
    const [input, setInput] = useState("");
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const addUrl = () => {
        const v = input.trim();
        if (v) onChange([...images, v]);
        setInput("");
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const ext = file.name.split(".").pop();
        const path = `gallery/${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("project-images").upload(path, file, { upsert: true });
        if (error) { alert(error.message); setUploading(false); return; }
        const { data } = supabase.storage.from("project-images").getPublicUrl(path);
        onChange([...images, data.publicUrl]);
        setUploading(false);
        e.target.value = "";
    };

    return (
        <div className="space-y-2">
            {images.map((img, i) => (
                <div key={i} className="flex items-center gap-2">
                    <img src={img} alt="" className="w-10 h-10 rounded object-cover border border-white/10 shrink-0" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <span className="flex-1 text-xs text-gray-400 truncate">{img}</span>
                    <button type="button" onClick={() => onChange(images.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 transition-colors"><X size={14} /></button>
                </div>
            ))}
            <div className="flex gap-2">
                <input type="text" value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addUrl(); } }}
                    placeholder="Paste URL or press Upload"
                    className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button type="button" onClick={addUrl} className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white transition-colors">Add</button>
                <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white transition-colors flex items-center gap-1.5 disabled:opacity-60">
                    {uploading ? <RefreshCw size={13} className="animate-spin" /> : <Upload size={13} />}
                    {uploading ? "…" : "Upload"}
                </button>
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>
        </div>
    );
};

/* ── Project Form Modal ─────────────────────────────────────────────── */
const ProjectForm = ({ initial, onSave, onCancel, saving }: {
    initial: ProjectInsert | null;
    onSave: (data: ProjectInsert) => void;
    onCancel: () => void;
    saving: boolean;
}) => {
    const [data, setData] = useState<ProjectInsert>(initial ?? emptyForm());
    const [slugEdited, setSlugEdited] = useState(!!initial?.slug);
    const set = (patch: Partial<ProjectInsert>) => setData(prev => ({ ...prev, ...patch }));

    const handleTitle = (v: string) => {
        set({ title: v });
        if (!slugEdited) set({ slug: slugify(v) });
    };

    const handleSlug = (v: string) => {
        setSlugEdited(true);
        set({ slug: slugify(v) });
    };

    const fieldClass = "w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600";
    const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";
    const sectionClass = "bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-4";

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#0A0C10] border border-white/10 rounded-2xl w-full max-w-5xl shadow-2xl my-6 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-7 py-5 border-b border-white/5 sticky top-0 bg-[#0A0C10] rounded-t-2xl z-10">
                    <h2 className="text-xl font-display font-bold text-white">
                        {initial ? "Edit Project" : "New Project"}
                    </h2>
                    <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors p-1"><X size={20} /></button>
                </div>

                <form onSubmit={e => { e.preventDefault(); onSave(data); }} className="p-7">
                    <div className="grid grid-cols-2 gap-6">

                        {/* ── Left column ── */}
                        <div className="space-y-5">

                            {/* Identity */}
                            <div className={sectionClass}>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Identity</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2">
                                        <label className={labelClass}>Project Title *</label>
                                        <input required type="text" value={data.title} onChange={e => handleTitle(e.target.value)}
                                            className={fieldClass} placeholder="e.g. Inguane Hub" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className={labelClass}>Slug *</label>
                                        <input required type="text" value={data.slug ?? ""} onChange={e => handleSlug(e.target.value)}
                                            className={fieldClass} placeholder="auto-generated" />
                                        <p className="text-xs text-gray-500 mt-1">
                                            <span className="text-primary">everythx.com/projects/{data.slug || "your-slug"}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Client Name</label>
                                        <input type="text" value={data.client_name ?? ""} onChange={e => set({ client_name: e.target.value })}
                                            className={fieldClass} placeholder="e.g. Inguane Hub Ltd" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Completed Date</label>
                                        <input type="date" value={data.completed_date ?? ""} onChange={e => set({ completed_date: e.target.value })}
                                            className={fieldClass} />
                                    </div>
                                </div>
                            </div>

                            {/* Links */}
                            <div className={sectionClass}>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Links</h3>
                                <div>
                                    <label className={labelClass}>Live URL</label>
                                    <input type="url" value={data.live_url ?? ""} onChange={e => set({ live_url: e.target.value })}
                                        className={fieldClass} placeholder="https://..." />
                                </div>
                                <div>
                                    <label className={labelClass}>GitHub URL</label>
                                    <input type="url" value={data.github_url ?? ""} onChange={e => set({ github_url: e.target.value })}
                                        className={fieldClass} placeholder="https://github.com/..." />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className={sectionClass}>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tags</h3>
                                <TagInput tags={data.tags ?? []} onChange={tags => set({ tags })} />
                            </div>

                            {/* Visibility */}
                            <div className={sectionClass}>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Visibility</h3>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div onClick={() => set({ featured: !data.featured })}
                                            className={`relative w-11 h-6 rounded-full transition-colors ${data.featured ? "bg-yellow-500" : "bg-white/10"}`}>
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${data.featured ? "translate-x-6" : "translate-x-1"}`} />
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                            Featured <span className="text-xs text-gray-500">(shown first)</span>
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div onClick={() => set({ hidden: !data.hidden })}
                                            className={`relative w-11 h-6 rounded-full transition-colors ${data.hidden ? "bg-red-500" : "bg-white/10"}`}>
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${data.hidden ? "translate-x-6" : "translate-x-1"}`} />
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                            Hidden <span className="text-xs text-gray-500">(not shown publicly)</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* ── Right column ── */}
                        <div className="space-y-5">

                            {/* Descriptions */}
                            <div className={sectionClass}>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Content</h3>
                                <div>
                                    <label className={labelClass}>
                                        Short Description
                                        <span className={`ml-2 text-xs ${(data.description?.length ?? 0) > 140 ? "text-orange-400" : "text-gray-500"}`}>
                                            {data.description?.length ?? 0}/160
                                        </span>
                                    </label>
                                    <textarea required rows={3} maxLength={160}
                                        value={data.description ?? ""}
                                        onChange={e => set({ description: e.target.value })}
                                        className={fieldClass + " resize-none"}
                                        placeholder="One-sentence summary shown on project cards (max 160 chars)" />
                                </div>
                                <div>
                                    <label className={labelClass}>Full Description</label>
                                    <textarea rows={5}
                                        value={data.full_description ?? ""}
                                        onChange={e => set({ full_description: e.target.value })}
                                        className={fieldClass + " resize-none"}
                                        placeholder="Detailed project description shown on the project detail page..." />
                                </div>
                            </div>

                            {/* Images */}
                            <div className={sectionClass}>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Images</h3>
                                <div>
                                    <label className={labelClass}>Cover Image</label>
                                    <CoverImageUpload
                                        value={data.cover_image ?? ""}
                                        onChange={url => set({ cover_image: url })}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Additional Images</label>
                                    <ImagesInput images={data.images ?? []} onChange={imgs => set({ images: imgs })} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-white/5">
                        <button type="button" onClick={onCancel}
                            className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving}
                            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90 disabled:opacity-60 text-white transition-colors shadow-[0_0_15px_rgba(79,142,240,0.3)]">
                            {saving ? "Saving…" : initial ? "Save Changes" : "Create Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/* ── Main Component ─────────────────────────────────────────────────── */
const DashboardProjects = () => {
    const [projects, setProjects]         = useState<SupabaseProject[]>([]);
    const [loading, setLoading]           = useState(true);
    const [error, setError]               = useState<string | null>(null);
    const [search, setSearch]             = useState("");
    const [filter, setFilter]             = useState<"all" | "featured" | "hidden">("all");
    const [showForm, setShowForm]         = useState(false);
    const [editing, setEditing]           = useState<SupabaseProject | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<SupabaseProject | null>(null);
    const [saving, setSaving]             = useState(false);
    const [deleting, setDeleting]         = useState(false);

    /* ── Fetch ── */
    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            setError(error.message);
        } else {
            setProjects(data ?? []);
        }
        setLoading(false);
    }, []);

    useEffect(() => { fetchProjects(); }, [fetchProjects]);

    /* ── Filtered list ── */
    const filtered = projects.filter(p => {
        const q = search.toLowerCase();
        const matchSearch = !q || p.title.toLowerCase().includes(q) ||
            (p.client_name ?? "").toLowerCase().includes(q) ||
            (p.tags ?? []).some(t => t.toLowerCase().includes(q));
        const matchFilter =
            filter === "all" ? true :
            filter === "featured" ? p.featured :
            p.hidden;
        return matchSearch && matchFilter;
    });

    /* ── Save (insert or update) ── */
    const handleSave = async (formData: ProjectInsert) => {
        setSaving(true);
        if (editing) {
            const { error } = await supabase
                .from("projects")
                .update(formData)
                .eq("id", editing.id);
            if (error) { alert(error.message); setSaving(false); return; }
        } else {
            const { error } = await supabase.from("projects").insert(formData);
            if (error) { alert(error.message); setSaving(false); return; }
        }
        setSaving(false);
        setShowForm(false);
        setEditing(null);
        fetchProjects();
    };

    /* ── Delete ── */
    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        const { error } = await supabase.from("projects").delete().eq("id", deleteTarget.id);
        if (error) alert(error.message);
        setDeleting(false);
        setDeleteTarget(null);
        fetchProjects();
    };

    /* ── Quick toggles ── */
    const toggleField = async (project: SupabaseProject, field: "featured" | "hidden") => {
        const newVal = !project[field];
        const { error } = await supabase.from("projects").update({ [field]: newVal }).eq("id", project.id);
        if (!error) setProjects(prev => prev.map(p => p.id === project.id ? { ...p, [field]: newVal } : p));
        else alert(error.message);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-white">Projects</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {projects.length} project{projects.length !== 1 ? "s" : ""} in database
                        {error && <span className="text-red-400 ml-2">· {error}</span>}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchProjects} title="Refresh"
                        className="p-2.5 rounded-lg border border-white/10 bg-white/3 hover:bg-white/8 text-gray-400 hover:text-white transition-colors">
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    </button>
                    <button onClick={() => { setEditing(null); setShowForm(true); }}
                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[0_0_15px_rgba(79,142,240,0.3)] flex items-center gap-2">
                        <Plus size={18} /> Add New Project
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
                <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" placeholder="Search projects…" value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-[#0A0C10] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors w-60" />
                </div>
                <div className="flex gap-2">
                    {(["all", "featured", "hidden"] as const).map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${filter === f ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"}`}>
                            {f === "all" ? `All (${projects.length})` :
                             f === "featured" ? `⭐ Featured (${projects.filter(p => p.featured).length})` :
                             `🙈 Hidden (${projects.filter(p => p.hidden).length})`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-white/5 bg-[#0A0C10] shadow-xl overflow-hidden">
                <div className="overflow-x-auto min-h-[280px]">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="text-xs uppercase bg-white/[0.02] text-gray-500 border-b border-white/5">
                            <tr>
                                <th className="px-5 py-4 font-semibold">Project</th>
                                <th className="px-5 py-4 font-semibold">Tags</th>
                                <th className="px-5 py-4 font-semibold text-center">Featured</th>
                                <th className="px-5 py-4 font-semibold text-center">Hidden</th>
                                <th className="px-5 py-4 font-semibold">Date</th>
                                <th className="px-5 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <tr key={i}>
                                        {Array.from({ length: 6 }).map((_, j) => (
                                            <td key={j} className="px-5 py-4">
                                                <div className="h-4 bg-white/5 rounded animate-pulse" style={{ width: j === 0 ? "140px" : j === 1 ? "100px" : "60px" }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : error ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3 text-gray-500">
                                            <AlertCircle size={32} className="text-red-400/50" />
                                            <p className="text-red-400">{error}</p>
                                            <p className="text-xs">Make sure your .env.local has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY</p>
                                            <button onClick={fetchProjects} className="text-primary hover:underline text-sm">Retry</button>
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center text-gray-500">
                                        {search ? `No projects matching "${search}"` : "No projects yet. Click Add New Project."}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(project => (
                                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {project.cover_image && (
                                                    <img src={project.cover_image} alt=""
                                                        className="w-9 h-9 rounded-lg object-cover border border-white/10 shrink-0"
                                                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                                )}
                                                <div>
                                                    <p className="font-medium text-white">{project.title}</p>
                                                    <p className="text-xs text-gray-500">/{project.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {(project.tags ?? []).slice(0, 3).map(tag => (
                                                    <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-[11px] border border-white/8">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <button onClick={() => toggleField(project, "featured")}
                                                title={project.featured ? "Remove from featured" : "Mark as featured"}
                                                className={`p-1.5 rounded-lg transition-colors ${project.featured ? "text-yellow-400 bg-yellow-500/10" : "text-gray-600 hover:text-yellow-400 hover:bg-yellow-500/10"}`}>
                                                <Star size={16} fill={project.featured ? "currentColor" : "none"} />
                                            </button>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <button onClick={() => toggleField(project, "hidden")}
                                                title={project.hidden ? "Make visible" : "Hide project"}
                                                className={`p-1.5 rounded-lg transition-colors ${project.hidden ? "text-red-400 bg-red-500/10" : "text-gray-600 hover:text-red-400 hover:bg-red-500/10"}`}>
                                                {project.hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 text-xs">
                                            {project.completed_date ?? project.created_at?.slice(0, 10)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {project.live_url && (
                                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                                                        className="p-1.5 text-gray-500 hover:text-primary transition-colors rounded-lg hover:bg-white/5" title="View live">
                                                        <ExternalLink size={15} />
                                                    </a>
                                                )}
                                                <button onClick={() => { setEditing(project); setShowForm(true); }}
                                                    className="p-1.5 text-gray-500 hover:text-primary transition-colors rounded-lg hover:bg-white/5" title="Edit">
                                                    <Edit2 size={15} />
                                                </button>
                                                <button onClick={() => setDeleteTarget(project)}
                                                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10" title="Delete">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <ProjectForm
                    initial={editing ? {
                        title: editing.title, slug: editing.slug,
                        description: editing.description, full_description: editing.full_description,
                        cover_image: editing.cover_image, images: editing.images ?? [],
                        tags: editing.tags ?? [], live_url: editing.live_url, github_url: editing.github_url,
                        client_name: editing.client_name, completed_date: editing.completed_date,
                        featured: editing.featured, hidden: editing.hidden,
                    } : null}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditing(null); }}
                    saving={saving}
                />
            )}

            {/* Delete Confirm */}
            {deleteTarget && (
                <DeleteConfirm
                    title={deleteTarget.title}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                    loading={deleting}
                />
            )}
        </div>
    );
};

export default DashboardProjects;
