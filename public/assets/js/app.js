var map;
var myLatLng;
var socket = io.connect(window.location.hostname);

$(document).ready(function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom:10,
    center: {lat:36.778259, lng:  -119.417931}
  })
});



var options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0
};



function success(pos) {
  var crd = pos.coords;
  myLatLng = {lat: crd.latitude, lng: crd.longitude};
  console.log(myLatLng);
  socket.emit('send_location', myLatLng);
  socket.on('new_location', function(data){
    id = socket.io.engine.id
  makeMarker(data,map);
  })
};




function makeMarker(myLatLng,map){
  if(myLatLng){
    var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Test'
        });
  }
}



function error(err) {
  console.log('ERROR('+ err.code + '): ' + err.message);
};


$(document).ready(function position(){
    navigator.geolocation.watchPosition(success,error,options);
});