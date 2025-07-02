import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import LoadingSpinner from '../common/LoadingSpinner';
import CategoryForm from './CategoryForm';

const CategoryManager = () => {
  const { categories, loading, error, createCategory } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      if (editingCategory) {
        // Update logic would go here
        console.log('Update category:', categoryData);
      } else {
        await createCategory(categoryData);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  if (loading) return <LoadingSpinner text="Loading categories..." />;

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading categories: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Categories Management</h3>
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                category.active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {category.active ? 'Active' : 'Inactive'}
              </span>
              <span className="text-xs text-gray-500">
                ID: {category.id}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* No categories message */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
          <div className="mt-6">
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <Plus className="inline-block mr-2" size={16} />
              Add Category
            </button>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default CategoryManager;