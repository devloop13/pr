const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();


/*Localmongodb connection
mongoose.connect('mongodb://localhost:27017/class_database', { useNewUrlParser: true, useCreateIndex: true });
var db= mongoose.connection;*/

var db = require("./config/keys").MongoURI;
 //connect to mongo using mongoose
mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log("MongoDB connected")).catch(err => console.log(err));

//use public dir
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));


// include routes
//var routes = require('./routes/index');
//app.use('/', routes);
var routes = require('./routes/index');
var users = require('./routes/users');
app.use('/users', users);  // please note the mounting point!
app.use('/', routes);



// listen on port 3000
app.listen(port, function () {
  console.log('Express app listening on port 3000');
});
