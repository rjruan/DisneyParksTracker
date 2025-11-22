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

reviewSchema.pre('validate', function (next) {
    if (!this.rideId && !this.parkId) {
        this.invalidate('rideId', 'Either rideId or parkId must be provided.');
        this.invalidate('parkId', 'Either rideId or parkId must be provided.');
    }
    next();
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
