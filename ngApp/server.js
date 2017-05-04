var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var api = require('./server/routes/api');

var port = 3000;

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log("server running on localhost: " + port);
});
