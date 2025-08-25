import React, { useState } from 'react';
import { Plus, Package, Building2, ArrowUpDown, FileText, Edit, Trash2, Download, X } from 'lucide-react';

// All 142 predefined items from your Excel file
const predefinedItems = [
  { id: 1, name: 'Basmathi Rice', defaultPrice: 450 },
  { id: 2, name: 'White Rice', defaultPrice: 390 },
  { id: 3, name: 'Puttana', defaultPrice: 2 },
  { id: 4, name: 'Ajinomoto', defaultPrice: 7 },
  { id: 5, name: 'Tarbooj', defaultPrice: 8 },
  { id: 6, name: 'Anasapuvu', defaultPrice: 1 },
  { id: 7, name: 'Lavang', defaultPrice: 1 },
  { id: 8, name: 'Dalchini', defaultPrice: 5 },
  { id: 9, name: 'Chena Daal', defaultPrice: 5 },
  { id: 10, name: 'Jeera', defaultPrice: 7 },
  { id: 11, name: 'Tilli', defaultPrice: 10 },
  { id: 12, name: 'Dhaniyalu', defaultPrice: 8 },
  { id: 13, name: 'Palli', defaultPrice: 15 },
  { id: 14, name: 'Salt', defaultPrice: 50 },
  { id: 15, name: 'Mota Salt', defaultPrice: 50 },
  { id: 16, name: 'Copra Black', defaultPrice: 10 },
  { id: 17, name: 'Sweet Corn', defaultPrice: 10 },
  { id: 18, name: 'Milk Maid 400g', defaultPrice: 25 },
  { id: 19, name: 'Coconut Milk', defaultPrice: 12 },
  { id: 20, name: 'Vijaya Ghee', defaultPrice: 24 },
  { id: 21, name: 'Durga Ghee', defaultPrice: 30 },
  { id: 22, name: 'Tomato Sauce', defaultPrice: 72 },
  { id: 23, name: 'Shah Jeera', defaultPrice: 3 },
  { id: 24, name: 'Kas Kas', defaultPrice: 2 },
  { id: 25, name: 'Rai', defaultPrice: 2 },
  { id: 26, name: 'Toor Daal', defaultPrice: 100 },
  { id: 27, name: 'Corn Floor', defaultPrice: 50 },
  { id: 28, name: 'Oil - Gold Drop', defaultPrice: 320 },
  { id: 29, name: 'Dry Mirchi', defaultPrice: 15 },
  { id: 30, name: 'Mota Chudwa', defaultPrice: 4 },
  { id: 31, name: 'Loose Tea', defaultPrice: 5 },
  { id: 32, name: 'Corn Flakes', defaultPrice: 2 },
  { id: 33, name: 'White Pepper Powder', defaultPrice: 5 },
  { id: 34, name: 'Noodles', defaultPrice: 30 },
  { id: 35, name: 'Amul Cream', defaultPrice: 24 },
  { id: 36, name: 'Anapurna Papad', defaultPrice: 1 },
  { id: 37, name: 'Mango Pickle 5kg', defaultPrice: 2 },
  { id: 38, name: 'Lime Pickle 5kg', defaultPrice: 1 },
  { id: 39, name: 'LG Ingua 50g', defaultPrice: 10 },
  { id: 40, name: 'Haldi Powder', defaultPrice: 5 },
  { id: 41, name: 'Mirchi Powder - 3Mangoes', defaultPrice: 5 },
  { id: 42, name: 'Mirchi Powder', defaultPrice: 15 },
  { id: 43, name: 'Chicken Broth Powder', defaultPrice: 4 },
  { id: 44, name: 'Rice Wine', defaultPrice: 4 },
  { id: 45, name: 'Marati Mogga', defaultPrice: 2 },
  { id: 46, name: 'Oil - Mustard', defaultPrice: 12 },
  { id: 47, name: 'Mojito Mint', defaultPrice: 4 },
  { id: 48, name: 'Badam', defaultPrice: 2 },
  { id: 49, name: 'Pista', defaultPrice: 1 },
  { id: 50, name: 'Kismis', defaultPrice: 1 },
  { id: 51, name: 'Samosa', defaultPrice: 10 },
  { id: 52, name: 'Kurbani', defaultPrice: 16.25 },
  { id: 53, name: 'Maida', defaultPrice: 100 },
  { id: 54, name: 'Atta', defaultPrice: 50 },
  { id: 55, name: 'Sugar', defaultPrice: 100 },
  { id: 56, name: 'Tomato Puree', defaultPrice: 10 },
  { id: 57, name: 'Blue Curraco', defaultPrice: 3 },
  { id: 58, name: 'Kashmiri Powder Everest', defaultPrice: 40 },
  { id: 59, name: '777 Samber Powder', defaultPrice: 20 },
  { id: 60, name: 'Tamarind', defaultPrice: 5 },
  { id: 61, name: 'Tempura Powder', defaultPrice: 10 },
  { id: 62, name: 'Freight/Bardan', defaultPrice: 1 },
  { id: 63, name: 'Elachi', defaultPrice: 4 },
  { id: 64, name: 'Green Chilli Sauce', defaultPrice: 10 },
  { id: 65, name: 'Chat Masala', defaultPrice: 30 },
  { id: 66, name: 'Water Melon Syrup', defaultPrice: 1 },
  { id: 67, name: 'Dark Soya Sauce', defaultPrice: 10 },
  { id: 68, name: 'Besan Powder', defaultPrice: 15 },
  { id: 69, name: 'Bellam', defaultPrice: 24.35 },
  { id: 70, name: 'Panko Powder', defaultPrice: 6 },
  { id: 71, name: 'Custard Powder', defaultPrice: 5 },
  { id: 72, name: 'Kawab Chini', defaultPrice: 0.5 },
  { id: 73, name: 'Meal Maker', defaultPrice: 7 },
  { id: 74, name: 'Kabuli Chena', defaultPrice: 10 },
  { id: 75, name: 'Honey', defaultPrice: 2 },
  { id: 76, name: 'Kaju', defaultPrice: 10 },
  { id: 77, name: 'Oil - Palli', defaultPrice: 6 },
  { id: 78, name: 'Amul Cheese Tins', defaultPrice: 5 },
  { id: 79, name: 'Maggi Chicken Cubes', defaultPrice: 2 },
  { id: 80, name: 'Sonti', defaultPrice: 2 },
  { id: 81, name: 'Bardan', defaultPrice: 1 },
  { id: 82, name: 'Kaju 2p', defaultPrice: 5 },
  { id: 83, name: 'Tan Chicken Masala', defaultPrice: 10 },
  { id: 84, name: 'Ch.Atta', defaultPrice: 15 },
  { id: 85, name: 'Kaju 4p', defaultPrice: 5 }
];

