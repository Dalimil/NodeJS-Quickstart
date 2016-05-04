
var express = require('express');
var cookieParser = require('cookie-parser'); // cookies --- https://github.com/expressjs/cookie-parser
var bodyParser = require('body-parser'); // additional body parsing --- https://github.com/expressjs/body-parser
var multer  = require('multer'); // file upload (multipart/form-data) --- https://github.com/expressjs/multer
var app = express();

// Add top-level (could be made route-specific) parsers that will populate request.body
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

app.use(cookieParser());

// Expose urls like /static/images/logo.png 
app.use('/static', express.static('public')); // first arg can be omitted

app.get('/', function(req, res) {
	res.cookie('cart', { items: [1,2,3] }); // set cookie - any json or string
	// res.clearCookie('cart');
	// res.json({ user: 'john' }); // Send json response
	res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/user/:name', function(req, res) {
   console.log("Got a GET request with a pattern match");
   console.log(getRequestInfo(req));
   res.send('Hello <strong>GET</strong>');
});

app.post('/file_upload', function(req, res) {
   console.log("Got a POST request for the homepage");
   res.redirect('index');
});


app.get('/debug', function(req, res) {
	var info = getRequestInfo(req);
	res.end(JSON.stringify(info, null, 2)); // specify stringify() whitespace
});
app.post('/debug', function(req, res) {
	var info = getRequestInfo(req);
	res.end(JSON.stringify(info, null, 2));
});

function getRequestInfo(req) {
	var info = {
		method: req.method, // GET
		path: req.path,		// /user/alice
		url: req.url,		// /user/alice?search=love
		params: req.params,	// { name: 'alice' } <- for route /user/:name
		query: req.query,	// { search: 'love' }
		cookies: req.cookies, // {}
		signedCookies: req.signedCookies, // {}
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

	console.log("Server dir: " + __dirname);
	console.log("Server running at http://localhost:" + port);
});