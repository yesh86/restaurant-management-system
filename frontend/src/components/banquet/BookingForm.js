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
    total_amount: '',

    // Advance Payment 1
    advance1_amount: '',
    advance1_date: '',
    advance1_method: 'Cash',

    // Advance Payment 2
    advance2_amount: '',
    advance2_date: '',
    advance2_method: 'Cash',

    // Advance Payment 3
    advance3_amount: '',
    advance3_date: '',
    advance3_method: 'Cash',

    // Final Payment
    final_amount: '',
    final_date: '',
    final_method: 'Cash',

    status: 'Confirmed',
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
        total_amount: booking.total_amount || '',

        advance1_amount: booking.advance1_amount || '',
        advance1_date: booking.advance1_date || '',
        advance1_method: booking.advance1_method || 'Cash',

        advance2_amount: booking.advance2_amount || '',
        advance2_date: booking.advance2_date || '',
        advance2_method: booking.advance2_method || 'Cash',

        advance3_amount: booking.advance3_amount || '',
        advance3_date: booking.advance3_date || '',
        advance3_method: booking.advance3_method || 'Cash',

        final_amount: booking.final_amount || '',
        final_date: booking.final_date || '',
        final_method: booking.final_method || 'Cash',

        status: booking.status || 'Confirmed',
        notes: booking.notes || ''
      });
    }
  }, [booking]);

  const calculateTotalPaid = () => {
    const advance1 = parseFloat(formData.advance1_amount) || 0;
    const advance2 = parseFloat(formData.advance2_amount) || 0;
    const advance3 = parseFloat(formData.advance3_amount) || 0;
    const final = parseFloat(formData.final_amount) || 0;
    return advance1 + advance2 + advance3 + final;
  };

  const calculateRemaining = () => {
    const total = parseFloat(formData.total_amount) || 0;
    const paid = calculateTotalPaid();
    return total - paid;
  };

  const getPaymentStatus = () => {
    const total = parseFloat(formData.total_amount) || 0;
    const paid = calculateTotalPaid();

    if (total === 0) return 'Not Set';
    if (paid === 0) return 'Unpaid';
    if (paid >= total) return 'Fully Paid';
    return 'Partially Paid';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        pax: parseInt(formData.pax),
        menu_price: parseFloat(formData.menu_price) || 0,
        total_amount: parseFloat(formData.total_amount) || 0,

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const PaymentRow = ({ title, amountField, dateField, methodField, bgColor = "bg-gray-50" }) => (
    <div className={`${bgColor} p-4 rounded-lg border`}>
      <h4 className="text-md font-medium text-gray-700 mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
          <input
            type="number"
            name={amountField}
            value={formData[amountField]}
            onChange={handleChange}
            placeholder={`Enter ${title.toLowerCase()} amount`}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
          <input
            type="date"
            name={dateField}
            value={formData[dateField]}
            onChange={handleChange}
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
                name={methodField}
                value={method}
                checked={formData[methodField] === method}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{method}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <CreditCard className="mr-2" size={20} />
              Payment Details
            </h4>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₹) *</label>
              <input
                type="number"
                name="total_amount"
                value={formData.total_amount}
                onChange={handleChange}
                placeholder="Enter total booking amount"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-4">
              <PaymentRow
                title="Advance Payment 1"
                amountField="advance1_amount"
                dateField="advance1_date"
                methodField="advance1_method"
                bgColor="bg-blue-50"
              />

              <PaymentRow
                title="Advance Payment 2"
                amountField="advance2_amount"
                dateField="advance2_date"
                methodField="advance2_method"
                bgColor="bg-yellow-50"
              />

              <PaymentRow
                title="Advance Payment 3"
                amountField="advance3_amount"
                dateField="advance3_date"
                methodField="advance3_method"
                bgColor="bg-purple-50"
              />

              <PaymentRow
                title="Final Payment"
                amountField="final_amount"
                dateField="final_date"
                methodField="final_method"
                bgColor="bg-green-100"
              />
            </div>

            {/* Payment Summary */}
            <div className="mt-6 bg-white p-4 rounded-lg border-2 border-gray-200">
              <h5 className="text-md font-medium text-gray-800 mb-3">Payment Summary</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Total Amount:</p>
                  <p className="text-lg font-bold text-gray-900">₹{(parseFloat(formData.total_amount) || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Paid:</p>
                  <p className="text-lg font-bold text-green-600">₹{calculateTotalPaid().toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Remaining:</p>
                  <p className="text-lg font-bold text-red-600">₹{calculateRemaining().toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status:</p>
                  <p className={`text-sm font-bold ${
                    getPaymentStatus() === 'Fully Paid' ? 'text-green-600' :
                    getPaymentStatus() === 'Partially Paid' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {getPaymentStatus()}
                  </p>
                </div>
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