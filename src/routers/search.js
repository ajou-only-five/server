import express from "express";

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
  } catch (e) {
    res.status(500).send("server error");
  }
});
export {router as searchRouter}