var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const connectMongoDB = require("./server/config/initMongoDB");
var controller = require('./server/controller/charts');
var app = express();
const csvtojson = require("csvtojson");
const jobGrowthModel = require('./server/models/JobGrowth');
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
        csvData.forEach((data) => {
            console.log(data);
            var job = new jobGrowthModel({ quarter: data.Quarter, jobs: parseInt(data.Jobs) });
            job.save((err, res) => {
                if (err) throw err;
                else console.log('Job saved.');
            });
        });
    });

app.get('/getJobGrowthChart', controller.getJobGrowth);

app.listen(3000)