import React from 'react';
import { Package } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import LoadingSpinner from '../common/LoadingSpinner';

const ItemManager = () => {
  const { items, loading, error } = useApp();

  if (loading) return <LoadingSpinner text="Loading items..." />;

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading items: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Items Management</h3>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {items.map(item => (
            <li key={item.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Rate: ₹{item.rate}/{item.uom}
                      {item.category && (
                        <span className="ml-2 text-blue-600">({item.category.name})</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No items</h3>
          <p className="mt-1 text-sm text-gray-500">Items will appear here when available.</p>
        </div>
      )}
    </div>
  );
};

export default ItemManager;