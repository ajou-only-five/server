import express from "express";

import { TodoController } from '../controllers/index.js';

const router = express.Router();

router.get("/todoList", TodoController.searchTodoListInMonth);

router.post("/title", TodoController.createTodoTitle);
router.post("/item", TodoController.createTodoItem);

export default router;