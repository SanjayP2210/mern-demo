import express from "express";
import {
    deleteUser,
    getUser,
    getUserById,
    loginUser,
    registerUser,
    updateUser,
} from "../controller/userController.js";
import authMiddleWare from "../middleware/auth-middle-ware.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
const router = express.Router();

// user Routes
router.get("/", authMiddleWare, adminMiddleware, getUser);
router.get("/:id", authMiddleWare, adminMiddleware, getUserById);
router.patch("/:id", authMiddleWare, adminMiddleware, updateUser);
router.delete("/:id", authMiddleWare, adminMiddleware, deleteUser);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
