import React, { useState } from 'react';
import { Package, Users, Truck } from 'lucide-react';
import CategoryManager from './CategoryManager';
import ItemManager from './ItemManager';

const ProcurementModule = () => {
  const [activeTab, setActiveTab] = useState('categories');

  const tabs = [
    { id: 'categories', label: 'Categories', icon: Package },
    { id: 'items', label: 'Items', icon: Truck },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'categories':
        return <CategoryManager />;
      case 'items':
        return <ItemManager />;
      default:
        return <CategoryManager />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Procurement Management</h2>
      </div>

      {/* Sub Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active Tab Content */}
      {renderActiveTab()}
    </div>
  );
};

export default ProcurementModule;