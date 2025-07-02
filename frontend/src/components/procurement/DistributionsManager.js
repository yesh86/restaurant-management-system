import React, { useState } from 'react';
import { Plus, Search, Calendar, Package, Building2, ArrowUpDown } from 'lucide-react';

const DistributionsManager = () => {
  // Sample items data (this would come from Items Manager)
  const [items] = useState([
    { id: 1, name: 'Basmati Rice', unit: 'Kg', currentStock: 50 },
    { id: 4, name: 'Sunflower Oil', unit: 'Liter', currentStock: 25 },
    { id: 7, name: 'Onions', unit: 'Kg', currentStock: 40 },
    { id: 15, name: 'Chicken', unit: 'Kg', currentStock: 30 },
    { id: 18, name: 'Milk', unit: 'Liter', currentStock: 50 }
  ]);

  // Sample departments data (this would come from Departments Manager)
  const [departments] = useState([
    { id: 1, name: 'Biryani', color: '#3B82F6' },
    { id: 2, name: 'Chinese', color: '#EF4444' },
    { id: 3, name: 'South Indian', color: '#10B981' },
    { id: 4, name: 'North Indian', color: '#F59E0B' },
    { id: 5, name: 'Tandoor', color: '#8B5CF6' },
    { id: 6, name: 'Beverages', color: '#06B6D4' },
    { id: 7, name: 'Desserts', color: '#EC4899' },
    { id: 8, name: 'Banquet Kitchen', color: '#F97316' }
  ]);

  const [distributions, setDistributions] = useState([
    {
      id: 1,
      date: '2025-07-01',
      itemId: 4,
      itemName: 'Sunflower Oil',
      departmentId: 1,
      departmentName: 'Biryani',
      quantity: 5,
      unit: 'Liter',
      portions: 50,
      notes: 'For biryani preparation',
      distributedBy: 'Store Manager'
    },
    {
      id: 2,
      date: '2025-07-01',
      itemId: 1,
      itemName: 'Basmati Rice',
      departmentId: 1,
      departmentName: 'Biryani',
      quantity: 5,
      unit: 'Kg',
      portions: 10,
      notes: 'Daily requirement',
      distributedBy: 'Store Manager'
    },
    {
      id: 3,
      date: '2025-07-01',
      itemId: 1,
      itemName: 'Basmati Rice',
      departmentId: 2,
      departmentName: 'Chinese',
      quantity: 5,
      unit: 'Kg',
      portions: 15,
      notes: 'For fried rice dishes',
      distributedBy: 'Store Manager'
    },
    {
      id: 4,
      date: '2025-07-02',
      itemId: 7,
      itemName: 'Onions',
      departmentId: 3,
      departmentName: 'South Indian',
      quantity: 3,
      unit: 'Kg',
      portions: 30,
      notes: 'For sambar and curry',
      distributedBy: 'Assistant Manager'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('today');

  const handleAddDistribution = () => {
    setShowForm(true);
  };

  const filteredDistributions = distributions.filter(dist => {
    const matchesSearch = dist.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dist.departmentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === '' || dist.departmentId.toString() === selectedDepartment;

    // Date filtering
    const today = new Date().toISOString().split('T')[0];
    const distDate = dist.date;
    let matchesDate = true;

    if (selectedDateRange === 'today') {
      matchesDate = distDate === today;
    } else if (selectedDateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = new Date(distDate) >= weekAgo;
    }

    return matchesSearch && matchesDepartment && matchesDate;
  });

  const getBalanceAfterDistribution = (itemId, distributionId) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return 0;

    // Get all distributions for this item up to and including this distribution
    const relevantDistributions = distributions
      .filter(d => d.itemId === itemId && d.id <= distributionId)
      .reduce((total, d) => total + d.quantity, 0);

    return item.currentStock - relevantDistributions;
  };

  const DistributionForm = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      date: new Date().toISOString().split('T')[0],
      itemId: '',
      departmentId: '',
      quantity: '',
      portions: '',
      notes: '',
      distributedBy: 'Store Manager'
    });

    const selectedItem = items.find(item => item.id.toString() === formData.itemId);

    const handleSubmit = (e) => {
      e.preventDefault();
      const selectedItemData = items.find(item => item.id.toString() === formData.itemId);
      const selectedDepartmentData = departments.find(dept => dept.id.toString() === formData.departmentId);

      const newDistribution = {
        id: Date.now(),
        ...formData,
        itemId: parseInt(formData.itemId),
        departmentId: parseInt(formData.departmentId),
        quantity: parseFloat(formData.quantity),
        portions: formData.portions ? parseInt(formData.portions) : 0,
        itemName: selectedItemData?.name || '',
        departmentName: selectedDepartmentData?.name || '',
        unit: selectedItemData?.unit || ''
      };

      setDistributions([newDistribution, ...distributions]);
      onSave();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">New Distribution</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item *</label>
              <select
                value={formData.itemId}
                onChange={(e) => setFormData({...formData, itemId: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Item</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} (Stock: {item.currentStock} {item.unit})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity * {selectedItem && `(${selectedItem.unit})`}
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                min="0.1"
                step="0.1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portions (How many portions can be made from this quantity?)
              </label>
              <input
                type="number"
                value={formData.portions}
                onChange={(e) => setFormData({...formData, portions: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="1"
                placeholder="e.g., 10 biryani portions"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Distributed By</label>
              <input
                type="text"
                value={formData.distributedBy}
                onChange={(e) => setFormData({...formData, distributedBy: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Purpose of distribution..."
              />
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
                Add Distribution
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
        <h3 className="text-lg font-medium text-gray-900">Raw Material Distributions</h3>
        <button
          onClick={handleAddDistribution}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          New Distribution
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search items or departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
        <select
          value={selectedDateRange}
          onChange={(e) => setSelectedDateRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Distributions Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distributed By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDistributions.map(distribution => {
              const department = departments.find(d => d.id === distribution.departmentId);
              const balance = getBalanceAfterDistribution(distribution.itemId, distribution.id);
              return (
                <tr key={distribution.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(distribution.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {distribution.itemName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: department?.color || '#6B7280' }}
                      />
                      <span className="text-sm text-gray-900">
                        {distribution.departmentName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ArrowUpDown className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {distribution.quantity} {distribution.unit}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${balance < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                      {balance} {distribution.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {distribution.portions || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {distribution.distributedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {distribution.notes}
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
          <div className="text-sm font-medium text-gray-600">Today's Distributions</div>
          <div className="text-2xl font-bold text-blue-600">
            {distributions.filter(d => d.date === new Date().toISOString().split('T')[0]).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600">Total Distributions</div>
          <div className="text-2xl font-bold text-gray-900">{distributions.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600">Active Departments</div>
          <div className="text-2xl font-bold text-green-600">
            {new Set(distributions.map(d => d.departmentId)).size}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600">Items Distributed</div>
          <div className="text-2xl font-bold text-orange-600">
            {new Set(distributions.map(d => d.itemId)).size}
          </div>
        </div>
      </div>

      {/* Distribution Form Modal */}
      {showForm && (
        <DistributionForm
          onSave={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default DistributionsManager;