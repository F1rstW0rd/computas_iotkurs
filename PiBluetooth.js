var noble = require('noble');
var socket = require('socket.io-client')('http://localhost:3000');

var id = "Nettvev_avstand";
var type = "sensortag_distance";
var sensor = "bluetooth";
var data = -1;

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
  data = strength;

})
