-- Rebuild the site from the database, not from the browser.
--
-- Publishing previously called the Vercel deploy hook from the dashboard using
-- VITE_DEPLOY_HOOK_URL. Anything VITE_-prefixed is compiled into the JavaScript
-- every visitor downloads, so the hook URL was readable by anyone viewing the
-- source, and anyone who found it could spam builds until the account's build
-- minutes ran out.
--
-- Moving the call into a database trigger keeps the URL server-side. It also
-- covers edits made outside the dashboard — a row changed directly in the
-- Supabase table editor now rebuilds too, which the client-side version missed.
--
-- The URL is read from app_config rather than written into this file. This
-- repository is public, and an earlier version of this migration hardcoded a
-- hook that then had to be revoked. Keeping the value in the database means
-- rotating it never requires a commit.
--
-- Run in Supabase Dashboard → SQL Editor, then run set_deploy_hook.sql.

CREATE EXTENSION IF NOT EXISTS pg_net;

-- ── Config store ──────────────────────────────────────────────────────────
-- RLS on with no policies at all: neither anon nor authenticated can read a
-- single row. The trigger below is SECURITY DEFINER and runs as the owner,
-- which bypasses RLS, so it can still read the hook.
CREATE TABLE IF NOT EXISTS app_config (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON app_config FROM anon, authenticated;

-- ── Trigger ───────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION notify_deploy_hook() RETURNS trigger AS $fn$
DECLARE
  hook_url      TEXT;
  should_deploy BOOLEAN := false;
BEGIN
  SELECT value INTO hook_url FROM app_config WHERE key = 'deploy_hook_url';

  -- No hook configured yet, or it has been revoked and not replaced. Writes
  -- must still succeed — losing a post to a missing build hook would be a far
  -- worse failure than a stale build.
  IF hook_url IS NULL OR hook_url = '' THEN
    RETURN NULL;
  END IF;

  -- Only published content changes what crawlers see. Draft activity — which
  -- is most of the writing — must not queue builds.
  IF TG_OP = 'DELETE' THEN
    should_deploy := (OLD.status = 'published');
  ELSIF TG_OP = 'INSERT' THEN
    should_deploy := (NEW.status = 'published');
  ELSE
    -- Covers publishing, editing a live post, and unpublishing one.
    should_deploy := (NEW.status = 'published' OR OLD.status = 'published');
  END IF;

  IF should_deploy THEN
    PERFORM net.http_post(
      url     := hook_url,
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body    := '{}'::jsonb
    );
  END IF;

  RETURN NULL;
END;
$fn$ LANGUAGE plpgsql SECURITY DEFINER;

-- SECURITY DEFINER runs as the owner, so pin the search_path; without this a
-- caller could shadow net.http_post with their own function and have it run
-- with the owner's privileges.
ALTER FUNCTION notify_deploy_hook() SET search_path = net, public, pg_temp;

DROP TRIGGER IF EXISTS posts_deploy_hook ON posts;
CREATE TRIGGER posts_deploy_hook
  AFTER INSERT OR UPDATE OR DELETE ON posts
  FOR EACH ROW EXECUTE FUNCTION notify_deploy_hook();

-- Projects appear in the sitemap and get their own prerendered HTML too.
DROP TRIGGER IF EXISTS projects_deploy_hook ON projects;
CREATE TRIGGER projects_deploy_hook
  AFTER INSERT OR UPDATE OR DELETE ON projects
  FOR EACH ROW EXECUTE FUNCTION notify_deploy_hook();

-- ── Verify ────────────────────────────────────────────────────────────────
--   SELECT event_object_table, trigger_name, event_manipulation
--   FROM information_schema.triggers
--   WHERE trigger_name LIKE '%deploy_hook%'
--   ORDER BY event_object_table, event_manipulation;
--
-- After publishing something, the most recent call and its response:
--
--   SELECT id, created, url, status_code
--   FROM net._http_response ORDER BY created DESC LIMIT 5;
