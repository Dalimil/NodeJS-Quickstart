"use strict";

const io = require('socket.io')(); // new Server

let users = [];

io.on('connection', (socket) => {
	let uid = socket.id;
	users.push(uid);
	console.log("socket.io - a user connected - " + uid);

	/* Broadcast to everyone */
	io.emit('big_news', {'msg': 'new user connected'}); 
	/* Send to a single user */
	io.to(uid).emit('big_news', "Message for a particular user");

	socket.on('user_clicked_button', (data) => {
		console.log(data);
		socket.emit('all_ok', {'msg': 'thanks'}); // respond to the same client
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
		let index = users.indexOf(uid);
		users.splice(index, 1); // remove from the array
	});
});

module.exports = io;
