// jsonwebtoken for creating tokens
// express-jwt
const passport = require('passport');
const User = require('../models/userModel');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Creates the local strategy (is there a user with this email, and is this that
// user's password?)
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Searches for a user with the email provided
  User.findOne({email: email}, function(err, user){
    // If search fails, throw an error
    if (err) { return done(err); }

    // If user does not exist, returns false
    if (!user) { return done(null, false); }

    // Compares the password of the found user with the password supplied by request
    // This hashes the supplied password with the same salt and checks for a match
    // This function is defined in the userModel
    user.comparePassword(password, function(err, isMatch){
      if (err) { return done(err);  }
      if (!isMatch) { return done(null, false); }

      // Returns no error, and user
      return done(null, user);
    })
  })
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};

// Creates the JWT strategy (is there a user with the id encoded in the JWT token?)
// where the payload is the decoded JWT token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // If a user exists in the database with this id, call done with that user
  User.findById(payload.sub, function(err, user) {
    // Authentication process failed:
    if (err) {
      return done(err, false); }
    // Successful authentication:
    if (user) {
      done(null, user);
    // No error, but user does not exist:
    } else {
      done(null, false);
    }
  });
});

// Connects passport to the strategies defined above
passport.use(jwtLogin);
passport.use(localLogin);
