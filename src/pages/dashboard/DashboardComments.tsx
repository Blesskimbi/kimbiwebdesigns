import { useCallback, useEffect, useState } from "react";
import { Check, Trash2, RefreshCw, MessageSquare, Mail, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Moderation queue for blog comments.
 *
 * Comments arrive unapproved and are invisible on the site until approved here,
 * so this screen is the only thing standing between a stranger's text and the
 * public blog. Pending ones come first, because that is the only part that
 * needs acting on.
 *
 * Reads and writes go through normal table access, which is allowed for signed
 * in users only; anon reaches comments through two narrow functions instead.
 */

interface Comment {
  id: string;
  post_slug: string;
  author: string;
  email: string | null;
  body: string;
  approved: boolean;
  created_at: string;
}

const DashboardComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "approved" | "all">("pending");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from("post_comments")
      .select("*")
      .order("approved", { ascending: true })
      .order("created_at", { ascending: false });

    if (err) setError(err.message);
    else setComments((data ?? []) as Comment[]);

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const approve = async (id: string) => {
    // Optimistic: the row is already on screen and this is reversible.
    setComments((cs) => cs.map((c) => (c.id === id ? { ...c, approved: true } : c)));
    const { error: err } = await supabase.from("post_comments").update({ approved: true }).eq("id", id);
    if (err) {
      setError(err.message);
      load();
    }
  };

  const remove = async (id: string) => {
    const target = comments.find((c) => c.id === id);
    if (!target) return;
    if (!window.confirm(`Delete this comment from ${target.author}? This cannot be undone.`)) return;

    setComments((cs) => cs.filter((c) => c.id !== id));
    const { error: err } = await supabase.from("post_comments").delete().eq("id", id);
    if (err) {
      setError(err.message);
      load();
    }
  };

  const shown = comments.filter((c) =>
    filter === "all" ? true : filter === "pending" ? !c.approved : c.approved,
  );
  const pendingCount = comments.filter((c) => !c.approved).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-primary" />
            Comments
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {pendingCount > 0
              ? `${pendingCount} waiting for you. Nothing is public until you approve it.`
              : "Nothing waiting. Comments stay hidden until approved."}
          </p>
        </div>

        <div className="flex gap-2">
          {(["pending", "approved", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
              }`}
            >
              {f} ({f === "all" ? comments.length : comments.filter((c) => (f === "pending" ? !c.approved : c.approved)).length})
            </button>
          ))}
          <button
            onClick={load}
            className="px-3 py-2 rounded-lg text-xs bg-white/5 text-gray-400 border border-white/10 hover:text-white transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : shown.length === 0 ? (
        <p className="text-gray-500 text-sm">Nothing here.</p>
      ) : (
        <ul className="space-y-3">
          {shown.map((c) => (
            <li
              key={c.id}
              className={`rounded-xl border p-4 ${
                c.approved ? "border-white/10 bg-white/[0.02]" : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 text-xs">
                <span className="font-semibold text-white text-sm">{c.author}</span>
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex items-center gap-1 text-gray-400 hover:text-primary transition-colors"
                  >
                    <Mail size={12} />
                    {c.email}
                  </a>
                )}
                <a
                  href={`/blog/${c.post_slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-400 hover:text-primary transition-colors"
                >
                  <ExternalLink size={12} />
                  {c.post_slug}
                </a>
                <span className="text-gray-600">
                  {new Date(c.created_at).toLocaleString()}
                </span>
                {!c.approved && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                    Pending
                  </span>
                )}
              </div>

              {/* Plain text. A comment is the one thing here written by someone else. */}
              <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed mb-3">{c.body}</p>

              <div className="flex gap-2">
                {!c.approved && (
                  <button
                    onClick={() => approve(c.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/25 hover:bg-green-500/25 transition-colors"
                  >
                    <Check size={13} />
                    Approve
                  </button>
                )}
                <button
                  onClick={() => remove(c.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardComments;
