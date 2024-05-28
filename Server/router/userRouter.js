import express from "express";
import {
    deleteImage,
    deleteUser,
    getImage,
    getUser,
    getUserById,
    loginUser,
    registerUser,
    updateUser,
    uploadImage,
} from "../controller/userController.js";
import authMiddleWare from "../middleware/auth-middle-ware.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import multer from 'multer';
import path, { dirname } from 'path';
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.get("/upload-image", getImage);
router.post('/upload-image', upload.single('image'), uploadImage)
router.delete("/upload-image/:id", deleteImage);

router.get("/", authMiddleWare, adminMiddleware, getUser);
router.get("/:id", authMiddleWare, adminMiddleware, getUserById);
router.patch("/:id", authMiddleWare, adminMiddleware, upload.single('image'), updateUser);
router.delete("/:id", authMiddleWare, adminMiddleware, deleteUser);
router.post("/register", upload.single('image'), registerUser);
router.post("/login", loginUser);

export default router;
