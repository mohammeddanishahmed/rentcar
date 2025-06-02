import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, Check, X, Star, Shield, ArrowRight, Share2 } from 'lucide-react';
import { cars } from '../data/cars';
import { motion } from 'framer-motion';
import { Car } from '../types';
import { useAuth } from '../context/AuthContext';

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, addToFavorites, removeFromFavorites } = useAuth();
  
  const isFavorite = currentUser?.favorites.includes(id || '');
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    setTimeout(() => {
      const foundCar = cars.find(c => c.id === id);
      setCar(foundCar || null);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleFavoriteToggle = async () => {
    if (!currentUser || !car) {
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
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!car) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Car Not Found</h2>
        <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/cars"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
        >
          Back to Cars
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            to="/cars"
            className="inline-flex items-center text-gray-600 hover:text-red-600"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Cars
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Car images */}
            <div>
              <div className="relative rounded-lg overflow-hidden mb-4">
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={car.images[selectedImageIndex]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-80 object-cover"
                />
                
                <button
                  onClick={handleFavoriteToggle}
                  className={`absolute top-4 right-4 p-3 rounded-full ${
                    isFavorite ? 'bg-red-100' : 'bg-white/80 backdrop-blur-sm'
                  }`}
                >
                  <Heart 
                    size={20} 
                    className={isFavorite ? 'text-red-600 fill-red-600' : 'text-gray-700'} 
                  />
                </button>
                
                {!car.inStock && (
                  <div className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-full">
                    Sold Out
                  </div>
                )}
              </div>
              
              {car.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`rounded-md overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-red-600' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${car.make} ${car.model} thumbnail ${index + 1}`} 
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Car info */}
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{car.make} {car.model}</h1>
                  <p className="text-xl text-gray-500">{car.year}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                    <Star size={16} className="text-yellow-500 mr-1" />
                    <span className="font-medium">{car.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-900">{formatPrice(car.price)}</h2>
              </div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-medium">{car.fuelType}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-medium">{car.transmission}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Engine</p>
                  <p className="font-medium">{car.engine}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Exterior Color</p>
                  <p className="font-medium">{car.exteriorColor}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Interior Color</p>
                  <p className="font-medium">{car.interiorColor}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Drivetrain</p>
                  <p className="font-medium">{car.drivetrain}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-700">{car.description}</p>
              </div>
              
              <div className="mt-6">
                <div className="flex space-x-4">
                  <button
                    className={`flex-1 py-3 px-6 rounded-md text-white font-bold ${
                      car.inStock
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    } transition-colors duration-300`}
                    disabled={!car.inStock}
                  >
                    Contact Dealer
                  </button>
                  
                  <button
                    onClick={handleFavoriteToggle}
                    className={`py-3 px-4 rounded-md border ${
                      isFavorite
                        ? 'border-red-600 text-red-600 hover:bg-red-50'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Heart 
                      size={20} 
                      className={isFavorite ? 'fill-red-600 text-red-600' : ''} 
                    />
                  </button>
                  
                  <button
                    className="py-3 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Features & Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Vehicle Features</h4>
                <ul className="space-y-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">
                        <Check size={20} />
                      </div>
                      <span className="ml-2 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Detailed Specifications</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">VIN</span>
                    <span className="font-medium text-gray-900">{car.vin}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Mileage</span>
                    <span className="font-medium text-gray-900">{car.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Stock Status</span>
                    <span className={`font-medium ${car.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {car.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Cars */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Similar Vehicles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars
              .filter(c => c.id !== car.id && c.make === car.make)
              .slice(0, 3)
              .map(similarCar => (
                <Link 
                  key={similarCar.id} 
                  to={`/cars/${similarCar.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <img 
                      src={similarCar.images[0]} 
                      alt={`${similarCar.make} ${similarCar.model}`} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900">{similarCar.make} {similarCar.model}</h4>
                    <p className="text-gray-500">{similarCar.year}</p>
                    
                    <div className="mt-2 flex justify-between items-center">
                      <p className="font-bold text-gray-900">{formatPrice(similarCar.price)}</p>
                      <div className="text-sm text-red-600 font-medium inline-flex items-center">
                        View Details
                        <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;