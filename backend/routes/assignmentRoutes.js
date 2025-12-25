import express from "express";
import { assignEvaluator, getAssignments } from "../controllers/assignmentController.js";


const router = express.Router();

router.post("/",assignEvaluator);
router.get("/",getAssignments);

export default router;