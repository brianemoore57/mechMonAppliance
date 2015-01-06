/**
 * mechMon
 * Brian E.Moore
 * December 29, 2014
 */

var express = require('express'),
    //DbInit = require('./server/init/DbInit'),
    bodyParser = require('body-parser'), // express middleware,
    morgan = require('morgan'), // express middleware, the logger
    fs = require('fs'),
    path = require('path'),
    b = require('bonescript'),
    socketio = require('socket.io');

var K1Pin = "P8_18";
var K2Pin = "P9_27";

function boardInit(){
  b.pinMode(K1Pin, b.OUTPUT);
  b.pinMode(K2Pin, b.OUTPUT);
  b.digitalWrite(K1Pin,b.LOW);
  b.digitalWrite(K2Pin,b.LOW); 

}

console.log("Initialize beaglebone GPIO");
boardInit(); // This only runs once on server startup right?
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//parse application/json
app.use(bodyParser.json());

//turn on logging
app.use(morgan('dev'));

var ROUTES_DIR = __dirname + '/server/api',
    DEFAULT_PORT = 3000;
var port = process.argv[2] || DEFAULT_PORT;
if (port == ''){port = DEFAULT_PORT}
//load API routes
var ApiFiles = fs.readdirSync(ROUTES_DIR);
ApiFiles.forEach(function(file){
  var filePath = path.resolve('./', ROUTES_DIR, file),
      apiObject = require(filePath);
  apiObject.initRoutes(app);
});
// Setup logging..
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a'});
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

// point to the client folder for the client app
app.use('/', express.static(__dirname + '/client'));
app.use('/server', express.static(__dirname + '/server'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/bootstrap3-dialog', express.static(__dirname + '/bootstrap3-dialog'));

app.post('/RelayK1On',function (req, res){ 
  b.digitalWrite(K1Pin, b.HIGH) ;
  res.send('OK');});
app.post('/RelayK1On-30s',function (req, res){
  b.digitalWrite(K1Pin, b.HIGH) ;
  setTimeout(function(){b.digitalWrite(K1Pin, b.LOW)},30000 );
  res.send('OK');});

app.post('/RelayK1Off',function (req, res){
  b.digitalWrite(K1Pin, b.LOW);
  res.send('OK');});
//DbInit.dbInit('localhost', 'mechMonitor');

// set up http server
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
