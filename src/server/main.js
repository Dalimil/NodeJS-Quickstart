"use strict";

const express = require('express');
const bodyParser = require('body-parser'); // additional body parsing
const multer = require('multer'); // file upload (multipart/form-data)
const morgan = require('morgan'); // General request logger
const Cookies = require('cookies'); // General cookie handling
const session = require('express-session'); // SESSION cookies
const MongoStore = require('connect-mongo')(session); // Session data storage (server-side MongoDB)
const mongoose = require('mongoose'); // ORM for MongoDB
const path = require('path');
const pp = s => path.join(__dirname, s);
const app = express();
const server = require('http').createServer(app); // or https
const config = require('./config');

// Pug template engine - previously Jade - http://jade-lang.com/
app.set('views', pp('../client/views')); // where templates are located
app.set('view engine', 'pug'); // Express loads the module internally

app.use(Cookies.express());

// Add top-level (could be made route-specific) parsers that will populate request.body
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
const upload = multer({ dest: pp('../client/public/uploads/') }); // Use with multipart/form-data

app.use(morgan('dev')); // Set up logger
const debug = require('./utils/debug'); // + my own logger
app.use(debug.requestInfo); // Middleware function - Order/Place of call important!
// app.use('/articles', requestInfo); // Works but messes up request URLs - /articles/id -> /id

mongoose.connect(config.MONGODB_URI); // Connect to MongoDB

// Set up secure SESSION cookies
app.use(session({
	secret: config.APP_SECRET,
	saveUninitialized: false,
	resave: false, // keep the most recent session modification
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

/** Set up periodic tasks */
const scheduler = require('./utils/scheduler');
// use scheduleOnce() or schedule() for one-off or repeated tasks respectively
let scheduledAlert = scheduler.schedule(30000, () => {
	let currentTime = new Date().toLocaleTimeString();
	console.log("~ " + currentTime); 
});
scheduledAlert.cancel();

/** Route handlers */
const userController = require('./controllers/users');
const sockets = require('./controllers/sockets');
sockets.attach(server); // attach() is Socket.IO specific
const auth = require('./controllers/auth');
auth.init(app); // Set up passport module

app.get('/', function(req, res) {
	// Standard cookies
	req.cookies.set("my-cookie-key", "my-cookie-string-value");
	req.cookies.get("my-cookie-key");

	// SESSION cookies
	req.session.shop = { items: [1,2,3] }; // set cookie - any json or string
	req.session.views += 1;
	// delete req.session.shop;

	// res.json({ user: 'john' }); // Send json response
	// res.sendFile( __dirname + "/" + "index.html" );
	// Now render .pug template with any JSON locals/variables:
	res.render('index', 
		{ title: 'Demo', data: { name: "any json", items: [3, 5, 8] } } 
	); 
});

/** Socket.IO demo index page */
app.get('/sockets', function(req, res) {
	res.render('sockets'); 
});

app.get('/list', userController.listAll);

/** Facebook authentication - it's the same for Twitter */
app.get('/login/facebook', auth.loginFacebook);
app.get('/login/facebook/callback', auth.loginFacebookReturn, function(req, res) { 
	// Successful authentication, redirect home
	res.redirect('/');
});

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
