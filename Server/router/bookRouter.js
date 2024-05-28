import express from 'express';
import { addBook, deleteBook, getBook } from '../controller/bookController.js';
import authMiddleWare from '../middleware/auth-middle-ware.js';

const router = express.Router();
router.get('/', authMiddleWare, getBook);
router.post('/', authMiddleWare, addBook);
router.delete('/:id', authMiddleWare, deleteBook);
export default router;