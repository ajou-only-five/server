import oracleDbHelper from '../db/index.js';
import TodoServices from "../services/todo.js"
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
     searchTodoListInMonth: async (req, res, next) => {
        if (!oracleDbHelper.isConnected()) {
            return res.status(400).send("DB isn't connected");
        }

        const data = {
            ...req.query
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isNumber(data.userId)) {
            return res.status(400).send("userId must be number.");
        }
        if (data.year === undefined) {
            return res.status(400).send("year must be required.");
        }
        if (!TypeChecker.isNumber(data.year)) {
            return res.status(400).send("year must be number.");
        }
        if (data.month === undefined) {
            return res.status(400).send("month must be required.");
        }
        if (!TypeChecker.isNumber(data.month)) {
            return res.status(400).send("month must be number.");
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