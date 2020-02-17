var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var lineReader = require('line-reader');
//var index = require('./app_server/routes/index');
var app = express();

//View engine setup
//app.set('views', path.join(__dirname, 'app_server', 'views'));
//app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app_server/views/jobtrackapp.html'));
});

app.get('/locate', function(req, res) {
    res.sendFile(path.join(__dirname + '/app_server/views/locateCompany.html'));
});


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, '/app_server')));
//app.use(session( {secret: "String for encrypting cookies." } ));



//module.exports = app;
app.listen(3000);
console.log("Running port 3000");


