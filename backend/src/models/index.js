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

// Export all models
const models = {
  Category,
  Item,
  Vendor,
  Department,
  Booking,
  Enquiry,
  CashTransaction,
  sequelize
};

module.exports = models;