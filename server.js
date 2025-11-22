import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import rideRoutes from './routes/ride.js';
// import parkRoutes from './routes/park.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use('/rides', rideRoutes);
// app.use('/parks', parkRoutes);
app.use('/reviews', reviewRoutes);

// Connect to DB
mongoose.connect(process.env.URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
