const express = require('express');
const router = express.Router();
const Degree = require('./../models/Education/Degree');
const Level = require('./../models/Education/Level');
const Grad = require('./../models/Education/Grad');

router.get('/dashboard/education', (req, res) => {
   Degree.find({}).sort('years').exec(function (err, degreeData) {
      if (err) console.log(err, err.stack);
      else {
         Level.find({}).sort('level').exec(function (err, levelData) {
         if (err) console.log(err, err.stack);
         else {
            Grad.find({}).sort('rate').sort('year').exec(function (err, gradData) {
            if (err) console.log(err, err.stack);
            else {
               res.status(200).send({
                  degree:degreeData,
                  level:levelData,
                  grad:gradData
               });
            }
         })
      }
   });
}
});
});
module.exports = router;