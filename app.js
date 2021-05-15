var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const session = require('express-session')
const passport = require('passport')
// const bcrypt = require('bcrypt')
const User = require('./model/user');
const LocalStrategy = require('passport-local').Strategy

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb:27017/test', {useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function() {
  console.log('Connected');
})

passport.use(
  new LocalStrategy((username, password, cb) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return cb(err)
      }
      if (!user) {
        return cb(null, false)
      }
      if (password.equals(user.password)) {
        return cb(null, user)
      }
      return cb(null, false)
    })
  })
)

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err)
    }
    cb(null, user)
  })
})

var app = express();

app.use(cookieParser())
app.use(
  session({
    secret: 'my_super_secret',
    resave: false,
    saveUninitialized: false
  })
)

// require('./db')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/auth' , authRouter);

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
