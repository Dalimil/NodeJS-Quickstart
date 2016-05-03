
var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();
app.use(cookieParser());

app.use(express.static('public')); // exposes: public/images/logo.png and similar

app.get('/', function(req, res) {
	res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/debug', function(req, res) {
	var info = {
		headers: req.headers,
		url: req.url,
		method: req.method,
		params: req.params,
		query: req.query,
		cookies: req.cookies
	};

	res.end(JSON.stringify(info, null, 2)); // specify stringify() whitespace
});

app.get('/user/*', function(req, res) {
   console.log("Got a GET request with a pattern match");
   res.send('Hello GET');
});

// This responds a POST request for the homepage
app.post('/', function(req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
});


var server = app.listen(8080, function() {

  var host = server.address().address
  var port = server.address().port

  console.log("Server running at http://%s:%s", host, port)

});