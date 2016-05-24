// Iterface functions for our Mongoose MongoDB model
var User = require('../models/User');
  
// create a new user called John
var user = new User({
	name: 'John Quill',
	username: 'johnny',
	password: 'secret_password' 
});

exports.listAll = function(req, res){ // route
	getAllUsers(function(users) {
		res.jsonPretty({ users: users });
	});
};

exports.addUser = addUser;
exports.getAllUsers = getAllUsers;
// + other methods to be exposed...

function addUser(user) {
	// call the built-in save() to save to the database
	user.save(function(err) {
		if (err) throw err;
		console.log('User saved successfully!');
	});
};

// FIND - find(), findOne(), findById()
function getAllUsers(callback) {
	User.find({}, function(err, users) {
		if (err) throw err;
		
		callback(users); // all the users
	});
};

function getUser(name) {
	// get the user starlord55
	User.find({ username: 'alice' }, function(err, user) {
		if (err) throw err;

		console.log(user); // user object
	});
};

// DELETE - remove() or findOneAndRemove()
function removeUser(name) {
	User.remove({ username: 'alice' }, function(err) {
		if(err) return handleError(err);

		console.log('user removed');
	});
};

// UPDATE = FIND + SAVE
function updateUser() {
	// get a user with ID of 1
	User.findById(1, function(err, user) {
		if (err) throw err;

		// change the users location
		user.location = 'UK';

		// save the user - or maybe delete via user.remove()
		user.save(function(err) {
			if (err) throw err;

			console.log('User successfully updated!');
		});
	});

	// find the user alice and update her age
	User.findOneAndUpdate({ username: 'alice' }, { age: 23 }, function(err, user) {
		if (err) throw err;

		console.log(user); // updated user
	});
}

/** QUERIES - 2 types - MongoDB syntax supported */
function queryDemo() { 
	// 1. With a JSON doc
	Person.
		find({
			occupation: /host/,
			'name.last': 'Ghost',
			age: { $gt: 17, $lt: 66 },
			likes: { $in: ['vaporizing', 'talking'] }
		}).
		limit(10).
		sort({ occupation: -1 }).
		select({ name: 1, occupation: 1 }).
		exec(callback);

	// 2. Using query builder
	Person.
		find({ occupation: /host/ }).
		where('name.last').equals('Ghost').
		where('age').gt(17).lt(66).
		where('likes').in(['vaporizing', 'talking']).
		limit(10).
		sort('-occupation').
		select('name occupation').
		exec(callback);
}

