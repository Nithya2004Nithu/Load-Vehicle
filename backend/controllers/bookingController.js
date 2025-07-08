const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', bookingId: newBooking._id });
  } catch (error) {
    console.error('Booking error:', error.message);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

module.exports = {
  createBooking,
  getAllBookings
};
