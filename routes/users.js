const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/login', function(req, res) {
res.render('login');
});

 //POST /login
router.post('/login', function(req, res, next) {
  if (req.body.name && req.body.password) {
    User.authenticate(req.body.name, req.body.password, function (error, user) {
      console.log(req.body.name)
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        res.render('error', {errormessage: err})
        return next(err);
      }  else {
        //req.session.userId = user._id;
        res.render( 'dashboard', {message: user.name})
      }
    });
  }
  else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});
router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  if(req.body.email && req.body.name && req.body.password && req.body.password2 ){
      //check for same pw
      if(req.body.password !== req.body.password2){
        var err = new Error("Passwords do not match");
        err.status = 400;
        res.render('error', {errormessage: err})
        return next(err);
      }//end of second 1f
    }//end of 1st else
    var user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      answer: req.body.answer,
     question: req.body.question
    //answer:req.body.answer
    });//end of var user

    user.save(function(err) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
        err = "An account with that email already exists. Login instead!"
          res.render('error', {errormessage: err})
        }//end of err.name === mongoerror
        else{
         res.render('error', {errormessage: "Username exists, please choose a different one!"})
       }
    }//if 1st err

    else{
    res.render( 'dashboard', {message: user.name})
    console.log("working")
    }
    });//end of user.save

});

router.get('/logout', function (req,res){
  res.render("index");
})


module.exports = router;
