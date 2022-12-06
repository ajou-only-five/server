import express from 'express';
import oracleDbHelper from '../db/index.js';
import oracledb from 'oracledb';
import UserServices from '../services/user.js';
import TodoServices from '../services/todo.js';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(200).send('test success');
});


/* POST users created. */
/* 예시입니다 */
router.get('/sign-up', async function (req, res, next) {
  Todoz
});

export { router as usersRouter };
