const express = require('express');
const router = express.Router();
const JobGrowth = require('./../models/JobGrowth');

router.get('/dashboard/jobGrowth', (req, res) => {
   JobGrowth.find({}).sort('quarter').exec(function (err, data) {
      if (err) console.log(err, err.stack);
      else {
         console.log(data);
         res.status(200).send(data);
      }
   });
});

module.exports = router;