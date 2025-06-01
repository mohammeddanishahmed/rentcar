/*
  # Create cars table

  1. New Tables
    - `cars`
      - `id` (bigint, primary key)
      - `created_at` (timestamptz, default now())
      - `make` (text, not null)
      - `model` (text, not null)
      - `year` (integer, not null)
      - `daily_rate` (numeric, not null)
      - `description` (text, not null)
      - `image_url` (text, not null)
      - `category` (text, not null)
      - `available` (boolean, default true)

  2. Security
    - Enable RLS on `cars` table
    - Add policy for public read access
    - Add policy for admin users to have full access
*/

CREATE TABLE IF NOT EXISTS cars (
  id bigint PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  daily_rate numeric NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  available boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Allow public read access to cars
CREATE POLICY "Allow public read access to cars"
  ON cars
  FOR SELECT
  TO public
  USING (true);

-- Allow admin users full access
CREATE POLICY "Allow admin users full access"
  ON cars
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );