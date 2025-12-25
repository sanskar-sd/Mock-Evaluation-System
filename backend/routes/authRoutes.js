import express from "express";
import { loginController, registerController } from "../controllers/authController.js";


const router = express.Router();

router.post("/register", registerController);  //only admin should call this
router.post("/login", loginController);

export default router;