import express from "express";

var router = express.Router();

/* GET users listing. */
router.post("/", async function (req, res, next) {
  try {
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.delete("/", async function (req, res, next) {
  try {
  } catch (e) {
    res.status(500).send("server error");
  }
});

export {router as todoItemDoneRouter}