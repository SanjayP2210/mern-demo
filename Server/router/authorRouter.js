import express from 'express';
import { addAuthor, deleteAuthor, getAuthor } from '../controller/authorController.js';

const router = express.Router();
router.get('/', getAuthor);
router.post('/', addAuthor);
router.delete('/:id', deleteAuthor);
export default router;