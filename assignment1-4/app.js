var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sessions = require('express-session');
var fs = require('fs');
const connectMongoDB = require("./app_server/config/initMongoDB");

var app = express();
try {
    if (fs.existsSync(process.cwd() + '/data.js')) {
        //file exists
    } else {
        fs.writeFileSync(process.cwd() + '/data.js', 'module.exports = []');
    }
} catch (err) {
    console.error("err", err);
}
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.use(cookieParser());
app.use(sessions({
    secret: 'thisissomesecrestkey',
    resave: false,
    saveUninitialized: true
}));

// establish MongoDB connection
connectMongoDB();

//View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

// initialize routes
var myRoutes = require('./app_server/routes/routes');
app.use('/', myRoutes);
app.use(express.static(path.join(__dirname, '/app_server')));


app.listen(3000)