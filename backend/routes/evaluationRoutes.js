import express from "express";
import { getResults, submitEvaluation } from "../controllers/evaluationController.js";

const router = express.Router();

router.post("/",submitEvaluation);
router.get("/",getResults);

export default router;