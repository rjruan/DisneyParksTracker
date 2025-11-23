import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  park: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Park', 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  minHeight: { 
    type: Number 
  },
  thrillLevel: { 
    type: Number 
  }, // 1–5 rating maybe
  duration: { 
    type: String 
  },
  description: { 
    type: String 
  }
}, { timestamps: true });

const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
