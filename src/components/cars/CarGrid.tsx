import React from 'react';
import CarCard from './CarCard';
import { useCarStore } from '../../store/carStore';
import { Loader2 } from 'lucide-react';

const CarGrid: React.FC = () => {
  const { filteredCars, isLoading, error } = useCarStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 text-blue-800 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-center">
        <p className="text-red-800">Error loading cars: {error}</p>
      </div>
    );
  }

  if (filteredCars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No cars found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarGrid;