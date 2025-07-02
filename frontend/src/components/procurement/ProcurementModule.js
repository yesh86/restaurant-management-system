import React, { useState } from 'react';
import { Package, Building2, ArrowUpDown, Plus } from 'lucide-react';
import ItemsManager from './ItemsManager';
import DepartmentsManager from './DepartmentsManager';
import DistributionsManager from './DistributionsManager';

const ProcurementModule = () => {
  const [activeTab, setActiveTab] = useState('items');

  const tabs = [
    { id: 'items', label: 'Items', icon: Package },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'distributions', label: 'Distributions', icon: ArrowUpDown }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'items':
        return <ItemsManager />;
      case 'departments':
        return <DepartmentsManager />;
      case 'distributions':
        return <DistributionsManager />;
      default:
        return <ItemsManager />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Procurement Management</h2>
      </div>

      {/* Tab Navigation */}
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