import "./src/env/env.js";
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './src/routers/index.js';
import usersRouter from './src/routers/users.js';
import dummyRouter from './src/routers/dummy.js';

const app = express();
const __dirname = path.resolve();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/api', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/dummy', dummyRouter);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(3000, function () {
  console.log('Express server is listening');
});

export default app;
