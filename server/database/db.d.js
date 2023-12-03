// Update db.js
import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        
       await mongoose.createConnection(process.env.MONGO_URL);

        console.log('Database connected successfully');
    } catch (error) {
        console.log(error.message);
    }
};

export default dbConnect;
