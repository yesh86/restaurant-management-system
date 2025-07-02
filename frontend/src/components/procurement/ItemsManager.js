import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, Search } from 'lucide-react';

const ItemsManager = () => {
  const [items, setItems] = useState([
    // Rice & Grains
    { id: 1, name: 'Basmati Rice', category: 'Rice & Grains', unit: 'Kg', currentStock: 50, minStock: 10, price: 120 },
    { id: 2, name: 'Regular Rice', category: 'Rice & Grains', unit: 'Kg', currentStock: 100, minStock: 20, price: 60 },
    { id: 3, name: 'Wheat Flour', category: 'Rice & Grains', unit: 'Kg', currentStock: 30, minStock: 10, price: 40 },

    // Oils & Fats
    { id: 4, name: 'Sunflower Oil', category: 'Oils & Fats', unit: 'Liter', currentStock: 25, minStock: 5, price: 150 },
    { id: 5, name: 'Coconut Oil', category: 'Oils & Fats', unit: 'Liter', currentStock: 15, minStock: 3, price: 200 },
    { id: 6, name: 'Ghee', category: 'Oils & Fats', unit: 'Kg', currentStock: 10, minStock: 2, price: 500 },

    // Vegetables
    { id: 7, name: 'Onions', category: 'Vegetables', unit: 'Kg', currentStock: 40, minStock: 10, price: 35 },
    { id: 8, name: 'Tomatoes', category: 'Vegetables', unit: 'Kg', currentStock: 20, minStock: 5, price: 50 },
    { id: 9, name: 'Potatoes', category: 'Vegetables', unit: 'Kg', currentStock: 60, minStock: 15, price: 25 },
    { id: 10, name: 'Green Chilies', category: 'Vegetables', unit: 'Kg', currentStock: 5, minStock: 2, price: 80 },

    // Spices
    { id: 11, name: 'Turmeric Powder', category: 'Spices', unit: 'Kg', currentStock: 3, minStock: 1, price: 250 },
    { id: 12, name: 'Red Chili Powder', category: 'Spices', unit: 'Kg', currentStock: 5, minStock: 1, price: 300 },
    { id: 13, name: 'Coriander Seeds', category: 'Spices', unit: 'Kg', currentStock: 2, minStock: 0.5, price: 200 },
    { id: 14, name: 'Cumin Seeds', category: 'Spices', unit: 'Kg', currentStock: 2, minStock: 0.5, price: 400 },

    // Meat & Seafood
    { id: 15, name: 'Chicken', category: 'Meat & Seafood', unit: 'Kg', currentStock: 30, minStock: 10, price: 180 },
    { id: 16, name: 'Mutton', category: 'Meat & Seafood', unit: 'Kg', currentStock: 15, minStock: 5, price: 600 },
    { id: 17, name: 'Fish', category: 'Meat & Seafood', unit: 'Kg', currentStock: 20, minStock: 5, price: 250 },

    // Dairy
    { id: 18, name: 'Milk', category: 'Dairy', unit: 'Liter', currentStock: 50, minStock: 10, price: 55 },
    { id: 19, name: 'Curd', category: 'Dairy', unit: 'Kg', currentStock: 20, minStock: 5, price: 70 },
    { id: 20, name: 'Paneer', category: 'Dairy', unit: 'Kg', currentStock: 8, minStock: 2, price: 300 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(items.map(item => item.category))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  const getStockStatus = (currentStock, minStock) => {
    if (currentStock <= minStock) return 'critical';
    if (currentStock <= minStock * 2) return 'low';
    return 'good';
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const ItemForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: item?.name || '',
      category: item?.category || '',
      unit: item?.unit || 'Kg',
      currentStock: item?.currentStock || 0,
      minStock: item?.minStock || 0,
      price: item?.price || 0
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newItem = {
        id: item?.id || Date.now(),
        ...formData,
        currentStock: parseFloat(formData.currentStock),
        minStock: parseFloat(formData.minStock),
        price: parseFloat(formData.price)
      };

      if (item) {
        setItems(items.map(i => i.id === item.id ? newItem : i));
      } else {
        setItems([...items, newItem]);
      }
      onSave();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            {item ? 'Edit Item' : 'Add New Item'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Kg">Kg</option>
                  <option value="Liter">Liter</option>
                  <option value="Piece">Piece</option>
                  <option value="Pack">Pack</option>
                  <option value="Box">Box</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (₹) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
                <input
                  type="number"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Alert *</label>
                <input
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => setFormData({...formData, minStock: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {item ? 'Update' : 'Add'} Item
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Raw Materials Inventory</h3>
        <button
          onClick={handleAddItem}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Items Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map(item => {
              const stockStatus = getStockStatus(item.currentStock, item.minStock);
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">Per {item.unit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.currentStock} {item.unit}</div>
                    <div className="text-xs text-gray-500">Min: {item.minStock} {item.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusColor(stockStatus)}`}>
                      {stockStatus === 'critical' ? 'Critical' : stockStatus === 'low' ? 'Low Stock' : 'Good'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600">Total Items</div>
          <div className="text-2xl font-bold text-gray-900">{items.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600">Categories</div>
          <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600">Low Stock Items</div>
          <div className="text-2xl font-bold text-yellow-600">
            {items.filter(item => getStockStatus(item.currentStock, item.minStock) === 'low').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600">Critical Stock</div>
          <div className="text-2xl font-bold text-red-600">
            {items.filter(item => getStockStatus(item.currentStock, item.minStock) === 'critical').length}
          </div>
        </div>
      </div>

      {/* Item Form Modal */}
      {showForm && (
        <ItemForm
          item={editingItem}
          onSave={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ItemsManager;