/**
 * Copied by Brian on 1/5/2015.
 * from http://johnroach.info/2014/05/10/sending-data-from-a-beaglebone-black-to-an-android-tablet/
 * see companion html:
 *
 */
// Creates a websocket with socket.io
// Make sure to install socket.io: terminal, goto /var/lib/cloud9 and enter: npm install socket.io
// Installing this takes a few minutes; wait until the installation is complete

var path = require('path');
var fs = require('fs');
var b = require('bonescript');

var app = require('http').createServer(function (request, response) {
  console.log('request starting...');

  var filePath = '.' + request.url;
  if (filePath == './')
    filePath = './index.html';

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  path.exists(filePath, function(exists) {

    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          response.writeHead(500);
          response.end();
        }
        else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }
    else {
      response.writeHead(404);
      response.end();
    }
  });

});


app.listen(8090);

var io = require('socket.io').listen(app);

// socket.io options go here
io.set('log level', 3);   // reduce logging - set 1 for warn, 2 for info, 3 for debug
io.set('browser client minification', true);  // send minified client
io.set('browser client etag', true);  // apply etag caching logic based on version number

console.log('Server running on: http://' + getIPAddress() + ':8090');


io.sockets.on('connection', function (socket) {
  socket.on('readData', function (data) {
    console.log(data);
    if (data == 'true'){
      //this is where sensor reads happen... need to make this a little more
      //modular...

      socket.emit('1stsensorvalue', b.analogRead('P9_36'));
      socket.broadcast.emit('1stsensorvalue', b.analogRead('P9_36'));
    }
  });
});





// Get server IP address on LAN
function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}