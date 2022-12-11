import express from "express";

import { TodoController } from '../controllers/index.js';

const router = express.Router();

router.all('/*', (req, res, next) => {
    console.log(req.body);
    console.log(req.session);
    console.log(req.sessionID);
    if(!req.session.userId){
        return res.status(400).send("session is invalid")
    }
    
    next();
});

router.get('/search/todoList', TodoController.searchTodoListInMonth);

router.post('/title', TodoController.createTodoTitle);
router.post('/item', TodoController.createTodoItem);

router.patch('/title',TodoController.updateTodoTitle);
router.patch('/item',TodoController.updateTodoItem);

router.delete('/title', TodoController.deleteTodoTitle);
router.delete('/item', TodoController.deleteTodoItem);

export default router;