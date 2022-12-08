import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("index");
  res.send("index")
});

export {router as indexRouter}
