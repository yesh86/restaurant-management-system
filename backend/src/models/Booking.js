// models/Booking.js - Complete model with ODC Boys
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
    allowNull: true, // Let it be generated automatically
    unique: false    // Avoid unique constraint issues during development
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
  other_event_details: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  time_slot: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  hall: {
    type: DataTypes.STRING(50),
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
  menu_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  hall_rent: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  food_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  extra_plates: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  extra_cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },

  // ODC Boys Fields
  odc_boys_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  odc_cost_per_boy: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  odc_boys_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00
  },

  // Advance Payment 1
  advance1_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  advance1_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  advance1_method: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: 'Cash'
  },
  advance1_receipt: {
    type: DataTypes.STRING(100),
    allowNull: true
  },

  // Advance Payment 2
  advance2_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  advance2_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  advance2_method: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: 'Cash'
  },
  advance2_receipt: {
    type: DataTypes.STRING(100),
    allowNull: true
  },

  // Advance Payment 3
  advance3_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  advance3_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  advance3_method: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: 'Cash'
  },
  advance3_receipt: {
    type: DataTypes.STRING(100),
    allowNull: true
  },

  // Final Payment
  final_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  final_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  final_method: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: 'Cash'
  },
  final_receipt: {
    type: DataTypes.STRING(100),
    allowNull: true
  },

  // Calculated fields
  paid_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'Not Paid'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'bookings',
  hooks: {
    beforeSave: (booking) => {
      // Auto-calculate ODC boys total
      const odcCount = parseInt(booking.odc_boys_count) || 0;
      const odcCostPerBoy = parseFloat(booking.odc_cost_per_boy) || 0;
      booking.odc_boys_total = odcCount * odcCostPerBoy;

      // Auto-calculate paid amount
      const advance1 = parseFloat(booking.advance1_amount) || 0;
      const advance2 = parseFloat(booking.advance2_amount) || 0;
      const advance3 = parseFloat(booking.advance3_amount) || 0;
      const final = parseFloat(booking.final_amount) || 0;
      booking.paid_amount = advance1 + advance2 + advance3 + final;

      // Auto-update status
      const total = parseFloat(booking.total_amount) || 0;
      const discount = parseFloat(booking.discount) || 0;
      const adjustedTotal = total - discount;

      if (booking.paid_amount >= adjustedTotal && adjustedTotal > 0) {
        booking.status = 'Fully Paid';
      } else if (booking.paid_amount > 0) {
        booking.status = 'Partially Paid';
      } else {
        booking.status = 'Not Paid';
      }

      // Generate booking number if not exists
      if (!booking.booking_number) {
        const timestamp = Date.now().toString().slice(-6);
        booking.booking_number = `BK${timestamp}`;
      }
    }
  }
});

module.exports = Booking;