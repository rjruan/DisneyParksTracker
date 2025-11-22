import Review from '../models/reviewModel.js';

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getParkReviews = async (req, res) => {
    try {
        const parkId = req.params.parkId;
        const reviews = await Review.find({ parkId });
        if (reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ message: 'No reviews found for this park' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRideReviews = async (req, res) => {
    try {
        const rideId = req.params.rideId;
        const reviews = await Review.find({ rideId });
        if (reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ message: 'No reviews found for this ride' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createReview = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedReview) {
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (deletedReview) {
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getReviews, getParkReviews, getRideReviews, createReview, updateReview, deleteReview };