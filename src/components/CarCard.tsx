import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Award, Fuel, Zap } from 'lucide-react';
import { Car } from '../types';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { currentUser, addToFavorites, removeFromFavorites } = useAuth();
  
  const isFavorite = currentUser?.favorites.includes(car.id);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      // Redirect to login if not logged in
      window.location.href = '/login';
      return;
    }
    
    try {
      if (isFavorite) {
        await removeFromFavorites(car.id);
      } else {
        await addToFavorites(car.id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/cars/${car.id}`} className="block">
        <div className="relative">
          <img 
            src={car.images[0]} 
            alt={`${car.make} ${car.model}`} 
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleFavoriteToggle}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite ? 'bg-red-100' : 'bg-white'
            }`}
          >
            <Heart 
              size={20} 
              className={isFavorite ? 'text-red-600 fill-red-600' : 'text-gray-400'} 
            />
          </button>
          {!car.inStock && (
            <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
              Sold Out
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{car.make} {car.model}</h3>
              <p className="text-sm text-gray-500">{car.year}</p>
            </div>
            <div className="flex items-center">
              <Award size={16} className="text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{car.rating}</span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div className="flex items-center text-sm text-gray-600">
              {car.fuelType === 'Electric' ? (
                <Zap size={16} className="mr-1" />
              ) : (
                <Fuel size={16} className="mr-1" />
              )}
              <span>{car.fuelType}</span>
            </div>
            <div className="text-sm text-gray-600">
              {car.transmission}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xl font-bold text-gray-900">{formatPrice(car.price)}</p>
            <button className="text-sm text-red-600 hover:text-red-800 font-medium">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;