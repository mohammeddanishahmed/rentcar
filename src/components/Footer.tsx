import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <Car size={32} className="text-red-600" />
              <span className="ml-2 text-xl font-bold">LuxAuto</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Discover the perfect blend of luxury, performance, and innovation with our exclusive collection of premium vehicles.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-white">Cars</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">Sign In</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Car Financing</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Insurance</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Test Drive</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Car Trade-In</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Maintenance</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-red-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Luxury Lane, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-red-600 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+1 (800) LUX-AUTO</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-red-600 mr-2 flex-shrink-0" />
                <span className="text-gray-400">info@luxauto.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} LuxAuto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;