import { useCallback, useEffect, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatPostDate } from "@/lib/blog";

/**
 * Comments on a blog post.
 *
 * Nothing appears until it is approved in the dashboard. An open form on a
 * business site fills with link spam, and the first time that happens on a site
 * whose argument is professionalism it costs more than the comments are worth.
 *
 * Both calls go through database functions, so anon can add a pending comment
 * and read approved ones and nothing else. Email is optional, never shown, and
 * never returned by the read function; it exists only so a reply is possible.
 */

interface Comment {
  id: string;
  author: string;
  body: string;
  created_at: string;
}

interface Props {
  slug: string;
}

const PostComments = ({ slug }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error: err } = await supabase.rpc("get_post_comments", { p_slug: slug });
    if (!err && Array.isArray(data)) setComments(data as Comment[]);
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending) return;

    setError(null);
    setSending(true);

    const { error: err } = await supabase.rpc("add_post_comment", {
      p_slug: slug,
      p_author: author.trim(),
      p_body: body.trim(),
      p_email: email.trim() || null,
    });

    setSending(false);

    if (err) {
      // The database raises readable messages for the cases a reader can hit.
      setError(err.message || "Something went wrong. Please try again.");
      return;
    }

    setSent(true);
    setAuthor("");
    setEmail("");
    setBody("");
  };

  const field =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-navy font-body text-sm " +
    "placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <section className="mt-10 md:mt-14" aria-labelledby="comments-heading">
      <h2
        id="comments-heading"
        className="font-display font-bold text-xl md:text-2xl text-navy mb-6 flex items-center gap-2"
      >
        <MessageSquare size={20} className="text-primary" />
        {comments.length > 0 ? `Comments (${comments.length})` : "Comments"}
      </h2>

      {comments.length > 0 && (
        <ol className="space-y-4 mb-10">
          {comments.map((comment) => (
            <li key={comment.id} className="internal-card">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <span className="font-display font-bold text-navy text-sm">{comment.author}</span>
                <span className="text-xs text-muted-foreground font-body shrink-0">
                  {formatPostDate(comment.created_at)}
                </span>
              </div>
              {/* Rendered as plain text, never markdown or HTML: this is the one
                  place on the site where a stranger supplies the content. */}
              <p className="text-muted-foreground font-body text-sm leading-relaxed whitespace-pre-line">
                {comment.body}
              </p>
            </li>
          ))}
        </ol>
      )}

      {sent ? (
        <div className="internal-card bg-primary/5 border-primary/20">
          <p className="text-navy font-body text-sm">
            Thank you. Your comment has been sent and will appear here once I have read it.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="internal-card space-y-4">
          <p className="text-muted-foreground font-body text-sm">
            {comments.length > 0
              ? "Add your own:"
              : "No comments yet. Be the first to leave one."}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              maxLength={80}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className={field}
              aria-label="Your name"
            />
            <input
              type="email"
              maxLength={200}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional, never published)"
              className={field}
              aria-label="Your email, optional and never published"
            />
          </div>

          <textarea
            required
            rows={4}
            maxLength={4000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Your comment"
            className={`${field} resize-y`}
            aria-label="Your comment"
          />

          {error && (
            <p className="text-sm text-red-500 font-body" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-display font-bold text-sm hover:bg-primary/90 disabled:opacity-60 transition-colors"
            >
              <Send size={16} />
              {sending ? "Sending..." : "Post comment"}
            </button>
            <span className="text-xs text-muted-foreground font-body">
              Comments are read before they appear.
            </span>
          </div>
        </form>
      )}
    </section>
  );
};

export default PostComments;
