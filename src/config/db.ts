import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed -', error);
        process.exit(1);
    }
};
