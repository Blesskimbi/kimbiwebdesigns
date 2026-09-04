-- Rebuild the site from the database, not from the browser.
--
-- Publishing previously called the Vercel deploy hook from the dashboard using
-- VITE_DEPLOY_HOOK_URL. Anything VITE_-prefixed is compiled into the JavaScript
-- every visitor downloads, so the hook URL was readable by anyone viewing the
-- source, and anyone who found it could spam builds and burn the account's
-- build minutes.
--
-- Moving the call into a database trigger keeps the URL server-side. It also
-- covers edits made outside the dashboard — a row changed directly in the
-- Supabase table editor now rebuilds too, which the client-side version missed.
--
-- Run in Supabase Dashboard → SQL Editor.

-- pg_net performs the outbound HTTP call asynchronously, so a slow or failing
-- hook can never block or roll back the write that triggered it.
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION notify_deploy_hook() RETURNS trigger AS $fn$
DECLARE
  hook_url TEXT := 'https://api.vercel.com/v1/integrations/deploy/prj_rc8cLdHhSZFAHwOSQ0CVyVCLJeP8/9n7YwLNyBK';
  should_deploy BOOLEAN := false;
BEGIN
  -- Only published content changes what crawlers see. Draft activity — which
  -- is most of the writing — must not trigger a build.
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

-- SECURITY DEFINER runs as the owner, so lock the search_path down; without
-- this a caller could shadow net.http_post with their own function.
ALTER FUNCTION notify_deploy_hook() SET search_path = net, public, pg_temp;

DROP TRIGGER IF EXISTS posts_deploy_hook ON posts;
CREATE TRIGGER posts_deploy_hook
  AFTER INSERT OR UPDATE OR DELETE ON posts
  FOR EACH ROW EXECUTE FUNCTION notify_deploy_hook();

-- Projects appear in the sitemap and get their own prerendered HTML too, so
-- they deserve the same treatment.
DROP TRIGGER IF EXISTS projects_deploy_hook ON projects;
CREATE TRIGGER projects_deploy_hook
  AFTER INSERT OR UPDATE OR DELETE ON projects
  FOR EACH ROW EXECUTE FUNCTION notify_deploy_hook();

-- ── Verify ────────────────────────────────────────────────────────────────
-- Both triggers should be listed:
--
--   SELECT event_object_table, trigger_name, event_manipulation
--   FROM information_schema.triggers
--   WHERE trigger_name LIKE '%deploy_hook%'
--   ORDER BY event_object_table, event_manipulation;
--
-- Recent hook calls and their response codes:
--
--   SELECT id, created, url, status_code
--   FROM net._http_response ORDER BY created DESC LIMIT 5;
