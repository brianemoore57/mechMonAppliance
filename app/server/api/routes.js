module.exports = function (app) {

  app.get('/login', function(req, res){
    res.render('login', {
      title: 'Express Login'
    });
  });
// could not get following to work
//app.use('bootstrap', express.static(__dirname + '/bower_components/bootstrap'));

  var b = require('bonescript');

  var K1Pin = "P8_18";
  var K2Pin = "P9_27";

  function boardInit(){
    b.pinMode(K1Pin, b.OUTPUT);
    b.pinMode(K2Pin, b.OUTPUT);
    b.digitalWrite(K1Pin,b.LOW);
    b.digitalWrite(K2Pin,b.LOW);

  }
  boardInit();

  app.post('/RelayK1On', function (req, res) {
    b.digitalWrite(K1Pin, b.HIGH);
    res.send('OK');
  });

  app.post('/RelayK1On-30s', function (req, res) {
    b.digitalWrite(K1Pin, b.HIGH);
    setTimeout(function () {
      b.digitalWrite(K1Pin, b.LOW)
    }, 30000);
    res.send('OK');
  });

  app.post('/RelayK1Off', function (req, res) {
    b.digitalWrite(K1Pin, b.LOW);
    res.send('OK');
  });
//DbInit.dbInit('localhost', 'mechMonitor');

  app.get('/api/devices', function (req, res) {
    // with encoding option specified, this function returns a string. Otherwise it returns a buffer.
    var text = fs.readFileSync(__dirname + '/app/server/api/devices.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(text); // because file is formatted as json string not object
  });

  app.get('/api/deviceTypes', function (req, res) {
    // with encoding option specified, this function returns a string. Otherwise it returns a buffer.
    var text = fs.readFileSync(__dirname + '/app/server/api/deviceTypes.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(text); // because file is formatted as json string not object
  });
};