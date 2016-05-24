// if our user.js file is at app/models/user.js
var User = require('./app/models/User');
  
// create a new user called chris
var chris = new User({
  name: 'Chris Quill',
  username: 'chris',
  password: 'password' 
});

// call the custom method. this will just add -dude to his name
// user will now be Chris-dude
chris.dudify(function(err, name) {
  if (err) throw err;

  console.log('Your new name is ' + name);
});

// call the built-in save method to save to the database
chris.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});


// --------------------------------------

// FIND - find(), findOne(), findById()
// MongoDB rich syntax supported 
//	- e.g. User.find({ admin: false }).where('createdDate').gt(oneYearAgo).exec(callback);

// get all the users
User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
});


// get the user starlord55
User.find({ username: 'starlord55' }, function(err, user) {
  if (err) throw err;

  // object of the user
  console.log(user);
});

// UPDATE = FIND + SAVE

// get a user with ID of 1
User.findById(1, function(err, user) {
  if (err) throw err;

  // change the users location
  user.location = 'UK';

  // save the user
  user.save(function(err) {
    if (err) throw err;

    console.log('User successfully updated!');
  });
});

// find the user starlord55
// update him to starlord 88
User.findOneAndUpdate({ username: 'starlord55' }, { username: 'starlord88' }, function(err, user) {
  if (err) throw err;

  // we have the updated user returned to us
  console.log(user);
});

// DELETE

// get the user starlord55
User.find({ username: 'starlord55' }, function(err, user) {
  if (err) throw err;

  // delete him
  user.remove(function(err) {
    if (err) throw err;

    console.log('User successfully deleted!');
  });
});

// OR like this
User.findOneAndRemove({ username: 'starlord55' }, function(err) {
  if (err) throw err;

  console.log('User deleted!');
});

// OR
User.remove({ username: 'abc' }, function(err) {
  if(err) return handleError(err);
  // removed!
});


// QUERIES - 2 types of syntax

// With a JSON doc
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
  
// Using query builder
Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);
