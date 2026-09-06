-- Comments on blog posts, approved before they appear.
--
-- Nothing a stranger writes shows up on the site until it is approved in the
-- dashboard. An open comment form on a business site fills with link spam, and
-- the first time that happens on a site arguing for professionalism it costs
-- more than the comments were worth.
--
-- Same shape as the likes: the table is unreachable from the browser and every
-- public operation goes through a SECURITY DEFINER function with a pinned
-- search_path. anon can add a pending comment and read approved ones, and
-- nothing else. In particular anon can never read an unapproved comment or an
-- email address: get_post_comments does not return that column at all.
--
-- Applied 2026-09-06.

CREATE TABLE IF NOT EXISTS post_comments (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug  TEXT        NOT NULL,
  author     TEXT        NOT NULL,
  email      TEXT,                    -- never published; for replying only
  body       TEXT        NOT NULL,
  approved   BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS post_comments_visible_idx
  ON post_comments (post_slug, approved, created_at DESC);

CREATE INDEX IF NOT EXISTS post_comments_pending_idx
  ON post_comments (approved, created_at DESC) WHERE approved = false;

ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON post_comments FROM anon;

GRANT SELECT, UPDATE, DELETE ON post_comments TO authenticated;

DROP POLICY IF EXISTS "authenticated manage comments" ON post_comments;
CREATE POLICY "authenticated manage comments" ON post_comments
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.get_post_comments(p_slug TEXT)
RETURNS TABLE (id UUID, author TEXT, body TEXT, created_at TIMESTAMPTZ) AS $fn$
  SELECT id, author, body, created_at
  FROM post_comments
  WHERE post_slug = p_slug AND approved = true
  ORDER BY created_at ASC;
$fn$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.add_post_comment(
  p_slug   TEXT,
  p_author TEXT,
  p_body   TEXT,
  p_email  TEXT DEFAULT NULL
) RETURNS VOID AS $fn$
DECLARE
  recent INTEGER;
BEGIN
  IF btrim(coalesce(p_author, '')) = '' OR btrim(coalesce(p_body, '')) = '' THEN
    RAISE EXCEPTION 'name and comment are required';
  END IF;

  IF length(p_author) > 80 OR length(p_body) > 4000 OR length(coalesce(p_email, '')) > 200 THEN
    RAISE EXCEPTION 'too long';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM posts WHERE slug = p_slug AND status = 'published') THEN
    RAISE EXCEPTION 'unknown post';
  END IF;

  -- Crude flood guard. Anyone can still submit, but a script cannot dump
  -- hundreds of rows into one post in a minute.
  SELECT count(*) INTO recent
  FROM post_comments
  WHERE post_slug = p_slug AND created_at > now() - interval '1 minute';

  IF recent >= 5 THEN
    RAISE EXCEPTION 'too many comments just now, please try again shortly';
  END IF;

  INSERT INTO post_comments (post_slug, author, email, body)
  VALUES (p_slug, btrim(p_author), nullif(btrim(coalesce(p_email, '')), ''), btrim(p_body));
END;
$fn$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

GRANT EXECUTE ON FUNCTION public.get_post_comments(TEXT)                  TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.add_post_comment(TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;

-- ── Verify ────────────────────────────────────────────────────────────────
--   SELECT public.add_post_comment('some-published-slug', 'Name', 'Body');
--   SELECT count(*) FROM public.get_post_comments('some-published-slug');  -- 0 until approved
--   SELECT author, approved FROM post_comments ORDER BY created_at DESC;
