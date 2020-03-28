var fs = require('fs');
var Posting = require('./../models/postings');
exports.getPosting = (req, res) => {
    if (!req.params || !req.params.id) {
        res.redirect('home');
        return;
    }
    let id = req.params.id;
    let postingFound = (err, result) => {
        if (err) {
            res.redirect('home');
            return;
        } else if (!!result) {
            res.json({
                posting: result
            });
            return;
        } else {
            res.redirect('home');
            return;
        }
    }
    Posting.findOne({
        id
    }, postingFound);
}
exports.searchPosting = (req, res) => {
    let postingFound = (err, result) => {
        if (err) {
            res.redirect('home');
            return;
        } else {
            res.json({
                postings: result || []
            });
            return;
        }
    }
    Posting.find({}, postingFound);
}
exports.updatePosting = (req, res) => {
    if (!req.params || !req.params.id) {
        res.redirect('home');
        return;
    }
    let id = req.params.id;
    Posting.findOneAndUpdate({
        id
    }, req.body, {
        upsert: true
    }, function (err, doc) {
        res.redirect('home');
        return;
    });
}
exports.createPosting = (req, res) => {
    let id = new Date().getTime(); // timestamp as id
    let p = new Posting(req.body);
    p.save((err) => {
        res.redirect('home');
        return;
    });
}
exports.deletePosting = (req, res) => {
    if (!req.params || !req.params.id) {
        res.redirect('home');
        return;
    }
    let id = req.params.id;
    Posting.deleteOne({
        id
    }, function (err, doc) {
        res.redirect('home');
        return;
    });
}