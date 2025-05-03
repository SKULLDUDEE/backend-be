import express from 'express';
const app = express();
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './Routes/UserRouter.js';
import teamRouter from './Routes/teamRouter.js';
import ticketRouter from './Routes/ticketRouter.js';
import chatBotRouter from './Routes/chatBotRouter.js';

app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
  'https://hubblly.netlify.app' 
];

app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            console.log(`Request from origin ${origin} not allowed by CORS policy`);
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, origin);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));
app.use('/users', userRouter);
app.use('/team', teamRouter);
app.use('/tickets', ticketRouter);
app.use('/chatbot', chatBotRouter);

if(!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI).then(() => {
  console.log('MongoDB connected successfully');
}) .catch((err) => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
