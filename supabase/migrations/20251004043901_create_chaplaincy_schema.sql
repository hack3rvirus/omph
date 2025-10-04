/*
  # OMP Chaplaincy Database Schema

  ## Overview
  Complete database schema for Our Mother of Perpetual Help (OMP) Catholic Chaplaincy website.

  ## New Tables
  1. daily_readings - Daily mass readings from EWTN/USCCB
  2. saints_of_the_day - Saint celebrations
  3. mass_intentions - Mass intention bookings with payment
  4. prayer_requests - Prayer wall requests
  5. marketplace_listings - Parishioners marketplace
  6. associations - Catholic associations and societies
  7. doctrine_qa - Comprehensive Q&A bank
  8. announcements - Parish announcements
  9. events - Parish events calendar
  10. news_articles - Parish news
  11. admin_users - Admin management

  ## Security
  - Enable RLS on all tables
  - Public read for approved content
  - Admin-only write access
*/

-- Create tables
CREATE TABLE IF NOT EXISTS daily_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reading_date date UNIQUE NOT NULL,
  first_reading jsonb NOT NULL,
  responsorial_psalm jsonb NOT NULL,
  second_reading jsonb,
  gospel jsonb NOT NULL,
  reflection text,
  liturgical_color text,
  season text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS saints_of_the_day (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  celebration_date date NOT NULL,
  saint_name text NOT NULL,
  title text,
  rank text,
  biography text,
  patronage text[],
  birth_year integer,
  death_year integer,
  feast_day text,
  image_url text,
  source text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mass_intentions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_name text NOT NULL,
  requester_email text NOT NULL,
  requester_phone text NOT NULL,
  intention_for text NOT NULL,
  intention_type text NOT NULL,
  intention_details text NOT NULL,
  preferred_date date NOT NULL,
  payment_status text DEFAULT 'pending',
  payment_amount numeric DEFAULT 0,
  payment_reference text,
  status text DEFAULT 'pending',
  admin_notes text,
  approved_by uuid,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_name text NOT NULL,
  requester_email text,
  prayer_intention text NOT NULL,
  is_urgent boolean DEFAULT false,
  is_anonymous boolean DEFAULT false,
  status text DEFAULT 'pending',
  prayer_count integer DEFAULT 0,
  approved_by uuid,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS marketplace_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  owner_name text NOT NULL,
  owner_email text NOT NULL,
  owner_phone text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  location text,
  website text,
  social_media jsonb,
  image_url text,
  is_featured boolean DEFAULT false,
  featured_until timestamptz,
  status text DEFAULT 'pending',
  approved_by uuid,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS associations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  type text NOT NULL,
  overview text NOT NULL,
  history text NOT NULL,
  patron_saint text,
  requirements text[],
  how_to_join text NOT NULL,
  meeting_schedule text NOT NULL,
  contact_person text,
  contact_email text,
  image_url text,
  fun_facts text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS doctrine_qa (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL,
  subcategory text,
  difficulty_level text DEFAULT 'basic',
  citations text[],
  related_questions uuid[],
  tags text[],
  view_count integer DEFAULT 0,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  announcement_type text DEFAULT 'general',
  display_from timestamptz DEFAULT now(),
  display_until timestamptz,
  is_active boolean DEFAULT true,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  end_date timestamptz,
  location text NOT NULL,
  category text NOT NULL,
  image_url text,
  registration_required boolean DEFAULT false,
  registration_link text,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  image_url text,
  author text NOT NULL,
  published_date timestamptz,
  is_published boolean DEFAULT false,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'admin',
  permissions jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_readings_date ON daily_readings(reading_date DESC);
CREATE INDEX IF NOT EXISTS idx_saints_date ON saints_of_the_day(celebration_date DESC);
CREATE INDEX IF NOT EXISTS idx_mass_intentions_status ON mass_intentions(status, preferred_date);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_marketplace_featured ON marketplace_listings(is_featured, status);
CREATE INDEX IF NOT EXISTS idx_doctrine_category ON doctrine_qa(category, difficulty_level);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active, display_from);

-- Enable Row Level Security
ALTER TABLE daily_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE saints_of_the_day ENABLE ROW LEVEL SECURITY;
ALTER TABLE mass_intentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE associations ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctrine_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read daily readings" ON daily_readings FOR SELECT TO public USING (true);
CREATE POLICY "Admin insert readings" ON daily_readings FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));
CREATE POLICY "Admin update readings" ON daily_readings FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));

CREATE POLICY "Public read saints" ON saints_of_the_day FOR SELECT TO public USING (true);
CREATE POLICY "Admin insert saints" ON saints_of_the_day FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));

CREATE POLICY "Public read approved intentions" ON mass_intentions FOR SELECT TO public USING (status = 'approved');
CREATE POLICY "Public insert intentions" ON mass_intentions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin read all intentions" ON mass_intentions FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));
CREATE POLICY "Admin update intentions" ON mass_intentions FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));
CREATE POLICY "Admin delete intentions" ON mass_intentions FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));

CREATE POLICY "Public read approved prayers" ON prayer_requests FOR SELECT TO public USING (status = 'approved');
CREATE POLICY "Public insert prayers" ON prayer_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public update prayer count" ON prayer_requests FOR UPDATE TO public USING (status = 'approved') WITH CHECK (status = 'approved');
CREATE POLICY "Admin read all prayers" ON prayer_requests FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));
CREATE POLICY "Admin update prayers" ON prayer_requests FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));

CREATE POLICY "Public read approved listings" ON marketplace_listings FOR SELECT TO public USING (status = 'approved');
CREATE POLICY "Public insert listings" ON marketplace_listings FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin read all listings" ON marketplace_listings FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));
CREATE POLICY "Admin update listings" ON marketplace_listings FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));
CREATE POLICY "Admin delete listings" ON marketplace_listings FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));

CREATE POLICY "Public read associations" ON associations FOR SELECT TO public USING (true);
CREATE POLICY "Admin manage associations" ON associations FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));

CREATE POLICY "Public read doctrine" ON doctrine_qa FOR SELECT TO public USING (true);
CREATE POLICY "Public update doctrine views" ON doctrine_qa FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage doctrine" ON doctrine_qa FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));

CREATE POLICY "Public read active announcements" ON announcements FOR SELECT TO public USING (is_active = true AND display_from <= now() AND (display_until IS NULL OR display_until >= now()));
CREATE POLICY "Admin manage announcements" ON announcements FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));

CREATE POLICY "Public read events" ON events FOR SELECT TO public USING (true);
CREATE POLICY "Admin manage events" ON events FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));

CREATE POLICY "Public read published articles" ON news_articles FOR SELECT TO public USING (is_published = true);
CREATE POLICY "Admin read all articles" ON news_articles FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));
CREATE POLICY "Admin manage articles" ON news_articles FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.is_active = true));

CREATE POLICY "Admin read admin users" ON admin_users FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM admin_users au WHERE au.id = auth.uid() AND au.is_active = true));
CREATE POLICY "Super admin manage users" ON admin_users FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.role = 'super_admin' AND admin_users.is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid() AND admin_users.role = 'super_admin' AND admin_users.is_active = true));