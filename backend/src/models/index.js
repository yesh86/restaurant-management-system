// models/index.js - Updated with proper initialization
const { sequelize } = require('../config/database');

// Import all models
const Category = require('./Category');
const Item = require('./Item');
const Vendor = require('./Vendor');
const Department = require('./Department');
const Booking = require('./Booking');
const Enquiry = require('./Enquiry');
const CashTransaction = require('./CashTransaction');

// Define associations
Category.hasMany(Item, { foreignKey: 'category_id', as: 'items' });
Item.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// You can add more associations as needed, for example:
// Department.hasMany(Item, { foreignKey: 'department_id', as: 'items' });
// Booking could be linked to CashTransaction for payment tracking
// CashTransaction.belongsTo(Booking, { foreignKey: 'reference_id', as: 'booking', constraints: false });

// Initialize all models function
const initializeModels = async () => {
  try {
    console.log('🔄 Initializing all models...');

    // Sync all models (creates tables if they don't exist)
    await sequelize.sync({
      force: false, // Don't drop existing tables
      alter: true   // Update existing tables to match models
    });

    console.log('✅ All models initialized successfully');

    // Log table creation status
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('📊 Available tables:', tables);

    return true;
  } catch (error) {
    console.error('❌ Model initialization failed:', error);
    throw error;
  }
};

// Export all models and utilities
const models = {
  Category,
  Item,
  Vendor,
  Department,
  Booking,
  Enquiry,
  CashTransaction,
  sequelize,
  initializeModels
};

module.exports = models;