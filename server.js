"use strict";

const path = require('path');
const express = require('express');
const { server: Server, app } = require('./src/main');

const PORT = process.env.PORT || 8080;
const pp = s => path.join(__dirname, s);

// Expose static urls like /static/images/logo.png 
app.use('/', express.static(pp('public'))); // redirect root
app.use('/js', express.static(pp('node_modules/bootstrap/dist/js'))); // redirect bootstrap JS
app.use('/js', express.static(pp('node_modules/jquery/dist'))); // redirect JS jQuery
app.use('/css', express.static(pp('node_modules/bootstrap/dist/css'))); // redirect CSS bootstrap

Server.listen(PORT, function() {
	let host = Server.address().address;
	let port = Server.address().port;
	let currentTime = new Date().toLocaleTimeString();
	// console.log(app.get('env'));
	console.log(`${currentTime} - Server running at http://localhost:${port}`);
});