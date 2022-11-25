const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { dbConnector } = require('./src/db/db.js');
const indexRouter = require('./routers/index');
const usersRouter = require('./routers/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);

app.listen(3000, function(){
    console.log('Express server is listening');
});

module.exports = app;
