import express from "express";
import { forgetPassword, loginUser, logoutUser, registerUser, resetPassword } from "../controller/authController.js";
import path, { dirname } from 'path';
import multer from 'multer';
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


router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/register", upload.single('image'), registerUser);

export default router;