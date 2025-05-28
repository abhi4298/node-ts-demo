import express from 'express';
const app = express();
const port = 3000;

import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());

// ************* DB connection *************

import dotenv from 'dotenv';
import { connectDatabase } from './config/db';

dotenv.config();
connectDatabase();


// ************* CORS ********************

import cors from 'cors';

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// ************* Swagger ******************

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ************* Routes ********************

import { authenticate } from './middlewares/auth';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

app.use('/api/auth', authRoutes);
app.use('/api/user', authenticate, userRoutes);

// ************* Server ********************

app.listen(port, () => {
    return console.log(`App is listening at port - ${port}`);
});