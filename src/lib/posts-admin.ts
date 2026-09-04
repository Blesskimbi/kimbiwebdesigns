import { supabase } from "./supabase";

/**
 * Dashboard-side post access.
 *
 * Kept separate from lib/blog.ts, which is the public read path and only ever
 * sees published rows. These queries return drafts too, which row-level
 * security permits only for an authenticated session.
 */

export interface PostRecord {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    category: string | null;
    author: string | null;
    image_url: string | null;
    tags: string[] | null;
    faqs: { q: string; a: string }[] | null;
    seo_title: string | null;
    meta_description: string | null;
    focus_keyword: string | null;
    read_time: string | null;
    status: "draft" | "published";
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export type PostDraft = Omit<PostRecord, "id" | "created_at" | "updated_at">;

export const emptyPost = (): PostDraft => ({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Bless Kimbi",
    image_url: null,
    tags: [],
    faqs: [],
    seo_title: "",
    meta_description: "",
    focus_keyword: "",
    read_time: null,
    status: "draft",
    published_at: null,
});

/* ── Derived values ─────────────────────────────────────────────────────── */

/** URL-safe slug from a title. Matches the slugs the existing posts use. */
export const slugify = (title: string): string =>
    title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "") // strip accents, so "Yaoundé" -> "yaounde"
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 80);

/** Words outside fenced code — code samples shouldn't inflate reading time. */
export const wordCount = (markdown: string): number => {
    const prose = markdown.replace(/```[\s\S]*?```/g, " ");
    return prose.split(/\s+/).filter(Boolean).length;
};

/** 200 wpm is the usual assumption for technical prose. */
export const readingTime = (markdown: string): string =>
    `${Math.max(1, Math.round(wordCount(markdown) / 200))} min read`;

/* ── Queries ────────────────────────────────────────────────────────────── */

export async function listPosts(): Promise<PostRecord[]> {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("updated_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as PostRecord[];
}

export async function getPost(id: string): Promise<PostRecord | null> {
    const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
    if (error) throw new Error(error.message);
    return (data as PostRecord) ?? null;
}

/** True when another post already owns this slug — slugs are unique. */
export async function slugTaken(slug: string, exceptId?: string): Promise<boolean> {
    let query = supabase.from("posts").select("id").eq("slug", slug);
    if (exceptId) query = query.neq("id", exceptId);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return (data ?? []).length > 0;
}

export async function createPost(draft: PostDraft): Promise<PostRecord> {
    const { data, error } = await supabase.from("posts").insert(draft).select().single();
    if (error) throw new Error(error.message);
    return data as PostRecord;
}

export async function updatePost(id: string, patch: Partial<PostDraft>): Promise<PostRecord> {
    const { data, error } = await supabase
        .from("posts")
        .update(patch)
        .eq("id", id)
        .select()
        .single();
    if (error) throw new Error(error.message);
    return data as PostRecord;
}

export async function deletePost(id: string): Promise<void> {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) throw new Error(error.message);
}

/** Copies a post as a fresh draft — handy for series that share a structure. */
export async function duplicatePost(post: PostRecord): Promise<PostRecord> {
    let slug = `${post.slug}-copy`;
    let n = 2;
    while (await slugTaken(slug)) slug = `${post.slug}-copy-${n++}`;

    return createPost({
        ...post,
        id: undefined as never,
        title: `${post.title} (copy)`,
        slug,
        status: "draft",
        published_at: null,
    } as PostDraft);
}

/* ── Publishing ─────────────────────────────────────────────────────────── */

/**
 * Asks Vercel to rebuild, so the new post gets its own static HTML with the
 * right canonical and lands in the sitemap. Without this the post is live to
 * visitors but, to a crawler, still carries the homepage's metadata.
 *
 * Fire-and-forget: a failed hook must not lose the author's work, and the
 * post is already saved by the time this runs.
 */
export async function triggerRebuild(): Promise<boolean> {
    const hook = import.meta.env.VITE_DEPLOY_HOOK_URL as string | undefined;
    if (!hook) {
        console.warn("[posts] VITE_DEPLOY_HOOK_URL not set — skipping rebuild");
        return false;
    }
    try {
        await fetch(hook, { method: "POST", mode: "no-cors" });
        return true;
    } catch (err) {
        console.error("[posts] Deploy hook failed:", err);
        return false;
    }
}

/* ── Media ──────────────────────────────────────────────────────────────── */

const BUCKET = "project-images";

export async function uploadImage(file: File, prefix = "blog"): Promise<string> {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
    const path = `${prefix}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
    if (error) throw new Error(error.message);

    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function listImages(prefix = "blog"): Promise<{ name: string; url: string }[]> {
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .list(prefix, { limit: 100, sortBy: { column: "created_at", order: "desc" } });

    if (error) throw new Error(error.message);
    return (data ?? [])
        .filter((f) => f.name !== ".emptyFolderPlaceholder")
        .map((f) => ({
            name: f.name,
            url: supabase.storage.from(BUCKET).getPublicUrl(`${prefix}/${f.name}`).data.publicUrl,
        }));
}
