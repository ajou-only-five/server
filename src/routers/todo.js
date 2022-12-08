import express from "express";

import { TodoController } from '../controllers/index.js';

const router = express.Router();

router.get("/todoList", TodoController.searchTodoListInMonth);

router.post("/todoTitle", TodoController.createTodoTitle);
router.post("/todoItem", TodoController.createTodoTitle);

export default router;