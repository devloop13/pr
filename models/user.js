var mongoose = require('mongoose');
// validate email add
mongoose.set('useCreateIndex', true);
const bcrypt = require('bcrypt');

var validateDay = [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{10,12}$/, 'Not a valid password' ];

var passwordValidator = require('password-validator');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
    password: {
      type: String,
      required: true,
      trim: true,
  validate: validateDay
      },
     name: {
       type: String,
       unique: true,
       required: true,
       lowercase: true,
      trim: true,
      minlength: 3,
    },
    phone:{
      type: Number,
      trim: true
    },
    question:{
      type: String,
      select: true
    },
    answer:{
      type: String,
      required: true
    },
    date:{
      type: Date,
      default: Date.now
    }
});


UserSchema.statics.authenticate = function(name, password, callback) {
  User.findOne({ name: name })
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        } else if ( !user ) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password , function(error, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}

UserSchema.pre('save', function (next) {
    var self = this;
    User.find({name : self.name}, function (err, docs) {
        if (!docs.length){
            next();
        }else{
            console.log('user exists: ',self.name);
            next(new Error("User exists!"));
        }
    });
}) ;

/*
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Define your schema as normal.
var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true }
});

// You can pass through a custom error message as part of the optional options argument:
userSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });

*/

/*UserSchema.statics.emailCheck = function(email, callback) {
  // replaced req.body.email with email
  User.findOne({ email: email })
    .exec(function (error, user) {
      if (error) {
        return callback(error);
      }

      // Pass user to callback and handle whether email exist in the callback.
      callback(null, user);
    });
};

UserSchema.statics.nameCheck = function(name, callback) {
  User.findOne({ name: name })
    .exec(function (error, user) {
      if (error) {
        return callback(error);
      }

      // Pass user to callback and handle whether email exist in the callback.
      callback(null, user);
    });
};
*/


UserSchema.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, 12, function(error, hash){
    if(error){
      return next(error);
    }
    user.password = hash;
    next();
  });
});
var User = mongoose.model('User', UserSchema);
 module.exports = User;
