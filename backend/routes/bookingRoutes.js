const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings } = require('../controllers/bookingController');

router.post('/create', createBooking);
router.get('/all', getAllBookings);

module.exports = router;
