const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const config = require('../config');

function hash(text) {
	var h = crypto.createHmac('sha256', config.HASH_SECRET).update(text);
	return h.digest('hex');
}

// create a schema
var userSchema = new Schema({
	name: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	admin: Boolean,
	hidden: Boolean,
	created_at: { type: Date, default: Date.now },
	updated_at: Date,
	comments: [{ body: String, date: Date }], // Array
	meta: { // another object
		age: Number,
		website: String
	}
});


// Custom methods can be added to the schema before compiling it with mongoose.model()
userSchema.methods.checkPassword = function(textPass) {
	return (this.password == hash(textPass));
};
// use: userAlice.checkPassword("foo")

// Static method
userSchema.statics.findByName = function(name, cb) {
	return this.find({ name: new RegExp(name, 'i') }, cb); // i = case-insensitive
};
// use: User.findByName('Alice', function(err, users) { console.log(users); });


// Pre-hook/middleware function for the save() function
userSchema.pre('save', function(next) {
	// Perform complex validation, formatting, hashing, etc.
	if(this.isNew) { // built-in keyword
		this.password = hash(this.password);
	}
	
	var currentDate = new Date();
	// change the updated_at field to current date
	this.updated_at = currentDate;
	if (!this.created_at) { // if doesn't exist
		this.created_at = currentDate;
	}
	next();
});

// the schema is useless so far -> create a model using it
var User = mongoose.model('User', userSchema);

module.exports = User; // make the model available 

