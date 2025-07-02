import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">
          <div className="flex items-center">
            {/* Vaibhavam Logo */}
            <div className="h-14 w-14 mr-4 flex-shrink-0">
              <img
                src="/vaibhavam-logo.png"
                alt="Vaibhavam Restaurant & Banquets"
                className="h-14 w-14 object-contain"
                onError={(e) => {
                  console.log('Logo path failed: /vaibhavam-logo.png');
                  // Try alternative paths
                  e.target.src = "/logo.png";
                  e.target.onerror = (e2) => {
                    console.log('Alternative logo path failed: /logo.png');
                    // Hide image and show fallback
                    e2.target.style.display = 'none';
                    e2.target.nextSibling.style.display = 'flex';
                  };
                }}
              />
              {/* Fallback logo with golden tree design */}
              <div
                className="h-14 w-14 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-lg items-center justify-center text-white font-bold text-xl shadow-lg hidden"
                style={{ display: 'none' }}
              >
                🌳
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Vaibhavam Restaurant & Banquets
              </h1>
              <p className="text-xs text-gray-600 font-normal -mt-1">
                Management System
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">Welcome, Manager</p>
              <p className="text-xs text-gray-600">Restaurant Management</p>
            </div>
            <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">M</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;