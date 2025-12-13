import Ride from '../models/rideModel.js';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';

// GET all rides
export const getRides = catchAsync(async (req, res) => {
  const rides = await Ride.find().populate('park');
  res.status(200).json(rides);
});

// GET a single ride
export const getRideById = catchAsync(async (req, res, next) => {
  const ride = await Ride.findById(req.params.id).populate('park');

  if (!ride) {
    return next(new AppError('Ride not found', 404));
  }

  res.status(200).json(ride);
});

// POST create ride
export const createRide = catchAsync(async (req, res) => {
  const ride = await Ride.create(req.body);
  res.status(201).json(ride);
});

// PUT update ride
export const updateRide = catchAsync(async (req, res, next) => {
  const ride = await Ride.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!ride) {
    return next(new AppError('Ride not found', 404));
  }

  res.status(200).json(ride);
});

// DELETE delete ride
export const deleteRide = catchAsync(async (req, res, next) => {
  const ride = await Ride.findByIdAndDelete(req.params.id);

  if (!ride) {
    return next(new AppError('Ride not found', 404));
  }

  res.status(200).json({ message: 'Ride deleted' });
});
