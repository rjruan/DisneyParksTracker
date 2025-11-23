import express from 'express';
const router = express.Router();

import {
  getParks,
  getParkById,
  createPark,
  updatePark,
  deletePark,
} from '../controllers/parkController.js';

// public
router.get('/', getParks);
router.get('/:id', getParkById);

// protected
router.post('/', createPark);
router.put('/:id', updatePark);
router.delete('/:id', deletePark);

export default router;