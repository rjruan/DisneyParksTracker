import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    favorites: {
        type: [String],
        default: []
    },
    OAuth: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;