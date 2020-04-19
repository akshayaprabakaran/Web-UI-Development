var JobGrowth = require('./../models/JobGrowth');
var TotalEmp = require('./../models/TotalEmp');
var Women = require('./../models/Women');
var Early = require('./../models/Early');

exports.loadCSV = (csvData, modelName) => {

   let jobGrowthQuery = JobGrowth.find({});
   let sectorQuery = TotalEmp.find({});
   let womenQuery = Women.find({});
   let earlyQuery = Early.find({});

   switch (modelName) {
      case 'jobGrowthModel':
         jobGrowthQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'totalEmpModel':
         sectorQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'womenModel':
         womenQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'earlyModel':
         earlyQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;

   }
}

async function saveData(modelData, csvData, modelName) {
   if (modelData.length >= csvData.length) {
      console.log(modelName + ' dataset already exists!');
   } else {
      csvData.forEach((obj) => {
         let dataSet = null;
         switch (modelName) {
            case 'jobGrowthModel':
               dataSet = new JobGrowth({ quarter: obj.Quarter, jobs: parseInt(obj.Jobs) });
               break;
            case 'totalEmpModel':
               dataSet = new TotalEmp({ sector: obj.Sector, percentage: parseInt(obj.Percentage) });
               break;
            case 'womenModel':
               dataSet = new Women({ year: obj.Year, silicon: parseInt(obj.Silicon), san: parseInt(obj.San), cal: parseInt(obj.California) });
               break;
            case 'earlyModel':
               dataSet = new Early({ years: obj.Years, CAnumbers: parseInt(obj.CANumbers), SFnumbers: parseInt(obj.SFNumbers), SVnumbers: parseInt(obj.SVNumbers) });
               break;
         }
         dataSet.save((err, res) => {
            if (err) throw err;
            else console.log('Dataset Saved.');
         });
      });
   }
}

exports.getMerged = (req, res) => {
   JobGrowth.find({}).sort('quarter').exec(function (err, jobData) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
         TotalEmp.find({}, (err, sectorData) => {
            if (err) console.log(err, err.stack); // an error occurred
            else {
               Women.find({}).sort('year').exec(function (err, womenData) {
                  if (err) console.log(err, err.stack); // an error occurred
                  else {
                     Early.find({}).sort('year').exec(function (err, earlyData) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else {
                           renderIt(jobData, sectorData, womenData, earlyData, res);
                        }
                     })
                  }
               })
            }
         })
      }
   })
}

      async function renderIt(jobData, sectorData, womenData, earlyData, res) {
         res.render('mergedCharts', { jobs: jobData, percentage: sectorData, womenData: womenData, early: earlyData });
      }

      exports.getJobGrowth = (req, res) => {
         JobGrowth.find({}).sort('quarter').exec(function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else res.render('jobGrowthLineChart', { jobs: data });
            console.log(data);
            return;
         })
      }
      exports.getTotalEmp = (req, res) => {
         TotalEmp.find({}, (err, data) => {
            if (err) console.log(err, err.stack); // an error occurred
            else res.render('piepie', { percentage: data });
            console.log(data);
            return;
         })
      }
      exports.getWomen = (req, res) => {
         Women.find({}).sort('year').exec(function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else res.render('womenChart', { womenData: data });
            console.log(data);
            return;
         })
      }
      exports.getEarly = (req, res) => {
         Early.find({}).sort('year').exec(function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else res.render('percentOfJobChangeOverYears', { early: data });
            console.log(data);
            return;
         })
      }