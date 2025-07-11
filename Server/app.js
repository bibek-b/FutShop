import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


const app = express();

const conn =  mongoose.connect(process.env.MONGO_DB_URI);

conn && console.log("Db connection successful!")

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(cookieParser());


app.use('/users', userRoutes);
app.use('/auth/user', authRoutes);
app.use('/products', productRoutes )

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})