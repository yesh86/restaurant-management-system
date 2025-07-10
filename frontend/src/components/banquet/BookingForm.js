import React, { useState, useEffect } from 'react';
import { X, Calendar, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const BookingForm = ({ booking, onSave, onCancel }) => {
  const { createBooking, loadBookings } = useApp();
  const [formData, setFormData] = useState({
    customer_name: '',
    contact_number: '',
    email: '',
    booking_date: '',
    event_type: 'Wedding',
    other_event_details: '',
    time_slot: 'Dinner',
    hall: 'Iris',
    pax: '',
    menu_type: 'Veg Standard',
    menu_price: '',
    hall_rent: '',
    food_total: '',
    total_amount: '',
    discount: '',

    // Advance Payment 1
    advance1_amount: '',
    advance1_date: '',
    advance1_method: 'Cash',
    advance1_receipt: '',

    // Advance Payment 2
    advance2_amount: '',
    advance2_date: '',
    advance2_method: 'Cash',
    advance2_receipt: '',

    // Advance Payment 3
    advance3_amount: '',
    advance3_date: '',
    advance3_method: 'Cash',
    advance3_receipt: '',

    // Final Payment
    final_amount: '',
    final_date: '',
    final_method: 'Cash',
    final_receipt: '',

    status: 'Not Paid',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const timeSlots = ['Breakfast', 'Lunch', 'Dinner'];
  const halls = ['Iris', 'Orchid', 'Both', 'ODC'];
  const eventTypes = ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Conference', 'Other'];
  const menuTypes = ['Veg Basic', 'Veg Standard', 'Veg Special', 'Non-Veg Basic', 'Non-Veg Standard', 'Non-Veg Special'];
  const paymentMethods = ['Cash', 'UPI', 'Online Bank Transfer'];

  useEffect(() => {
    if (booking) {
      setFormData({
        customer_name: booking.customer_name || '',
        contact_number: booking.contact_number || '',
        email: booking.email || '',
        booking_date: booking.booking_date || '',
        event_type: booking.event_type || 'Wedding',
        other_event_details: booking.other_event_details || '',
        time_slot: booking.time_slot || 'Dinner',
        hall: booking.hall || 'Iris',
        pax: booking.pax || '',
        menu_type: booking.menu_type || 'Veg Standard',
        menu_price: booking.menu_price || '',
        hall_rent: booking.hall_rent || '',
        food_total: booking.food_total || '',
        total_amount: booking.total_amount || '',
        discount: booking.discount || '',

        advance1_amount: booking.advance1_amount || '',
        advance1_date: booking.advance1_date || '',
        advance1_method: booking.advance1_method || 'Cash',
        advance1_receipt: booking.advance1_receipt || '',

        advance2_amount: booking.advance2_amount || '',
        advance2_date: booking.advance2_date || '',
        advance2_method: booking.advance2_method || 'Cash',
        advance2_receipt: booking.advance2_receipt || '',

        advance3_amount: booking.advance3_amount || '',
        advance3_date: booking.advance3_date || '',
        advance3_method: booking.advance3_method || 'Cash',
        advance3_receipt: booking.advance3_receipt || '',

        final_amount: booking.final_amount || '',
        final_date: booking.final_date || '',
        final_method: booking.final_method || 'Cash',
        final_receipt: booking.final_receipt || '',

        status: booking.status || 'Not Paid',
        notes: booking.notes || ''
      });
    }
  }, [booking]);

  // Simple change handler with specific auto-calculation for total amount and status
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate food total when PAX or price per person changes
      if (name === 'pax' || name === 'menu_price') {
        const pax = parseInt(name === 'pax' ? value : updated.pax) || 0;
        const price = parseFloat(name === 'menu_price' ? value : updated.menu_price) || 0;
        if (pax > 0 && price > 0) {
          updated.food_total = (pax * price).toString();
        }
      }

      // Auto-calculate total amount when food total or hall rent changes
      if (name === 'food_total' || name === 'hall_rent' || name === 'pax' || name === 'menu_price') {
        const foodTotal = parseFloat(name === 'food_total' ? value : updated.food_total) || 0;
        const hallRent = parseFloat(name === 'hall_rent' ? value : updated.hall_rent) || 0;
        updated.total_amount = (foodTotal + hallRent).toString();
      }

      // Auto-update status when payment amounts change
      if (name === 'total_amount' || name === 'discount' ||
          name === 'advance1_amount' || name === 'advance2_amount' ||
          name === 'advance3_amount' || name === 'final_amount') {

        const total = parseFloat(name === 'total_amount' ? value : updated.total_amount) || 0;
        const discount = parseFloat(name === 'discount' ? value : updated.discount) || 0;
        const advance1 = parseFloat(name === 'advance1_amount' ? value : updated.advance1_amount) || 0;
        const advance2 = parseFloat(name === 'advance2_amount' ? value : updated.advance2_amount) || 0;
        const advance3 = parseFloat(name === 'advance3_amount' ? value : updated.advance3_amount) || 0;
        const final = parseFloat(name === 'final_amount' ? value : updated.final_amount) || 0;

        const totalPaid = advance1 + advance2 + advance3 + final;
        const adjustedTotal = total - discount;
        const remaining = Math.max(0, adjustedTotal - totalPaid);

        // Auto-update status
        if (adjustedTotal > 0) {
          if (remaining === 0) {
            updated.status = 'Fully Paid';
          } else if (remaining > 0 && remaining < adjustedTotal) {
            updated.status = 'Partially Paid';
          } else if (remaining === adjustedTotal) {
            updated.status = 'Not Paid';
          }
        }
      }

      return updated;
    });
  };

  // Calculate values for display and auto-update status
  const calculateDisplayValues = () => {
    const total = parseFloat(formData.total_amount) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const advance1 = parseFloat(formData.advance1_amount) || 0;
    const advance2 = parseFloat(formData.advance2_amount) || 0;
    const advance3 = parseFloat(formData.advance3_amount) || 0;
    const final = parseFloat(formData.final_amount) || 0;

    const totalPaid = advance1 + advance2 + advance3 + final;
    const adjustedTotal = total - discount;
    const remaining = Math.max(0, adjustedTotal - totalPaid);

    // Auto-calculate status based on remaining amount
    let autoStatus = 'Not Paid';
    if (adjustedTotal > 0) {
      if (remaining === 0) {
        autoStatus = 'Fully Paid';
      } else if (remaining > 0 && remaining < adjustedTotal) {
        autoStatus = 'Partially Paid';
      } else if (remaining === adjustedTotal) {
        autoStatus = 'Not Paid';
      }
    }

    return { totalPaid, remaining, autoStatus };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        pax: parseInt(formData.pax),
        menu_price: parseFloat(formData.menu_price) || 0,
        hall_rent: parseFloat(formData.hall_rent) || 0,
        food_total: parseFloat(formData.food_total) || 0,
        total_amount: parseFloat(formData.total_amount) || 0,
        discount: parseFloat(formData.discount) || 0,

        advance1_amount: parseFloat(formData.advance1_amount) || 0,
        advance2_amount: parseFloat(formData.advance2_amount) || 0,
        advance3_amount: parseFloat(formData.advance3_amount) || 0,
        final_amount: parseFloat(formData.final_amount) || 0
      };

      if (booking) {
        // Update logic would go here
        console.log('Update booking:', bookingData);
      } else {
        await createBooking(bookingData);
        await loadBookings();
      }

      onSave();
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Error saving booking: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const displayValues = calculateDisplayValues();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {booking ? 'Edit Booking' : 'Create New Booking'}
          </h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <Calendar className="mr-2" size={20} />
              Customer Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                <input
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-800 mb-3">Event Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Booking Date *</label>
                <input
                  type="date"
                  name="booking_date"
                  value={formData.booking_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {formData.event_type === 'Other' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Details *</label>
                <input
                  type="text"
                  name="other_event_details"
                  value={formData.other_event_details}
                  onChange={handleChange}
                  placeholder="Please specify the event type"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={formData.event_type === 'Other'}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot *</label>
                <select
                  name="time_slot"
                  value={formData.time_slot}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hall *</label>
                <select
                  name="hall"
                  value={formData.hall}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {halls.map(hall => (
                    <option key={hall} value={hall}>{hall}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of PAX *</label>
                <input
                  type="number"
                  name="pax"
                  value={formData.pax}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Menu Type</label>
                <select
                  name="menu_type"
                  value={formData.menu_type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {menuTypes.map(menu => (
                    <option key={menu} value={menu}>{menu}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Person (₹)</label>
                <input
                  type="number"
                  name="menu_price"
                  value={formData.menu_price}
                  onChange={handleChange}
                  placeholder="Enter price per person"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hall Rent (₹)</label>
                <input
                  type="number"
                  name="hall_rent"
                  value={formData.hall_rent}
                  onChange={handleChange}
                  placeholder="Enter hall rent"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount for Food (₹)</label>
                <input
                  type="number"
                  name="food_total"
                  value={formData.food_total}
                  onChange={handleChange}
                  placeholder="Auto-calculated"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  min="0"
                  step="0.01"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grand Total (₹)</label>
                <input
                  type="number"
                  name="total_amount"
                  value={formData.total_amount}
                  onChange={handleChange}
                  placeholder="Food + Hall Rent"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  min="0"
                  step="0.01"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  disabled
                >
                  <option value="Not Paid">Not Paid</option>
                  <option value="Partially Paid">Partially Paid</option>
                  <option value="Fully Paid">Fully Paid</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Auto-calculated based on payments</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <CreditCard className="mr-2" size={20} />
              Payment Details
            </h4>

            <div className="space-y-4">
              {/* Advance Payment 1 */}
              <div className="bg-blue-50 p-4 rounded-lg border">
                <h4 className="text-md font-medium text-gray-700 mb-3">Advance Payment 1</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      name="advance1_amount"
                      value={formData.advance1_amount}
                      onChange={handleChange}
                      placeholder="Enter advance payment 1 amount"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                    <input
                      type="date"
                      name="advance1_date"
                      value={formData.advance1_date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Number</label>
                    <input
                      type="text"
                      name="advance1_receipt"
                      value={formData.advance1_receipt}
                      onChange={handleChange}
                      placeholder="Enter receipt number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <div className="flex space-x-4">
                    {paymentMethods.map(method => (
                      <label key={method} className="flex items-center">
                        <input
                          type="radio"
                          name="advance1_method"
                          value={method}
                          checked={formData.advance1_method === method}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advance Payment 2 */}
              <div className="bg-yellow-50 p-4 rounded-lg border">
                <h4 className="text-md font-medium text-gray-700 mb-3">Advance Payment 2</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      name="advance2_amount"
                      value={formData.advance2_amount}
                      onChange={handleChange}
                      placeholder="Enter advance payment 2 amount"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                    <input
                      type="date"
                      name="advance2_date"
                      value={formData.advance2_date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Number</label>
                    <input
                      type="text"
                      name="advance2_receipt"
                      value={formData.advance2_receipt}
                      onChange={handleChange}
                      placeholder="Enter receipt number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <div className="flex space-x-4">
                    {paymentMethods.map(method => (
                      <label key={method} className="flex items-center">
                        <input
                          type="radio"
                          name="advance2_method"
                          value={method}
                          checked={formData.advance2_method === method}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advance Payment 3 */}
              <div className="bg-purple-50 p-4 rounded-lg border">
                <h4 className="text-md font-medium text-gray-700 mb-3">Advance Payment 3</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      name="advance3_amount"
                      value={formData.advance3_amount}
                      onChange={handleChange}
                      placeholder="Enter advance payment 3 amount"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                    <input
                      type="date"
                      name="advance3_date"
                      value={formData.advance3_date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Number</label>
                    <input
                      type="text"
                      name="advance3_receipt"
                      value={formData.advance3_receipt}
                      onChange={handleChange}
                      placeholder="Enter receipt number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <div className="flex space-x-4">
                    {paymentMethods.map(method => (
                      <label key={method} className="flex items-center">
                        <input
                          type="radio"
                          name="advance3_method"
                          value={method}
                          checked={formData.advance3_method === method}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Discount Field */}
              <div className="bg-orange-50 p-4 rounded-lg border">
                <h4 className="text-md font-medium text-gray-700 mb-3">Discount</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Amount (₹)</label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      placeholder="Enter discount amount"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="flex items-end">
                    <p className="text-sm text-gray-600">
                      Discount amount (manually enter final payment amount below)
                    </p>
                  </div>
                </div>
              </div>

              {/* Final Payment */}
              <div className="bg-green-100 p-4 rounded-lg border">
                <h4 className="text-md font-medium text-gray-700 mb-3">Final Payment</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      name="final_amount"
                      value={formData.final_amount}
                      onChange={handleChange}
                      placeholder="Enter final payment amount"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                    <input
                      type="date"
                      name="final_date"
                      value={formData.final_date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Number</label>
                    <input
                      type="text"
                      name="final_receipt"
                      value={formData.final_receipt}
                      onChange={handleChange}
                      placeholder="Enter receipt number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <div className="flex space-x-4">
                    {paymentMethods.map(method => (
                      <label key={method} className="flex items-center">
                        <input
                          type="radio"
                          name="final_method"
                          value={method}
                          checked={formData.final_method === method}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="mt-6 bg-white p-4 rounded-lg border-2 border-gray-200">
              <h5 className="text-md font-medium text-gray-800 mb-3">Payment Summary</h5>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Food Total:</p>
                  <p className="text-lg font-bold text-blue-600">₹{(parseFloat(formData.food_total) || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hall Rent:</p>
                  <p className="text-lg font-bold text-purple-600">₹{(parseFloat(formData.hall_rent) || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount:</p>
                  <p className="text-lg font-bold text-gray-900">₹{(parseFloat(formData.total_amount) || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Discount:</p>
                  <p className="text-lg font-bold text-orange-600">₹{(parseFloat(formData.discount) || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Paid:</p>
                  <p className="text-lg font-bold text-green-600">₹{displayValues.totalPaid.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Remaining:</p>
                  <p className="text-lg font-bold text-red-600">₹{displayValues.remaining.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-600">Status:</p>
                <p className={`text-lg font-bold ${
                  formData.status === 'Fully Paid' ? 'text-green-600' :
                  formData.status === 'Partially Paid' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {formData.status}
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Add any special requirements or notes..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : (booking ? 'Update Booking' : 'Create Booking')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;