// controllers/bookingController.js - Updated for SQLite with ODC Boys
const { Booking } = require('../models');

// Validation helper for ODC Boys data
const validateODCBoysData = (bookingData) => {
  const errors = [];

  const odcCount = parseInt(bookingData.odc_boys_count) || 0;
  const odcCostPerBoy = parseFloat(bookingData.odc_cost_per_boy) || 0;
  const odcTotal = parseFloat(bookingData.odc_boys_total) || 0;

  if (odcCount < 0) {
    errors.push('ODC boys count cannot be negative');
  }

  if (odcCostPerBoy < 0) {
    errors.push('ODC cost per boy cannot be negative');
  }

  // Allow small floating point differences
  const expectedTotal = odcCount * odcCostPerBoy;
  if (Math.abs(expectedTotal - odcTotal) > 0.01) {
    console.log(`ODC Calculation - Expected: ${expectedTotal}, Received: ${odcTotal}`);
    // Just log the difference, don't fail validation
  }

  return errors;
};

const bookingController = {
  // Get all bookings
  getAllBookings: async (req, res) => {
    try {
      console.log('📋 Fetching all bookings...');
      const bookings = await Booking.findAll({
        order: [['booking_date', 'DESC']]
      });
      console.log(`✅ Found ${bookings.length} bookings`);
      res.json(bookings);
    } catch (error) {
      console.error('❌ Error fetching bookings:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get booking by ID
  getBookingById: async (req, res) => {
    try {
      const bookingId = req.params.id;
      console.log(`🔍 Fetching booking with ID: ${bookingId}`);

      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      console.log(`✅ Found booking: ${booking.customer_name}`);
      res.json(booking);
    } catch (error) {
      console.error('❌ Error fetching booking:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Create new booking
  createBooking: async (req, res) => {
    try {
      console.log('📝 Creating new booking...');
      console.log('Received data:', JSON.stringify(req.body, null, 2));

      const bookingData = req.body;

      // Validate required fields including event_date
      if (!bookingData.event_date) {
        return res.status(400).json({
          error: 'Validation failed',
          details: ['Event date is required']
        });
      }

      // Validate ODC Boys data
      const odcValidationErrors = validateODCBoysData(bookingData);
      if (odcValidationErrors.length > 0) {
        console.log('❌ ODC validation failed:', odcValidationErrors);
        return res.status(400).json({
          error: 'ODC Boys validation failed',
          details: odcValidationErrors
        });
      }

      // Process and clean data
      const processedData = {
        // Customer info
        customer_name: bookingData.customer_name || '',
        contact_number: bookingData.contact_number || '',
        email: bookingData.email || '',

        // Event details
        booking_date: bookingData.booking_date,
        event_date: bookingData.event_date,
        event_type: bookingData.event_type || 'Wedding',
        other_event_details: bookingData.other_event_details || '',
        time_slot: bookingData.time_slot || 'Dinner',
        hall: bookingData.hall || 'Iris',

        // Numbers
        pax: parseInt(bookingData.pax) || 0,
        menu_price: parseFloat(bookingData.menu_price) || 0,
        hall_rent: parseFloat(bookingData.hall_rent) || 0,
        food_total: parseFloat(bookingData.food_total) || 0,
        total_amount: parseFloat(bookingData.total_amount) || 0,
        discount: parseFloat(bookingData.discount) || 0,
        extra_plates: parseInt(bookingData.extra_plates) || 0,
        extra_cost: parseFloat(bookingData.extra_cost) || 0,

        // ODC Boys fields
        odc_boys_count: parseInt(bookingData.odc_boys_count) || 0,
        odc_cost_per_boy: parseFloat(bookingData.odc_cost_per_boy) || 0,

        // Payment fields
        advance1_amount: parseFloat(bookingData.advance1_amount) || 0,
        advance1_date: bookingData.advance1_date || null,
        advance1_method: bookingData.advance1_method || 'Cash',
        advance1_receipt: bookingData.advance1_receipt || '',

        advance2_amount: parseFloat(bookingData.advance2_amount) || 0,
        advance2_date: bookingData.advance2_date || null,
        advance2_method: bookingData.advance2_method || 'Cash',
        advance2_receipt: bookingData.advance2_receipt || '',

        advance3_amount: parseFloat(bookingData.advance3_amount) || 0,
        advance3_date: bookingData.advance3_date || null,
        advance3_method: bookingData.advance3_method || 'Cash',
        advance3_receipt: bookingData.advance3_receipt || '',

        final_amount: parseFloat(bookingData.final_amount) || 0,
        final_date: bookingData.final_date || null,
        final_method: bookingData.final_method || 'Cash',
        final_receipt: bookingData.final_receipt || '',

        // Other fields
        menu_type: bookingData.menu_type || 'Veg Standard',
        status: bookingData.status || 'Not Paid',
        notes: bookingData.notes || ''
      };

      console.log('Processed data:', JSON.stringify(processedData, null, 2));

      const booking = await Booking.create(processedData);
      console.log(`✅ Booking created successfully with ID: ${booking.id}`);
      console.log(`📊 Customer: ${booking.customer_name}, ODC Boys: ${booking.odc_boys_count}, Total: ₹${booking.total_amount}`);

      res.status(201).json(booking);
    } catch (error) {
      console.error('❌ Create booking error:', error);
      res.status(400).json({
        error: error.message,
        details: error.errors ? error.errors.map(e => e.message) : []
      });
    }
  },

  // Update booking
  updateBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;
      console.log(`📝 Updating booking ID: ${bookingId}`);

      const bookingData = req.body;

      // Validate required fields including event_date
      if (!bookingData.event_date) {
        return res.status(400).json({
          error: 'Validation failed',
          details: ['Event date is required']
        });
      }

      // Validate ODC Boys data
      const odcValidationErrors = validateODCBoysData(bookingData);
      if (odcValidationErrors.length > 0) {
        return res.status(400).json({
          error: 'ODC Boys validation failed',
          details: odcValidationErrors
        });
      }

      // Process data same as create
      const processedData = {
        customer_name: bookingData.customer_name,
        contact_number: bookingData.contact_number,
        email: bookingData.email,
        booking_date: bookingData.booking_date,
        event_date: bookingData.event_date,
        event_type: bookingData.event_type,
        other_event_details: bookingData.other_event_details,
        time_slot: bookingData.time_slot,
        hall: bookingData.hall,
        pax: parseInt(bookingData.pax) || 0,
        menu_type: bookingData.menu_type,
        menu_price: parseFloat(bookingData.menu_price) || 0,
        hall_rent: parseFloat(bookingData.hall_rent) || 0,
        food_total: parseFloat(bookingData.food_total) || 0,
        total_amount: parseFloat(bookingData.total_amount) || 0,
        discount: parseFloat(bookingData.discount) || 0,
        extra_plates: parseInt(bookingData.extra_plates) || 0,
        extra_cost: parseFloat(bookingData.extra_cost) || 0,

        // ODC Boys fields
        odc_boys_count: parseInt(bookingData.odc_boys_count) || 0,
        odc_cost_per_boy: parseFloat(bookingData.odc_cost_per_boy) || 0,

        // Payment fields
        advance1_amount: parseFloat(bookingData.advance1_amount) || 0,
        advance1_date: bookingData.advance1_date || null,
        advance1_method: bookingData.advance1_method || 'Cash',
        advance1_receipt: bookingData.advance1_receipt || '',
        advance2_amount: parseFloat(bookingData.advance2_amount) || 0,
        advance2_date: bookingData.advance2_date || null,
        advance2_method: bookingData.advance2_method || 'Cash',
        advance2_receipt: bookingData.advance2_receipt || '',
        advance3_amount: parseFloat(bookingData.advance3_amount) || 0,
        advance3_date: bookingData.advance3_date || null,
        advance3_method: bookingData.advance3_method || 'Cash',
        advance3_receipt: bookingData.advance3_receipt || '',
        final_amount: parseFloat(bookingData.final_amount) || 0,
        final_date: bookingData.final_date || null,
        final_method: bookingData.final_method || 'Cash',
        final_receipt: bookingData.final_receipt || '',

        status: bookingData.status,
        notes: bookingData.notes || ''
      };

      const [updated] = await Booking.update(processedData, {
        where: { id: bookingId }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      const booking = await Booking.findByPk(bookingId);
      console.log(`✅ Booking updated: ${booking.customer_name}`);
      res.json(booking);
    } catch (error) {
      console.error('❌ Update booking error:', error);
      res.status(400).json({ error: error.message });
    }
  },

  // Delete booking
  deleteBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;
      console.log(`🗑️ Deleting booking ID: ${bookingId}`);

      const deleted = await Booking.destroy({
        where: { id: bookingId }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      console.log(`✅ Booking deleted successfully`);
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error('❌ Delete booking error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get bookings by date range
  getBookingsByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      console.log(`📅 Fetching bookings from ${startDate} to ${endDate}`);

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

      console.log(`✅ Found ${bookings.length} bookings in date range`);
      res.json(bookings);
    } catch (error) {
      console.error('❌ Error fetching bookings by date range:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Cancel booking
  cancelBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { refund_amount, cancellation_reason } = req.body;

      console.log(`❌ Cancelling booking ID: ${bookingId}`);
      console.log(`Request body:`, JSON.stringify(req.body, null, 2));

      // Validate booking ID
      if (!bookingId || isNaN(parseInt(bookingId))) {
        return res.status(400).json({
          error: 'Invalid booking ID',
          details: ['Booking ID must be a valid number']
        });
      }

      // Get the booking first
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        return res.status(404).json({
          error: 'Booking not found',
          details: [`No booking found with ID: ${bookingId}`]
        });
      }

      console.log(`Found booking: ${booking.customer_name}, Paid: ₹${booking.paid_amount}`);

      // Check if already cancelled
      if (booking.is_cancelled) {
        return res.status(400).json({
          error: 'Booking is already cancelled',
          details: [`This booking was cancelled on ${booking.cancellation_date}`]
        });
      }

      // Validate refund amount
      const refundAmount = parseFloat(refund_amount) || 0;
      const paidAmount = parseFloat(booking.paid_amount) || 0;

      if (refundAmount < 0) {
        return res.status(400).json({
          error: 'Invalid refund amount',
          details: ['Refund amount cannot be negative']
        });
      }

      if (refundAmount > paidAmount) {
        return res.status(400).json({
          error: 'Invalid refund amount',
          details: [`Refund amount (₹${refundAmount}) cannot exceed total paid amount (₹${paidAmount})`]
        });
      }

      console.log(`💰 Refund amount: ₹${refundAmount}`);
      console.log(`💰 Paid amount: ₹${paidAmount}`);

      // Update booking with cancellation details
      const cancellationData = {
        is_cancelled: true,
        cancellation_date: new Date().toISOString().split('T')[0],
        refund_amount: refundAmount,
        cancellation_reason: cancellation_reason || ''
      };

      await booking.update(cancellationData);

      // The cancellation_fee will be auto-calculated in the beforeSave hook
      const updatedBooking = await Booking.findByPk(bookingId);

      console.log(`✅ Booking cancelled successfully`);
      console.log(`💸 Refund: ₹${updatedBooking.refund_amount}, Fee kept: ₹${updatedBooking.cancellation_fee}`);

      res.json({
        message: 'Booking cancelled successfully',
        booking: updatedBooking,
        summary: {
          total_paid: parseFloat(updatedBooking.paid_amount) || 0,
          refund_amount: parseFloat(updatedBooking.refund_amount) || 0,
          cancellation_fee: parseFloat(updatedBooking.cancellation_fee) || 0
        }
      });
    } catch (error) {
      console.error('❌ Cancel booking error:', error);
      console.error('Error stack:', error.stack);
      res.status(500).json({
        error: 'Failed to cancel booking',
        details: [error.message]
      });
    }
  }
};

module.exports = bookingController;