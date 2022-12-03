var express = require("express");
import { oracleDbHelper } from "../db/index.js";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("valid");
  next();
});

module.exports = router;
