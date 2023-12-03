import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import dbConnect from "./database/db.d.js";
import { URL } from 'url';

// Configuration
dotenv.config();

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginOpenerPolicy({ policy: 'same-origin' }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

console.log('hello');

// Mongoose setup

const port = process.env.PORT || 9000;
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

// Your additional code goes here
// ...

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
