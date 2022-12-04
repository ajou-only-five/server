import express from 'express';
import oracleDbHelper from '../db/index.js';
import oracledb from 'oracledb';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(200).send('test success');
});


/* POST users created. */
/* 예시입니다 */
router.get('/sign-up', async function (req, res, next) {
  await oracleDbHelper.init();
  console.log(Date.now());
  var dateList = Date(Date.now()).toString().split(' ');
  var hms = dateList[4].split(':');
  console.log(`${dateList[3]+hms[0]+hms[1]+hms[2]}`);

  const firstResult = await oracleDbHelper.select(
    {
      table: "DUAL",
      columns: ["user_pk_seq.NEXTVAL"]
    });

    const secondResult = await oracleDbHelper.select(
      {
        table: "DUAL",
        columns: ["user_pk_seq.NEXTVAL"]
      });

  if(firstResult.code === 200) {
    console.log("oracle",oracledb.DATE);

    const insertResult = await oracleDbHelper.insertMany(
      {
        table: "USERS", 
        dataList: [
          [parseInt(firstResult.data[0][0]), "test1", "test@123", "testUser1", "default", 0, Date.now(), Date.now()],
          [parseInt(secondResult.data[0][0]), "test2", "test@123", "testUser2", "default", 0, Date.now(), Date.now()],
      ]
      });
      console.log(insertResult);
  }

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
