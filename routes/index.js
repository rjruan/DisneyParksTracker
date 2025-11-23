import express from 'express';
const router = express.Router();
import reviewRoutes from './reviewRoutes.js';
import userRoutes from './userRoutes.js';
import rideRoutes from './rideRoutes.js';

router.use('/rides', rideRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);

export default router;