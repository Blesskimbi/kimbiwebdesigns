-- Run this in Supabase Dashboard → SQL Editor

CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  full_description TEXT,
  cover_image TEXT,
  images TEXT[],
  tags TEXT[],
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  hidden BOOLEAN DEFAULT false,
  client_name TEXT,
  completed_date DATE,
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read projects" ON projects
  FOR SELECT USING (hidden = false);
