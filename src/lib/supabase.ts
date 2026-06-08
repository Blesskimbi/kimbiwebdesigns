import { createClient } from "@supabase/supabase-js";

const url  = import.meta.env.VITE_SUPABASE_URL  as string;
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !key) {
    console.warn(
        "[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set. " +
        "Create a .env.local file with these values."
    );
}

export const supabase = createClient(url ?? "https://placeholder.supabase.co", key ?? "placeholder");

/* ── Project type (mirrors the Supabase table) ───────────────────────── */
export interface SupabaseProject {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    full_description: string | null;
    cover_image: string | null;
    images: string[] | null;
    tags: string[] | null;
    live_url: string | null;
    github_url: string | null;
    featured: boolean;
    hidden: boolean;
    client_name: string | null;
    completed_date: string | null;
    created_at: string;
}

export type ProjectInsert = Omit<SupabaseProject, "id" | "created_at">;
