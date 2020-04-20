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

let searchResults = (searchValue, callback) => {

    let q = {};
    if (!!searchValue) {
        q = {
            $or: [{
                "title": {
                    $regex: ".*" + searchValue + ".*",
                    $options: 'i'
                }
            }, {
                "id": {
                    $regex: ".*" + searchValue + ".*",
                    $options: 'i'
                }
            }]
        }
    }
    Posting.find(q, (err, result) => {
        if (err) {
            callback(null, []);
        } else {
            callback(null, result || []);
        }
    });

}

exports.showEditPage = (req, res) => {
    console.log("EDIT ", req.body, req.query, req.params)
    let id = req.query.id || null;
    let onError = () => {
        searchResults(null, (err, result) => {
            res.render('home', {
                list: result
            });
            return;
        });
    }
    if (!id) {
        onError();
    } else {
        let postingFound = (err, result) => {
            if (err || !result) {
                onError();
            } else {
                res.render('editpost', {
                    post: result
                });
                return;
            }
        }
        Posting.findOne({
            id
        }, postingFound);
    }
}
exports.searchPosting = (req, res) => {
    let search = (req.body || {}).searchThis || null;
    searchResults(search, (err, result) => {
        res.render('home', {
            list: result
        })
    })
}
exports.updatePosting = (req, res) => {
    console.log("HELLL", req.body, req.params)
    if (!req.params || !req.params.id) {
        res.render('home', {
            list: []
        });
        return;
    }

    let id = req.params.id;
    Posting.findOneAndUpdate({
        id
    }, req.body, {
        upsert: true
    }, function (err, doc) {
        searchResults(null, (err, result) => {
            res.render('home', {
                list: result
            });
            return;
        })


    });
}
exports.createPosting = (req, res) => {
    let id = "G" + Math.floor(100000 + Math.random() * 900000); // timestamp as id
    req.body.id = id;
    req.body.postedOn = new Date().getTime();
    let p = new Posting(req.body);
    p.save((err) => {
        searchResults(null, (err, result) => {
            res.render('home', {
                list: result
            });
            return;
        })
    });
}
exports.deletePosting = (req, res) => {
    console.log("ID", req.body, req.query)
    if (!req.query || !req.query.id) {
        res.redirect('home');
        return;
    }
    let id = req.query.id;
    Posting.deleteOne({
        id
    }, function (err, doc) {
        searchResults(null, (err, result) => {
            res.render('home', {
                list: result
            });
            return;
        })
    });
}