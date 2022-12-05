import express from "express";
import { oracleDbHelper } from "../db/index.js";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("valid");
  next();
});

export {router as validRouter}