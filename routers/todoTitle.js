var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
  const result = await oracleDbHelper.search({ table: "TODO_TITLE", columns: ["title","color"], data: [req.body.nickname] });
  console.log(result);
  
  if (result.code === 200) {
    return res.status(200).send(result.data);
    
  }
  
  res.status(400).send('client error');
  // res.status(500).send('server error');
  } catch (e) {
  res.status(500).send('server error');
  }
});
router.post('/', async function (req, res, next) {
  try { //nickname을 기준으로 찾아야 하기 때문에 nickname 정보도 넘겨줘야할 것 같음
  const result = await oracleDbHelper.insert({ table: "TODO_TITLE", columns: ["title", "color"], data: [req.body.nickname,req.body.TITLE,req.body.COLOR] });
  console.log(result);
  
  if (result.code === 200) {
    return res.status(200).send('TITLE created succeed');
  }
  
  res.status(400).send('client error');
  // res.status(500).send('server error');
  } catch (e) {
  res.status(500).send('server error');
  }
});
router.put('/', async function (req, res, next) {
  try {
  const result = await oracleDbHelper.update({ table: "TODO_TITLE", columns: ["title", "color"], data: [req.body.nickname,req.body.TITLE,req.body.COLOR] });
  console.log(result);
  
  if (result.code === 200) {
    return res.status(200).send('user created succeed');
  }
  
  res.status(400).send('client error');
  // res.status(500).send('server error');
  } catch (e) {
  res.status(500).send('server error');
  }
});
router.delete('/', async function (req, res, next) {
  try {
  const result = await oracleDbHelper.delete({ table: "TODO_TITLE", columns: ["title", "color"], data: [req.body.nickname,req.body.TITLE] });
  console.log(result);
  
  if (result.code === 200) {
    return res.status(200).send('user created succeed');
  }
  
  res.status(400).send('client error');
  // res.status(500).send('server error');
  } catch (e) {
  res.status(500).send('server error');
  }
});
module.exports = router;
