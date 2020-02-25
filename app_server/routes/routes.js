var express = require('express');
var router = express.Router();


const controller = require('../controller/main');
const authentication = require('../controller/auth');

router.get('/home', authentication.isValidUser, controller.getHomePage); // get Register
router.get('/register', controller.getRegisterPage); // get Register Page
router.post('/register', controller.submitRegisterForm); //  Register submit
router.get('/locate', authentication.isValidUser, controller.getLocatePage); // get Locate Page
router.get('/upload', authentication.isValidUser, controller.uploadResume); // upload Resume
router.get('/login', controller.getLoginPage); // get Login Page
router.post('/login', controller.submitLoginForm); // login submit
router.get('/logout', authentication.logoutUser); // logout

module.exports = router