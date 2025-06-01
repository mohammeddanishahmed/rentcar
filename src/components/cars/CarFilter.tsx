import React, { useState } from 'react';
import { useCarStore } from '../../store/carStore';
import { Search, Filter } from 'lucide-react';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'sports', label: 'Sports' },
  { value: 'convertible', label: 'Convertible' },
  { value: 'electric', label: 'Electric' },
];

const CarFilter: React.FC = () => {
  const { filterCars } = useCarStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterCars(category !== 'all' ? category : undefined, searchTerm);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    filterCars(newCategory !== 'all' ? newCategory : undefined, searchTerm);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Find Your Perfect Car</h2>
        <button 
          className="flex items-center text-blue-800 sm:hidden"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="w-5 h-5 mr-1" />
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className={`${isFilterOpen || window.innerWidth >= 640 ? 'block' : 'hidden'} sm:block`}>
        <form onSubmit={handleSearch} className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by make or model..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-800 focus:border-blue-800"
            />
          </div>
          
          <div className="sm:w-1/4">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="block w-full py-2.5 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-800 focus:border-blue-800"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition duration-150 ease-in-out"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarFilter;