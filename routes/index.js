var express = require('express');
var router = express.Router();
// const bcrypt = require('bcrypt')

const User = require('../model/user')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/index', (req, res) => {
  res.render('index');
});

router.get('/Shop', (req, res) => {
  res.render('Shop');
});

router.get('/cart', (req, res) => {
  res.render('cart');
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
