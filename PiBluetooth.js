var noble = require('noble');
var socket = require('socket.io-client')('http://localhost:3000');

var ourID = "Nettvev_avstand";
var ourType = "sensortag_distance";
var ourSensor = "bluetooth";
var ourData = -1;

noble.on('stateChange', function(state){
  var mac = ["b0:b4:48:c3:5a:03"];
  if(state == 'poweredOn'){
    noble.startScanning(mac, true);
  } else{
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral){
  var strength = -1;
  strength = -1*peripheral.rssi; // [0, -90]
  if(strength > 90){
    strength = 90;
  }
  strength = (100*strength)/90;
  ourData = strength;
  console.log(ourData);
  // Sends data to hub
  socket.emit('sensor.data', {
    id: ourID,
    type: ourType,
    sensor: ourSensor,
    data: ourData
  });
});
