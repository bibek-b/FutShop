import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import Stripe from 'stripe';


const app = express();


const conn =  mongoose.connect(process.env.MONGO_DB_URI);

conn && console.log("Db connection successful!")

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());


app.use('/api/users', userRoutes);
app.use('/api/auth/user', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment',paymentRoutes);

app.listen(9000, () => {
    console.log("Server is running on port 9000")
})