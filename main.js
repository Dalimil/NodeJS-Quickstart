var express = require('express');
var cookieSession = require('cookie-session'); // cookies --- https://github.com/expressjs/cookie-session
var bodyParser = require('body-parser'); // additional body parsing --- https://github.com/expressjs/body-parser
var multer  = require('multer'); // file upload (multipart/form-data) --- https://github.com/expressjs/multer 
var path = require('path'); // path.join
var pp = function(s){ return path.join(__dirname, s); };
var app = express();

/** Route handlers */
var dbController = require('./controllers/database');

// Pug template engine - previously Jade - http://jade-lang.com/
app.set('views', pp('views')); // where templates are located
app.set('view engine', 'pug'); // Express loads the module internally

// Add top-level (could be made route-specific) parsers that will populate request.body
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

// Set up secure cookie session
app.use(cookieSession({ secret: 'vxZpt1uRYg6fdGsSotnksYRVnh5' }));

// Expose urls like /static/images/logo.png 
app.use('/static', express.static(pp('public'))); // first arg could be omitted

var requestInfo = function(req, res, next) {
	// The following vars will be accessible everywhere via the request object
	req.requestInfo = getRequestInfo(req);
	req.requestDate = Date.now();
	req.requestTime = (new Date()).toLocaleTimeString();
	console.log(req.requestTime + " - " + req.method +" " + req.url);
	next();
};
// Middleware function that executes before every request (can have several of these)
app.use(requestInfo); // Order/Place of call important!
// app.use('/articles', requestInfo); // Works but messes up request URLs - /articles/id -> /id

app.get('/', function(req, res) {
	req.session.shop = { items: [1,2,3] }; // set cookie - any json or string
	// delete req.session.shop;
	// res.json({ user: 'john' }); // Send json response
	// res.sendFile( __dirname + "/" + "index.html" );
	res.render('index', { title: 'Hey', message: 'Hello there!'}); // render .pug template
});

app.get('/articles', dbController.list);

app.get('/user/:name', function(req, res) { /* Path can also be a regexp */
   console.log("Got a GET request with a pattern match");
   console.log(getRequestInfo(req));
   res.send('Hello <strong>GET</strong>');
});

app.post('/file_upload', function(req, res) {
   console.log("Got a POST request for the homepage");
   res.redirect('index');
});

/* Specify both GET and POST endpoint */
app.route('/debug') 
	.get(function(req, res) {
		var info = req.requestInfo;
		res.end(JSON.stringify(info, null, 2)); // specify stringify() whitespace
	})
	.post(function(req, res) {
		// Or with status: res.status(500).json({ error: 'message' });
		res.json(req.requestInfo);
	});

function getRequestInfo(req) {
	var info = {
		method: req.method, // GET
		path: req.path,		// /user/alice
		url: req.url,		// /user/alice?search=love
		params: req.params,	// { name: 'alice' } <- for route /user/:name
		query: req.query,	// { search: 'love' }
		session: req.session, // { myKey1: 'anyJsonObject', ... }
		body: req.body,		// {} <- key-values for form POST or JSON
		headers: req.headers, // { host: 'localhost:8080', ... }
		ip: req.ip,	
		secure: req.secure 	// https ? true/false
	};
	return info;
}

var server = app.listen(8080, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log("Server dir: " + pp('/'));
	console.log((new Date()).toLocaleTimeString() + " - Server running at http://localhost:" + port);
});