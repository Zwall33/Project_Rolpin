var createError = require('http-errors');
var mysql = require('mysql');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var db = require('./public/javascripts/db');
var chart = require('./public/javascripts/Graph');
var app = express();
var router = express.Router();
var query_result;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 4300);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Connection to DB
db.connect(function(err){
  if(err) console.log(err);
  else console.log("Connected !");
});

//Divers query to DB
db.get().query('SELECT * FROM Production LIMIT 1', function (err, rows) { //Recevoir la String de query depuis la page qui en a besoin puis l'envoyer à db.js
  if (err) throw err
  console.log(rows[0].nb_plis_heure);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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