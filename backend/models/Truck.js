const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  licensePlate: { type: String, required: true },
  driver: String,
  status: { type: String, enum: ['active', 'maintenance', 'inactive'], default: 'active' },
  tonnage: Number,
  wheelConfiguration: String,
  storageCapacity: Number,
  storageUnit: String,
  isPowered: { type: String, enum: ['fuel', 'electric', 'hybrid'] },
  fuelType: String,
  batteryCapacity: Number,
  chargeTime: Number,
  range: Number,
  lastMaintenance: Date
});

module.exports = mongoose.model('Truck', truckSchema);
