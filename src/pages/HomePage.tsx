import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCarStore } from '../store/carStore';
import CarCard from '../components/cars/CarCard';
import { ArrowRight, ShieldCheck, Clock, CreditCard } from 'lucide-react';

const HomePage: React.FC = () => {
  const { cars, fetchCars, isLoading } = useCarStore();
  
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // Get only the first 3 cars for the featured section
  const featuredCars = cars.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/10829245/pexels-photo-10829245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Discover the Perfect Car for Your Journey
            </h1>
            <p className="mt-5 text-xl text-blue-100">
              Rent a car with ease. No hidden fees, no hassle – just a smooth ride for your travels.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/cars"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-800 bg-white hover:bg-blue-50 transition duration-150 ease-in-out"
              >
                Browse Cars
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 hover:bg-opacity-30 transition duration-150 ease-in-out"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose DriveEase</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              We make car rental simple, affordable, and hassle-free.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Safe & Reliable</h3>
              <p className="mt-2 text-gray-600">
                All our cars are regularly inspected and maintained to ensure your safety.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">24/7 Support</h3>
              <p className="mt-2 text-gray-600">
                Our customer support team is available round the clock to assist you.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Transparent Pricing</h3>
              <p className="mt-2 text-gray-600">
                No hidden fees or charges. What you see is what you pay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Cars</h2>
            <Link
              to="/cars"
              className="inline-flex items-center text-blue-800 hover:text-blue-900"
            >
              View all cars <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <p className="text-gray-600">Loading featured cars...</p>
            ) : featuredCars.length > 0 ? (
              featuredCars.map(car => <CarCard key={car.id} car={car} />)
            ) : (
              <p className="text-gray-600">No cars available at the moment.</p>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to hit the road?</span>
              <span className="block text-blue-200">Book your car rental today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/cars"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-800 bg-white hover:bg-blue-50 transition duration-150 ease-in-out"
                >
                  Get Started
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 transition duration-150 ease-in-out"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;