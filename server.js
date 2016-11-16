

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



var port = 7015;
var server = app.listen(port);
var io      = require('socket.io').listen(server);

var routes = require('./controllers/map_controller.js');

routes(app,io);