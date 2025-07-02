import React, { useState } from 'react';
import { Calendar, Package, DollarSign, BarChart3 } from 'lucide-react';
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
      <Navigation
        modules={modules}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderActiveModule()}
      </main>
    </div>
  );
};

export default MainLayout;