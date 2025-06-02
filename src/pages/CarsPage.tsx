import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Search, ChevronDown, X } from 'lucide-react';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from '../types';

const CarsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minYear, setMinYear] = useState<number | ''>('');
  const [maxYear, setMaxYear] = useState<number | ''>('');
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [transmissions, setTransmissions] = useState<string[]>([]);
  
  const uniqueMakes = Array.from(new Set(cars.map(car => car.make))).sort();
  const uniqueFuelTypes = Array.from(new Set(cars.map(car => car.fuelType))).sort();
  const uniqueTransmissions = Array.from(new Set(cars.map(car => car.transmission))).sort();
  
  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const toggleMake = (make: string) => {
    setSelectedMakes(prev => 
      prev.includes(make) 
        ? prev.filter(m => m !== make) 
        : [...prev, make]
    );
  };
  
  const toggleFuelType = (fuelType: string) => {
    setFuelTypes(prev => 
      prev.includes(fuelType) 
        ? prev.filter(f => f !== fuelType) 
        : [...prev, fuelType]
    );
  };
  
  const toggleTransmission = (transmission: string) => {
    setTransmissions(prev => 
      prev.includes(transmission) 
        ? prev.filter(t => t !== transmission) 
        : [...prev, transmission]
    );
  };

  const clearFilters = () => {
    setSelectedMakes([]);
    setMinPrice('');
    setMaxPrice('');
    setMinYear('');
    setMaxYear('');
    setFuelTypes([]);
    setTransmissions([]);
    setSearchQuery('');
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const applyFilters = () => {
    let results = [...cars];
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(car => 
        car.make.toLowerCase().includes(query) || 
        car.model.toLowerCase().includes(query) || 
        car.year.toString().includes(query)
      );
    }
    
    // Make filter
    if (selectedMakes.length > 0) {
      results = results.filter(car => selectedMakes.includes(car.make));
    }
    
    // Price range filter
    if (minPrice !== '') {
      results = results.filter(car => car.price >= Number(minPrice));
    }
    if (maxPrice !== '') {
      results = results.filter(car => car.price <= Number(maxPrice));
    }
    
    // Year range filter
    if (minYear !== '') {
      results = results.filter(car => car.year >= Number(minYear));
    }
    if (maxYear !== '') {
      results = results.filter(car => car.year <= Number(maxYear));
    }
    
    // Fuel type filter
    if (fuelTypes.length > 0) {
      results = results.filter(car => fuelTypes.includes(car.fuelType));
    }
    
    // Transmission filter
    if (transmissions.length > 0) {
      results = results.filter(car => transmissions.includes(car.transmission));
    }
    
    setFilteredCars(results);
  };
  
  useEffect(() => {
    applyFilters();
  }, [selectedMakes, minPrice, maxPrice, minYear, maxYear, fuelTypes, transmissions]);
  
  useEffect(() => {
    if (initialSearchQuery) {
      applyFilters();
    }
  }, [initialSearchQuery]);
  
  const activeFilterCount = 
    (selectedMakes.length > 0 ? 1 : 0) +
    (minPrice !== '' || maxPrice !== '' ? 1 : 0) +
    (minYear !== '' || maxYear !== '' ? 1 : 0) +
    (fuelTypes.length > 0 ? 1 : 0) +
    (transmissions.length > 0 ? 1 : 0);
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter sidebar for desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Make</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uniqueMakes.map(make => (
                    <div key={make} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`make-${make}`}
                        checked={selectedMakes.includes(make)}
                        onChange={() => toggleMake(make)}
                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <label htmlFor={`make-${make}`} className="ml-2 text-sm text-gray-700">
                        {make}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Price Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="min-price" className="sr-only">Min Price</label>
                    <input
                      type="number"
                      id="min-price"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="sr-only">Max Price</label>
                    <input
                      type="number"
                      id="max-price"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Year</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="min-year" className="sr-only">Min Year</label>
                    <input
                      type="number"
                      id="min-year"
                      placeholder="Min"
                      value={minYear}
                      onChange={(e) => setMinYear(e.target.value ? Number(e.target.value) : '')}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-year" className="sr-only">Max Year</label>
                    <input
                      type="number"
                      id="max-year"
                      placeholder="Max"
                      value={maxYear}
                      onChange={(e) => setMaxYear(e.target.value ? Number(e.target.value) : '')}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Fuel Type</h4>
                <div className="space-y-2">
                  {uniqueFuelTypes.map(fuel => (
                    <div key={fuel} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`fuel-${fuel}`}
                        checked={fuelTypes.includes(fuel)}
                        onChange={() => toggleFuelType(fuel)}
                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <label htmlFor={`fuel-${fuel}`} className="ml-2 text-sm text-gray-700">
                        {fuel}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Transmission</h4>
                <div className="space-y-2">
                  {uniqueTransmissions.map(trans => (
                    <div key={trans} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`trans-${trans}`}
                        checked={transmissions.includes(trans)}
                        onChange={() => toggleTransmission(trans)}
                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <label htmlFor={`trans-${trans}`} className="ml-2 text-sm text-gray-700">
                        {trans}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Our Vehicles</h1>
                
                <div className="flex items-center gap-2">
                  <form onSubmit={handleSearch} className="flex-1 sm:flex-none">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Search cars..."
                      />
                    </div>
                  </form>
                  
                  <button
                    onClick={toggleFilterPanel}
                    className="md:hidden inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Mobile filter panel */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-white rounded-lg shadow-md p-6 mb-6 overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <div className="flex gap-2">
                      {activeFilterCount > 0 && (
                        <button 
                          onClick={clearFilters}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Clear All
                        </button>
                      )}
                      <button onClick={toggleFilterPanel}>
                        <X className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Make</h4>
                      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                        {uniqueMakes.map(make => (
                          <div key={make} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`mobile-make-${make}`}
                              checked={selectedMakes.includes(make)}
                              onChange={() => toggleMake(make)}
                              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            <label htmlFor={`mobile-make-${make}`} className="ml-2 text-sm text-gray-700">
                              {make}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Price Range</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="mobile-min-price" className="sr-only">Min Price</label>
                          <input
                            type="number"
                            id="mobile-min-price"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="mobile-max-price" className="sr-only">Max Price</label>
                          <input
                            type="number"
                            id="mobile-max-price"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Year</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="mobile-min-year" className="sr-only">Min Year</label>
                          <input
                            type="number"
                            id="mobile-min-year"
                            placeholder="Min"
                            value={minYear}
                            onChange={(e) => setMinYear(e.target.value ? Number(e.target.value) : '')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="mobile-max-year" className="sr-only">Max Year</label>
                          <input
                            type="number"
                            id="mobile-max-year"
                            placeholder="Max"
                            value={maxYear}
                            onChange={(e) => setMaxYear(e.target.value ? Number(e.target.value) : '')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Fuel Type</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {uniqueFuelTypes.map(fuel => (
                          <div key={fuel} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`mobile-fuel-${fuel}`}
                              checked={fuelTypes.includes(fuel)}
                              onChange={() => toggleFuelType(fuel)}
                              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            <label htmlFor={`mobile-fuel-${fuel}`} className="ml-2 text-sm text-gray-700">
                              {fuel}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Transmission</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {uniqueTransmissions.map(trans => (
                          <div key={trans} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`mobile-trans-${trans}`}
                              checked={transmissions.includes(trans)}
                              onChange={() => toggleTransmission(trans)}
                              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            <label htmlFor={`mobile-trans-${trans}`} className="ml-2 text-sm text-gray-700">
                              {trans}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Results count */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <p className="text-gray-700">
                Showing <span className="font-semibold">{filteredCars.length}</span> vehicles
                {activeFilterCount > 0 && ' with applied filters'}
              </p>
            </div>
            
            {/* Car grid */}
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-700 mb-4">No vehicles found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;