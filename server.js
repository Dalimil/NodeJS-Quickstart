"use strict";

const path = require('path');
const { server: Server } = require('./src/main');

const PORT = process.env.PORT || 8080;

Server.listen(PORT, function() {
	let host = Server.address().address;
	let port = Server.address().port;
	let currentTime = new Date().toLocaleTimeString();
	// console.log(app.get('env'));
	console.log(`${currentTime} - Server running at http://localhost:${port}`);
});