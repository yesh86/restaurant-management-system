const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  booking_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  customer_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  contact_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: true
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
  hall: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  pax: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  menu_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  paid_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'Confirmed'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'bookings'
});

module.exports = Booking;