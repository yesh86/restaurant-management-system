const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Enquiry = sequelize.define('Enquiry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  contact_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  booking_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  event_type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  time_slot: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  pax: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(30),
    defaultValue: 'Pending Confirmation'
  },
  follow_up_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'enquiries'
});

module.exports = Enquiry;