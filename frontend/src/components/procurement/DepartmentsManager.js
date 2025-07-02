import React, { useState } from 'react';
import { Plus, Edit, Trash2, Building2, Users } from 'lucide-react';

const DepartmentsManager = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Biryani',
      description: 'Biryani and rice dish preparation',
      head: 'Chef Ravi',
      active: true,
      color: '#3B82F6'
    },
    {
      id: 2,
      name: 'Chinese',
      description: 'Chinese cuisine and noodle dishes',
      head: 'Chef Wei',
      active: true,
      color: '#EF4444'
    },
    {
      id: 3,
      name: 'South Indian',
      description: 'Dosa, Idli, Vada and South Indian specialties',
      head: 'Chef Murugan',
      active: true,
      color: '#10B981'
    },
    {
      id: 4,
      name: 'North Indian',
      description: 'Curry, Roti, Naan and North Indian dishes',
      head: 'Chef Suresh',
      active: true,
      color: '#F59E0B'
    },
    {
      id: 5,
      name: 'Tandoor',
      description: 'Tandoor items and grilled preparations',
      head: 'Chef Kumar',
      active: true,
      color: '#8B5CF6'
    },
    {
      id: 6,
      name: 'Beverages',
      description: 'Drinks, juices, and beverage preparation',
      head: 'Staff Priya',
      active: true,
      color: '#06B6D4'
    },
    {
      id: 7,
      name: 'Desserts',
      description: 'Sweets and dessert preparation',
      head: 'Chef Lakshmi',
      active: true,
      color: '#EC4899'
    },
    {
      id: 8,
      name: 'Banquet Kitchen',
      description: 'Large scale banquet food preparation',
      head: 'Chef Manager',
      active: true,
      color: '#F97316'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const handleAddDepartment = () => {
    setEditingDepartment(null);
    setShowForm(true);
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment(department);
    setShowForm(true);
  };

  const handleDeleteDepartment = (departmentId) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== departmentId));
    }
  };

  const toggleDepartmentStatus = (departmentId) => {
    setDepartments(departments.map(dept =>
      dept.id === departmentId ? { ...dept, active: !dept.active } : dept
    ));
  };

  const DepartmentForm = ({ department, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: department?.name || '',
      description: department?.description || '',
      head: department?.head || '',
      active: department?.active !== undefined ? department.active : true,
      color: department?.color || '#3B82F6'
    });

    const colorOptions = [
      '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
      '#8B5CF6', '#06B6D4', '#EC4899', '#F97316'
    ];

    const handleSubmit = (e) => {
      e.preventDefault();
      const newDepartment = {
        id: department?.id || Date.now(),
        ...formData
      };

      if (department) {
        setDepartments(departments.map(d => d.id === department.id ? newDepartment : d));
      } else {
        setDepartments([...departments, newDepartment]);
      }
      onSave();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            {department ? 'Edit Department' : 'Add New Department'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department Head</label>
              <input
                type="text"
                value={formData.head}
                onChange={(e) => setFormData({...formData, head: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <div className="flex space-x-2">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({...formData, color})}
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({...formData, active: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Active Department
              </label>
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
                {department ? 'Update' : 'Add'} Department
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
        <h3 className="text-lg font-medium text-gray-900">Kitchen Departments</h3>
        <button
          onClick={handleAddDepartment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          Add Department
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(department => (
          <div key={department.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4"
                  style={{ backgroundColor: department.color }}
                >
                  <Building2 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{department.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{department.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditDepartment(department)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteDepartment(department.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <Users size={16} className="mr-1" />
                {department.head || 'No head assigned'}
              </div>
              <button
                onClick={() => toggleDepartmentStatus(department.id)}
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  department.active
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                {department.active ? 'Active' : 'Inactive'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600">Total Departments</div>
          <div className="text-2xl font-bold text-gray-900">{departments.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600">Active Departments</div>
          <div className="text-2xl font-bold text-green-600">
            {departments.filter(dept => dept.active).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600">Inactive Departments</div>
          <div className="text-2xl font-bold text-red-600">
            {departments.filter(dept => !dept.active).length}
          </div>
        </div>
      </div>

      {/* Department Form Modal */}
      {showForm && (
        <DepartmentForm
          department={editingDepartment}
          onSave={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default DepartmentsManager;