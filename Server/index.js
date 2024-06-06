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
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
main();
app.use('/', express.static(path.join(__dirname, 'public/images')));
app.use(cookieParser());
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const corsOptions = {
    origin: true, // Replace with your frontend's origin
    credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);
app.use('/api/book', bookRouter);
app.use('/api/author', authorRouter);
app.use('/api/technology', technologyRouter);
app.use(errorMiddleware);
// app.use(authMiddleWare);

app.listen(port, () => {
    console.log("connected to server", port);
})


