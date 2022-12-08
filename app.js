import "./src/env/env.js";
import express from "express";
import session, { Cookie } from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
const __dirname = path.resolve();
//const db_helper = require('./db/db_helper');
import {indexRouter} from  "./src/routers/index.js";
import {usersRouter} from  "./src/routers/users.js";
import {todoItemRouter} from "./src/routers/todoItem.js"
import {todoItemDoneRouter} from "./src/routers/todoItemDone.js";
import {followRouter} from "./src/routers/follow.js";
import {searchRouter} from "./src/routers/search.js";
import {myInfoRouter} from "./src/routers/myInfo.js";
import {todoTitleRouter} from "./src/routers/todoTitle.js";
import {authRouter} from "./src/routers/auth.js";
import {validRouter} from "./src/routers/valid.js";
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.all('/debug-api/*', function (req, res, next) {
    res.header('Access-Control-Allow-Methods', "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

app.listen(3001, function () {
  console.log("Express server is listening");
});
app.use(session({
  secret:"ajou-only-five",
  resave:false, //session이 변동 사항이 없어도 저장되는 것을 막음
  saveUninitialized:false, //아무 내용이 없는 session이 저장되는 것을 막음
  cookie: {
    maxAge: 1000*60*60,
   } //session 유지 시간 1시간
}))
app.get("/debug-api/ss",function(req,res){
  console.log(req.session)
  console.log("ss")
  res.send("ss")
})
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/api/todoItem", todoItemRouter);
app.use("/api/todoItemDone", todoItemDoneRouter);
app.use("/api/follow", followRouter);
app.use("/api/myInfo", myInfoRouter);
app.use("/apiapi/search", searchRouter);
app.use("/api/todoTitle", todoTitleRouter);
app.use("/api/valid", validRouter);
app.use("/api/auth", authRouter);
/*
 */
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
export default app