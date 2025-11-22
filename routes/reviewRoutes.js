import express from 'express';
const router = express.Router();

import { 
    getReviews, 
    getParkReviews, 
    getRideReviews,
    createReview, 
    updateReview, 
    deleteReview 
} from '../controllers/reviewController.js';

// Get ALL reviews
router.get('/', getReviews);

// Get all reviews for a specific park
router.get('/park/:parkId', getParkReviews);

// Get all reviews for a specific ride
router.get('/ride/:rideId', getRideReviews);

// Create a new review
router.post('/', createReview);

// Update a review by ID
router.put('/:id', updateReview);

// Delete a review by ID
router.delete('/:id', deleteReview);

export default router;
