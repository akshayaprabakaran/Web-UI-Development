var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const connectMongoDB = require("./server/config/initMongoDB");
var controller = require('./server/controller/charts');
var app = express();
const csvtojson = require("csvtojson");
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

connectMongoDB();

//View engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');

csvtojson().fromFile("women_startups.csv").then(csvData => {
    controller.loadCSV(csvData, "womenModel");
})

csvtojson().fromFile("sector.csv").then(csvData => {
    controller.loadCSV(csvData, "totalEmpModel");
})

csvtojson().fromFile("jobGrowth.csv").then(csvData => {
    controller.loadCSV(csvData, "jobGrowthModel");
})

csvtojson().fromFile("early.csv").then(csvData => {
    controller.loadCSV(csvData, "earlyModel");
})

// initialize routes
app.get('/', controller.getMerged);
app.get('/getJobGrowthChart', controller.getJobGrowth);
app.get('/getTotalEmp', controller.getTotalEmp);
app.get('/getWomen', controller.getWomen);
app.get('/getEarly', controller.getEarly);

app.listen(3000)
