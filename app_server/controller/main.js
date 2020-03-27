var fs = require('fs');
var User = require('./../models/users');
var Company = require('./../models/companies');

exports.getJobTrack = (req, res) => {
    res.render('jobtrackapp', {
        "companies": [{
            name: "Pinterest",
            checked: "checked"
        }, {
            name: "Synopsys",
            checked: ""

        }, {
            name: "Walmart",
            checked: "checked"
        }, {
            name: "Rakuten",
            checked: ""
        }, {
            name: "Facebook",
            checked: ""
        }],
        "query": req.query
    });
}
exports.getLocatePage = (req, res) => {
    res.render('locateCompany');
}
exports.getSchedulePage = (req, res) => {
    res.render('scheduleVisit');
}
exports.getStickyNotes = (req, res) => {
    res.render('stickynotes');
}
exports.uploadResume = (req, res) => {
    if (!!req.query && !!req.query.img && !!req.query.img) {
        res.redirect('/?upload=success');
    } else {
        res.redirect('/?upload=failure');
    }

}
exports.getRegisterPage = (req, res) => {
    if (req.session.isAuthenticated) {
        res.redirect('home');
    } else {
        res.render('register', {
            errorMessage: ""
        });
    }

}
exports.submitRegisterForm = (req, res) => {
    let body = req.body || {};
    let repeatPassword = body["psw-repeat"] || "";
    let email = body.email || "";
    let password = body.psw || "";
    body.password = password;
    let message = "";
    let creds = require('./../../data');
    if (!email || !password || !repeatPassword) {
        message = "Required fields Missing"
    } else if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
        message = "Email incorrect"
    } else if (password.length < 6 || password.length > 14) {
        message = "Passwords should be 6-14 characters"
    } else if (password !== repeatPassword) {
        message = "Passwords Dont Match"
    } else if (!body.firstname || !body.lastname) {
        message = "Firstname and Lastname required"
    }
    let userFoundCallback = (err, result) => {
        if (!!result && !!result.email) {
            message = "User Exists"
        }
        if (!!message) {
            req.session.isAuthenticated = false;
            res.render('register', {
                errorMessage: message
            });
        } else {
            const u = new User(body);
            u.save((err) => {
                if (!!err) {
                    message = err.message || "Error with Database";
                    req.session.isAuthenticated = false;
                    res.render('register', {
                        errorMessage: message
                    });
                    return;

                } else {
                    req.session.isAuthenticated = true;
                    req.session.email = email;
                    res.redirect('home');
                }
            })
        }
    }
    User.findOne({
        email
    }, userFoundCallback);
}
exports.getHomePage = (req, res) => {
    res.render('tab');
}
exports.getLoginPage = (req, res) => {
    if (req.session.isAuthenticated) {
        res.redirect('home');
    } else {
        res.render('login', {
            errorMessage: ""
        });
    }

}
exports.submitLoginForm = (req, res) => {
    let body = req.body || {};
    let email = body.email || "";
    let password = body.psw || "";
    let creds = require('./../../data');
    let message = "";
    if (!email || !password) {
        message = "Required fields Missing"
    }
    let userFoundCallback = (err, result) => {
        if (err || !result || !result.email || result.password !== password) {
            message = "Incorrect Credentials"
        }
        if (!!message) {
            req.session.isAuthenticated = false;
            res.render('login', {
                errorMessage: message
            });
        } else {
            req.session.isAuthenticated = true;
            req.session.email = result.email
            res.redirect('home');
        }
    }
    User.findOne({
        email
    }, userFoundCallback);

}

exports.getCompanyPage = (req, res) => {
    res.render('postJob');
}

exports.submitJobForm = (req, res) => {

    console.log(req.body.cname);
    let body = req.body || {};
    let name = body.cname || "";
    let title = body.title || "";
    let description = body.description || "";
    let location = body.location || "";

    if(name == " "|| title == " " || description == " " || location == " ") {
        console.log("Required fields missing: Job Form");
    } else {
        const newJob = new Company({
            name: name,
            title: title,
            description: description,
            location: location
        });
        
        console.log("NEW JOB: " + newJob);
        newJob.save()
        .then(() => res.json('New job created!'))
        .catch(err => res.status(400).json(err))
    }
}

exports.getCompanyJobPosts = (req, res) => {

    Company.find({}).then(posts => {
        if (posts) {
            res.render('posts', {posts: posts});
        } else {
            console.log('No posts found!');
        }
    });
}

exports.getInformation = (req, res) => {
    var email = "abcde@gmail.com";

    User.findOne({email: email}, function (err, information){
        if (err){
            console.log ("Problem getting user information");
        }

        else{
            console.log(information); // information object retrieved from db
        }
    })
}