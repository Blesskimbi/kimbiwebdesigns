-- Likes on blog posts.
--
-- The table itself is unreachable from the browser. Everything goes through two
-- SECURITY DEFINER functions, so anon never gets SELECT on the rows: a visitor
-- should be able to like a post and read a count, not enumerate who liked what.
--
-- visitor_id is a uuid the browser generates and keeps in localStorage. It is
-- not an identity, just a way to make a second click undo the first rather than
-- add another like. Someone determined can clear storage and like again; that
-- is an acceptable trade for not asking readers to sign in.
--
-- Likes are read at runtime, so a new like does not need a rebuild and does not
-- touch the posts table, which means the deploy hook stays quiet.
--
-- Applied 2026-09-06.

CREATE TABLE IF NOT EXISTS post_likes (
  post_slug  TEXT        NOT NULL,
  visitor_id UUID        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (post_slug, visitor_id)
);

CREATE INDEX IF NOT EXISTS post_likes_slug_idx ON post_likes (post_slug);

ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON post_likes FROM anon, authenticated;

-- Toggle: like if not liked, unlike if already liked. Returns the new total.
CREATE OR REPLACE FUNCTION public.toggle_post_like(p_slug TEXT, p_visitor UUID)
RETURNS INTEGER AS $fn$
DECLARE
  total INTEGER;
BEGIN
  IF p_slug IS NULL OR p_visitor IS NULL OR length(p_slug) > 200 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;

  -- Only published posts can be liked, so the table cannot be filled with rows
  -- for slugs that do not exist.
  IF NOT EXISTS (SELECT 1 FROM posts WHERE slug = p_slug AND status = 'published') THEN
    RAISE EXCEPTION 'unknown post';
  END IF;

  DELETE FROM post_likes WHERE post_slug = p_slug AND visitor_id = p_visitor;
  IF NOT FOUND THEN
    INSERT INTO post_likes (post_slug, visitor_id) VALUES (p_slug, p_visitor);
  END IF;

  SELECT count(*) INTO total FROM post_likes WHERE post_slug = p_slug;
  RETURN total;
END;
$fn$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Count for a post, plus whether this visitor is one of them.
CREATE OR REPLACE FUNCTION public.get_post_likes(p_slug TEXT, p_visitor UUID DEFAULT NULL)
RETURNS TABLE (likes INTEGER, liked BOOLEAN) AS $fn$
  SELECT count(*)::INTEGER,
         COALESCE(bool_or(visitor_id = p_visitor), false)
  FROM post_likes
  WHERE post_slug = p_slug;
$fn$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public, pg_temp;

GRANT EXECUTE ON FUNCTION public.toggle_post_like(TEXT, UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_post_likes(TEXT, UUID)  TO anon, authenticated;

-- ── Verify ────────────────────────────────────────────────────────────────
--   SELECT public.toggle_post_like('some-published-slug', gen_random_uuid());
--   SELECT * FROM public.get_post_likes('some-published-slug');
--   SELECT post_slug, count(*) FROM post_likes GROUP BY post_slug ORDER BY 2 DESC;
