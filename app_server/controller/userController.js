var express = require("express");
var router = express.Router();

var user = require("../models/users");

// Get user information

router.route("/getInformation").post(function (req, res){
    console.log("Getting user informaiton");

    var email = req.body.email;
    var lowercaseEmail = email.toLowerCase();

    user.findOne({email: lowercaseEmail}, function (err, information){
        if (err){
            console.log ("Problem getting user information");
        }

        else{
            console.log(information); // information object retrieved from db
        }
    })
})