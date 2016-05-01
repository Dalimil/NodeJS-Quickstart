var http = require("http");

var port = 8080;

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('<h1>Hello<h1> World\n');

}).listen(port);

// Console will print the message
console.log('Server running at http://127.0.0.1:' + port);
