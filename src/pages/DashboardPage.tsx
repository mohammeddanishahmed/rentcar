import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Heart, Clock, Car, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cars } from '../data/cars';
import { Car as CarType } from '../types';

const DashboardPage: React.FC = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [favoritesCars, setFavoritesCars] = useState<CarType[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  
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
  }, [currentUser, navigate]);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  if (!currentUser) {
    return null; // Will redirect in useEffect
  }
  
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    
    const date = new Date(timestamp.seconds * 1000);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.displayName || 'User'}!</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-gray-900 text-white text-center">
                <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'User'} 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-gray-400" />
                  )}
                </div>
                <h2 className="text-xl font-bold">{currentUser.displayName || 'User'}</h2>
                <p className="text-gray-300 text-sm">{currentUser.email}</p>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center px-4 py-2 rounded-md ${
                        activeTab === 'profile' 
                          ? 'bg-red-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <User size={20} className={`mr-3 ${activeTab === 'profile' ? 'text-white' : 'text-gray-500'}`} />
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className={`w-full flex items-center px-4 py-2 rounded-md ${
                        activeTab === 'favorites' 
                          ? 'bg-red-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Heart size={20} className={`mr-3 ${activeTab === 'favorites' ? 'text-white' : 'text-gray-500'}`} />
                      Favorites
                      {favoritesCars.length > 0 && (
                        <span className={`ml-auto ${activeTab === 'favorites' ? 'bg-white text-red-600' : 'bg-gray-200 text-gray-700'} text-xs rounded-full px-2 py-1`}>
                          {favoritesCars.length}
                        </span>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('activity')}
                      className={`w-full flex items-center px-4 py-2 rounded-md ${
                        activeTab === 'activity' 
                          ? 'bg-red-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Clock size={20} className={`mr-3 ${activeTab === 'activity' ? 'text-white' : 'text-gray-500'}`} />
                      Recent Activity
                    </button>
                  </li>
                  <li className="pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={20} className="mr-3 text-gray-500" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center">
                        <User size={20} className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium text-gray-900">{currentUser.displayName || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center">
                        <Mail size={20} className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="font-medium text-gray-900">{currentUser.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center">
                        <Calendar size={20} className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium text-gray-900">{formatDate(currentUser.createdAt) || 'Unknown'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center">
                        <Heart size={20} className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Favorites</p>
                          <p className="font-medium text-gray-900">{favoritesCars.length} vehicles</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                    
                    <div className="space-y-4">
                      <button className="w-full flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-md">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                            <User size={20} />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">Edit Profile Information</p>
                            <p className="text-sm text-gray-500">Update your name and profile picture</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>
                      
                      <button className="w-full flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-md">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                            <Lock size={20} />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">Change Password</p>
                            <p className="text-sm text-gray-500">Update your security credentials</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>
                      
                      <button className="w-full flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-md">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                            <BellRing size={20} />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">Notification Preferences</p>
                            <p className="text-sm text-gray-500">Manage your notification settings</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Favorite Vehicles</h2>
                  <p className="text-gray-600 mb-4">
                    {favoritesCars.length > 0 
                      ? `You have ${favoritesCars.length} favorite vehicles.` 
                      : 'You haven\'t added any vehicles to your favorites yet.'}
                  </p>
                  
                  {favoritesCars.length === 0 && (
                    <div className="text-center py-12">
                      <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Heart size={36} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                      <p className="text-gray-500 mb-6">
                        Browse our collection and add vehicles to your favorites to see them here.
                      </p>
                      <a 
                        href="/cars"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                      >
                        <Car size={16} className="mr-2" />
                        Browse Vehicles
                      </a>
                    </div>
                  )}
                </div>
                
                {favoritesCars.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoritesCars.map(car => (
                      <motion.div
                        key={car.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <div className="relative">
                          <img 
                            src={car.images[0]} 
                            alt={`${car.make} ${car.model}`} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-0 right-0 m-3">
                            <button
                              onClick={() => {
                                // This would call removeFromFavorites
                              }}
                              className="bg-white rounded-full p-2 shadow hover:bg-red-50"
                            >
                              <Heart size={20} className="text-red-600 fill-red-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900">{car.make} {car.model}</h3>
                          <p className="text-gray-500">{car.year}</p>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <p className="text-xl font-bold text-gray-900">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                maximumFractionDigits: 0
                              }).format(car.price)}
                            </p>
                            <a 
                              href={`/cars/${car.id}`}
                              className="text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center"
                            >
                              View Details
                              <ChevronRight size={16} className="ml-1" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-7 border-l-2 border-gray-200"></div>
                  
                  <div className="space-y-8">
                    {favoritesCars.length > 0 ? (
                      favoritesCars.slice(0, 5).map((car, index) => (
                        <div key={car.id} className="relative flex items-start">
                          <div className="flex-shrink-0 h-14 w-14 rounded-full bg-red-100 flex items-center justify-center z-10 mr-4">
                            <Heart size={24} className="text-red-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {index === 0 ? 'Today' : index === 1 ? 'Yesterday' : `${index + 1} days ago`}
                            </div>
                            <p className="text-gray-900 font-medium">
                              Added <span className="font-semibold">{car.make} {car.model}</span> to favorites
                            </p>
                            <div className="mt-2">
                              <a 
                                href={`/cars/${car.id}`}
                                className="text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center"
                              >
                                View Vehicle
                                <ChevronRight size={16} className="ml-1" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                          <Clock size={36} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
                        <p className="text-gray-500 mb-6">
                          Your recent activity will appear here as you interact with our platform.
                        </p>
                        <a 
                          href="/cars"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                        >
                          <Car size={16} className="mr-2" />
                          Browse Vehicles
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Define Lock and BellRing components since they're used in the code but not imported
const Lock = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
};

const BellRing = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <path d="M2 8c0-2.2.7-4.3 2-6" />
      <path d="M22 8a10 10 0 0 0-2-6" />
    </svg>
  );
};

export default DashboardPage;