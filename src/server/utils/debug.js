/** Debug module that attaches a JSON object (that can be easily displayed) to the req object */

function getRequestInfo(req) {
	return {
		timestamp: Date.now(),
		time: new Date().toLocaleTimeString(),
		timedate: new Date().toLocaleString(),
		method: req.method, // GET
		path: req.path,		// /user/alice
		url: req.url,		// /user/alice?search=love
		query: req.query,	// { search: 'love' }
		params: req.params,	// { name: 'alice' } <- for route /user/:name
		session: req.session, // { myKey1: 'anyJsonObject', ... }
		auth: req.user, 	// passport authentication object
		body: req.body,		// {} <- key-values for form POST or JSON
		headers: req.headers, // { host: 'localhost:8080', ... }
		secure: req.secure, 	// https ? true/false
		ip: req.ip,	
		remoteAddress: req.connection.remoteAddress, // should be same as req.ip
		forwardedFor: req.headers['x-forwarded-for'] // original IP when proxying
	};
}

exports.requestInfo = function(req, res, next) {
	// The following vars will be accessible everywhere via the request object
	req.requestInfo = getRequestInfo(req);
	// console.log(req.requestInfo.time + " - " + req.method + " " + req.url);
	res.jsonPretty = function(data) {
		this.end(JSON.stringify(data, null, 2)); // specify stringify() whitespace
	};
	next();
};
