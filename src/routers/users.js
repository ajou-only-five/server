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
router.get('/sign-up', async function (req, res, next) {
  const data = {
    account: "test1",
    password: "test@123",
    nickname: "test1",
    profile: "default",
    disclosure: 0,
  };

  console.log(await UserServices.deleteUserByAccount(data));

  return res.status(200).send('user created succeed');
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
