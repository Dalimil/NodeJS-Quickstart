/** Sample code using the 'request' module to make server-side http requests */
const request = require('request');

/* GET */
request('http://example.com', function(error, response, body) {
	// Callback function
	if (!error && response.statusCode == 200) {
		console.log(body); // Show the HTML
	}
});

/* POST */
request.post(
	{
		url: 'http://example.com/upload',
		form: {
			key: 'value',
			name: 'Alice'
		},
		timeout: 10000,
		headers: {
			'User-Agent': 'request'
		}
	},
	function(err, response, body) {
		console.log(body);
	}
);

/* Cookies */
let jar = request.jar();
let cookie = request.cookie("name=John");
jar.setCookie(cookie, 'http://example.com'); // which domain it belongs to

request({ url: "http://example.com", jar: jar },
	function(error, response, body) {
		console.log(body);
	}
);