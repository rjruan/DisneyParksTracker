import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride'
    },
    parkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Park'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true });

reviewSchema.path('rideId parkId').validate(function(value) {
    return this.rideId || this.parkId;
}, 'Either rideId or parkId must be provided.');

const Review = mongoose.model('Review', reviewSchema);