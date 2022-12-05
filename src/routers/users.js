import express from 'express';
import oracleDbHelper from '../db/index.js';
import oracledb from 'oracledb';
import UserServices from '../services/user.js';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(200).send('test success');
});


/* POST users created. */
/* 예시입니다 */
router.post('/sign-up', async function (req, res, next) {
  const data = {
    account: req.body.accountName,
    password: req.body.password,
    nickname: req.body.nickname,
    profile: "default",
    disclosure: 0,
  };
  let result = await UserServices.createUser(data);

  return result;
  // try {


  //   // if (result.code === 200) {
  //   //   return res.status(200).send('user created succeed');
  //   // }

  //   res.status(400).send('client error');
  // } catch (e) {
  //   res.status(500).send('server error');
  // }
});

export { router as usersRouter };
