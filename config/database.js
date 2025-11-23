import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.URI;
if(!uri) {
    throw new Error("MONGODB URI not found");
}

export async function connectDB() {
    try{
        await mongoose.connect(uri, {
            dbName: 'disneyParksTracker'
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}