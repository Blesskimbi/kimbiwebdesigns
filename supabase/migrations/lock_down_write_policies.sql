-- Close public write access to the projects table.
--
-- add_projects_insert_policy.sql granted INSERT / UPDATE / DELETE to everyone
-- with WITH CHECK (true). Because the anon key ships inside the client bundle
-- and is public by design, anyone could read it out of the JavaScript and
-- delete or rewrite the whole portfolio without ever seeing the dashboard
-- login. This replaces those policies with ones that require a real Supabase
-- Auth session.
--
-- Run in Supabase Dashboard → SQL Editor.
-- Run this AFTER deploying the dashboard change to Supabase Auth, otherwise
-- the dashboard's writes start failing before it knows how to sign in.

-- ── projects table ────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Anyone can insert projects" ON projects;
DROP POLICY IF EXISTS "Anyone can update projects" ON projects;
DROP POLICY IF EXISTS "Anyone can delete projects" ON projects;

-- Visitors: read visible projects only.
DROP POLICY IF EXISTS "Public can read projects" ON projects;
CREATE POLICY "Public can read visible projects" ON projects
  FOR SELECT TO anon
  USING (hidden = false);

-- Signed-in admin: read everything, including hidden rows the dashboard lists.
CREATE POLICY "Authenticated can read all projects" ON projects
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert projects" ON projects
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update projects" ON projects
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete projects" ON projects
  FOR DELETE TO authenticated
  USING (true);

-- ── project-images storage bucket ─────────────────────────────────────────
-- The dashboard uploads cover images with the same anon key, so the bucket
-- needs the same treatment: world-readable, admin-writable.

CREATE POLICY "Public can read project images" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated can upload project images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Authenticated can update project images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated can delete project images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'project-images');

-- ── Verify ────────────────────────────────────────────────────────────────
-- Expect no policy with roles = {anon,authenticated} or {public} on
-- INSERT / UPDATE / DELETE:
--
--   SELECT tablename, policyname, roles, cmd
--   FROM pg_policies
--   WHERE tablename IN ('projects', 'objects')
--   ORDER BY tablename, cmd;
