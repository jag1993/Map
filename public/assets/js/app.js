var map;
var myLatLng;
var marker;
var socket = io.connect('http://localhost:7015');
var users_logged = [];
var users_markers = [];

setPosition();
//To get user details and sends it to the backend
$('#submit').on('click', function() {
    var userDetails = {
        userName: $('#userID').val(),
        position: myLatLng
            //add socket id if you need to
    }
    if (userDetails === '') {
        alert('ADD Details')
    } else {
        socket.emit('new_user', userDetails);
        socket.on('new_users', function(data) {
            //this gets an array of the users that are logged in
            users_logged = data;
            if (users_logged.length > 0) {
                for (i = 0; i < users_logged.length; i++) {
                   makeMarker(users_logged[i].userName,users_logged[i].position,map);
                }
            }

        })
    }
})


$(document).ready(function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15
    })
});


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
    });
}


var options = {
    enableHighAccuracy: false,
    timeout: 1000,
    maximumAge: 0
};



function success(pos) {
    var crd = pos.coords;
    myLatLng = { lat: crd.latitude, lng: crd.longitude };
    console.log(myLatLng);
    socket.emit('send_location', myLatLng);
    socket.on('new_location', function(data){
      id = socket.io.engine.id
      console.log(id)
    })
};



function makeMarker(id,myLatLng, map) {
    if (myLatLng) {
        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            id:id
        });
    }
    marker.setMap(map);
    users_markers.push(marker);
}


///USE THIS WHEN YOU'RE WATCHING
function setPosition(coords) {

  while(users_markers.length <0){
    //users_markers[i].setPosition(coords);
      console.log("hey while loop");
    users_markers.pop().setMap(null);
  }
  users_markers.length = 0;
}

//window.setInterval(setPosition(myLatLng), 2000);

function error(err) {
    console.log('ERROR(' + err.code + '): ' + err.message);
};

//get current position of person
$(document).ready(function position() {
    navigator.geolocation.watchPosition(success, error, options);
});
