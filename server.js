var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io')(http);

// for error handling
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 3000;

function logError(err, req, res, next){
  if(!err) return next();
  console.log(err);
  next(err);
}

function errorHandler(err, req, res, next){
  res.status(500);
  res.render('error', {error: err});
  next(err);
}

function clientErrorHandler(err, req, res, next){
  if(req.xhr){
    res.status(500).send({error: 'something failed!'});
    res.render('error', {error: err});
  }else{
    next(err);
  }
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logError);
app.use(clientErrorHandler);
app.use(errorHandler);

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/game', function(req, res){
  res.render('game');
});

app.listen(port, function () {
  console.log('The server has been started at ' + process.env.IP + " " + process.env.PORT);
});