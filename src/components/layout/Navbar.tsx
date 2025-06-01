import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Menu, X, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Car className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">DriveEase</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-white hover:text-blue-200 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out"
              >
                Home
              </Link>
              <Link
                to="/cars"
                className="text-white hover:text-blue-200 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out"
              >
                Cars
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-blue-200 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-blue-200 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out"
              >
                Contact
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center text-white hover:text-blue-200 transition duration-150 ease-in-out"
                  >
                    <User className="h-5 w-5 mr-1" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center text-white hover:text-blue-200 transition duration-150 ease-in-out"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-800 bg-white hover:bg-blue-50 transition duration-150 ease-in-out"
              >
                Sign in
              </Link>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-blue-800">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="block px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Cars
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-blue-700">
            {user ? (
              <div className="space-y-1">
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="px-2">
                <Link
                  to="/login"
                  className="block w-full px-5 py-3 text-center font-medium text-blue-800 bg-white rounded-md hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;