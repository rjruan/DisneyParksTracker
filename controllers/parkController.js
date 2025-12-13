import Park from '../models/parkModel.js';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const getParks = catchAsync(async (req, res) => {
  const parks = await Park.find().populate('attractions');
  res.status(200).json(parks);
});

export const getParkById = catchAsync(async (req, res, next) => {
  const park = await Park.findById(req.params.id).populate('attractions');

  if (!park) {
    return next(new AppError('Park not found', 404));
  }

  res.status(200).json(park);
});

export const createPark = catchAsync(async (req, res) => {
  const park = await Park.create(req.body);
  res.status(201).json(park);
});

export const updatePark = catchAsync(async (req, res, next) => {
  const park = await Park.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!park) {
    return next(new AppError('Park not found', 404));
  }

  res.status(200).json(park);
});

// DELETE delete park
export const deletePark = catchAsync(async (req, res, next) => {
  const park = await Park.findByIdAndDelete(req.params.id);

  if (!park) {
    return next(new AppError('Park not found', 404));
  }

  res.status(200).json({ message: 'Park deleted' });
});