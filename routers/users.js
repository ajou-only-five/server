var express = require('express');
var router = express.Router();

const { dbConnector } = require('../db/db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(dbConnector.is)
  res.send('respond with a resource');
});

module.exports = router;
