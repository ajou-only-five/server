import "./src/env/env.js";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

//const db_helper = require('./db/db_helper');
const indexRouter = require("./routers/index");
const usersRouter = require("./routers/users");
const todoItemRouter = require("./routers/todoItem");
const todoItemDoneRouter = require("./routers/todoItemDone");
const followRouter = require("./routers/follow");
const searchRouter = require("./routers/search");
const myInfoRouter = require("./routers/myInfo");
const todoTitleRouter = require("./routers/todoTitle");
const authRouter = require("./routers/auth");
const validRouter = require("./routers/valid");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(3000, function () {
  console.log("Express server is listening");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/todoItem", todoItemRouter);
app.use("/todoItemDone", todoItemDoneRouter);
app.use("/follow", followRouter);
app.use("/myInfo", myInfoRouter);
app.use("/search", searchRouter);
app.use("/todoTitle", todoTitleRouter);
app.use("/valid", validRouter);
app.use("/auth", authRouter);
/*
 */
module.exports = app;
