var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const connectMongoDB = require("./server/config/initMongoDB");
var controller = require('./server/controller/charts');
var app = express();
const csvtojson = require("csvtojson");
const jobGrowthModel = require('./server/models/JobGrowth');
const totalEmpModel = require('./server/models/TotalEmp');
const womenModel = require('./server/models/Women');
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

connectMongoDB();

//View engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');

// initialize routes
app.get('getMergedCharts', (req, res) => {
    res.render('mergedCharts');
});

csvtojson()
    .fromFile("jobGrowth.csv")
    .then(csvData => {
        jobGrowthModel.find({}, (err, data) => {
            if (err) throw err;
            else if (data.length >= 19) {
                console.log('job growth data set already exists...');
                return;
            } else {
                csvData.forEach((data) => {
                    console.log(data);
                    var job = new jobGrowthModel({ quarter: data.Quarter, jobs: parseInt(data.Jobs) });
                    job.save((err, res) => {
                        if (err) throw err;
                        else console.log('Job saved.');
                    });
                });
            }
        })
    });
csvtojson()
    .fromFile("sector.csv")
    .then(csvData => {
        totalEmpModel.find({}, (err, data) => {
            if (err) throw err;
            else if (data.length >= 4) {
                console.log('sector data set already exists...');
                return;
            } else {
                csvData.forEach((data) => {
                    console.log(data);
                    var emp = new totalEmpModel({ sector: data.Sector, percentage: parseInt(data.Percentage) });
                    emp.save((err, res) => {
                        if (err) throw err;
                        else console.log('Employment Sector saved.');
                    });
                });
            }
        })
    });
csvtojson()
    .fromFile("women_startups.csv")
    .then(csvData => {
        womenModel.find({}, (err, data) => {
            if (err) throw err;
            else if (data.length >= 3) {
                console.log('women data set already exists...');
                return;
            } else {
                csvData.forEach((data) => {
                    console.log(data);
                    var wom = new womenModel({ year: data.Year, silicon: parseInt(data.Silicon), san: parseInt(data.San), cal: parseInt(data.California) });
                    wom.save((err, res) => {
                        if (err) throw err;
                        else console.log('Women Startups saved.');
                    });
                });
            }
        })
    });

app.get('/getJobGrowthChart', controller.getJobGrowth);
app.get('/getTotalEmp', controller.getTotalEmp);
app.get('/getWomen', controller.getWomen);

app.listen(3000)
