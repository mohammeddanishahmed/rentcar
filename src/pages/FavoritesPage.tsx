import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Car, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cars } from '../data/cars';
import { Car as CarType } from '../types';
import CarCard from '../components/CarCard';

const FavoritesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [favoritesCars, setFavoritesCars] = useState<CarType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Get favorite cars
    const favoritesData = currentUser.favorites.map(
      carId => cars.find(car => car.id === carId)
    ).filter(car => car !== undefined) as CarType[];
    
    setFavoritesCars(favoritesData);
    setFilteredCars(favoritesData);
  }, [currentUser, navigate]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCars(favoritesCars);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = favoritesCars.filter(car => 
      car.make.toLowerCase().includes(query) || 
      car.model.toLowerCase().includes(query) ||
      car.year.toString().includes(query)
    );
    
    setFilteredCars(filtered);
  }, [searchQuery, favoritesCars]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in useEffect
  };
  
  if (!currentUser) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-gray-600">Your collection of favorite vehicles.</p>
        </div>
        
        {favoritesCars.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Heart size={36} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't added any vehicles to your favorites. Start exploring our collection and add vehicles you love.
            </p>
            <a 
              href="/cars"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <Car size={16} className="mr-2" />
              Browse Vehicles
            </a>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {favoritesCars.length} {favoritesCars.length === 1 ? 'Vehicle' : 'Vehicles'}
                  </h2>
                </div>
                
                <form onSubmit={handleSearch} className="sm:max-w-xs w-full">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      placeholder="Search favorites..."
                    />
                  </div>
                </form>
              </div>
            </div>
            
            {filteredCars.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-700 mb-4">No vehicles found matching your search criteria.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;