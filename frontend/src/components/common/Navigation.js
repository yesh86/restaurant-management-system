import React from 'react';

const Navigation = ({ modules, activeModule, setActiveModule }) => {
  return (
    <nav className="bg-white shadow-md border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {modules.map(module => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`flex items-center px-4 py-4 text-sm font-medium border-b-3 transition-all duration-200 ${
                  activeModule === module.id
                    ? 'border-amber-500 text-amber-700 bg-amber-50'
                    : 'border-transparent text-gray-600 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-25'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {module.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;