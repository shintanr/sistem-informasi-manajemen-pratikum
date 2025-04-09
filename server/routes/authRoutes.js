import express from "express";
import { register, login, logoutUser} from "../controllers/AuthController.js";


const router = express.Router();

// 🔄 Semua user bisa register tanpa perlu login sebagai admin
router.post("/register", register);
router.post("/login", login); // Bisa digunakan oleh semua user

router.post('/logout', logoutUser);

export default router;
