import express from 'express';
const router = express.Router();
import {
  getRides,
  getRideById,
  createRide,
  updateRide,
  deleteRide,
}  from '../controllers/rideController.js';
// const ensureAuth = require('../middleware/auth');

// public
router.get('/', getRides);
router.get('/:id', getRideById);

// protected
router.post('/', createRide);
router.put('/:id', updateRide);
router.delete('/:id', deleteRide);

export default router;
