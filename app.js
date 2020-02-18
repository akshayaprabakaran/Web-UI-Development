var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var lineReader = require('line-reader');
//var index = require('./app_server/routes/index');

var app = express();

//View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

var myRoutes = require('./app_server/routes/main');
app.use('/', myRoutes);
app.use(express.static(path.join(__dirname, '/app_server')));

app.listen(3000);
console.log("Running port 3000");


