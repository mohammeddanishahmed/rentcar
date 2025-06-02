export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engine: string;
  exteriorColor: string;
  interiorColor: string;
  drivetrain: string;
  vin: string;
  description: string;
  features: string[];
  images: string[];
  rating: number;
  inStock: boolean;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  favorites: string[];
}

export type AuthProviderType = 'google' | 'email';