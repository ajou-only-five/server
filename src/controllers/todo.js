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
    createTodoItem: async (req, res, next) => {
        // * @property { Number } titleId - data.titleId, todo title index
        // * @property { String } content - data.content, todo 내용
        // * @property { Date? } startAt - data.startAt, todo 시작 시간
        // * @property { Date? } endAt - data.endAt, todo 종료 시간
        const data = {
            ...req.body
        };

        if (data.titleId === undefined) {
            return res.status(400).send("titleId must be required.");
        }
        if (!TypeChecker.isInteger(data.titleId)) {
            return res.status(400).send("titleId must be integer.");
        }
        if (data.content === undefined) {
            return res.status(400).send("content must be required.");
        }
        if (!TypeChecker.isString(data.content)) {
            return res.status(400).send("content must be string.");
        }

        if (data.startAt !== undefined) {
            const startAt = new Date(data.startAt);

            if (startAt.toString().includes('Invalid Date')) {
                return res.status(400).send("startAt must be date.");
            }

            data.startAt = startAt;
        }

        if (data.endAt !== undefined) {
            const endAt = new Date(data.endAt);

            if (endAt.toString().includes('Invalid Date')) {
                return res.status(400).send("endAt must be date.");
            }

            data.endAt = endAt;
        }

        data.titleId = parseInt(data.titleId);

        try {
            const result = await TodoServices.createTodoItem(data);

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