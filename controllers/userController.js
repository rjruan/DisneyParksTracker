import User from '../models/userModel.js';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';

// GET all users
export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// GET user by username
export const getUserByUsername = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findOne({ username });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json(user);
});

// POST create user
export const createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// PUT update user
export const updateUser = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const updatedUser = await User.findOneAndUpdate(
    { username },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json(updatedUser);
});

// DELETE delete user
export const deleteUser = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const deletedUser = await User.findOneAndDelete({ username });

  if (!deletedUser) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ message: 'User deleted successfully' });
});