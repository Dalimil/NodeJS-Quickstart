const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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


// Custom methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods.checkPassword = function(pass) {
	this.comments.push({ body: comment, date: Date.now() });
	// initializing everything from the document constructor is also OK
};
userSchema.methods.addComment = function(comment) {
	this.comments.push({ body: comment, date: Date.now() });
	// initializing everything from the document constructor is also OK
};
// use: userAlice.addComment("foo")

// Static method
userSchema.statics.findByName = function(name, cb) {
	return this.find({ name: new RegExp(name, 'i') }, cb); // i = case-insensitive
};
// use: User.findByName('Alice', function(err, users) { console.log(users); });


// Pre-hook/middleware function for the save() function
userSchema.pre('save', function(next) {
	// Perform complex validation, formatting, etc.

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

