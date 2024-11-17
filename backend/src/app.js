import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'
dotenv.config();

connectDB();

const app = express();

app.use(express.json()); // THIS LINE IS CRUCIAL
app.use(express.urlencoded({ extended: true })); // Optional for form data

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies (optional)
}));


app.use('/api/users', userRoutes)

export default app;