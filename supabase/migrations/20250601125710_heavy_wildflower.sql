/*
  # Create cars table for vehicle inventory

  1. New Tables
    - `cars`
      - `id` (bigint, primary key, auto-increment)
      - `created_at` (timestamptz, default now())
      - `make` (text)
      - `model` (text)
      - `year` (integer)
      - `daily_rate` (numeric)
      - `description` (text)
      - `image_url` (text)
      - `category` (text)
      - `available` (boolean, default true)

  2. Security
    - Enable RLS on `cars` table
    - Add policies for:
      - Public read access to all cars
      - Admin users can perform all operations
*/

CREATE TABLE IF NOT EXISTS cars (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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

-- Allow public read access to all cars
CREATE POLICY "Allow public read access to cars"
  ON cars
  FOR SELECT
  TO public
  USING (true);

-- Allow admin users to perform all operations
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