import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import ProfileForm from '../components/dashboard/ProfileForm';
import { User } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  // Redirect to login if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome, {user.first_name || user.email.split('@')[0]}
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-blue-800 text-white">
            <h2 className="text-lg font-medium">Dashboard</h2>
          </div>
          <nav className="p-4 space-y-1">
            <div className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-800">
              <User className="h-5 w-5 mr-2" />
              Profile Settings
            </div>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;