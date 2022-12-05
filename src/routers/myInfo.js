import express from "express";
import { oracleDbHelper } from "../db/index.js";

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.search({
      table: "USER",
      columns: ["nickname"],
      data: [req.body.nickname],
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
router.patch("/", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.update({
      table: "USER",
      columns: ["nickname", "profile", "disclosure"],
      data: [req.body.nickname, req.body.profile, req.body.disclosure],
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

export {router as myInfoRouter}