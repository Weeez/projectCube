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


//game logic
var fieldTableSize = 100;
var fieldTable = [];

function generateFieldTablePositions(){
    var posX = (-1*(Math.floor(fieldTableSize/2)))-0.5;
    var posZ = (-1*(Math.floor(fieldTableSize/2)))+0.5;
    
    var counter = 0;
    
    for(var i = 0; i < fieldTableSize; i++){
        var row = [];
        for(var j = 0; j < fieldTableSize; j++){
            ++counter;
            var field = {};
            field.position = {
              x: posX+i,
              y: 0,
              z: posZ+j
            };
            row.push(field);
        }
        fieldTable.push(row);
    }
    
    console.log(counter);
    // return fieldTable;
}

function init(){
  generateFieldTablePositions();  
}

init();

var io = require('socket.io').listen(server);

console.log("what the fuck1");
io.on('connection', function (socket) {
  console.log("A player joined to the game");
  
  socket.emit('joined', {asd: "asd", fieldTable: fieldTable});
  socket.on('joined', function(obj){
    console.log("A player joined to the game with the following id: " + obj.socketId);
  });
});
console.log("what the fuck2");