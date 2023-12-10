import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import KPI from "./models/KPI.js"
import {kpis,products} from "./data/data.js"
import { URL } from 'url';
import { error } from 'console';
import KpiRoutes from './routes/kpi.js';
import Product from "./models/Product.js"
import productRoutes from './routes/product.js';


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

// mongoose.connect(process.env.MONGO_URL,{
// })
// .then(async ()=>{
//     app.listen(PORT,()=> console.log(`Server is running on http://localhost:${PORT}`));
//     // await mongoose.connection.db.dropDatabase();
//     KPI.insertMany(kpis);
//     // Product.insertMany(products);
// })
// .catch((error)=>console.log(`${error} did not connect`))

app.use("/kpi",KpiRoutes);
app.use("/product",productRoutes);

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
