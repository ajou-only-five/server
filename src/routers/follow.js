import express from "express";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("follow");
  next();
});
router.get("/", async function (req, res, next) {
  try {
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.get("/request", async function (req, res, next) {
  try {
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.post("/request", async function (req, res, next) {
  try {
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.get("/requested", async function (req, res, next) {
  try {
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.post("/requested", async function (req, res, next) {
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
export {router as followRouter}