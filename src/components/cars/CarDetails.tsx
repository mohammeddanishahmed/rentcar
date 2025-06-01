import React from 'react';
import { Users, Gauge, Fuel, Zap, Car } from 'lucide-react';
import { Database } from '../../types/supabase';

type Car = Database['public']['Tables']['cars']['Row'];

interface CarDetailsProps {
  car: Car;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="relative h-64 sm:h-96">
        <img 
          src={car.image_url || 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600'} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-800 text-white px-4 py-2 text-lg font-bold rounded-bl-xl">
          ${car.daily_rate}/day
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
            {car.make} {car.model} ({car.year})
          </h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            car.available 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {car.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
        
        <p className="text-lg text-gray-700 mb-6">
          {car.description}
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-800" />
            <span className="text-gray-700">5 Seats</span>
          </div>
          <div className="flex items-center">
            <Car className="w-5 h-5 mr-2 text-blue-800" />
            <span className="text-gray-700">{car.year}</span>
          </div>
          <div className="flex items-center">
            <Gauge className="w-5 h-5 mr-2 text-blue-800" />
            <span className="text-gray-700">Automatic</span>
          </div>
          <div className="flex items-center">
            <Fuel className="w-5 h-5 mr-2 text-blue-800" />
            <span className="text-gray-700">Petrol</span>
          </div>
          <div className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-800" />
            <span className="text-gray-700">150 HP</span>
          </div>
          <div className="flex items-center">
            <Car className="w-5 h-5 mr-2 text-blue-800" />
            <span className="text-gray-700 capitalize">{car.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;