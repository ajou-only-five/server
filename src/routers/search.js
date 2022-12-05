import express from "express";
import { oracleDbHelper } from "../db/index.js";

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.search({
      table: "follow",
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
export {router as searchRouter}