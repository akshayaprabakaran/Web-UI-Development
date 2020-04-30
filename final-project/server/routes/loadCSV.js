const express = require('express');
const router = express.Router();
const csvtojson = require("csvtojson");
const TotalJobGrowth = require('./../models/Employment/TotalJobGrowth');
const RelativeJobGrowth = require('./../models/Employment/RelativeJobGrowth');
const EconomicActivity = require('./../models/Employment/EconomicActivity');
const Level = require('./../models/Education/Level');
const Grad = require('./../models/Education/Grad');
const Degree = require('./../models/Education/Degree');
const TechGrowth = require('./../models/Employment/TechGrowth');

// startups
const EarlyStartups = require('./../models/Startups/Early');
const Women = require('./../models/Startups/Women');
const Funding = require('./../models/Startups/Funding');

convertCSVtoJSON(__dirname + '/../csvData/Employment/totalJobGrowth.csv', 'totalJobGrowthModel');
convertCSVtoJSON(__dirname + '/../csvData/Employment/relativeJobGrowth.csv', 'relativeJobGrowthModel');
convertCSVtoJSON(__dirname + '/../csvData/Employment/economicActivity.csv', 'economicActivityModel');
convertCSVtoJSON(__dirname + '/../csvData/Employment/techGrowth.csv', 'techGrowthModel');
convertCSVtoJSON(__dirname + '/../csvData/Education/level.csv', 'levelModel');
convertCSVtoJSON(__dirname + '/../csvData/Education/grad.csv', 'gradModel');
convertCSVtoJSON(__dirname + '/../csvData/Education/degree.csv', 'degreeModel');

// startups
convertCSVtoJSON(__dirname + '/../csvData/Startups/early.csv', 'earlyModel');
convertCSVtoJSON(__dirname + '/../csvData/Startups/women_startups.csv', 'womenModel');
convertCSVtoJSON(__dirname + '/../csvData/Startups/funding.csv', 'fundingModel');

async function convertCSVtoJSON(dir, modelName) {
   csvtojson().fromFile(dir).then(csvData => {
      loadCSV(csvData, modelName);
   });
}

async function loadCSV(csvData, modelName) {

   let totalJobGrowthQuery = TotalJobGrowth.find({});
   let relativeJobGrowthQuery = RelativeJobGrowth.find({});
   let economicActivityQuery = EconomicActivity.find({});
   let techGrowthQuery = TechGrowth.find({});
   let levelQuery = Level.find({});
   let gradQuery = Grad.find({});
   let degreeQuery = Degree.find({});
   let earlyQuery = EarlyStartups.find({});
   let womenQuery = Women.find({});
   let fundingQuery = Funding.find({});

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
      case 'techGrowthModel':
         techGrowthQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'levelModel':
         levelQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'gradModel':
         gradQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'degreeModel':
         degreeQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'earlyModel':
         earlyQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         });
         break;
      case 'womenModel':
         womenQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         });
         break;
      case 'fundingModel':
         fundingQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         });
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
            case 'techGrowthModel':
               dataSet = new TechGrowth({ jobs: obj.Jobs, city: obj.City });
               break;
            case 'levelModel':
               dataSet = new Level({ level: obj.Level, percentage: parseFloat(obj.Percentage) });
               break;
            case 'gradModel':
               dataSet = new Grad({ year: obj.Year, rate: obj.Rate, percentages: obj.Percentages });
               break;
            case 'degreeModel':
               dataSet = new Degree({ years: obj.Years, Silnumbers: parseInt(obj.SilNumbers), Uspercent: parseFloat(obj.UsPercent) });
               break;
            case 'earlyModel':
               dataSet = new EarlyStartups({
                  years: obj.Years, CAnumbers: parseInt(obj.CANumbers), SFnumbers: parseInt(obj.SFNumbers), SVnumbers: parseInt(obj.SVNumbers),
                  CAEarly: parseInt(obj.CAEarly), SFEarly: parseInt(obj.SFEarly), SVEarly: parseInt(obj.SVEarly)
               });
               break;
            case 'womenModel':
               dataSet = new Women({ years: obj.Years, SV: parseInt(obj.SV), SF: parseInt(obj.SF), CA: parseInt(obj.CA) });
               break;
            case 'fundingModel':
               dataSet = new Funding({ years: obj.Years, SV: parseInt(obj.SV), SF: parseInt(obj.SF)});
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
