var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('follow');
  next()
});
router.get('/', async function (req, res, next) {
  try {
  const result = await oracleDbHelper.search({ table: "FRIEND", columns: ["nickname"], data: [req.body.nickname] });
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
router.get('/request', async function (req, res, next) {
  try {
  const result = await oracleDbHelper.search({ table: "follow", columns: ["test", "test"], data: ["test", "test"] });
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
router.post('/request', async function (req, res, next) {
  try {
  const result = await oracleDbHelper.update({ table: "follow", columns: ["test", "test"], data: ["test", "test"] });
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
router.get('/requested', async function (req, res, next) {
  try {
  const result = await oracleDbHelper.search({ table: "follow", columns: ["test", "test"], data: ["test", "test"] });
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
router.post('/requested', async function (req, res, next) {
  try {
  const result = await oracleDbHelper.update({ table: "follow", columns: ["test", "test"], data: ["test", "test"] });
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
  const result = await oracleDbHelper.delete({ table: "follow", columns: ["test", "test"], data: ["test", "test"] });
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