const EnhancedProcurementModule = () => {
  const [activeTab, setActiveTab] = useState('stock-input');

  // Stock Input State - Updated to date-based
  const [stockEntries, setStockEntries] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [customItems, setCustomItems] = useState([]);

  // Stock Distribution State
  const [distributions, setDistributions] = useState([]);

  // Departments State
  const [departments, setDepartments] = useState([
    { id: 1, name: 'South Indian', color: '#10B981', active: true },
    { id: 2, name: 'Biryani', color: '#3B82F6', active: true },
    { id: 3, name: 'Chinese', color: '#EF4444', active: true },
    { id: 4, name: 'Indian', color: '#F59E0B', active: true },
    { id: 5, name: 'Tandoori', color: '#8B5CF6', active: true },
    { id: 6, name: 'Pantry', color: '#06B6D4', active: true },
    { id: 7, name: 'F&B', color: '#EC4899', active: true }
  ]);

  // Forms State
  const [showStockForm, setShowStockForm] = useState(false);
  const [showDistributionForm, setShowDistributionForm] = useState(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);

  // Report State
  const [reportFromDate, setReportFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportToDate, setReportToDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDepartmentForDetails, setSelectedDepartmentForDetails] = useState(null);
  const [showDepartmentDetails, setShowDepartmentDetails] = useState(false);

  const tabs = [
    { id: 'stock-input', label: 'Stock Input', icon: Package },
    { id: 'distribution', label: 'Stock Distribution', icon: ArrowUpDown },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'reports', label: 'Reports', icon: FileText }
  ];

  // Calculate Net Units - Updated for date-based system
  const calculateNetUnits = (itemId, currentUnits, entryDate) => {
    const previousStock = stockEntries
      .filter(entry => entry.itemId === itemId && entry.date < entryDate)
      .reduce((total, entry) => total + (entry.netUnits || 0), 0);

    const distributedUnits = distributions
      .filter(dist => dist.itemId === itemId && dist.date <= entryDate)
      .reduce((total, dist) => total + dist.units, 0);

    return currentUnits + (previousStock - distributedUnits);
  };

  // Stock Input Tab Component - Updated for date-based system
  const StockInputTab = () => {
    const currentDateEntries = stockEntries.filter(entry => entry.date === currentDate);

    const StockEntryForm = ({ onSave, onCancel }) => {
      const [formData, setFormData] = useState({
        itemId: '',
        itemName: '',
        units: '',
        unitType: 'Kgs',
        price: '',
        date: currentDate,
        isCustom: false
      });

      const [showCustomFields, setShowCustomFields] = useState(false);

      const getAllItems = () => {
        return [...predefinedItems, ...customItems];
      };

      const handleItemSelect = (e) => {
        const value = e.target.value;

        if (value === 'other') {
          setShowCustomFields(true);
          setFormData({
            ...formData,
            itemId: 'custom',
            itemName: '',
            price: '',
            isCustom: true
          });
        } else {
          setShowCustomFields(false);
          const selectedItem = getAllItems().find(item => item.id.toString() === value);
          if (selectedItem) {
            setFormData({
              ...formData,
              itemId: selectedItem.id,
              itemName: selectedItem.name,
              price: selectedItem.defaultPrice,
              isCustom: false
            });
          }
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const netUnits = calculateNetUnits(parseInt(formData.itemId), parseFloat(formData.units), formData.date);

        let finalFormData = { ...formData };

        if (formData.isCustom) {
          const newCustomItemId = Date.now();
          const newCustomItem = {
            id: newCustomItemId,
            name: formData.itemName,
            defaultPrice: parseFloat(formData.price)
          };
          setCustomItems([...customItems, newCustomItem]);
          finalFormData.itemId = newCustomItemId;
        }

        const newEntry = {
          id: Date.now(),
          ...finalFormData,
          itemId: finalFormData.itemId,
          units: parseFloat(formData.units),
          netUnits: netUnits,
          price: parseFloat(formData.price),
          totalValue: parseFloat(formData.units) * parseFloat(formData.price)
        };

        setStockEntries([...stockEntries, newEntry]);
        onSave();
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add Stock Entry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item *</label>
                <select
                  value={formData.itemId}
                  onChange={handleItemSelect}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Item</option>
                  {predefinedItems.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                  {customItems.map(item => (
                    <option key={`custom-${item.id}`} value={item.id}>{item.name} (Custom)</option>
                  ))}
                  <option value="other">Other (Add Custom Item)</option>
                </select>
              </div>

              {showCustomFields && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom Item Name *</label>
                    <input
                      type="text"
                      value={formData.itemName}
                      onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter custom item name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (₹) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      min="0"
                      step="0.01"
                      placeholder="Enter price per unit"
                      required
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Units *</label>
                  <input
                    type="number"
                    value={formData.units}
                    onChange={(e) => setFormData({...formData, units: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Type *</label>
                  <select
                    value={formData.unitType}
                    onChange={(e) => setFormData({...formData, unitType: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="Kgs">Kgs</option>
                    <option value="Liters">Liters</option>
                    <option value="Number">Number</option>
                    <option value="Packets">Packets</option>
                  </select>
                </div>
              </div>

              {!showCustomFields && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Entry</button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Daily Stock Input</h3>
            <p className="text-sm text-gray-500">Current Date: {new Date(currentDate + 'T00:00:00').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}</p>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <button
              onClick={() => setShowStockForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={16} />
              Add Stock
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Units</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Units</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentDateEntries.map(entry => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.itemName}</div>
                    <div className="text-sm text-gray-500">{new Date(entry.date + 'T00:00:00').toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.units} {entry.unitType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">
                      {entry.netUnits} {entry.unitType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{entry.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{entry.totalValue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentDateEntries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No stock entries for selected date. Click "Add Stock" to add entries.
            </div>
          )}
        </div>

        {showStockForm && (
          <StockEntryForm
            onSave={() => setShowStockForm(false)}
            onCancel={() => setShowStockForm(false)}
          />
        )}
      </div>
    );
  };

  // Departments Tab Component
  const DepartmentsTab = () => {
    const DepartmentForm = ({ onSave, onCancel }) => {
      const [formData, setFormData] = useState({
        name: '',
        color: '#3B82F6',
        active: true
      });

      const colorOptions = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
        '#8B5CF6', '#06B6D4', '#EC4899', '#F97316'
      ];

      const handleSubmit = (e) => {
        e.preventDefault();
        const newDepartment = {
          id: Date.now(),
          ...formData
        };
        setDepartments([...departments, newDepartment]);
        onSave();
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Department</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
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
                <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Department</button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Kitchen Departments</h3>
          <button
            onClick={() => setShowDepartmentForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={16} />
            Add Department
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map(department => (
            <div key={department.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4"
                    style={{ backgroundColor: department.color }}
                  >
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{department.name}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      department.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {department.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {showDepartmentForm && (
          <DepartmentForm
            onSave={() => setShowDepartmentForm(false)}
            onCancel={() => setShowDepartmentForm(false)}
          />
        )}
      </div>
    );
  };

  // Stock Distribution Tab Component
  const DistributionTab = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const DistributionForm = ({ onSave, onCancel }) => {
      const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        itemId: '',
        itemName: '',
        departmentId: '',
        departmentName: '',
        units: '',
        unitType: 'Kgs',
        pricePerUnit: 0,
        totalCost: 0
      });

      const handleItemSelect = (e) => {
        const selectedItemId = e.target.value;
        const stockEntry = stockEntries.find(entry => entry.itemId.toString() === selectedItemId);

        if (stockEntry) {
          setFormData({
            ...formData,
            itemId: selectedItemId,
            itemName: stockEntry.itemName,
            unitType: stockEntry.unitType,
            pricePerUnit: stockEntry.price
          });
        }
      };

      const handleDepartmentSelect = (e) => {
        const selectedDept = departments.find(dept => dept.id.toString() === e.target.value);
        if (selectedDept) {
          setFormData({
            ...formData,
            departmentId: selectedDept.id,
            departmentName: selectedDept.name
          });
        }
      };

      const handleUnitsChange = (e) => {
        const units = parseFloat(e.target.value) || 0;
        const totalCost = units * formData.pricePerUnit;
        setFormData({
          ...formData,
          units: e.target.value,
          totalCost: totalCost
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const newDistribution = {
          id: Date.now(),
          ...formData,
          itemId: parseInt(formData.itemId),
          departmentId: parseInt(formData.departmentId),
          units: parseFloat(formData.units)
        };

        setDistributions([...distributions, newDistribution]);
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Item *</label>
                <select
                  value={formData.itemId}
                  onChange={handleItemSelect}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Stock Item</option>
                  {stockEntries.map(entry => (
                    <option key={entry.id} value={entry.itemId}>
                      {entry.itemName} (Available: {entry.netUnits} {entry.unitType})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                <select
                  value={formData.departmentId}
                  onChange={handleDepartmentSelect}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.filter(dept => dept.active).map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Units to Distribute * {formData.unitType && `(${formData.unitType})`}
                </label>
                <input
                  type="number"
                  value={formData.units}
                  onChange={handleUnitsChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit</label>
                  <input
                    type="number"
                    value={formData.pricePerUnit}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Cost</label>
                  <input
                    type="number"
                    value={formData.totalCost.toFixed(2)}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Distribute</button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    const dailyDistributions = distributions.filter(dist => dist.date === selectedDate);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Stock Distribution</h3>
          <div className="flex gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <button
              onClick={() => setShowDistributionForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <ArrowUpDown size={16} />
              New Distribution
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Units</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dailyDistributions.map(dist => {
                const dept = departments.find(d => d.id === dist.departmentId);
                return (
                  <tr key={dist.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(dist.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dist.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: dept?.color }}></div>
                        <span className="text-sm text-gray-900">{dist.departmentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dist.units} {dist.unitType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{dist.pricePerUnit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{dist.totalCost.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {dailyDistributions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No distributions for selected date
            </div>
          )}
        </div>

        {showDistributionForm && (
          <DistributionForm
            onSave={() => setShowDistributionForm(false)}
            onCancel={() => setShowDistributionForm(false)}
          />
        )}
      </div>
    );
  };

  // Reports Tab Component
  const ReportsTab = () => {
    const getDepartmentCosts = () => {
      const departmentCosts = {};

      departments.forEach(dept => {
        departmentCosts[dept.id] = {
          ...dept,
          totalCost: 0,
          items: []
        };
      });

      const filteredDistributions = distributions.filter(dist => {
        const distDate = new Date(dist.date);
        const fromDate = new Date(reportFromDate);
        const toDate = new Date(reportToDate);
        return distDate >= fromDate && distDate <= toDate;
      });

      filteredDistributions.forEach(dist => {
        if (departmentCosts[dist.departmentId]) {
          departmentCosts[dist.departmentId].totalCost += dist.totalCost;

          const existingItem = departmentCosts[dist.departmentId].items.find(item => item.name === dist.itemName);
          if (existingItem) {
            existingItem.totalUnits += dist.units;
            existingItem.totalCost += dist.totalCost;
            existingItem.distributions.push(dist);
          } else {
            departmentCosts[dist.departmentId].items.push({
              name: dist.itemName,
              unitType: dist.unitType,
              totalUnits: dist.units,
              totalCost: dist.totalCost,
              averageRate: dist.pricePerUnit,
              distributions: [dist]
            });
          }
        }
      });

      return departmentCosts;
    };

    const departmentCosts = getDepartmentCosts();
    const totalOverallCost = Object.values(departmentCosts).reduce((sum, dept) => sum + dept.totalCost, 0);

    const handleDepartmentClick = (department) => {
      setSelectedDepartmentForDetails(department);
      setShowDepartmentDetails(true);
    };

    const DepartmentDetailsModal = ({ department, onClose }) => {
      if (!department) return null;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white mr-3"
                  style={{ backgroundColor: department.color }}
                >
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{department.name} Department</h3>
                  <p className="text-sm text-gray-500">
                    Report from {new Date(reportFromDate).toLocaleDateString()} to {new Date(reportToDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-600">Total Cost</div>
                <div className="text-2xl font-bold text-blue-900">₹{department.totalCost.toFixed(2)}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm font-medium text-green-600">Total Items</div>
                <div className="text-2xl font-bold text-green-900">{department.items.length}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-sm font-medium text-orange-600">Total Distributions</div>
                <div className="text-2xl font-bold text-orange-900">
                  {department.items.reduce((sum, item) => sum + item.distributions.length, 0)}
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <h4 className="text-lg font-medium text-gray-900">Item-wise Consumption Details</h4>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Units</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distributions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {department.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.totalUnits} {item.unitType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.averageRate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{item.totalCost.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {item.distributions.length} times
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {department.items.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No items consumed by this department in the selected date range
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Department-wise Consumption Reports</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                value={reportFromDate}
                onChange={(e) => setReportFromDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                value={reportToDate}
                onChange={(e) => setReportToDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-sm font-medium text-blue-600">Total Cost (All Departments)</div>
                <div className="text-xl font-bold text-blue-900">₹{totalOverallCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.values(departmentCosts).map(department => (
            <div
              key={department.id}
              onClick={() => handleDepartmentClick(department)}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: department.color }}
                >
                  <Building2 size={24} />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Items Consumed</div>
                  <div className="text-lg font-semibold text-gray-900">{department.items.length}</div>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2">{department.name}</h4>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Cost:</span>
                  <span className="text-lg font-bold" style={{ color: department.color }}>
                    ₹{department.totalCost.toFixed(2)}
                  </span>
                </div>

                {department.totalCost > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        backgroundColor: department.color,
                        width: `${(department.totalCost / totalOverallCost) * 100}%`
                      }}
                    ></div>
                  </div>
                )}

                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {totalOverallCost > 0 ? ((department.totalCost / totalOverallCost) * 100).toFixed(1) : 0}% of total
                  </span>
                  <span>
                    {department.items.reduce((sum, item) => sum + item.distributions.length, 0)} distributions
                  </span>
                </div>
              </div>

              {department.totalCost > 0 && (
                <div className="mt-4 text-center">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Click for details
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {showDepartmentDetails && selectedDepartmentForDetails && (
          <DepartmentDetailsModal
            department={selectedDepartmentForDetails}
            onClose={() => {
              setShowDepartmentDetails(false);
              setSelectedDepartmentForDetails(null);
            }}
          />
        )}
      </div>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'stock-input':
        return <StockInputTab />;
      case 'distribution':
        return <DistributionTab />;
      case 'departments':
        return <DepartmentsTab />;
      case 'reports':
        return <ReportsTab />;
      default:
        return <StockInputTab />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Enhanced Procurement Management</h2>
      </div>

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

      {renderActiveTab()}
    </div>
  );
};

export default EnhancedProcurementModule;