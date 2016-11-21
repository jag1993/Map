


var toExport = function(app,io){

app.get('/', function (req, res) {
	res.render('index');
});

io.sockets.on('connection',function(socket){
	socket.on('send_location',function(data){
		io.sockets.emit('new_location',data);
	})
})

}

module.exports = toExport;
