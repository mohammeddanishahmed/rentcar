import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Search, Star, Shield, Award, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredCars, setFeaturedCars] = useState(cars.slice(0, 6));
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Sort featured cars by rating
    const sortedCars = [...cars]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
    setFeaturedCars(sortedCars);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to cars page with search query
    window.location.href = `/cars?search=${searchQuery}`;
  };

  const scrollToFeatured = () => {
    const featuredSection = document.getElementById('featured');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-screen relative bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Your Perfect <span className="text-red-600">Luxury</span> Vehicle
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Explore our exclusive collection of premium cars for an unmatched driving experience.
            </p>
            
            <form onSubmit={handleSearch} className="flex mb-8">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 rounded-l-md border-0 text-gray-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  placeholder="Search by make, model, or year..."
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-r-md flex items-center transition-colors duration-300"
              >
                Search
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </form>
            
            <div className="flex space-x-4">
              <Link
                to="/cars"
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors duration-300"
              >
                Browse All Cars
              </Link>
              <button
                onClick={scrollToFeatured}
                className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
              >
                Featured Cars
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <button 
            onClick={scrollToFeatured}
            className="animate-bounce bg-white/20 rounded-full p-2 backdrop-blur-sm"
          >
            <ChevronDown className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Featured Cars Section */}
      <section id="featured" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium vehicles that combine luxury, performance, and innovation.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredCars.map((car) => (
              <motion.div key={car.id} variants={itemVariants}>
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link
              to="/cars"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
            >
              View All Vehicles
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best luxury car shopping experience with unmatched service and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Selection</h3>
              <p className="text-gray-600">
                Curated collection of the finest vehicles from prestigious brands worldwide.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Every vehicle undergoes rigorous inspection and certification processes.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Service</h3>
              <p className="text-gray-600">
                Our automotive specialists provide personalized guidance and support.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Seamless Experience</h3>
              <p className="text-gray-600">
                Streamlined process from browsing to purchase and after-sales support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.8)), url(https://images.pexels.com/photos/2834653/pexels-photo-2834653.jpeg)'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience Luxury?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect luxury vehicle with us.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/cars"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300"
            >
              Explore Vehicles
            </Link>
            <Link
              to="/contact"
              className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-8 rounded-md transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;