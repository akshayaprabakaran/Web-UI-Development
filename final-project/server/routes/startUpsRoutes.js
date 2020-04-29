const express = require('express');
const router = express.Router();

var Early = require('./../models/Startups/Early');

router.get('/dashboard/startups', (req, res) => {
    Early.find({}).sort('year').exec(function (err, earlyStartupData)  {
        if(err) console.log(err.stack);
        else res.status(200).send({
            earlyStartup : earlyStartupData
        });
    });
});

module.exports = router;