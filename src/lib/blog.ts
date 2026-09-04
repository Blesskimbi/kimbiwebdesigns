import { supabase } from "./supabase";

/**
 * Posts come from the `posts` table rather than posts/*.md, so they can be
 * written and edited in the dashboard instead of requiring a commit.
 *
 * The shape below is unchanged from the markdown era, so BlogPage,
 * BlogPostPage, BlogSidebar and BlogPreviewSection did not need touching.
 * gray-matter is gone from the browser bundle as a result — it is still used
 * by the build scripts, which read Node-side.
 *
 * Row-level security means anonymous visitors only ever receive rows with
 * status = 'published', so drafts cannot leak through these helpers.
 */

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    date: string;
    imageUrl: string;
    slug: string;
    tags?: string[];
    faqs?: { q: string; a: string }[];
    seoTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    readTime?: string;
}

interface PostRow {
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
    published_at: string | null;
}

const toPost = (r: PostRow): BlogPost => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt ?? "",
    content: r.content,
    category: r.category ?? "Uncategorised",
    author: r.author ?? "Bless Kimbi",
    date: r.published_at ?? "",
    imageUrl: r.image_url ?? "",
    tags: r.tags ?? undefined,
    faqs: r.faqs ?? undefined,
    seoTitle: r.seo_title ?? undefined,
    metaDescription: r.meta_description ?? undefined,
    focusKeyword: r.focus_keyword ?? undefined,
    readTime: r.read_time ?? undefined,
});

/**
 * A blog page renders the list, the sidebar and the preview section, each of
 * which asks for posts. Sharing one in-flight promise keeps that to a single
 * request instead of three.
 */
let cache: Promise<BlogPost[]> | null = null;

export const getAllPosts = async (): Promise<BlogPost[]> => {
    if (!cache) {
        cache = (async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("status", "published")
                .order("published_at", { ascending: false });

            if (error) {
                // Don't poison the cache — a transient failure should be retryable.
                cache = null;
                console.error("[blog] Failed to load posts:", error.message);
                return [];
            }
            return (data as PostRow[]).map(toPost);
        })();
    }
    return cache;
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

    if (error) {
        console.error("[blog] Failed to load post:", error.message);
        return undefined;
    }
    return data ? toPost(data as PostRow) : undefined;
};

export const getRecentPosts = async (limit = 5): Promise<BlogPost[]> =>
    (await getAllPosts()).slice(0, limit);

export const getCategories = async (): Promise<string[]> =>
    Array.from(new Set((await getAllPosts()).map((p) => p.category)));

/**
 * Human-readable date for display.
 *
 * post.date is the raw ISO timestamp from published_at, which is what
 * datePublished and article:published_time need — so it stays raw on the
 * record and is formatted only where it is shown to a reader.
 */
export const formatPostDate = (iso: string): string => {
    if (!iso) return "";
    const d = new Date(iso);
    return Number.isNaN(d.getTime())
        ? iso
        : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};
