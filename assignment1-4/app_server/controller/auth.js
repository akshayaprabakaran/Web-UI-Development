exports.isValidUser = (req, res, next) => {
    if (!!req.session.isAuthenticated && !!req.session.email) {
        next();
    } else {
        res.render('login', {
            errorMessage: "Please retry logging in"
        })
    }
};
exports.logoutUser = (req, res, next) => {
    delete req.session.isAuthenticated
    delete req.session.email
    res.render('login', {
        errorMessage: "You have been logged out"
    })
};