"use strict";

const firebase = require("firebase");

// Initialize Firebase
const config = {
	apiKey: "AIzaSyDKe7rZIlN9CbvzH6Uvoo_BHavNdvLa_jg",
	authDomain: "hackathon-quickstart-4f3dd.firebaseapp.com",
	databaseURL: "https://hackathon-quickstart-4f3dd.firebaseio.com",
	storageBucket: "hackathon-quickstart-4f3dd.appspot.com"
};
firebase.initializeApp(config);

// Crypto/Hashing demo - useful for database-value hashing
const crypto = require('crypto');
const hash = (text) => {
	const HASH_SECRET = "34#52jv1j4rn!CASap0891$14jc";
	return crypto.createHmac('sha256', HASH_SECRET).update(text).digest('hex');
};

// ----------------- Firebase Real-time database ---------------------
const database = firebase.database();
// Get DB location reference
var myref = firebase.database().ref('public/postid-34/starCount');
// To ask for sorted feed:
//.orderByChild('starCount') <- Order results by the value of a specified child key.
//.orderByKey()   <- Order results by child keys.
//.orderByValue() <- Order results by child values.

// Read now (once only)
myref.once('value').then(snapshot => {
	const data = snapshot.val();
	console.log("Value: ", data); // exists?-> data !== null
});

// Read now and listen for changes - cannot use Promise
myref.on('value', function(snapshot) {
	const data = snapshot.val();
	console.log(data);
});

// Write (overwrite)
myref.set({
	username: 'John',
	email: 'john@example.com'
});

// Remove
// myref.remove();

// Transaction - Update based on previous state
function transactionDemo() {
	myref.transaction(function(post) {
		if (post) {
			if (post.stars && post.stars[uid]) {
				post.starCount--;
				post.stars[uid] = null;
			} else {
				post.starCount++;
				if (!post.stars) {
					post.stars = {};
				}
				post.stars[uid] = true;
			}
		}
		return post;
	});
}

// Manipulating & handling lists
function listManinipulationDemo() {
	// List events (the 'value' event still works - just returns the whole list)
	var commentsRef = database.ref('post-comments/' + postId);
	commentsRef.on('child_added', function(data) {
		const key = data.key;
		const value = data.val();
	});
	commentsRef.on('child_changed', function(data) {
		const key = data.key;
		const value = data.val();
	});
	commentsRef.on('child_removed', function(data) {
		const key = data.key;
	});

	// Create a new item
	const newRef = commentsRef.push({
		author: 'me',
		text: 'new comment'
	});
}


// Firebase client online/offline presence demo
function userPresenceDemo() {
	var myConnectionsRef = database.ref('users/joe/connections'); // list - why?->multiple devices/tabs
	var lastOnlineRef = database.ref('users/joe/lastOnline'); // timestamp of my last online state
	// .info/connected is Firebase internal
	database.ref(".info/connected").on("value", function(snap) {
		if (snap.val() === true) {
			console.log("Firebase (re)connected.");
			// add this device to my connections list
			var con = myConnectionsRef.push(true); // could be any value - e.g. timestamp
			con.onDisconnect().remove(); // when I disconnect, remove device
			lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP); // ondisconnect, update last-online-time
			// (regarding lastOnlineRef) Note: myConnectionsRef is null when there are no active connections (empty list)
		} else {
			console.log("Firebase not connected.");
		}
	});
}

