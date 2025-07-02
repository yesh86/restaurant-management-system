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
  other_event_details: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Details when event_type is "Other"'
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
  menu_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Price per person for the selected menu'
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
    comment: 'Discount amount to be deducted from total'
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

  // Legacy field for compatibility
  paid_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Total of all payments - calculated field'
  },

  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'Pending Payment'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'bookings',
  hooks: {
    // Auto-calculate paid_amount before saving
    beforeSave: (booking) => {
      const advance1 = parseFloat(booking.advance1_amount) || 0;
      const advance2 = parseFloat(booking.advance2_amount) || 0;
      const advance3 = parseFloat(booking.advance3_amount) || 0;
      const final = parseFloat(booking.final_amount) || 0;
      booking.paid_amount = advance1 + advance2 + advance3 + final;

      // Auto-update status based on payment completion
      const total = parseFloat(booking.total_amount) || 0;
      const discount = parseFloat(booking.discount) || 0;
      const adjustedTotal = total - discount;

      if (booking.paid_amount >= adjustedTotal && adjustedTotal > 0) {
        if (booking.status === 'Pending Payment' || booking.status === 'Partially Paid') {
          booking.status = 'Fully Paid';
        }
      } else if (booking.paid_amount > 0) {
        if (booking.status === 'Pending Payment') {
          booking.status = 'Partially Paid';
        }
      }
    }
  }
});

module.exports = Booking;