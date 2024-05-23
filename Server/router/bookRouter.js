import express from 'express';
import { addBook, deleteBook, getBook } from '../controller/bookController.js';

const router = express.Router();
router.get('/', getBook);
router.post('/', addBook);
router.delete('/:id', deleteBook);
export default router;