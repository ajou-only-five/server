import express from 'express';
import { oracleDbHelper } from '../db/index.js';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(200).send('test success');
});


/* POST users created. */
/* 예시입니다 */
router.get('/sign-up', async function (req, res, next) {
  try {
    const result = await oracleDbHelper.insert(
      {
        table: "test", 
        columns: ["test", "test"], 
        data: ["test", "test"] 
      }
    );

    if (result.code === 200) {
      return res.status(200).send('user created succeed');
    }

    res.status(400).send('client error');
  } catch (e) {
    res.status(500).send('server error');
  }
});

export { router as usersRouter };
