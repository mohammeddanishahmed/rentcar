/*
  # Add profiles insert policy

  1. Security Changes
    - Add RLS policy to allow users to insert their own profile
    - This fixes the 403 error when creating new user profiles
    - Policy ensures users can only insert a profile with their own user ID

  2. Changes
    - Add INSERT policy for authenticated users on profiles table
    - Policy uses auth.uid() = id to verify user ownership
*/

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);