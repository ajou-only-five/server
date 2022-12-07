import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(200).send('test success');
});


/* POST users created. */
/* 예시입니다 */
router.get('/sign-up', async function (req, res, next) {
  // const userList = [
  //   {
  //     account: 'knamuuu',
  //     password: 'testpassword',
  //     nickname: 'knamuuu',
  //     profile: 'default',
  //     disclosure: 0
  //   },
  //   {
  //     account: 'seongHwa',
  //     password: 'testpassword',
  //     nickname: 'redtorch',
  //     profile: 'default',
  //     disclosure: 0
  //   },
  //   {
  //     account: 'seoYeon',
  //     password: 'testpassword',
  //     nickname: 'ledtorch',
  //     profile: 'default',
  //     disclosure: 0
  //   }
  // ];

  // for(const user of userList) {
  //   await UserServices.createUser(user);
  // }
});

export {router as usersRouter}
