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


const DB_URL = process.env.MONGO_URL;

mongoose.connect(DB_URL, {
});

const conn = mongoose.connection;

conn.once('open', () => {
    console.log("Successfully connected to the database");
});

conn.on('error', (error) => {
    console.log('Failed to connect to the database:', error.message);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
