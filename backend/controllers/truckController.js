const Truck = require('../models/Truck');

exports.getAllTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTruck = async (req, res) => {
  try {
    const newTruck = new Truck(req.body);
    await newTruck.save();
    res.status(201).json(newTruck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTruck = async (req, res) => {
  try {
    const updated = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTruck = async (req, res) => {
  try {
    await Truck.findByIdAndDelete(req.params.id);
    res.json({ message: 'Truck deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
