const express = require('express');
const router = express.Router();
const TotalJobGrowth = require('./../models/Employment/TotalJobGrowth');
const RelativeJobGrowth = require('./../models/Employment/RelativeJobGrowth');
const EconomicActivity = require('./../models/Employment/EconomicActivity');
const TechGrowth = require('./../models/Employment/TechGrowth');

router.get('/dashboard/employment', (req, res) => {
   TotalJobGrowth.find({}).sort('quarter').exec(function (err, totalJobData) {
      if (err) console.log(err, err.stack);
      else {
         RelativeJobGrowth.find({}).sort('location').sort('year').exec(function (err, relativeJobData) {
            if (err) console.log(err, err.stack);
            else {
               EconomicActivity.find({}).exec(function (err, economicActivityData) {
                  if (err) console.log(err, err.stack);
                  else {
                     TechGrowth.find({}).exec(function (err, techGrowthData) {
                        if (err) console.log(err, err.stack);
                        else {
                           res.status(200).send({
                              totalJob: totalJobData,
                              relativeJob: relativeJobData,
                              economicActivity: economicActivityData,
                              techGrowth: techGrowthData
                           });
                        }
                     })
                  }
               })
            }
         });
      }
   });
});

module.exports = router;