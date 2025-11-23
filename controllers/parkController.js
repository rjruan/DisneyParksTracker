import Park from '../models/parkModel.js';

// GET all parks
export const getParks = async (req, res) => {
  try {
    const parks = await Park.find().populate('attractions');
    res.json(parks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single park
export const getParkById = async (req, res) => {
  try {
    const park = await Park.findById(req.params.id).populate('attractions');
    if (!park) return res.status(404).json({ error: "Park not found" });
    res.json(park);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create park
export const createPark = async (req, res) => {
  try {
    const park = await Park.create(req.body);
    res.status(201).json(park);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update park
export const updatePark = async (req, res) => {
  try {
    const park = await Park.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(park);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE delete park
export const deletePark = async (req, res) => {
  try {
    await Park.findByIdAndDelete(req.params.id);
    res.json({ message: "Park deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};