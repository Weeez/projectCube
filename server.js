var express = require('express');
var app = express();
var http = require('http');
// var io = require('socket.io')(http);


// for error handling
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 3000;
var globalVars = require('./js/global-variables') ;
require('./js/function-collection');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(globalVars.functionCollection.logError);
app.use(globalVars.functionCollection.clientErrorHandler);
app.use(globalVars.functionCollection.errorHandler);

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/game', function(req, res){
  res.render('game');
});

app.get('/error', function(req, res){
  res.render('error', {error: 'invalid endpoint!'});
});

//TODO: do something with this
// app.get('/*', function(req, res){ 
//   res.redirect('error');
// });



var server = app.listen(port, function () {
  console.log('The server has been started');
});

var io = require('socket.io').listen(server);

console.log("what the fuck1");
io.on('connection', function (socket) {
  console.log("what the fuck");
  
  io.emit('joined', {asd: "asd"});
  socket.on('joined', function(obj){
    console.log("fasza" + obj.szopki);
  });
});
console.log("what the fuck2");