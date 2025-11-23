import mongoose from 'mongoose';

const parkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    openingDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
    },
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

parkSchema.virtual('attractions', {
    ref: 'Ride',
    localField: '_id',
    foreignField: 'park'
});

const Park = mongoose.model('Park', parkSchema);
export default Park