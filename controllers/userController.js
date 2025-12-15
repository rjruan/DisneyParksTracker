import User from '../models/userModel.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';

dotenv.config();

let mgmtToken = null;
let tokenExpiry = 0;

async function getManagementToken() {
  const now = Math.floor(Date.now() / 1000);
  if (mgmtToken && now < tokenExpiry - 60) {
    return mgmtToken;
  }

  const res = await fetch(
    `https://${process.env.AUTH0_ISSUER_BASE_URL.replace('https://', '')}oauth/token`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.MGMT_CLIENT_ID,
        client_secret: process.env.MGMT_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_ISSUER_BASE_URL.replace(
          'https://',
          ''
        )}api/v2/`,
        grant_type: 'client_credentials',
      }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new AppError(
      `Failed to get management token: ${errorData.error_description || errorData.message}`,
      res.status
    );
  }

  const data = await res.json();
  mgmtToken = data.access_token;
  tokenExpiry = now + data.expires_in - 60;
  return mgmtToken;
}

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

export const getUserByUsername = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findOne({ username });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json(user);
});

export const createUser = catchAsync(async (req, res, next) => {
  const { email, password, username, name, favorites } = req.body;

  const token = await getManagementToken();

  const doesUserExist = await fetch(
    `https://${process.env.AUTH0_ISSUER_BASE_URL.replace('https://', '')}api/v2/users-by-email?email=${encodeURIComponent(
      email
    )}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (doesUserExist.ok) {
    const existingUsers = await doesUserExist.json();
    const newUser = new User({
      OAuth: existingUsers[0].user_id,
      name,
      email,
      username,
      favorites: favorites || [],
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }
  else{
    const response = await fetch(
      `https://${process.env.AUTH0_ISSUER_BASE_URL.replace('https://', '')}api/v2/users`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          password,
          connection: 'Username-Password-Authentication',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new AppError(
        `Auth0 user creation failed: ${errorData.message}`,
        response.status
      );
    }

    const authData = await response.json();
    const newUser = new User({
      OAuth: authData.user_id,
      name,
      email,
      username,
      favorites: favorites || [],
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }
});

export const updateUser = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const updatedUser = await User.findOneAndUpdate(username ? { username } : {}, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json(updatedUser);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const deletedUser = await User.findOneAndDelete({ username });

  if (!deletedUser) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ message: 'User deleted successfully' });
});