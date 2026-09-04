-- Clears three security advisories raised against the functions added by
-- create_posts_table.sql and deploy_hook_webhook.sql.
--
-- ALREADY APPLIED to the BlessKimbi project (turusktpzdzrldxhsnvq) as the
-- migration `harden_functions_and_extension`. Kept here so the repository
-- matches the database.

-- 1. Both are trigger functions, but living in `public` meant PostgREST
--    exposed them at /rest/v1/rpc/<name>. notify_deploy_hook() is
--    SECURITY DEFINER, so an anonymous caller reaching it is worth closing off
--    even though invoking a trigger function directly raises an error anyway.
--    Revoking EXECUTE does not affect trigger invocation, which the system
--    performs without checking the caller's privilege on the function.
REVOKE ALL ON FUNCTION public.notify_deploy_hook() FROM anon, authenticated, public;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM anon, authenticated, public;

-- 2. set_updated_at() had a mutable search_path — the same shadowing risk
--    notify_deploy_hook() was already guarded against.
ALTER FUNCTION public.set_updated_at() SET search_path = pg_catalog, public, pg_temp;

-- 3. `CREATE EXTENSION pg_net` without a schema installed it into public,
--    exposing its functions through the REST API. Supabase keeps extensions
--    in their own schema for exactly this reason.
DROP EXTENSION IF EXISTS pg_net CASCADE;
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION pg_net WITH SCHEMA extensions;

-- pg_net creates its own `net` schema for http_post regardless of the schema
-- given above, so the trigger's search_path must still include it.
ALTER FUNCTION public.notify_deploy_hook() SET search_path = net, extensions, public, pg_temp;

-- ── Verified after applying ───────────────────────────────────────────────
-- 6 deploy triggers intact, http_post resolving in `net`, 9 posts and
-- 5 projects untouched, and one UPDATE producing exactly one 201 from the
-- deploy hook. Dropping an extension with CASCADE is worth re-checking rather
-- than assuming.
--
-- Two advisories remain and are deliberate:
--   · app_config has RLS on with no policies — that IS the mechanism keeping
--     the deploy hook URL unreadable. INFO, not a problem.
--   · public.rls_auto_enable() is Supabase's own event-trigger helper. Event
--     trigger functions cannot be called via RPC, so the warning is moot, and
--     it is not ours to modify.
