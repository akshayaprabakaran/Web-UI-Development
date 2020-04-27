const express = require('express');
const router = express.Router();
const csvtojson = require("csvtojson");
const TotalJobGrowth = require('./../models/Employment/TotalJobGrowth');
const RelativeJobGrowth = require('./../models/Employment/RelativeJobGrowth');
const EconomicActivity = require('./../models/Employment/EconomicActivity');

convertCSVtoJSON(__dirname + '/../csvData/Employment/totalJobGrowth.csv', 'totalJobGrowthModel');
convertCSVtoJSON(__dirname + '/../csvData/Employment/relativeJobGrowth.csv', 'relativeJobGrowthModel');
convertCSVtoJSON(__dirname + '/../csvData/Employment/economicActivity.csv', 'economicActivityModel');

async function convertCSVtoJSON(dir, modelName) {
   csvtojson().fromFile(dir).then(csvData => {
      loadCSV(csvData, modelName);
   });
}

async function loadCSV(csvData, modelName) {

   let totalJobGrowthQuery = TotalJobGrowth.find({});
   let relativeJobGrowthQuery = RelativeJobGrowth.find({});
   let economicActivityQuery = EconomicActivity.find({});

   switch (modelName) {
      case 'totalJobGrowthModel':
         totalJobGrowthQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'relativeJobGrowthModel':
         relativeJobGrowthQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'economicActivityModel':
         economicActivityQuery.exec(function (err, modelData) {
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
            case 'totalJobGrowthModel':
               dataSet = new TotalJobGrowth({ quarter: obj.Quarter, jobs: parseInt(obj.Jobs) });
               break;
            case 'relativeJobGrowthModel':
               dataSet = new RelativeJobGrowth({ year: obj.Year, location: obj.Location, percentages: obj.Percentages });
               break;
            case 'economicActivityModel':
               dataSet = new EconomicActivity({ activity: obj.Activity, percentages: obj.Percentages });
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