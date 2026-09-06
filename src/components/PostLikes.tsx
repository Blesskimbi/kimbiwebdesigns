import { useCallback, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Like button and count for a blog post.
 *
 * Readers are not asked to sign in, so the browser keeps a random uuid in
 * localStorage. It identifies nobody; it only makes a second click undo the
 * first instead of adding another like. Clearing storage lets someone like
 * again, which is the accepted cost of not putting a login in front of a
 * blog post.
 *
 * Both calls go through database functions rather than table access, so the
 * page can add a like and read a total without anon ever being able to read
 * the rows themselves.
 */

const VISITOR_KEY = "bk_visitor_id";

/** Storage is unavailable in private modes and some embedded browsers. */
const getVisitorId = (): string | null => {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;

    const fresh = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, fresh);
    return fresh;
  } catch {
    return null;
  }
};

interface Props {
  slug: string;
}

const PostLikes = ({ slug }: Props) => {
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    setVisitorId(getVisitorId());
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { data, error } = await supabase.rpc("get_post_likes", {
        p_slug: slug,
        p_visitor: visitorId,
      });

      if (cancelled || error) return;

      const row = Array.isArray(data) ? data[0] : data;
      if (!row) return;

      setLikes(row.likes ?? 0);
      setLiked(Boolean(row.liked));
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [slug, visitorId]);

  const toggle = useCallback(async () => {
    if (busy || !visitorId) return;
    setBusy(true);

    // Move the number immediately. A like that waits on a round trip over
    // mobile data feels broken, and this is the least consequential write on
    // the site to be optimistic about.
    const previousLikes = likes;
    const previousLiked = liked;
    setLiked(!previousLiked);
    setLikes((n) => (n ?? 0) + (previousLiked ? -1 : 1));

    const { data, error } = await supabase.rpc("toggle_post_like", {
      p_slug: slug,
      p_visitor: visitorId,
    });

    if (error) {
      setLikes(previousLikes);
      setLiked(previousLiked);
    } else if (typeof data === "number") {
      setLikes(data);
    }

    setBusy(false);
  }, [busy, liked, likes, slug, visitorId]);

  // Storage blocked means the like could never be undone, so offer a count only.
  const interactive = visitorId !== null;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!interactive || busy}
      aria-pressed={liked}
      aria-label={liked ? "Remove your like from this post" : "Like this post"}
      className={[
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border font-body text-sm font-medium transition-colors",
        liked
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary",
        interactive ? "cursor-pointer" : "cursor-default",
      ].join(" ")}
    >
      <Heart size={16} className={liked ? "fill-current" : ""} />
      <span>{likes === null ? "Like" : likes}</span>
    </button>
  );
};

export default PostLikes;
