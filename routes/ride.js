const express = require('express');
const router = express.Router();
const {
  getRides,
  getRideById,
  createRide,
  updateRide,
  deleteRide,
} = require('../controllers/rideController');
const ensureAuth = require('../middleware/auth');

// public
router.get('/', getRides);
router.get('/:id', getRideById);

// protected
router.post('/', ensureAuth, createRide);
router.put('/:id', ensureAuth, updateRide);
router.delete('/:id', ensureAuth, deleteRide);

module.exports = router;
