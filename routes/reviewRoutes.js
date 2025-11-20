import express from 'express';
const router = express.Router();
import { getParks, getPark, createPark, updatePark, deletePark } from '../controllers/parkController.js';

router.get('/', getParks);
router.get('/:id', getPark);
router.post('/', createPark);
router.put('/:id', updatePark);
router.delete('/:id', deletePark);

export default router;