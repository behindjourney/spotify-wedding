-- ========================================================
-- SPOTIFY WEDDING INVITATION - SUPABASE DATABASE SCHEMA
-- Groom: Naufal Alif Nurfaizi & Bride: Tri Widiyanti
-- ========================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Guests Table
CREATE TABLE IF NOT EXISTS guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  custom_greeting TEXT,
  plus_one_count INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Wishes / Guestbook Table
CREATE TABLE IF NOT EXISTS wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name VARCHAR NOT NULL,
  message TEXT NOT NULL,
  attendance VARCHAR DEFAULT 'attending', -- 'attending' | 'uncertain' | 'declined'
  song_request VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_guests_slug ON guests(slug);
CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON wishes(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Guests RLS Policies: Public can read guests info by slug
CREATE POLICY "Allow public read access to guests"
  ON guests FOR SELECT
  USING (true);

-- Wishes RLS Policies: Public can read all wishes
CREATE POLICY "Allow public read access to wishes"
  ON wishes FOR SELECT
  USING (true);

-- Wishes RLS Policies: Public can insert their wishes
CREATE POLICY "Allow public insert into wishes"
  ON wishes FOR INSERT
  WITH CHECK (true);

-- ========================================================
-- SEED INITIAL DATA
-- ========================================================

-- Sample Guests
INSERT INTO guests (name, slug, custom_greeting, plus_one_count)
VALUES 
  ('Budi & Partner', 'budi-and-partner', 'Kami sangat bahagia mengundang Anda merayakan hari istimewa kami!', 2),
  ('Sarah Salsabila', 'sarah-salsabila', 'Kehadiranmu melengkapi melodi bahagia di hari pernikahan kami.', 1),
  ('Keluarga Besar Bpk. Rahmat', 'keluarga-bpk-rahmat', 'Merupakan suatu kehormatan bagi kami atas doa dan kehadiran Bapak sekeluarga.', 4)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, custom_greeting = EXCLUDED.custom_greeting;

-- Sample Wishes (Up Next Queue)
INSERT INTO wishes (guest_name, message, attendance, song_request)
VALUES
  ('Budi & Partner', 'Selamat untuk Alif & Widi! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu sampai akhir hayat!', 'attending', 'Teman Hidup - Tulus'),
  ('Sarah Salsabila', 'Barakallahu lakum wa baraka alaikum! Happy wedding Alif & Widi! Playlist-nya keren banget berasa di konser cinta!', 'attending', 'Di Akhir Perang - Nadin Amizah'),
  ('Dimas Pratama', 'Happy Wedding brother Alif dan Kak Widi! Semoga lancar sampai hari H dan selamanya kompak!', 'attending', 'Tangguh - Petra Sihombing'),
  ('Ayu Lestari', 'Selamat menempuh hidup baru berdua. Semoga cinta kalian selalu bertumbuh tiap harinya. Aamiin!', 'uncertain', 'Kusuma Wijaya - Pawestri')
ON CONFLICT DO NOTHING;
