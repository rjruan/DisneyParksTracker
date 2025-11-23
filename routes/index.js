import express from 'express';
const router = express.Router();
import reviewRoutes from './reviewRoutes.js';
import userRoutes from './userRoutes.js';
import rideRoutes from './rideRoutes.js';
import parkRoutes from './parkRoutes.js';

router.use('/rides', rideRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);
router.use('/parks', parkRoutes)

export default router;