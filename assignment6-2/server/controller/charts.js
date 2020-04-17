var fs = require('fs');
var JobGrowth = require('./../models/JobGrowth');

exports.getJobGrowth = (req, res) => {
   JobGrowth.find({} ,(err, data) => {
   		if (err) console.log(err, err.stack); // an error occurred
		   else res.render('jobGrowthLineChart', {jobs: data});
		   console.log(data);
   		return;
   })
}