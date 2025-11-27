import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

const CancellationModal = ({ booking, onClose, onConfirm }) => {
  const [refundAmount, setRefundAmount] = useState(booking.paid_amount || 0);
  const [cancellationReason, setCancellationReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPaid = parseFloat(booking.paid_amount) || 0;
  const cancellationFee = totalPaid - parseFloat(refundAmount || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await onConfirm({
        refund_amount: parseFloat(refundAmount) || 0,
        cancellation_reason: cancellationReason
      });
    } catch (error) {
      console.error('Cancellation error:', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Cancel Booking</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Booking Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">{booking.customer_name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Event: {booking.event_type}</p>
                <p>Event Date: {new Date(booking.event_date).toLocaleDateString()}</p>
                <p className="font-semibold text-gray-900">
                  Total Paid: ₹{totalPaid.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Refund Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refund Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">₹</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter the amount to refund to the customer
              </p>
            </div>

            {/* Cancellation Fee Summary */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Cancellation Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid:</span>
                  <span className="font-medium">₹{totalPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Refund to Customer:</span>
                  <span className="font-medium text-green-600">
                    ₹{parseFloat(refundAmount || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-200">
                  <span className="text-gray-900 font-semibold">Cancellation Fee (Kept):</span>
                  <span className="font-bold text-blue-600">
                    ₹{cancellationFee.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Cancellation Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Reason (Optional)
              </label>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter reason for cancellation..."
              />
            </div>

            {/* Warning */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> This action cannot be undone. The booking will be marked as cancelled.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
              Keep Booking
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cancelling...' : 'Cancel Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancellationModal;