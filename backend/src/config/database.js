console.log('Loading database config...');
console.log('Skipping database initialization for testing');

// Mock sequelize object to prevent crashes
const sequelize = {
  authenticate: async () => {
    console.log('✅ Database connection simulated (no real database)');
    return true;
  },
  sync: async () => {
    console.log('✅ Database sync simulated');
    return true;
  }
};

const testConnection = async () => {
  console.log('✅ Database connection test passed (simulated)');
  return true;
};

// Mock models for testing
const mockModels = {
  Category: { count: async () => 0 },
  Item: { count: async () => 0 },
  Vendor: { count: async () => 0 },
  Department: { count: async () => 0 },
  Booking: { count: async () => 0 },
  Enquiry: { count: async () => 0 },
  CashTransaction: { count: async () => 0 },
  sequelize
};

console.log('Database config loaded (test mode)');

module.exports = { sequelize, testConnection, mockModels };