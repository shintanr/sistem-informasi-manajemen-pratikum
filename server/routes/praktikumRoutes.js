import express from "express";
import { getModulesByPraktikumId } from "../controllers/praktikumController.js";

const router = express.Router();

router.get("/praktikum/prak-eldas/:prakId", getModulesByPraktikumId);

export default router;