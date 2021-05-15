const express = require('express')
// const bcrypt = require('bcrypt')
const passport = require('passport')
const router = express.Router()
const User = require('../model/user')

router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  // simple validation
  if (!name || !username || !password) {
    return res.render('register', { message: 'Please try again' });
  }

  // const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({
    name,
    username,
    password
  });

  await user.save();
  res.render('login', { user });
});

// router.post( '/login',
// passport.authenticate('local', {
//     failureRedirect: 'login',
//     successRedirect: '/'
//   }),
//   async (req, res) => {
//     const { username, password } = req.body;

//     return res.redirect('/');
//   }
// );

router.post('/login',  (req, res) => {
  // const { username, password } = req.body
  // const user = await User.findOne({
  //   username,
  //   password
  // })
  // if (user) {
  //   return res.redirect('/', { user })
  // } else {
  res.render('index');
  //}
})

router.get('/index', (req, res) => {
  res.render('index');
});

router.get('/Shop', (req, res) => {
  res.render('Shop');
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router