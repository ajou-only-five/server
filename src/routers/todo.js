import express from "express";

import { TodoController } from '../controllers/index.js';

const router = express.Router();

router.get('/search/todoList', TodoController.searchTodoListInMonth);

router.post('/title', TodoController.createTodoTitle);
router.post('/item', TodoController.createTodoItem);

router.patch('/title',TodoController.updateTodoTitle);
router.patch('/item',TodoController.updateTodoItem);

router.delete('/title', TodoController.deleteTodoTitle);
router.delete('/item', TodoController.deleteTodoItem);

export default router;