var fs = require('fs');
exports.getHomePage = (req, res) => {
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

exports.uploadResume = (req, res) => {
    console.log(req.file, req.query, req.params);
    if (!!req.query && !!req.query.img && !!req.query.img) {
        res.redirect('/?upload=success');
    } else {
        res.redirect('/?upload=failure');
    }

}

exports.getRegisterPage = (req, res) => {
    res.render('register', {
        errorMessage: ""
    });
}
exports.submitRegisterForm = (req, res) => {
    let body = req.body || {};
    let repeatPassword = body["psw-repeat"] || "";
    let email = body.email || "";
    let password = body.psw || "";
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
    }
    let existingUsers = creds.filter(elem => {
        return email === elem.email
    })
    if (existingUsers.length > 0) {
        message = "User Exists"
    }

    if (!!message) {
        req.session.isAuthenticated = false;
        res.render('register', {
            errorMessage: message
        });
    } else {
        creds.push({
            email: email,
            password: password
        });
        fs.writeFileSync(process.cwd() + '/data.js', 'module.exports = ' + JSON.stringify(creds));
        req.session.isAuthenticated = true;
        req.session.email = email;
        res.redirect('home');
    }

}

exports.getLoginPage = (req, res) => {
    res.render('login', {
        errorMessage: ""
    });
}
exports.submitLoginForm = (req, res) => {
    let body = req.body || {};
    let email = body.email || "";
    let password = body.psw || "";
    let creds = require('./../../data');
    console.log(body)
    let message = "";
    if (!email || !password) {
        message = "Required fields Missing"
    }
    let validUser = creds.filter(elem => {
        console.log("Check ", elem, email, password);
        return email === elem.email && password === elem.password;
    });
    console.log("validUSer = ", validUser);
    if (validUser.length !== 1) {
        message = "Incorrect Credentials"
    }
    if (!!message) {
        req.session.isAuthenticated = false;
        res.render('login', {
            errorMessage: message
        });
    } else {
        req.session.isAuthenticated = true;
        req.session.email = validUser[0].email;
        res.redirect('home');
    }

}