import "./src/env/env.js";
import fs from "fs";
import https from "https";
import express from "express";
import session, { Cookie } from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
const __dirname = path.resolve();
import oracleDbHelper from './src/db/index.js';
import indexRouter from "./src/routers/index.js";
import todoRouter from "./src/routers/todo.js";
import followRouter from "./src/routers/follow.js";
import followRequestRouter from "./src/routers/followRequest.js";
import searchRouter from "./src/routers/search.js";
import onlyFiveRouter from "./src/routers/onlyFive.js";
import myInfoRouter from "./src/routers/myInfo.js";
import authRouter from "./src/routers/auth.js";
import validRouter from "./src/routers/valid.js";
import sseRouter from './src/routers/sse.js';
import {myCors} from './src/utils/index.js';

const app = express();

app.enable('trust proxy');
app.set('trust proxy', 1);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  proxy: true,  
  secret: "12321312324sdsdqmwrpkqmc",
  resave: false, // session이 변동 사항이 없어도 저장되는 것을 막음
  saveUninitialized: true, //아무 내용이 없는 session이 저장되는 것을 막음
  cookie: {
    sameSite: 'none',
    path: '/api',
    domain: 'www.ajou-only-five.shop',
    maxAge: 1000 * 60 * 60, 
    secure: true,
  } //session 유지 시간 1시간
}));

app.use(myCors({
  allowedOrigins: process.env.ORIGINS.split(','),
  headers: process.env.HEADERS,
  methods: process.env.METHODS,
  credentials: process.env.CREDENTIALS
}));

app.all('/api/*', function (req, res, next) {
  if (!oracleDbHelper.isConnected()) {
    return res.status(500).send("DB isn't connected");
  }
  next();
});

app.get("/api/ss", function (req, res) {
  console.log(req.session)
  console.log("ss")
  res.send("ss")
})
app.use('/api/', indexRouter);
app.use('/api/todo', todoRouter);
app.use('/api/follow', followRouter);
app.use('/api/followRequest', followRequestRouter);
app.use("/api/myInfo", myInfoRouter);
app.use("/api/search", searchRouter);
app.use('/api/onlyFive', onlyFiveRouter);
app.use("/api/valid", validRouter);
app.use("/api/auth", authRouter);
app.use('/api/streaming', sseRouter);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(3000, function () {
  console.log('Express server is listening');
});
// try {
//   const option = {
//     ca: fs.readFileSync('/etc/letsencrypt/live/www.ajou-only-five.shop/fullchain.pem'),
//     key: fs.readFileSync('/etc/letsencrypt/live/www.ajou-only-five.shop/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/www.ajou-only-five.shop/cert.pem')
//   };

//   https.createServer(option, app).listen(3000, () => {
//     console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + 3000);
//   }).setTimeout(300);
// } catch (error) {
//   console.log('HTTPS 서버가 실행되지 않습니다.');
//   console.log(error);
// }
// 개발 시에는 위를 주석처리하고 아래를 사용하세요.
//
// app.all('/debug-api/*', function (req, res, next) {
//   res.header('Access-Control-Allow-Methods', "*");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

// app.all('/debug-api/*', function (req, res, next) {
//   if (!oracleDbHelper.isConnected()) {
//     return res.status(500).send("DB isn't connected");
//   }
//   next();
// });
// app.get("/debug-api/ss", function (req, res) {
//   console.log(req.session)
//   console.log("ss")
//   res.send("ss")
// })
// app.use('/debug-api/', indexRouter);
// app.use('/debug-api/users', usersRouter);
// app.use("/debug-api/todoItem", todoItemRouter);
// app.use("/debug-api/todoItemDone", todoItemDoneRouter);
// app.use("/debug-api/follow", followRouter);
// app.use("/debug-api/myInfo", myInfoRouter);
// app.use("/debug-apiapi/search", searchRouter);
// app.use("/debug-api/todoTitle", todoTitleRouter);
// app.use("/debug-api/valid", validRouter);
// app.use("/debug-api/auth", authRouter);

// app.use((req, res, next) => {
//   res.status(404).send('Not Found');
// });

// app.listen(3001, function () {
//   console.log('Express server is listening');
// });

export default app;
