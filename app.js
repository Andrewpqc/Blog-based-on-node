//引包
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session=require('express-session');

//导入并执行数据库配置
var mongoose = require('./config/mongoose.js');
db = mongoose();

//分发路由，减小耦合
var index = require('./routes/index');
var auth = require('./routes/auth');

//express实例
var app = express();


//中间件，对所有的请求做处理
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', "images", 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
	secret: 'recommand 128 bytes random string',
	resave:true,
	saveUninitialized:true,
	cookie:{}
}));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});



module.exports = app;


