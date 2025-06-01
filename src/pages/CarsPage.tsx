import React, { useEffect } from 'react';
import { useCarStore } from '../store/carStore';
import CarFilter from '../components/cars/CarFilter';
import CarGrid from '../components/cars/CarGrid';

const CarsPage: React.FC = () => {
  const { fetchCars } = useCarStore();
  
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Browse Our Car Collection
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Find the perfect car for your needs from our diverse fleet.
        </p>
      </div>
      
      <CarFilter />
      <CarGrid />
    </div>
  );
};

export default CarsPage;