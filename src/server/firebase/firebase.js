"use strict";

// Include this only once (and initializeApp only once) and then export
const firebase = require("firebase");

// Initialize Firebase
const config = {
	apiKey: "AIzaSyDKe7rZIlN9CbvzH6Uvoo_BHavNdvLa_jg",
	authDomain: "hackathon-quickstart-4f3dd.firebaseapp.com",
	databaseURL: "https://hackathon-quickstart-4f3dd.firebaseio.com",
	storageBucket: "hackathon-quickstart-4f3dd.appspot.com"
};

firebase.initializeApp(config);
console.log("Firebase initialized");

module.exports = firebase;


