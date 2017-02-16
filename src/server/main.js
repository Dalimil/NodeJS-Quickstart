"use strict";

const express = require('express');
const bodyParser = require('body-parser'); // additional body parsing
const multer = require('multer'); // file upload (multipart/form-data)
const morgan = require('morgan'); // General request logger
const Cookies = require('cookies'); // General cookie handling
const path = require('path');
const pp = s => path.join(__dirname, s);
const app = express();
const server = require('http').createServer(app); // or https

// Pug template engine - previously Jade - http://jade-lang.com/
app.set('views', pp('../client/views')); // where templates are located
app.set('view engine', 'pug'); // Express loads the module internally

// Add top-level (could be made route-specific) parsers that will populate request.body
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
const upload = multer({ dest: pp('../client/public/uploads/') }); // Use with multipart/form-data

app.use(Cookies.express());
app.use(morgan('dev')); // Set up logger
const debug = require('./utils/debug'); // + my own logger
app.use(debug.requestInfo); // Middleware function - Order/Place of call important!
// app.use('/articles', requestInfo); // Works but messes up request URLs - /articles/id -> /id

/* ---------------------- ROUTES -------------------------- */

app.get('/', function(req, res) {
	// Standard cookies
	req.cookies.set("my-cookie-key", "my-cookie-string-value");
	req.cookies.get("my-cookie-key");

	// res.json({ user: 'john' }); // Send json response
	// res.sendFile( __dirname + "/" + "index.html" );
	// Now render .pug template with any JSON locals/variables:
	res.render('index', 
		{ title: 'Demo', data: { name: "any json", items: [3, 5, 8] } } 
	); 
});

const sockets = require('./sockets');
sockets.attach(server); // attach() is Socket.IO specific
app.get('/sockets', (req, res) => res.render('sockets')); // demo sockets index page

app.get('/user/:name', function(req, res) { /* Path can also be a regexp */
	console.log("Got a GET request with a pattern match");
	console.log(req.requestInfo);
	res.send('Hello <strong>GET</strong>');
});

app.post('/file_upload', upload.single('avatar'), function(req, res) {
	console.log(req.file); // uploaded file info
	console.log(req.file.path + " " + req.file.filename); // where it's stored
	console.log(req.body); // text form-fields
	res.redirect('/');
});

/* Specify both GET and POST endpoint */
app.route('/debug') 
	.get((req, res) => res.jsonPretty(req.requestInfo)) // jsonPretty() is custom
	.post((req, res) => res.status(200).json(req.requestInfo));


module.exports = {
	server: server,
	app: app
};
