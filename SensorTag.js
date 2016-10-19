var sensor = require('sensortag');

var mac = "b0:b4:48:c9:7d:03";
var connected = new Promise((resolve, reject) =>
sensor.discoverByAddress(mac, (tag) => resolve(tag))).then((tag) =>
new Promise((resolve, reject) => tag.connectAndSetup(() => resolve(tag))));

var sensortag = connected.then(function(tag){
  tag.enableGyroscope(log);
  tag.notifyGyroscope(log);
});

var x=0;
var y=0;
var z=0;

sensortag.then(function(tag){
  tag.on('gyrosensorChange', function(x,y,z){
    console.log('x: ' + x);
    console.log('y: ' + y);
    console.log('z: ' + z);
  });
});
