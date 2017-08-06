var mongoose = require("mongoose");
var User = require("../models/userModel.js");

const jwt = require('jwt-simple');
const config = require('../config');

// Creates a token use the secret stored in the config file + a timestamp
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return newJwtCode = jwt.encode({sub: user._id, iat: timestamp}, config.secret);
  const decoded = jwt.decode(newJwtCode, config.secret);
}

// POST localhost:3000/login
exports.login = function(req, res, next) {
  // User's email and password has been authorized via passport, just needs a token
  const token = tokenForUser(req.user);
  res.send({ token: token } );
}

// POST localhost:3000/signup
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
      return res.status(422).send({ error: 'Please provide an email address and password'});
    }

    User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }
      if (existingUser) {
        return res.status(422).send({ error: 'This email is already in use'});
      }
      // Creates new user
      const user = new User({
        email: email,
        password: password
      });

      user.save(function(err){
        if (err) { return next(err); }
        // Passes entire Mongo-created user object to function
        res.json({ token: tokenForUser(user) });
      });
    });
}
