import express from "express";
import { createBatch, getbatches } from "../controllers/batchController.js";


const router = express.Router();

router.post("/",createBatch);
router.get("/",getbatches);

export default router;

