import express from "express";
import {
  AddTodoController,
  GetAllTodoController,
  deleteTodo,
  updateTodo,
} from "../controllers/TodoController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//Adding Todo
router.post("/", verifyToken, AddTodoController);

//Updating Todo
router.put("/:id", updateTodo);

//Delete Todo
router.delete("/:id", deleteTodo);

//Getting Todo
router.get("/", GetAllTodoController);

export default router;
