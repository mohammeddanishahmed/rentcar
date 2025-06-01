import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarStore } from '../store/carStore';
import CarDetails from '../components/cars/CarDetails';
import { Loader2, ChevronLeft } from 'lucide-react';

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedCar, fetchCarById, isLoading, error } = useCarStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCarById(parseInt(id));
    }
  }, [id, fetchCarById]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={handleGoBack}
        className="flex items-center mb-8 text-blue-800 hover:text-blue-900 transition duration-150 ease-in-out"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to cars
      </button>

      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-10 h-10 text-blue-800 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6 rounded-md text-center">
          <p className="text-red-800 text-lg">Error loading car details: {error}</p>
        </div>
      ) : selectedCar ? (
        <CarDetails car={selectedCar} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Car not found</p>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;