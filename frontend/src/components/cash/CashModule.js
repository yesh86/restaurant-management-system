import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import LoadingSpinner from '../common/LoadingSpinner';

const CashModule = () => {
  const { cashTransactions, cashSummary, loading, error } = useApp();

  if (loading) return <LoadingSpinner text="Loading cash data..." />;

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading cash data: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Cash Management</h2>
      </div>

      {/* Cash Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Cash In</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{(cashSummary.cash_in || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Cash Out</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{(cashSummary.cash_out || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Net Cash</p>
              <p className={`text-2xl font-bold ${
                (cashSummary.net_cash || 0) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ₹{(cashSummary.net_cash || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>

          {cashTransactions.length > 0 ? (
            <div className="space-y-3">
              {cashTransactions.slice(0, 10).map(transaction => (
                <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mr-3 ${
                          transaction.type === 'Cash In'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </span>
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Category: {transaction.category}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(transaction.transaction_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        transaction.type === 'Cash In' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'Cash In' ? '+' : '-'}₹{(transaction.amount || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
              <p className="mt-1 text-sm text-gray-500">Transactions will appear here when available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CashModule;