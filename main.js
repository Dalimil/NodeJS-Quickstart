
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('<h1>Hello</h1> World');
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Server running at http://%s:%s", host, port)

})