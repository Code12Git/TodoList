import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/AuthController.js";

const router = express.Router();

//Register Route
router.post("/register", registerController);

//Login Route
router.post("/login", loginController);

export default router;
