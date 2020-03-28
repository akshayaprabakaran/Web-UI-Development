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
app.get('/', (req, res) => {
    res.render('home', {
        errorMessage: "",
        list: [{
            id: "G123",
            title: "Software Developer",
            description: "Hello , Welcome to Google",
            postedOn: new Date().getTime(),
        }]
    });
});
app.get('/getPosting/:id', controller.getPosting);
app.post('/searchPosting', (req, res) => {
    let search = (req.body || {}).searchThis || null;
    res.render('home', {
        errorMessage: "",
        list: [{
            id: "G123ufd",
            title: "Software Developer",
            description: "Hello , Welcome to Google",
            postedOn: new Date().getTime(),
        },{
            id: "G123",
            title: "Software Developer",
            description: "Hello , Welcome to Google",
            postedOn: new Date().getTime(),
        }]
    });
});
app.post('/createPosting', controller.createPosting);
app.put('/updatePosting/:id', controller.updatePosting);
app.delete('/deletePosting/:id', controller.deletePosting);
app.listen(3000)