//simple_server.js
// Brian E. Moore
//Date:7/20/22
// Get this to run
//build up to server file Chad's running
var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var bodyParser = require('body-parser'); // express middleware,
var cache = {};


var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//parse application/json
app.use(bodyParser.json());

var arguments = process.argv.slice(2); // remove paths - leave explicit args
var port = process.argv[0];

var server = http.createServer(function (request, response) {
  var filePath = false;
  if (request.url == '/'){
      filePath = 'index.html';
  }else {
    filePath = request.url;
  }
  var absPath = './client/' + filePath;
  //console.log("absPath attempted: "+ absPath); // bem
  serveStatic(response, cache, absPath);
  });
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.end('Hello World\n');

//server.listen(3000, function() {
//  console.log("Server listening on port 3000.");

  server.listen(port, function() {
    console.log("Server listening on port: "+ port);


});

console.log('Server running at http://127.0.0.1:3000/');
// from the terminal run: node simple_server.js
//Load up your browser and goto http://localhost:1337 and voila!

function serveStatic(response, cache, absPath) {
 // if (cache[absPath]) {  // no caching for development!!
 //   sendFile(response, absPath, cache[absPath]);
 // } else {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          }else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
//  }
}
function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200,
    {"content-type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}