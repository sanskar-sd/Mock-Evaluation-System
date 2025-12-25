import express from "express";
import { createTech, getTech } from "../controllers/techController.js";

const router=express.Router();

router.post("/",createTech);
router.get("/",getTech);

export default router;