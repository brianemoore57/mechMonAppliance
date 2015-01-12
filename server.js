/**
 * mechMon
 * Brian E.Moore
 * December 29, 2014


 *///we should adopt the practice of setting the PORT variable
var express = require('express'),
    //DbInit = require('./server/init/DbInit'),
    bodyParser = require('body-parser'), // express middleware,
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 2000,
    morgan = require('morgan'), // express middleware, the logger
    fs = require('fs'),
    path = require('path'),
    b = require('bonescript'),
    socketio = require('socket.io');


console.log("Initialize beaglebone GPIO");


var app = express();
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
 app.use(morgan('dev'));
//turn on logging

var  DEFAULT_PORT = 3000;
var port = process.argv[2] || DEFAULT_PORT;
if (port == ''){port = DEFAULT_PORT}
//load API routes
/*
var ApiFiles = fs.readdirSync(ROUTES_DIR);
ApiFiles.forEach(function(file){
  var filePath = path.resolve('./', ROUTES_DIR, file),
      apiObject = require(filePath);
  apiObject.initRoutes(app);
});
*/

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a'});
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

app.use('/', express.static(__dirname + '/app'));
//app.use('server', express.static(__dirname + '/server'));
app.use('images', express.static(__dirname + '/images'));
app.use('bower_components', express.static(__dirname + '/bower_components'));
app.use('js', express.static(__dirname + '/js'));
app.use('css', express.static(__dirname + '/css'));
app.use('partials', express.static(__dirname + '/partials'));
app.use('bootstrap3-dialog', express.static(__dirname + '/bootstrap3-dialog'));

/* include all the get, post, etc. routes */
//require('app/server/api/routes.js');

require(__dirname + '/app/server/api/routes')(app);

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

var httpServer = app.listen(port);
console.log('server.js: App launched. Server running on port:'+port);
// set up socket server
socketio.listen(httpServer).on('connection', function (socket) {
  socket.on('message', function (msg) {
    console.log('Message Received: ', msg);
    socket.broadcast.emit('message', msg);
  });
});
// shutdown gracefully
var shutdownGracefully = function () {
  console.log('server.js: Received kill signal, shutting down gracefully');
  httpServer.close(function() {
    console.log('server.js: Closed out remaining connections. App shutdown.');
    process.exit();
  });

   // enforce shutdown after 10 seconds wait 
   setTimeout(function() {
       console.error("server.js: Could not close connections in time, forcefully shutting down. App shutdown");
       process.exit();
  }, 10*1000);  
};

//listen for kill signal from the TERM
process.on('SIGTERM', shutdownGracefully);

//listen for kill signal from INT
process.on('SIGINT', shutdownGracefully);
