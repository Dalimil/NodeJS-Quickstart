/** Debug module that attaches a JSON object (that can be easily displayed) to the req object */

function getRequestInfo(req) {
	var info = {
		method: req.method, // GET
		path: req.path,		// /user/alice
		url: req.url,		// /user/alice?search=love
		query: req.query,	// { search: 'love' }
		params: req.params,	// { name: 'alice' } <- for route /user/:name
		session: req.session, // { myKey1: 'anyJsonObject', ... }
		auth: req.user, 	// passport authentication object
		body: req.body,		// {} <- key-values for form POST or JSON
		headers: req.headers, // { host: 'localhost:8080', ... }
		ip: req.ip,	
		secure: req.secure 	// https ? true/false
	};
	return info;
}

exports.requestInfo = function(req, res, next) {
	// The following vars will be accessible everywhere via the request object
	req.requestInfo = getRequestInfo(req);
	req.requestDate = Date.now();
	req.requestTime = (new Date()).toLocaleTimeString();
	// console.log(req.requestTime + " - " + req.method + " " + req.url);
	res.jsonPretty = function(data) {
		this.end(JSON.stringify(data, null, 2)); // specify stringify() whitespace
	};
	next();
};
