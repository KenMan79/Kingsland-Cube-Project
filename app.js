
// include dotenv
const dotenv = require('dotenv');
// include hbs
const hbs = require('hbs');


var createError = require('http-errors');
var express = require('express'); // Require library of code that is Express
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// Routers that have all the get/post etc routes

var indexRouter = require('./routes/index');
var createCubeRouter = require('./routes/create');
var attachAccessoryRouter = require('./routes/attach');
var detailsRouter = require('./routes/details');
var aboutRouter = require('./routes/about')

// Create a variable named "app" to represent our application and invoke Express()
var app = express(); 

// Hide your Mongo connection variables 
require('dotenv').config({ path: '.env' });

// Mongo DB Connection 
  mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: false
  })
    .then( (res) => console.log('Woohoo! db connected! Great job Kev!'))
    .catch((err) => console.log(err));

// View Engine Setup

app.set('views', path.join(__dirname, 'views')); // setting folder for public files
app.set('view engine', 'hbs'); // setting view engine to hbs, engine compiles views and data into HTML

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials('./view/partials');
hbs.registerHelper('isEqual', (expectedValue, value) => {
  return value === expectedValue;
});

// Routes

app.use('/', indexRouter); // Router for home page 
app.use('/create', createRouter);
app.use('/attach', attachAccessoryRouter)
app.use('/details', detailsRouter);
app.use('/about', aboutRouter);

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
  res.render('404');
});

module.exports = app;
