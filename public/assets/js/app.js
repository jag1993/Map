var map;
var myLatLng;
var marker
var socket = io.connect(window.location.hostname);
var currentPos;

$(document).ready(function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom:30
  })
});

 if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position) {
         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         map.setCenter(initialLocation);
         currentPos = position;
     });
 }


var options = {
  enableHighAccuracy: false,
  timeout:1000,
  maximumAge: 0
};



function success(pos) {
  var crd = pos.coords;
  myLatLng = {lat: crd.latitude, lng: crd.longitude};
  console.log(myLatLng);
  socket.emit('send_location', myLatLng);
  socket.on('new_location', function(data){
    id = socket.io.engine.id
    console.log(id);
    setPosition(data);
  })
};

function makeMarker(myLatLng,map,label){
  if(myLatLng){
          marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          label: label
        });
  }
}


$('#submit').on('click', function(){
  var userID = $('#userID').val();
  socket.emit('send_marker',currentPos);
  socket.on('new_marker',  function(data){
     makeMarker(data,map,userID);
  })
})

function setPosition(coords){
  marker.setPosition(coords);
}

function error(err) {
  console.log('ERROR('+ err.code + '): ' + err.message);
};

//make a while loop here and for in to get dynamically made markers positions
if (marker) {
    function position() {
        navigator.geolocation.watchPosition(success, error, options);
    }
};
