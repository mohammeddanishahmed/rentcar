import React from 'react';
import { Link } from 'react-router-dom';
import { Database } from '../../types/supabase';
import { Users, Calendar, Tag } from 'lucide-react';

type Car = Database['public']['Tables']['cars']['Row'];

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Link 
      to={`/cars/${car.id}`} 
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image_url || 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600'} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 right-0 bg-blue-800 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
          ${car.daily_rate}/day
        </div>
      </div>
      
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-800 transition-colors">
          {car.make} {car.model} ({car.year})
        </h3>
        
        <p className="text-gray-600 line-clamp-2">
          {car.description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1 text-blue-800" />
            <span>5 seats</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1 text-blue-800" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Tag className="w-4 h-4 mr-1 text-blue-800" />
            <span className="capitalize">{car.category}</span>
          </div>
        </div>
        
        <div className="pt-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            car.available 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {car.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;