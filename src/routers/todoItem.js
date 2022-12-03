var express = require("express");
import { oracleDbHelper } from "../db/index.js";

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.search({
      table: "TODO_ITEM",
      columns: ["nickname", "title"],
      data: [req.body.nickname, req.body.title],
    });
    console.log(result);

    if (result.code === 200) {
      return res.status(200).send(result.data);
    }

    res.status(400).send("client error");
    // res.status(500).send('server error');
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.post("/", async function (req, res, next) {
  try {
    if (req.body.loop) {
      const result = await oracleDbHelper.insert({
        table: "TODO_ITEM",
        columns: [
          "title",
          "text",
          "is_loop",
          "day",
          "start_at",
          "end_at",
          "day_of_the_week",
        ],
        data: ["test", "test"],
      });
    } else {
      const result = await oracleDbHelper.insert({
        table: "TODO_ITEM",
        columns: ["title", "text", "loop"],
        data: ["test", "test"],
      });
    }
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
router.put("/", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.update({
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
router.delete("/", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.delete({
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
module.exports = router;
