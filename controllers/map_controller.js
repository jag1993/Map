
var new_users = [];

var toExport = function(app,io){

app.get('/', function (req, res) {
	res.render('index');
});

io.sockets.on('connection',function(socket){
	//Gives location back to frontend
	socket.on('send_location',function(data){
		io.sockets.emit('new_location',data);
	})

	socket.on('new_user',function(data){
		new_users.push(data); //<-- This should have mySQL queries incorporated in them or mongo
		io.sockets.emit('new_users',new_users)
	})
})

}

module.exports = toExport;
