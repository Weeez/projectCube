var express = require('express');
var app = express();
var http = require('http');

var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(port, function () {
  console.log('The server has been started!');
})