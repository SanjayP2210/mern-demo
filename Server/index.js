import express from 'express';
import userRouter from './router/userRouter.js';
import contactRouter from './router/contactRouter.js';
import bookRouter from './router/bookRouter.js';
import authorRouter from './router/authorRouter.js';
import authRouter from './router/authRouter.js';
import technologyRouter from './router/technologyRouter.js';
import main from './config/db.js';
import dotenv from 'dotenv';
import errorMiddleware from './middleware/error.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
app.use('/', express.static(path.join(__dirname, 'public/images')));

app.use(cookieParser());
const corsOptions = {
    origin: true, // Replace with your frontend's origin
    credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);
app.use('/api/book', bookRouter);
app.use('/api/author', authorRouter);
app.use('/api/technology', technologyRouter);
main();
app.use(errorMiddleware);
// app.use(authMiddleWare);

app.listen(port, () => {
    console.log("connected to server", port);
})


