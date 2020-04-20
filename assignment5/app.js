var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const connectMongoDB = require("./core/config/initMongoDB");
var controller = require('./core/controller/postings');
var app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

connectMongoDB();

//View engine setup
app.set('views', path.join(__dirname, 'core', 'views'));
app.set('view engine', 'ejs');
// initialize routes
app.get('/', controller.searchPosting);
app.get('/editpost', controller.showEditPage);
app.get('/newpost', (req, res) => {
    res.render('newpost');
});
app.get('/deletepost', controller.deletePosting);
app.get('/getPosting/:id', controller.getPosting);
app.post('/searchPosting', controller.searchPosting);
app.post('/createPosting', controller.createPosting);
app.post('/updatePosting/:id', controller.updatePosting);
app.listen(3000)