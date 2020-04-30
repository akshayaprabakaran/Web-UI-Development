const express = require('express');
const router = express.Router();

var Early = require('./../models/Startups/Early');
var Women = require('./../models/Startups/Women');
var Funding = require('./../models/Startups/Funding');

router.get('/dashboard/startups', (req, res) => {
    Funding.find({}).sort('years').exec(function(err, fundingData) {
        Women.find({}).sort('years').exec(function (err, womenData) {
            if(err) console.log(err.stack);
            else{
                Early.find({}).sort('year').exec(function (err, earlyStartupData)  {
                    if(err) console.log(err.stack);
                    else res.status(200).send({
                        earlyStartup : earlyStartupData,
                        women : womenData,
                        funding : fundingData,
                    });
                });
            }
        })
    });
    
    
});

module.exports = router;