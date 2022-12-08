import oracleDbHelper from '../db/index.js';
import TodoServices from "../services/todo.js"
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    createTodoTitle: async (req, res, next) => {
        console.log(req.body);
        const data = {
            ...req.body
        };
        
        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }
        if (data.title === undefined) {
            return res.status(400).send("title must be required.");
        }
        if (!TypeChecker.isString(data.title)) {
            return res.status(400).send("title must be string.");
        }
        if (data.color === undefined) {
            return res.status(400).send("color must be required.");
        }
        if (!TypeChecker.isString(data.color)) {
            return res.status(400).send("color must be string.");
        }

        data.userId = parseInt(data.userId);

        try {
            const result = await TodoServices.createTodoTitle(data);

            if (result.status) {
                return res.status(200).send(result.data);
            }
            
            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
    searchTodoListInMonth: async (req, res, next) => {
        const data = {
            ...req.query
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }
        if (data.year === undefined) {
            return res.status(400).send("year must be required.");
        }
        if (!TypeChecker.isInteger(data.year)) {
            return res.status(400).send("year must be integer.");
        }
        if (data.month === undefined) {
            return res.status(400).send("month must be required.");
        }
        if (!TypeChecker.isInteger(data.month)) {
            return res.status(400).send("month must be integer.");
        }

        data.userId = parseInt(data.userId);
        data.year = parseInt(data.year);
        data.month = parseInt(data.month);

        try {
            const result = await TodoServices.searchTodoListInMonth(data);

            if (result.status) {
                if (result.data.length === 0) {
                    return res.status(200).send(result.data);
                }

                let todoAllList = [];

                result.data.forEach((todo) => {
                    for (const todoTitle of todoAllList) {
                        if (todo.titleId === todoTitle.titleId) {
                            todoTitle.todoItemList.push({
                                content: todo.content,
                                startAt: todo.startAt,
                                endAt: todo.endAt,
                                isChecked: todo.isChecked,
                            });
                            return;
                        }
                    }

                    todoAllList.push({
                        titleId: todo.titleId,
                        title: todo.title,
                        todoItemList: [],
                    });
                });

                return res.status(200).send(todoAllList);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    }
});