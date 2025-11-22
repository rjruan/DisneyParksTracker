const Ride = require('../models/rideModel');

// GET all rides
exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate('park');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single ride
exports.getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate('park');
    if (!ride) return res.status(404).json({ error: "Ride not found" });
    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create ride
exports.createRide = async (req, res) => {
  try {
    const ride = await Ride.create(req.body);
    res.status(201).json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update ride
exports.updateRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE delete ride
exports.deleteRide = async (req, res) => {
  try {
    await Ride.findByIdAndDelete(req.params.id);
    res.json({ message: "Ride deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
