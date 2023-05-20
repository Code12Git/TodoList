import express from "express";
import { deleteUser, updateUser } from "../controllers/UserController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//Update User
router.put("/:userId", verifyToken, updateUser);

//Delete User
router.delete("/:userId", verifyToken, deleteUser);

export default router;
