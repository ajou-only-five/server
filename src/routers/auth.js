import express from "express";
import { oracleDbHelper } from "../db/index.js";
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("auth");
  next();
});

router.post("/sign-up", async function (req, res, next) {
  if(req.session.accountName){ //session이 있으면 
    return res.status(200).send("이미 회원가입 되어 있습니다.")
  }
  try {
    const result = await oracleDbHelper.insert({
      table: "Users",
      columns: ["test", "test"],
      data: ["test", "test"],
    });
    console.log(result);

    if (result.code === 200) {
      return res.status(200).send("user created succeed");
    }

    res.status(400).send("client error");
    // res.status(500).send('server error');
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.post("/login", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.insert({
      table: "Users",
      columns: ["test", "test"],
      data: ["test", "test"],
    });
    console.log(result);

    if (result.code === 200) {
      return res.status(200).send("user created succeed");
    }

    res.status(400).send("client error");
    // res.status(500).send('server error');
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.post("/logout", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.insert({
      table: "Users",
      columns: ["test", "test"],
      data: ["test", "test"],
    });
    console.log(result);

    if (result.code === 200) {
      return res.status(200).send("user created succeed");
    }

    res.status(400).send("client error");
    // res.status(500).send('server error');
  } catch (e) {
    res.status(500).send("server error");
  }
});
export {router as authRouter}