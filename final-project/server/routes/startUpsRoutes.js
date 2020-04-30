const express = require('express');
const router = express.Router();

var Early = require('./../models/Startups/Early');
var Women = require('./../models/Startups/Women');

router.get('/dashboard/startups', (req, res) => {
    Women.find({}).sort('years').exec(function (err, womenData) {
        if(err) console.log(err.stack);
        else{
            Early.find({}).sort('year').exec(function (err, earlyStartupData)  {
                if(err) console.log(err.stack);
                else res.status(200).send({
                    earlyStartup : earlyStartupData,
                    women : womenData
                });
            });
        }
    })
    
});

module.exports = router;