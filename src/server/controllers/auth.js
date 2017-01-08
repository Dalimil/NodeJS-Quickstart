"use strict";

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy  = require('passport-twitter').Strategy;
const config = require('../config');
const User = require('../models/User');

exports.init = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());
};

exports.loginFacebook = passport.authenticate('facebook'); // value = middleware function
exports.loginFacebookReturn = passport.authenticate('facebook', { failureRedirect: '/login' });

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb` with
// a user object, which will be set at `req.user` in route handlers after authentication.
passport.use(new FacebookStrategy(
	{
		clientID: config.FACEBOOK_AUTH.ID,
		clientSecret: config.FACEBOOK_AUTH.SECRET,
		callbackURL: "/auth/facebook/callback",
		profileFields: ['name', 'email', 'link', 'locale', 'timezone']
	},
	function(accessToken, refreshToken, profile, cb) {
		// In this example, the user's Facebook profile is supplied as the user
		// record.  In a production-quality application, the Facebook profile should
		// be associated with a user record in the application's database, which
		// allows for account linking and authentication with other identity
		// providers.
		return cb(null, profile);
		/*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
			return cb(err, user);
		});*/
	}
));

// Configure the Twitter strategy for use by Passport.
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new TwitterStrategy(
	{
		consumerKey: config.TWITTER_AUTH.KEY,
		consumerSecret: config.TWITTER_AUTH.SECRET,
		callbackURL: "/auth/twitter/callback"
	},
	function(token, tokenSecret, profile, cb) {
		User.findOrCreate({ twitterId: profile.id }, function (err, user) {
			return cb(err, user);
		});
	}
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser((user, cb) => {
	cb(null, user);
	// OR cb(null, user.id)
});

passport.deserializeUser((obj, cb) => {
	cb(null, obj);
	// OR User.findById(id, function(err, user) { cb(err, user); });
});


/**
 * Login Required middleware.
 */
exports.isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

