import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, TrendingUp, BarChart3, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import LoadingSpinner from '../common/LoadingSpinner';

const BanquetReports = () => {
  const { bookings, loading } = useApp();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [reportData, setReportData] = useState({
    totalEvents: 0,
    advancePayments: {
      total: 0,
      count: 0,
      events: []
    },
    finalPayments: {
      total: 0,
      count: 0,
      events: []
    }
  });

  // Set default month to current month
  useEffect(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(currentMonth);
  }, []);

  // Calculate report data when month or bookings change
  useEffect(() => {
    if (selectedMonth && bookings.length > 0) {
      calculateReportData();
    }
  }, [selectedMonth, bookings]);

  const calculateReportData = () => {
    const [year, month] = selectedMonth.split('-');
    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month, 0);

    // Get events booked in the selected month
    const eventsInMonth = bookings.filter(booking => {
      const bookingDate = new Date(booking.booking_date);
      return bookingDate >= monthStart && bookingDate <= monthEnd;
    });

    // Calculate advance payments received in this month
    const advancePayments = {
      total: 0,
      count: 0,
      events: []
    };

    // Calculate final payments received in this month
    const finalPayments = {
      total: 0,
      count: 0,
      events: []
    };

    bookings.forEach(booking => {
      // Check advance payments
      ['advance1', 'advance2', 'advance3'].forEach(advanceType => {
        const dateField = `${advanceType}_date`;
        const amountField = `${advanceType}_amount`;

        if (booking[dateField] && booking[amountField] > 0) {
          const paymentDate = new Date(booking[dateField]);
          if (paymentDate >= monthStart && paymentDate <= monthEnd) {
            advancePayments.total += parseFloat(booking[amountField]);
            advancePayments.count += 1;
            advancePayments.events.push({
              ...booking,
              paymentType: advanceType,
              amount: parseFloat(booking[amountField]),
              date: booking[dateField],
              method: booking[`${advanceType}_method`]
            });
          }
        }
      });

      // Check final payments
      if (booking.final_date && booking.final_amount > 0) {
        const paymentDate = new Date(booking.final_date);
        if (paymentDate >= monthStart && paymentDate <= monthEnd) {
          finalPayments.total += parseFloat(booking.final_amount);
          finalPayments.count += 1;
          finalPayments.events.push({
            ...booking,
            paymentType: 'final',
            amount: parseFloat(booking.final_amount),
            date: booking.final_date,
            method: booking.final_method
          });
        }
      }
    });

    setReportData({
      totalEvents: eventsInMonth.length,
      advancePayments,
      finalPayments
    });
  };

  const formatMonth = (monthStr) => {
    if (!monthStr) return '';
    const [year, month] = monthStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getUniqueEventsCount = (payments) => {
    const uniqueBookingIds = new Set(payments.events.map(p => p.id));
    return uniqueBookingIds.size;
  };

  if (loading) return <LoadingSpinner text="Loading reports..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <BarChart3 className="mr-2" size={20} />
          Monthly Reports
        </h3>
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-gray-500" />
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {selectedMonth && (
        <>
          {/* Header */}
          <div className="bg-blue-50 p-4 rounded-lg border">
            <h2 className="text-xl font-semibold text-blue-800">
              Report for {formatMonth(selectedMonth)}
            </h2>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Events */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Events Booked</p>
                  <p className="text-2xl font-bold text-blue-600">{reportData.totalEvents}</p>
                  <p className="text-xs text-gray-500">Events scheduled in {formatMonth(selectedMonth)}</p>
                </div>
              </div>
            </div>

            {/* Advance Payments */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Advance Payments</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{reportData.advancePayments.total.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Payments received this month for {getUniqueEventsCount(reportData.advancePayments)} events
                  </p>
                  <p className="text-xs text-blue-500 font-medium">
                    {reportData.advancePayments.count} total advance payments
                  </p>
                </div>
              </div>
            </div>

            {/* Final Payments */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">₹</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Final Payments</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ₹{reportData.finalPayments.total.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Payments received this month for {getUniqueEventsCount(reportData.finalPayments)} events
                  </p>
                  <p className="text-xs text-blue-500 font-medium">
                    {reportData.finalPayments.count} final payments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Revenue Summary */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border">
            <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <FileText className="mr-2" size={20} />
              Monthly Revenue Summary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Total Advance Received</p>
                <p className="text-xl font-bold text-green-600">
                  ₹{reportData.advancePayments.total.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Final Received</p>
                <p className="text-xl font-bold text-purple-600">
                  ₹{reportData.finalPayments.total.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Received</p>
                <p className="text-xl font-bold text-blue-600">
                  ₹{(reportData.advancePayments.total + reportData.finalPayments.total).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Transactions</p>
                <p className="text-xl font-bold text-gray-800">
                  {reportData.advancePayments.count + reportData.finalPayments.count}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Payment Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Advance Payments Detail */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h4 className="text-md font-medium text-gray-900">
                  Advance Payments Received ({reportData.advancePayments.count})
                </h4>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                {reportData.advancePayments.events.length > 0 ? (
                  <div className="space-y-3">
                    {reportData.advancePayments.events.map((payment, index) => (
                      <div key={index} className="border rounded-lg p-3 bg-green-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{payment.customer_name}</p>
                            <p className="text-sm text-gray-600">
                              {payment.event_type} • {new Date(payment.booking_date).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {payment.paymentType.replace('advance', 'Advance ')} • {payment.method}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No advance payments received this month</p>
                )}
              </div>
            </div>

            {/* Final Payments Detail */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h4 className="text-md font-medium text-gray-900">
                  Final Payments Received ({reportData.finalPayments.count})
                </h4>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                {reportData.finalPayments.events.length > 0 ? (
                  <div className="space-y-3">
                    {reportData.finalPayments.events.map((payment, index) => (
                      <div key={index} className="border rounded-lg p-3 bg-purple-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{payment.customer_name}</p>
                            <p className="text-sm text-gray-600">
                              {payment.event_type} • {new Date(payment.booking_date).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500">Final Payment • {payment.method}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-600">₹{payment.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No final payments received this month</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BanquetReports;