var express = require('express');
var router = express.Router();
const User = require('../models/user')


router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/*', function(req, res) {
  err= "Oops"
   res.render('error', {errormessage: err});
});


module.exports = router;
