const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/', bookingController.getAllBookings);
router.get('/date-range', bookingController.getBookingsByDateRange);
router.post('/', bookingController.createBooking);
router.post('/:id/cancel', bookingController.cancelBooking);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;