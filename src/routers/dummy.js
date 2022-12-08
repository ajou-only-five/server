import express from 'express';
import bcrypt from "bcrypt";

import UserServices from '../services/user.js';
import TodoServices from '../services/todo.js';
import FriendServices from '../services/friend.js';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.status(200).send('test success');
});


/* POST users created. */
/* 예시입니다 */
router.get('/sign-up', async function (req, res, next) {
    const userList = [
        {
            account: 'knamuuu',
            password: 'testpassword',
            nickname: 'knamuuu',
            profile: 'default',
            disclosure: 0
        },
        {
            account: 'seongHwa',
            password: 'testpassword',
            nickname: 'redtorch',
            profile: 'default',
            disclosure: 0
        },
        {
            account: 'seoYeon',
            password: 'testpassword',
            nickname: 'ledtorch',
            profile: 'default',
            disclosure: 0
        }
    ];

    let result;
    for (const user of userList) {
        try {
            result = await UserServices.createUser(user);
        } catch (e) {
            console.log(e);
            res.status(500).json({ status: true });
            return;
        }
    }

    res.status(200).json({ result });
    return;
});

router.get('/sign-in', async function (req, res, next) {
    console.log(typeof(new Date(Date.now())));
    let result = null;

    if (req.query.account !== undefined) {
        result = await UserServices.findUserByAccount({ account: req.query.account });
    } else {
        res.status(400).json({ status: false });
        return;
    }

    if (result.status) {
        if (result.data.length !== 0) {
            const encodedPassword = result.data[2];

            // 비밀번호 확인
            const same = bcrypt.compareSync(req.query.password, encodedPassword);
            if (same) {
                res.status(200).json({ ...result });
                return;
            }

            res.status(400).json({ status: false });
            return;
        }
    }
});

router.get('/todo/create', async function (req, res, next) {
    const userResult = await UserServices.findUserByAccount({ account: req.query.account });

    const userId = userResult.data[0];

    const data = {
        userId: userId,
        title: req.query.title,
        color: req.query.color,
    };

    const todoTitleResult = await TodoServices.createTodoTitle(data);

    if (todoTitleResult.status) {
        res.status(200).json({ status: true });
        return;
    }

    res.status(400).json({ status: false });
    return;
});

router.get('/todoitem/create', async function (req, res, next) {
    const todoItemData = {
        titleId: parseInt(req.query.titleId),
        content: req.query.content,
        startAt: new Date(req.query.startAt),
        endAt: new Date(req.query.endAt),
    };

    try {
    const todoItemResult = await TodoServices.createTodoItem(todoItemData);

    if (todoItemResult.status) {
        res.status(200).json({ status: true });
        return;
    }

    res.status(400).json({ status: false });
    return;
} catch(e) {
    console.log(e);
    res.status(500).json({ status: false });
    return;
}
});

router.get('/todoitem/search', async function (req, res, next) {
    const todoItemData = {
        userId: parseInt(req.query.userId),
        year: parseInt(req.query.year),
        month: parseInt(req.query.month)
    };

    const todoItemResult = await TodoServices.searchTodoListInMonth(todoItemData);

    if (todoItemResult.status) {
        console.log(todoItemResult.data);
        res.status(200).json({ status: true });
        return;
    }

    res.status(400).json({ status: false });
    return;
});

router.get('/searchFriend', async function (req, res, next) {
    try {
        const result = await FriendServices.searchFriendByUserId({ userId: parseInt(req.query.userId) });

        if (result.status) {
            res.status(200).json({ status: true });
            return;
        }

        res.status(500).json({ status: false });
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: false });
    }
});

router.delete('/deleteUser', async function (req, res, next) {
    try {
        const result = await UserServices.deleteUserByAccount({ account: req.query.account });

        if (result.status) {
            res.status(200).json({ status: true });
            return;
        }

        res.status(500).json({ status: false });
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: false });
    }
});

router.delete('/deleteTitle', async function (req, res, next) {
    try {
        const result = await TodoServices.deleteTodoTitle({ titleId: parseInt(req.query.titleId) });

        if (result.status) {
            res.status(200).json({ status: true });
            return;
        }

        res.status(500).json({ status: false });
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: false });
    }
});
export default router;
