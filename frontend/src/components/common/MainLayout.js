import React, { useState } from 'react';
import { Calendar, Package, DollarSign, BarChart3, LogOut, User } from 'lucide-react';
import Header from './Header';
import Navigation from './Navigation';
import BanquetModule from '../banquet/BanquetModule';
import ProcurementModule from '../procurement/ProcurementModule';
import CashModule from '../cash/CashModule';

const MainLayout = () => {
  const [activeModule, setActiveModule] = useState('banquet');

  const modules = [
    { id: 'banquet', label: 'Banquet Booking', icon: Calendar },
    { id: 'procurement', label: 'Procurement', icon: Package },
    { id: 'cash', label: 'Cash In/Out', icon: DollarSign }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Only remove authentication data, NOT business data
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      localStorage.removeItem('loginTime');
      // DO NOT remove procurement or other module data
      window.location.reload();
    }
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'banquet':
        return <BanquetModule />;
      case 'procurement':
        return <ProcurementModule />;
      case 'cash':
        return <CashModule />;
      default:
        return <BanquetModule />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* User info and logout section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <Navigation
              modules={modules}
              activeModule={activeModule}
              setActiveModule={setActiveModule}
            />
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User size={16} />
                <span>Welcome, <strong>{localStorage.getItem('username') || 'User'}</strong></span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderActiveModule()}
      </main>
    </div>
  );
};

export default MainLayout;