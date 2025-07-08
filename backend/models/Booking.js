const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  
  pickupState: { type: String, required: true },
  pickupDistrict: { type: String },
  pickupCity: { type: String, required: true },

  destinationState: { type: String, required: true },
  destinationDistrict: { type: String },
  destinationCity: { type: String, required: true },

  date: { type: String, required: true },
  time: { type: String, required: true },

  weight: { type: Number, required: true },
  cargoDescription: { type: String, required: true },
  selectedTruck: { type: String, required: true },

  estimatedPrice: { type: Number, required: true },
  estimatedDistance: { type: Number, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
