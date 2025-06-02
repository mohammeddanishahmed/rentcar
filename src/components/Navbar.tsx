import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Car size={32} className="text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LuxAuto</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium ${
                location.pathname === '/' ? 'text-red-600' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className={`text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium ${
                location.pathname === '/cars' ? 'text-red-600' : ''
              }`}
            >
              Cars
            </Link>
            <Link
              to="/about"
              className={`text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium ${
                location.pathname === '/about' ? 'text-red-600' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium ${
                location.pathname === '/contact' ? 'text-red-600' : ''
              }`}
            >
              Contact
            </Link>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium"
                >
                  <span className="mr-1">{currentUser.displayName || 'User'}</span>
                  <ChevronDown size={16} />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/favorites"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Favorites
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-red-600 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-900 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/cars'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-900 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              Cars
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/about'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-900 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/contact'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-900 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              Contact
            </Link>
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600"
                >
                  Dashboard
                </Link>
                <Link
                  to="/favorites"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600"
                >
                  Favorites
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;