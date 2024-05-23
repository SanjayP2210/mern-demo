import express from 'express';
import { addContact, deleteContact, getContact } from '../controller/contactController.js';

const router = express.Router();
router.get('/', getContact);
router.post('/', addContact);
router.delete('/:id', deleteContact);
export default router;