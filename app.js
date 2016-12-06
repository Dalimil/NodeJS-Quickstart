"use strict";

const path = require('path');
const express = require('express');
const { server: Server, app } = require('./src/server/main');

const PORT = process.env.PORT || 8080;
const pp = s => path.join(__dirname, s);

// Expose static urls like /static/images/logo.png 
app.use('/', express.static(pp('src/client/public')));
// jQuery
app.use('/js', express.static(pp('node_modules/jquery/dist'))); 
// Bootstrap
app.use('/js', express.static(pp('node_modules/bootstrap/dist/js')));
app.use('/css', express.static(pp('node_modules/bootstrap/dist/css')));
// Font Awesome
app.use('/css', express.static(pp('node_modules/font-awesome/css')));
app.use('/fonts', express.static(pp('node_modules/font-awesome/fonts')));

Server.listen(PORT, function() {
	let host = Server.address().address;
	let port = Server.address().port;
	let currentTime = new Date().toLocaleTimeString();
	// console.log(app.get('env'));
	console.log(`${currentTime} - Server running at http://localhost:${port}`);
});