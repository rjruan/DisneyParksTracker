import cors from 'cors';
import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/database.js';
import routes from './routes/index.js';

import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };

import AppError from './errors/AppError.js';
import errorHandler from './middleware/errorHandler.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const start = async () => {
  await connectDB();

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
  app.use('/', routes);

  app.use((req, res, next) => {
    next(new AppError('Route not found', 404));
  });

  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

start();