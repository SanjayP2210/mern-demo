import express from 'express';
import { addAuthor, deleteAuthor, getAuthor } from '../controller/authorController.js';
import authMiddleWare from '../middleware/auth-middle-ware.js';

const router = express.Router();
router.get('/', authMiddleWare, getAuthor);
router.post('/', authMiddleWare, addAuthor);
router.delete('/:id', authMiddleWare, deleteAuthor);
export default router;