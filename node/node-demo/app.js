var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorHandler = require('./middlewares/errorHandler');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// HTTP请求记录器中间件
app.use(logger('dev'));

// json中间件、urlencoded中间件、cookie中间件
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 设置静态文件，参考文档：https://github.com/expressjs/serve-static
app.use(express.static(path.join(__dirname, 'public'), { index: ['index.html', 'home.html'] }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 捕获404和抛出错误
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function (err, req, res, next) {
  // 设置locals，只在开发中时提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  next(err);
});

app.use(errorHandler.logErrors);
app.use(errorHandler.clientErrorHandler);
app.use(errorHandler.errorHandler);

module.exports = app;
