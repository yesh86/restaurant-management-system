import React from 'react';
import { Calendar, Plus } from 'lucide-react';

const CalendarView = ({ bookings, onCreateBooking }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Calendar View</h3>
        <button
          onClick={onCreateBooking}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          New Booking
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 text-center">
        <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Calendar View Coming Soon</h3>
        <p className="mt-2 text-gray-600">
          Full calendar integration will be available in the next update.
        </p>
        <p className="mt-1 text-gray-500">
          For now, you can create bookings using the "New Booking" button.
        </p>

        <div className="mt-6">
          <button
            onClick={onCreateBooking}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
          >
            <Plus size={20} />
            Create New Booking
          </button>
        </div>
      </div>

      {/* Show existing bookings */}
      {bookings && bookings.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="text-md font-medium text-gray-900">Upcoming Bookings</h4>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {bookings.slice(0, 5).map(booking => (
                <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{booking.customer_name}</p>
                    <p className="text-sm text-gray-600">
                      {booking.event_type} • {new Date(booking.booking_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.time_slot} • {booking.hall} • {booking.pax} PAX
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      ₹{(booking.total_amount || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;