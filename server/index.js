import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import KPI from "./models/KPI.js"
import {kpis} from "./data/data.js"
import { URL } from 'url';
import { error } from 'console';


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

const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL,{
})
.then(async ()=>{
    app.listen(PORT,()=> console.log(`Server is running on http://localhost:${PORT}`));
    await mongoose.connection.db.dropDatabase();
    KPI.insertMany(kpis);
})
.catch((error)=>console.log(`${error} did not connect`))