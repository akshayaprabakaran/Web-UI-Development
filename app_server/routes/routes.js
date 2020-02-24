var express = require('express');
var router = express.Router();


const controller = require('../controller/main');

router.get('/home', controller.getHomePage); // get Register
router.get('/', controller.getRegisterPage); // get Home Page
router.get('/locate', controller.getLocatePage); // get Locate Page
router.get('/upload', controller.uploadResume); // get Locate Page

module.exports = router