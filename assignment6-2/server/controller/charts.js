var fs = require('fs');
var JobGrowth = require('./../models/JobGrowth');

exports.getJobGrowth = (req, res) => {
   JobGrowth.find({} ,(err, data) => {
   		if (err) console.log(err, err.stack); // an error occurred
   		else res.render('getJobGrowthChart', {jobs: data});
   		return;
   })
}