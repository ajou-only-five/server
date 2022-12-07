import express from "express";
import { oracleDbHelper } from "../db/index.js";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("index");
  res.send("index")
});

<<<<<<< HEAD
export {router as indexRouter}
=======
export default router;
>>>>>>> b65e5fdf812fd0125853436e07da7c7527cf8faf
