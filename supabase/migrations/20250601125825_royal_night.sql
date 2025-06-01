-- Create cars table
CREATE TABLE IF NOT EXISTS public.cars (
    id serial PRIMARY KEY,
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

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    first_name text,
    last_name text,
    phone text,
    avatar_url text,
    is_admin boolean DEFAULT false
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS public.reservations (
    id serial PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    car_id integer REFERENCES public.cars(id) ON DELETE CASCADE,
    start_date timestamptz NOT NULL,
    end_date timestamptz NOT NULL,
    total_price numeric NOT NULL,
    status text DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Policies for cars table
CREATE POLICY "Allow public read access to cars" 
    ON public.cars FOR SELECT 
    TO public 
    USING (true);

CREATE POLICY "Allow admin full access to cars" 
    ON public.cars FOR ALL 
    TO authenticated 
    USING (EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.is_admin = true
    ));

-- Policies for profiles table
CREATE POLICY "Users can view their own profile" 
    ON public.profiles FOR SELECT 
    TO authenticated 
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles" 
    ON public.profiles FOR SELECT 
    TO authenticated 
    USING (EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.is_admin = true
    ));

-- Policies for reservations table
CREATE POLICY "Users can view their own reservations" 
    ON public.reservations FOR SELECT 
    TO authenticated 
    USING (user_id = auth.uid());

CREATE POLICY "Users can create their own reservations" 
    ON public.reservations FOR INSERT 
    TO authenticated 
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own reservations" 
    ON public.reservations FOR UPDATE 
    TO authenticated 
    USING (user_id = auth.uid());

CREATE POLICY "Admin can view all reservations" 
    ON public.reservations FOR SELECT 
    TO authenticated 
    USING (EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.is_admin = true
    ));