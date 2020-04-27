const express = require('express');
const router = express.Router();
const csvtojson = require("csvtojson");
const JobGrowth = require('./../models/JobGrowth');
const TotalEmp = require('./../models/TotalEmp');
const Women = require('./../models/Women');
const Early = require('./../models/Early');

csvtojson().fromFile(__dirname + '/../csvData/jobGrowth.csv').then(csvData => {
   loadCSV(csvData, "jobGrowthModel");
});

async function loadCSV(csvData, modelName) {

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
               dataSet = new Early({
                  years: obj.Years, CAnumbers: parseInt(obj.CANumbers), SFnumbers: parseInt(obj.SFNumbers), SVnumbers: parseInt(obj.SVNumbers),
                  CAEarly: parseInt(obj.CAEarly), SFEarly: parseInt(obj.SFEarly), SVEarly: parseInt(obj.SVEarly)
               });
               break;
         }
         dataSet.save((err, res) => {
            if (err) throw err;
            else console.log('Dataset Saved.');
         });
      });
   }
}

module.exports = router;