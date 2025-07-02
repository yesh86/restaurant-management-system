const { Booking } = require('../models');

const bookingController = {
  // Get all bookings
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        order: [['booking_date', 'DESC']]
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get booking by ID
  getBookingById: async (req, res) => {
    try {
      const booking = await Booking.findByPk(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new booking
  createBooking: async (req, res) => {
    try {
      const bookingData = req.body;

      // Generate booking number if not provided
      if (!bookingData.booking_number) {
        const count = await Booking.count();
        bookingData.booking_number = `BK${String(count + 1).padStart(3, '0')}`;
      }

      const booking = await Booking.create(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update booking
  updateBooking: async (req, res) => {
    try {
      const [updated] = await Booking.update(req.body, {
        where: { id: req.params.id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      const booking = await Booking.findByPk(req.params.id);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete booking
  deleteBooking: async (req, res) => {
    try {
      const deleted = await Booking.destroy({
        where: { id: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get bookings by date range
  getBookingsByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const where = {};

      if (startDate && endDate) {
        where.booking_date = {
          [require('sequelize').Op.between]: [startDate, endDate]
        };
      }

      const bookings = await Booking.findAll({
        where,
        order: [['booking_date', 'ASC']]
      });

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = bookingController;