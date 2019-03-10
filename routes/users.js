const express = require('express');
const router = express.Router();
const Users = require('../models/Users.js');
const mongoose = require('mongoose');
const newUser = mongoose.model('Users');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

let sessionChecker = (req, res, next) => {
  if (req.session.userName) {
    next();
  } else {
    res.render("login", {message: "You have to login"});
  }

};

router.get('/userHomePage', sessionChecker,function (req, res) {
  res.render('userHomePage', {message: req.session.userName});
});

router.get('/register', function(req, res) {
  res.render('register', { title: "User" });
});

router.post('/register', function (req, res) {
  let name = req.body.name;
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;

  console.log(name + " Ana hena!! ");

  const User = new Users({
    name: name,
    userName: userName,
    email: email,
    password: password
  });

  User.save().then(result => {
  }).catch(err => console.log(err));

  res.render('register', { title: name });
});

router.get('/login', function(req, res) {
  res.render('login', { title: "User" });
});

router.post('/login', function (req, res) {
  let userName = req.body.userName;
  let password = req.body.password;

  newUser.count({userName: userName}, function (err, count) {
    if (count > 0) {
      const query = newUser.findOne({'userName': userName});

      query.select('password');

      query.exec(function (err, cand) {
        if (err) return handleError(err);
        if (cand.password === password) {
          req.session.userName = userName;
          res.redirect('userHomePage');
        } else {
          res.render('login', {message: 'Wrong Password'});
        }
      });
    } else {
      res.render('login', {message: 'Wrong UserName'});
    }
  });

});

router.post('/checkUserName', function(req, res){
  const userName= req.body.userName;
  console.log("Ana fel backend");
  newUser.count({userName: userName}, function (err, count) {
    if (count > 0) {
      res.send('taken');
    } else {
      res.send('notTaken');
    }
  });
});

router.get('/logout', sessionChecker, function (req, res) {
  req.session.destroy();
  res.render('homepage', {message: ''});
});

module.exports = router;
