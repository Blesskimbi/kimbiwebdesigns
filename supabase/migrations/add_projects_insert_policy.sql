-- Add INSERT policy for anyone to create projects (including anon users)

CREATE POLICY "Anyone can insert projects" ON projects
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update projects
CREATE POLICY "Anyone can update projects" ON projects
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow anyone to delete projects
CREATE POLICY "Anyone can delete projects" ON projects
  FOR DELETE
  USING (true);
