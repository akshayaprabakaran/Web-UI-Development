var fs = require('fs');
var User = require('./../models/users');
exports.getOneUser = (req, res) => {
    if (!req.params || !req.params.email) {
        res.redirect('home');
        return;
    }
    let email = req.params.email;
    let userFoundCallback = (err, result) => {
        if (err) {
            res.redirect('home');
            return;
        } else if (!!result) {
            delete result.password;
            res.json({
                user: result
            });
            return;
        } else {
            res.redirect('home');
            return;
        }
    }
    User.findOne({
        email
    }, userFoundCallback);
}
exports.getUsers = (req, res) => {
    let userFoundCallback = (err, result) => {
        if (err) {
            res.redirect('home');
            return;
        } else {
            res.json({
                users: result || []
            });
            return;
        }
    }
    User.find({}, userFoundCallback);
}
exports.updateUser = (req, res) => {
    if (!req.params || !req.params.email) {
        res.redirect('home');
        return;
    }
    let email = req.params.email;
    User.findOneAndUpdate({email}, req.body, {upsert: true}, function(err, doc) {
        res.redirect('home');
        return;
    });
}