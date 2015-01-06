/**
 * Created by Brian on 12/23/2014.
 */
//
// Note external 5V required
// Exercising relays and LEDs
//

console.log("Brian's Beaglebone Relay test");

var b = require('bonescript');
var BlueLedPin = "P9_24";
var In1Pin = "P8_11";
var In2Pin = "P8_12";
var In3Pin = "P8_14";
var In4Pin = "P8_15";

var Out1Pin = "P9_42";
var Out2Pin = "P9_22";
var Out3Pin = "P9_21";
var Out4Pin = "P9_16";

var K1Pin = "P8_18";
var K2Pin = "P9_27";

var potValue = 0;
var battValue = 0;
var in1value = 0;
var in2value = 0;
var in3value = 0;
var in4value = 0;

var state = 0;
b.pinMode(In1Pin, b.INPUT);
b.pinMode(In2Pin, b.INPUT);
b.pinMode(In3Pin, b.INPUT);
b.pinMode(In4Pin, b.INPUT);

b.pinMode(Out1Pin, b.OUTPUT);
b.pinMode(Out2Pin, b.OUTPUT);
b.pinMode(Out3Pin, b.OUTPUT);
b.pinMode(Out4Pin, b.OUTPUT);

b.pinMode(K1Pin, b.OUTPUT);
b.pinMode(K2Pin, b.OUTPUT);

b.pinMode(BlueLedPin, b.OUTPUT);

b.digitalWrite(K1Pin, b.LOW);
b.digitalWrite(K2Pin, b.LOW);
b.digitalWrite(Out1Pin, b.LOW);
b.digitalWrite(Out2Pin, b.LOW);
b.digitalWrite(Out3Pin, b.LOW);
b.digitalWrite(Out4Pin, b.LOW);
b.pinMode(K1Pin, b.OUTPUT);
b.pinMode(K2Pin, b.OUTPUT);

b.pinMode(BlueLedPin, b.OUTPUT);

b.digitalWrite(K1Pin, b.LOW);
b.digitalWrite(K2Pin, b.LOW);
b.digitalWrite(Out1Pin, b.LOW);
b.digitalWrite(Out2Pin, b.LOW);
b.digitalWrite(Out3Pin, b.LOW);
b.digitalWrite(Out4Pin, b.LOW);

var1 = setInterval(clickRelay1, 1000); // repeat every second
var2 = setInterval(readPins, 500);

setTimeout(function () {shutdown(var1, var2); },15000); // cancel repeats after 15 secs



function clickRelay1() {
  b.digitalWrite(K1Pin, b.HIGH);

//  setTimeout(function(){b.digitalWrite(K1Pin, b.HIGH)},750);
  setTimeout(function(){b.digitalWrite(K1Pin, b.LOW)},750);
}

function shutdown(var1, var2) {
  clearInterval(var1);
  clearInterval(var2);
  // note the following time has to be longer than the time in the set Interval previous
  console.log('opening relay...');
  setTimeout(function () {
    b.digitalWrite(K1Pin, b.LOW);
    b.digitalWrite(K2Pin, b.LOW);
    b.digitalWrite(Out1Pin, b.LOW);
    b.digitalWrite(Out2Pin, b.LOW);
    b.digitalWrite(Out3Pin, b.LOW);
    b.digitalWrite(Out4Pin, b.LOW);

    exitProgram();

  },1200);

}

function exitProgram() {

  console.log('exiting...');
  process.exit(0);
}


function readPins() {
  console.log('reading pins!');

  state = state ? 0 : 1;
  b.digitalWrite(BlueLedPin, state);

  in1value = b.digitalRead(In1Pin);
  in2value = b.digitalRead(In2Pin);
  in3value = b.digitalRead(In3Pin);
  in4value = b.digitalRead(In4Pin);

  b.digitalWrite(Out1Pin, in1value);
  b.digitalWrite(Out2Pin, in2value);
  b.digitalWrite(Out3Pin, in3value);
  b.digitalWrite(Out4Pin, in4value);

}

