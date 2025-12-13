import Review from '../models/reviewModel.js';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const getReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
});

export const getParkReviews = catchAsync(async (req, res, next) => {
  const parkId = req.params.parkId;
  const reviews = await Review.find({ parkId });

  if (reviews.length === 0) {
    return next(new AppError('No reviews found for this park', 404));
  }

  res.status(200).json(reviews);
});

export const getRideReviews = catchAsync(async (req, res, next) => {
  const rideId = req.params.rideId;
  const reviews = await Review.find({ rideId });

  if (reviews.length === 0) {
    return next(new AppError('No reviews found for this ride', 404));
  }

  res.status(200).json(reviews);
});

export const createReview = catchAsync(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
});

export const updateReview = catchAsync(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedReview) {
    return next(new AppError('Review not found', 404));
  }

  res.status(200).json(updatedReview);
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const deletedReview = await Review.findByIdAndDelete(req.params.id);

  if (!deletedReview) {
    return next(new AppError('Review not found', 404));
  }

  res.status(200).json({ message: 'Review deleted successfully' });
});