import express from 'express';
const router = express.Router();
import reviewRoutes from './reviewRoutes.js';
import userRoutes from './userRoutes.js';

router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);

export default router;